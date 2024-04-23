import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { statusOptionOST, statusOptionCSD, isEitherExitsFromToId, isFromIdOverToId } from '../common.functions';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

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
                isIncludeTestData: false
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
                    isIncludeTestData: filterParams.isIncludeTestData ?? this.state.isIncludeTestData
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
        console.log('start', start);
        console.log('end', end);
        this.handleFilterChange('fromDate', start);
        this.handleFilterChange('toDate', end);
    };

    handleChangeNotificationType = () => {
        document.getElementById("notificationId").value = null;
        document.getElementById("fromNotificationId").value = null;
        document.getElementById("toNotificationId").value = null;

        this.setState(prevState => ({
            filter: {...prevState.filter, notificationId: null, fromNotificationId: null, toNotificationId: null},
            isCompareIdEqual: !prevState.isCompareIdEqual
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
                isIncludeTestData: !prevState.filter.isIncludeTestData
            }
        }), () => this.props.setGridParams(this.getParams()));
    };

    isValidParams = () => {
        const errMsg = [];
        let isValid = true;
        const { filter, isCompareIdEqual } = this.state;

        if (!isCompareIdEqual) {
            if (isEitherExitsFromToId(filter)) {
                isValid = false;
                errMsg.push(LangHelper.getResource('Please input the both From and To of Notification ID'));
            }

            if (isFromIdOverToId(filter)) {
                isValid = false;
                errMsg.push(LangHelper.getResource('The To value cannot be greater than From value'));
            }
        }

        return { isValid, errMsg };
    };

    handleChangeNotificationFromTo = (name, value) => {
        this.handleFilterChange(name, value);
        this.setState({ isValidNotification: false });
    };

    isDisabledField = () => {
        const { notificationId, fromNotificationId, toNotificationId } = this.state.filter;
        return notificationId || fromNotificationId || toNotificationId;
    };

    getParams = () => {
        const { fromDate, toDate, matchId, notificationId, fromNotificationId, toNotificationId,
            messageId, content, statuses, sender, isIncludeTestData } = this.state.filter;
        const { isCompareIdEqual, isOstUser } = this.state;

        return {
            fromDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(fromDate)),
            toDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(toDate)),
            matchId, messageId, content, statuses, sender,
            isIncludeTestData, isOstUser, isCompareIdEqual,
            notificationId: isCompareIdEqual ? notificationId : null,
            fromNotificationId: !isCompareIdEqual ? fromNotificationId : null,
            toNotificationId: !isCompareIdEqual ? toNotificationId : null,
            pageIndex: this.props.gridParams.pageIndex,
            pageSize: this.props.gridParams.pageSize
        };
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.isValidParams().isValid) {
            this.isValidParams().errMsg.forEach(item => {
                toast.error(item);
                this.setState({ isValidNotification: true });
            });
        } else {
            const params = this.getParams();
            console.log('params', params);
            this.props.setGridParams(params);
            this.props.getGridData(params);
        }
    };

    handleChangeUser = id => {
        this.setState({
            filter: { ...this.state.filter, statuses: id === 0 ? statusOptionOST.map(x=> x.name).join(','): statusOptionCSD.map(x=> x.name).join(',')},
            statusOptions: id === 0 ? statusOptionOST : statusOptionCSD,
            isOstUser: id === 0
        }, () => this.props.setGridParams(this.getParams()));
    };

    render() {
        // console.log('state', this.state);
        // console.log('params', this.props.gridParams);

        const classIsInvalidFromTo = this.state.isValidNotification ? 'is-invalid' : '';
        return (
            <>
                <div className='user-filter'>
                    <div
                        className={`user ${this.state.isOstUser ? 'locked-user': ''}`}
                        onClick={() => this.handleChangeUser(0)}
                    >
                        {LangHelper.getResource('OST')}
                    </div>
                    <div
                        className={`user ${!this.state.isOstUser ? 'locked-user': ''}`}
                        style={{'borderLeftWidth': '0px'}}
                        onClick={() => this.handleChangeUser(1)}
                    >
                        {LangHelper.getResource('LicenseeCSD')}
                    </div>
                </div>
                <Form className='form-filter' onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group style={{width: '350px'}}>
                            <Form.Label style={{width: '176px'}} htmlFor="created-date">{LangHelper.getResource('CreatedDateGM8')}</Form.Label>
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
                                    maxDateRange={31}
                                    selectsRange
                                    isRangeDate
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="MatchID">{LangHelper.getResource('Match ID')}</Form.Label>
                            <Form.Control type="text" size="sm" as='input' pattern='[0-9]*'
                                value={this.state.filter.matchId}
                                name="matchId" id="matchId"
                                className="shadow-none"
                                disabled={this.isDisabledField()}
                                onChange={e => this.handleFilterChange('matchId', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{width: '375px'}}>
                            <Form.Label>{LangHelper.getResource('NotificationID')}</Form.Label>
                            <div className='form-control-wrapper d-flex align-items-center notification-id-container'>
                                <Form.Control as="select" size="sm" className="shadow-none notification-id-input" name='notification'
                                    value={this.state.isCompareIdEqual ? this.notificationTypes[0].id : this.notificationTypes[1].id}
                                    onChange={this.handleChangeNotificationType}
                                >
                                    {this.notificationTypes.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                                </Form.Control>
                                <div style={{display: 'contents'}} hidden={this.state.isCompareIdEqual}>
                                    <Form.Control
                                        className={`shadow-none valid-input ml-2 notification-id-input ${classIsInvalidFromTo}`}
                                        as='input' type='text' pattern='[0-9]*' size='sm'
                                        name='fromNotificationId' id='fromNotificationId'
                                        placeholder='From'
                                        value={this.state.filter.fromNotificationId}
                                        onChange={e => this.handleChangeNotificationFromTo('fromNotificationId', e.target.value)}
                                    />
                                    <div className='notification-concate text-center ml-1 mr-1'>-</div>
                                    <Form.Control
                                        className={`shadow-none valid-input notification-id-input ${classIsInvalidFromTo}`}
                                        as='input' type='text' pattern='[0-9]*' size='sm'
                                        name='toNotificationId' id='toNotificationId'
                                        placeholder='To'
                                        value={this.state.filter.toNotificationId}
                                        onChange={e => this.handleChangeNotificationFromTo('toNotificationId', e.target.value)}
                                    />
                                </div>
                                <Form.Control type="text" size="sm"
                                    value={this.state.filter.notificationId}
                                    hidden={!this.state.isCompareIdEqual}
                                    name="notificationId" id="notificationId"
                                    className="shadow-none ml-2" pattern='[0-9]*'
                                    onChange={e => this.handleFilterChange('notificationId', e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('MessageID')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' pattern='[0-9]*' className='shadow-none'
                                name='messageId' id='messageId'
                                disabled={this.isDisabledField()}
                                value={this.state.filter.messageId}
                                onChange={e => this.handleFilterChange('messageId', e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row bsPrefix='form-row'>
                        <Form.Group style={{width: '350px'}}>
                            <Form.Label style={{width: '180px'}}>{LangHelper.getResource('Content')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' className='shadow-none' name='content'
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
                        <Form.Group style={{width: '375px'}}>
                            <Form.Label htmlFor="sender">{LangHelper.getResource('Sender')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' className='shadow-none' name='content'
                                value={this.state.filter.sender}
                                autoComplete='off'
                                disabled={this.isDisabledField()}
                                onChange={e => this.handleFilterChange('sender', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{justifyContent: 'space-between'}}>
                            <Form.Check type="checkbox" id="check-box-include" label={LangHelper.getResource('IncludeTestData')}
                                htmlFor="check-box-include" checked={this.state.filter.isIncludeTestData}
                                disabled={this.isDisabledField()}
                                onChange={this.handleChangeTestData}
                            />
                            <div className='btn-submit'>
                                <Button variant='primary' id='btn-submit-notification' size='sm' type='submit'>
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
    const { gridParams } = state;
    return { gridParams };
};

const FilterNavigation = WithNavigation(Filter);

export default connect(mapStateToProps, mapDispatchToProps)(FilterNavigation);