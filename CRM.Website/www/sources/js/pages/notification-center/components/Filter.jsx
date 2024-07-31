import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { statusOptionOST, statusOptionCSD, isEitherExitsFromToId, isFromIdOverToId, checkExceedMaxInt } from '../common.functions';
import { isHavePermissionOnSite, isHaveLicenseePermissionOnSite } from '@jsroot/common/shareScripts';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const fromDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(yesterday)));
        const toDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));

        this.state = {
            filter: {
                fromDate,
                toDate,
                matchId: null,
                notificationId: null,
                fromNotificationId: null,
                toNotificationId: null,
                messageId: null,
                content: null,
                statuses: statusOptionOST.map(x=> x.name).join(','),
                sender: null,
                isTestOnly: false
            },
            statusOptions : statusOptionOST,
            isOstUser: true,
            isCompareIdEqual : true,
            isValidNotification: false
        }
        this.maxDate = toDate;
        this.notificationTypes = [
            { id: 0, name: 'Equal' },
            { id: 1, name: 'From/To' }
        ];
    }

    componentDidMount() {
        if (this.props.isLoadGrid && this.props.filterParams) {
            const filterParams = this.props.filterParams;
            const statusList = filterParams.statuses?.split(',');
            const cloneStatus = JSON.parse(JSON.stringify(filterParams.isOstUser ? statusOptionOST : statusOptionCSD));
            const statusOptions = cloneStatus.map(item => {
                if (statusList && !statusList.includes(item.id)) {
                    item.checked = false;
                }
                return item;
            });
            this.setState({
                ...this.state,
                statusOptions,
                isOstUser: filterParams.isOstUser,
                isCompareIdEqual: filterParams.isCompareIdEqual,
                filter: {
                    ...this.state.filter,
                    fromDate: filterParams.fromDate ? new Date(filterParams.fromDate) : this.state.filter.fromDate,
                    toDate: filterParams.toDate ? new Date(filterParams.toDate) : this.state.filter.toDate,
                    matchId: filterParams.matchId,
                    notificationId: filterParams.notificationId,
                    fromNotificationId: filterParams.fromNotificationId,
                    toNotificationId: filterParams.toNotificationId,
                    messageId: filterParams.messageId,
                    content: filterParams.content,
                    statuses: filterParams.statuses ?? this.state.filter.statuses,
                    sender: filterParams.sender,
                    isTestOnly: filterParams.isTestOnly ?? this.state.isTestOnly
                }
            });
        }
    };

    handleFilterChange = (name, value) => {
        this.setState(prevState => ({  
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }), () => this.props.setGridParams(this.getParams()));
    };

    handleDateChange = (dates) => {
        const [start, end] = dates;
        this.handleFilterChange('fromDate', start);
        this.handleFilterChange('toDate', end);
    };

    handleChangeNotificationType = () => {
        document.getElementById("notificationId").value = null;
        document.getElementById("fromNotificationId").value = null;
        document.getElementById("toNotificationId").value = null;

        this.setState(prevState => ({
            filter: {...prevState.filter, notificationId: null, fromNotificationId: null, toNotificationId: null},
            isCompareIdEqual: !prevState.isCompareIdEqual,
            isValidNotification: false
        }), () => this.props.setGridParams(this.getParams()));
    };

    handleChangeStatus = (currentItem, selectedItemsKey) =>{
        this.setState({
            filter: {...this.state.filter, statuses: selectedItemsKey}
        }, () => this.props.setGridParams(this.getParams()));
    };

    handleChangeTestData = () => {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                isTestOnly: !prevState.filter.isTestOnly
            }
        }), () => this.props.setGridParams(this.getParams()));
    };

    isValidParams = () => {
        const errMsg = [];
        let isValid = { value: true };
        const { filter, isCompareIdEqual } = this.state;
        const { fromDate, toDate } = filter;
        const fieldsToCheckMaxInt = [
            { value: filter.matchId, name: 'Match ID' },
            { value: filter.fromNotificationId, name: 'From Notification ID' },
            { value: filter.toNotificationId, name: 'To Notification ID' },
            { value: filter.notificationId, name: 'Notification ID' },
            { value: filter.messageId, name: 'Message ID' }
        ];
    
        if (!isCompareIdEqual) {
            if (isEitherExitsFromToId(filter)) {
                isValid.value = false;
                this.setState({ isValidNotification: true });
                errMsg.push(LangHelper.getResource('BothFromToNotificationId'));
            }
    
            if (isFromIdOverToId(filter)) {
                isValid.value = false;
                this.setState({ isValidNotification: true });
                errMsg.push(LangHelper.getResource('ToCannotGreaterFromValue'));
            }
        }
    
        if (!fromDate || !toDate) {
            isValid.value = false;
            errMsg.push(LangHelper.getResource('InvalidRangeDateFilter'));
        }

        fieldsToCheckMaxInt.forEach(field => checkExceedMaxInt(field, errMsg, isValid));

        return { isValid: isValid.value, errMsg };
    };

    handleChangeNotificationFromTo = (name, value) => {
        this.handleFilterChange(name, value);
        this.setState({ isValidNotification: false });
    };

    isDisabledField = () => {
        const { notificationId, fromNotificationId, toNotificationId, messageId } = this.state.filter;
        const isHaveNotification = notificationId || fromNotificationId || toNotificationId;
        return isHaveNotification || messageId;
    };

    isDisabledMessage = () => {
        const { notificationId, fromNotificationId, toNotificationId } = this.state.filter;
        return notificationId || fromNotificationId || toNotificationId;
    };

    isDisabledNotification = () => this.state.filter.messageId;

    getParams = () => {
        const { fromDate, toDate, matchId, notificationId, fromNotificationId, toNotificationId,
            messageId, content, statuses, sender, isTestOnly } = this.state.filter;
        const { isCompareIdEqual, isOstUser } = this.state;

        return {
            fromDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(fromDate)),
            toDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(toDate)),
            matchId, messageId, content, statuses, sender,
            isTestOnly, isOstUser, isCompareIdEqual,
            notificationId: isCompareIdEqual ? notificationId : null,
            fromNotificationId: !isCompareIdEqual ? fromNotificationId : null,
            toNotificationId: !isCompareIdEqual ? toNotificationId : null,
            pageIndex: this.props.gridParams.pageIndex,
            pageSize: this.props.gridParams.pageSize
        };
    };

    submit = () => {
        const { isOstUser } = this.state;
        const hasPermission = isOstUser ? isHavePermissionOnSite() : isHaveLicenseePermissionOnSite();
    
        if (hasPermission) {
            const validation = this.isValidParams();
            if (!validation.isValid) {
                validation.errMsg.forEach(item => {
                    toast.error(item);
                });
            } else {
                const params = this.getParams();
                this.props.setGridParams(params);
                this.props.getGridData(params);
                this.props.setAutoRefresh({
                    ...this.props.autoRefresh,
                    isSubmit: true,
                    countDown: this.props.autoRefresh.value
                });
            }
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.submit();
    };

    handleResetPaging = async () => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = 1;
        params['pageSize'] = 100;
        await this.props.setGridParams(params);
        this.submit();
    };

    handleChangeUser = id => {
        this.setState({
            filter: { ...this.state.filter, statuses: id === 0 ? statusOptionOST.map(x=> x.name).join(','): statusOptionCSD.map(x=> x.name).join(',')},
            statusOptions: id === 0 ? statusOptionOST : statusOptionCSD,
            isOstUser: id === 0
        }, () => this.handleResetPaging());
    };

    render() {
        const classIsInvalidFromTo = this.state.isValidNotification ? 'is-invalid' : '';
        return (
            <>
                <div className='user-filter'>
                    <div
                        className={`user-ost ${this.state.isOstUser ? 'locked-user': ''}`}
                        onClick={() => this.handleChangeUser(0)}
                    >
                        {LangHelper.getResource('GeneralNotification')}
                    </div>
                    <div
                        className={`user-licensee ${!this.state.isOstUser ? 'locked-user': ''}`}
                        onClick={() => this.handleChangeUser(1)}
                    >
                        {LangHelper.getResource('LicenseeNotification')}
                    </div>
                </div>
                <Form className='form-filter' onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group>
                            <Form.Label htmlFor="created-date">{LangHelper.getResource('CreatedDate')}</Form.Label>
                            <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    useShortMonthInDropdown
                                    selected={this.state.filter.fromDate}
                                    onChangeDate={dates => this.handleDateChange(dates)}
                                    startDate={this.state.filter.fromDate}
                                    endDate={this.state.filter.toDate}
                                    maxDate={this.maxDate}
                                    disabled={this.isDisabledField()}
                                    maxDateRange={Number.MAX_SAFE_INTEGER}
                                    selectsRange
                                    isRangeDate
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="MatchID">{LangHelper.getResource('Match ID')}</Form.Label>
                            <Form.Control type="number" size="sm" as='input' pattern='[0-9]*'
                                value={this.state.filter.matchId}
                                name="matchId" id="matchId"
                                className="shadow-none remove-arrow"
                                disabled={this.isDisabledField()}
                                onChange={e => this.handleFilterChange('matchId', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='group-notification'>
                            <Form.Label>{LangHelper.getResource('NotificationID')}</Form.Label>
                            <div className='d-flex align-items-center notification-id-container'>
                                <Form.Control as="select" size="sm" className="shadow-none notification-id-select" name='notification'
                                    value={this.state.isCompareIdEqual ? this.notificationTypes[0].id : this.notificationTypes[1].id}
                                    onChange={this.handleChangeNotificationType}
                                    disabled={this.isDisabledNotification()}
                                >
                                    {this.notificationTypes.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                                </Form.Control>
                                <div style={{display: 'contents'}} hidden={this.state.isCompareIdEqual}>
                                    <Form.Control
                                        className={`shadow-none remove-arrow valid-input ml-2 notification-id-input ${classIsInvalidFromTo}`}
                                        as='input' type='number' pattern='[0-9]*' size='sm'
                                        name='fromNotificationId' id='fromNotificationId'
                                        placeholder='From'
                                        value={this.state.filter.fromNotificationId}
                                        disabled={this.isDisabledNotification()}
                                        onChange={e => this.handleChangeNotificationFromTo('fromNotificationId', e.target.value)}
                                    />
                                    <div className='notification-concate text-center ml-1 mr-1'>-</div>
                                    <Form.Control
                                        className={`shadow-none valid-input remove-arrow notification-id-input ${classIsInvalidFromTo}`}
                                        as='input' type='number' pattern='[0-9]*' size='sm'
                                        name='toNotificationId' id='toNotificationId'
                                        placeholder='To'
                                        value={this.state.filter.toNotificationId}
                                        disabled={this.isDisabledNotification()}
                                        onChange={e => this.handleChangeNotificationFromTo('toNotificationId', e.target.value)}
                                    />
                                </div>
                                <Form.Control type="number" size="sm"
                                    value={this.state.filter.notificationId}
                                    hidden={!this.state.isCompareIdEqual}
                                    name="notificationId" id="notificationId"
                                    className="shadow-none ml-2 remove-arrow" pattern='[0-9]*'
                                    disabled={this.isDisabledNotification()}
                                    onChange={e => this.handleFilterChange('notificationId', e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('MessageID')}</Form.Label>
                            <Form.Control as='input' type='number' size='sm' pattern='[0-9]*' className='shadow-none remove-arrow'
                                name='messageId' id='messageId'
                                disabled={this.isDisabledMessage()}
                                value={this.state.filter.messageId}
                                onChange={e => this.handleFilterChange('messageId', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('Content')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' className='shadow-none content' name='content'
                                value={this.state.filter.content}
                                disabled={this.isDisabledField()}
                                autoComplete='off'
                                onChange={e => this.handleFilterChange('content', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                            <div className='form-control-wrapper status-match-date'>
                                <MultipleSelect
                                    dataSource={this.state.statusOptions}
                                    isDisable={this.isDisabledField()}
                                    keyField='id'
                                    valueField='name'
                                    maxDisplayItemCount={2}
                                    isAllTextShown
                                    onChange={(currentItem, selectedItemsKey) => {
                                        this.handleChangeStatus(currentItem, selectedItemsKey);
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className='group-sender'>
                            <Form.Label htmlFor="sender">{LangHelper.getResource('Sender')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' className='shadow-none' name='sender'
                                value={this.state.filter.sender}
                                autoComplete='off'
                                disabled={this.isDisabledField()}
                                onChange={e => this.handleFilterChange('sender', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{justifyContent: 'space-between', height:'100%'}}>
			                <Form.Check className='group-include-test' type="checkbox" id="check-box-include" label={LangHelper.getResource('FilterByTestEvents')}
                                htmlFor="check-box-include" checked={this.state.filter.isTestOnly}
                                value={this.state.filter.isTestOnly}
                                disabled={this.isDisabledField()}
                                onChange={this.handleChangeTestData}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div className='btn-submit-notification'>
                                <Button variant='primary' size='sm' type='submit'>
                                    {LangHelper.getResource('Submit')}
                                </Button>
                            </div>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </>
        )
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, autoRefresh } = state;
    return { gridParams, autoRefresh };
};

const FilterNavigation = WithNavigation(Filter);

export default connect(mapStateToProps, mapDispatchToProps)(FilterNavigation);