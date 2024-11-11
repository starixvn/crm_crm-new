import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ActionCreators } from '../actions/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { handleNewResendOptions } from '../functions';
import Select from '@jsroot/components/CustomReactSelect';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';
import { BotServices }from '@jsroot/common/constants';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const now = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));

        this.state = {
            filter: {
                notificationTypes: '',
                statuses: '',
                fromDate: now,
                toDate: now,
                headline: null,
                recipient: null,
                notificationIdLower: '',
                notificationIdUpper: '',
                content: '',
                announcementId: this.props.announcementId || null,
                messageId: null,
                botService: null
            },
            maxDate: now,
            notificationTypeOptions: [],
            statusOptions: [],
            showFilter: false
            
        };
    }

    componentDidMount() {
        this.props.getSettings().then(() => {
            // notification type
            const notificationTypeIds = [];
            const notificationTypeOptions = this.props.settings.notificationTypes?.map(x => {
                notificationTypeIds.push(x.notificationTypeId);
                return {
                    id: x.notificationTypeId,
                    name: x.notificationTypeName,
                    checked: true
                };
            });

            // status
            const statusOptions = this.props.settings.statuses?.map(x => {
                return {
                    id: x,
                    name: LangHelper.getResource(x),
                    checked: true
                };
            });

            this.setState(prevState => ({
                notificationTypeOptions,
                statusOptions,
                filter: {
                    ...prevState.filter,
                    notificationTypes: notificationTypeIds?.toString(),
                    statuses: this.props.settings.statuses?.toString()
                }
            }), ()=>{
                if(this.props.announcementId){
                    const btn = document.getElementById('btn-submit-notification');
                    btn.click();
                }
            });
        });
    }

    handleFilterChange = (name, value) =>
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }));

    handleFilterChangeProps = (name, value) => {
        this.setNotShouldResetScrollPosition();
        this.props.setGridParams({
            ...this.props.gridParams,
            [name]: value
        });
    };

    handleNotificationTypeChange = (currentItem, selectedItemsKey) => {
        this.handleFilterChange('notificationTypes', selectedItemsKey);
        this.handleFilterChangeProps('notificationTypeIds', selectedItemsKey);
    };

    handleSetStartDate = value => this.handleFilterChange('fromDate', value);
    handleSetEndDate = value => this.handleFilterChange('toDate', value);
    handleFromDateChange = value => {
        this.handleFilterChange('fromDate', value);
        this.handleFilterChangeProps('fromDate', DateTimeService.startOfDay(value));
    };

    handleToDateChange = value => {
        this.handleFilterChange('toDate', value);
        this.handleFilterChangeProps('toDate', DateTimeService.startOfDay(value));
    };

    handleDateChange = (dates) => {
        const [start, end] = dates;
        this.handleFromDateChange(start);
        this.handleToDateChange(end);
      };
   
    handleHeadlineChange = value => {
        this.handleFilterChange('headline', value);
        this.handleFilterChangeProps('headline', value ? value.value : '');
    };

    handleRecipientChange = value => {
        this.handleFilterChange('recipient', value);
        this.handleFilterChangeProps('recipientName', value ? value.value : '');
    };

    handleStatusChange = (currentItem, selectedItemsKey) => {
        this.handleFilterChange('statuses', selectedItemsKey);
        this.handleFilterChangeProps('status', selectedItemsKey);
        const statusOptions = this.state.statusOptions.map(status => {
            return {
                ...status, checked: selectedItemsKey.includes(status.id) ? true : false
            }
        });
        this.setState({statusOptions});
    };

    handleChangeFilterControl = e => {
        if (e.target.validity.valid) {
            this.handleFilterChange(e.target.name, e.target.value);
            this.handleFilterChangeProps(e.target.name, e.target.value);
        }
    };

    handleChange = e => {
        this.handleFilterChange(e.target.name, e.target.value);
        this.handleFilterChangeProps(e.target.name, e.target.value);
    };

    handlePasteId = event =>{
        if (event.clipboardData.getData('Text').match(/[^\d]/)) {
            event.preventDefault();
        }
    };

    handleToggleFilter = isToggle => {
        this.setState({ showFilter: isToggle });
        window.dispatchEvent(new Event('resize'));
        if(isToggle){
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    };

    getParams = () => {
        const {notificationTypes, fromDate, toDate, headline, recipient, statuses,
            notificationIdLower, notificationIdUpper, content, announcementId, messageId, botService }= this.state.filter;
        return {
            channelId: botService === '0' ? null : parseInt(botService, 10),
            notificationTypeIds: notificationTypes,
            fromDate: (announcementId || messageId) ? null : DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(fromDate)),
            toDate: (announcementId || messageId) ? null : DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(toDate)),
            headline: headline ? headline.value : '',
            recipientName: recipient ? recipient.value : '',
            notificationIdLower: notificationIdLower,
            notificationIdUpper: notificationIdUpper,
            content: content,
            status: statuses,
            announcementId: parseInt(announcementId, 10),
            messageId: parseInt(messageId, 10),
            pageIndex: this.props.gridParams.pageIndex,
            pageSize: this.props.gridParams.pageSize
        };
    };

    setNotShouldResetScrollPosition = () =>
        this.props.setResendOptions({
            shouldResetScrollPosition: false,
            ...this.props.resendOptions
        });

    submitHandler = e => {
        e.preventDefault();
        this.props.setInvalidParams({});
        const params = this.getParams();
        params.pageIndex = 1;
        if (this.isValidateParams(params)) {
            this.props.setGridParams(params);
            this.props.getGridData({ ...params }, data => handleNewResendOptions(data, this.props.setResendOptions));
            this.props.setAutoRefresh({
                ...this.props.autoRefresh,
                isSubmit: true,
                countDown: this.props.autoRefresh.value
            });
        }
    };

    isDisabledDateParam = () =>
        this.state.filter.notificationIdLower !== '' || this.state.filter.notificationIdUpper !== '' || this.state.filter.messageId|| this.state.filter.announcementId;

    isValidateParams = params => {
        if (params.notificationTypeIds === '') {
            toast.error(`${LangHelper.getResource('PleaseChoose')} a ${LangHelper.getResource('NotificationType')}`);
            return false;
        }

        if (params.notificationIdLower !== '' && params.notificationIdUpper === '') {
            this.props.setInvalidParams({ isInvalidNotificationIdUpper: true });
            toast.error(`${LangHelper.getResource('NotificationIDMustHaveBoth')}`);
            return false;
        }

        if (params.notificationIdUpper !== '' && params.notificationIdLower === '') {
            this.props.setInvalidParams({ isInvalidNotificationIdLower: true });
            toast.error(`${LangHelper.getResource('NotificationIDMustHaveBoth')}`);
            return false;
        }

        if (parseInt(params.notificationIdLower, 10) > parseInt(params.notificationIdUpper, 10)) {
            toast.error(`${LangHelper.getResource('NotificationIDFromNotGreaterThanTo')}`);
            return false;
        }

        if (params.status === '') {
            toast.error(`${LangHelper.getResource('PleaseChoose')} a ${LangHelper.getResource('Status')}`);
            return false;
        }

        if(!this.state.filter.fromDate || !this.state.filter.toDate){
            toast.error("Invalid range date");
            return false;
        }


        return true;
    };

    debounceHandleHeadlineInputChange = Site.debounce(searchText => {
        if (searchText.length >= 2) {
            this.props.getHeadlineOptions(searchText);
        } else {
            this.props.setHeadlineOptions([]);
        }
    });

    debounceHandleRecipientInputChange = Site.debounce(searchText => {
        if (searchText.length >= 2) {
            this.props.getRecipientOptions(searchText);
        } else {
            this.props.setRecipientOptions([]);
        }
    });

    render() {
        return (
            <Form className={`form-filter-v2 ${this.state.showFilter ? 'show-filter' : ''}`} onSubmit={e => this.submitHandler(e)}>
                <Form.Row bsPrefix='form-row' className={this.state.showFilter ? '' : 'form-row-filter'}>
                    <Form.Group >
                        <Form.Label>{LangHelper.getResource('BotService')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" name='botService'
                            value={this.state.filter.botService}
                            onChange={e => this.handleChangeFilterControl(e)}
                        >
                            {BotServices.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('NotificationType')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                id='notification-type'
                                dataSource={this.state.notificationTypeOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSubmited={false}
                                isAllTextShown
                                onChange={(currentItem, selectedItemsKey) => this.handleNotificationTypeChange(currentItem, selectedItemsKey)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Date')}</Form.Label>
                        <div className='react-datepicker-wrapper-container form-control-wrapper'>
                            <DatePicker disabled={this.isDisabledDateParam()}
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                selected={this.state.filter.fromDate}
                                onChangeDate={dates => this.handleDateChange(dates)}
                                startDate={this.state.filter.fromDate}
                                endDate={this.state.filter.toDate}
                                maxDate={this.state.maxDate}
                                maxDateRange={31}
                                selectsRange
                                isRangeDate
                            />
                        </div>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('GroupHeadline')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <Select
                                placeholder=' '
                                isClearable
                                noOptionsMessage={() => 'No results found'}
                                onChange={value => this.handleHeadlineChange(value)}
                                options={this.props.headlineOptions}
                                onInputChange={searchText => this.debounceHandleHeadlineInputChange(searchText)}
                                value={this.state.filter.headline}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Recipient')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <Select
                                placeholder=' '
                                isClearable
                                noOptionsMessage={() => 'No results found'}
                                onChange={value => this.handleRecipientChange(value)}
                                options={this.props.recipientOptions}
                                onInputChange={searchText => this.debounceHandleRecipientInputChange(searchText)}
                                value={this.state.filter.recipient}
                            />
                        </div>
                    </Form.Group>
                    {
                        !this.state.showFilter &&
                        <Form.Group>
                            <div className='btn-submit'>
                                <Button variant='primary' id='btn-submit-notification' size='sm' type='submit'>
                                    {LangHelper.getResource('Submit')}
                                </Button>
                            </div>
                        </Form.Group>
                    }
                </Form.Row>
                {
                    this.state.showFilter &&
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('NotificationID')}</Form.Label>
                            <div className='form-control-wrapper d-flex align-items-center notification-id-container'>
                                <Form.Control
                                    className={`shadow-none ${this.props.invalidParams.isInvalidNotificationIdLower ?
                                        'invalid-input' : 'valid-input'} notification-id-input`}
                                    as='input' type='text' pattern='[0-9]*' size='sm'
                                    name='notificationIdLower'
                                    placeholder='From'
                                    value={this.state.filter.notificationIdLower}
                                    onChange={e => this.handleChangeFilterControl(e)}
                                />
                                <div className='notification-concate text-center'>-</div>
                                <Form.Control
                                    className={`shadow-none ${this.props.invalidParams.isInvalidNotificationIdUpper ?
                                        'invalid-input' : 'valid-input'} notification-id-input`}
                                    as='input' type='text' pattern='[0-9]*' size='sm'
                                    name='notificationIdUpper'
                                    placeholder='To'
                                    value={this.state.filter.notificationIdUpper}
                                    onChange={e => this.handleChangeFilterControl(e)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('AnnouncementId')}</Form.Label>
                            <Form.Control as='input' type='text' pattern='[0-9]*' size='sm' className='shadow-none announcementId' name='announcementId'
                                value={this.state.filter.announcementId}
                                onChange={e => this.handleChangeFilterControl(e)}
                                onPaste={this.handlePasteId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('MessageID')}</Form.Label>
                            <Form.Control as='input' type='text' pattern='[0-9]*' size='sm' className='shadow-none messageId' name='messageId'
                                value={this.state.filter.messageId}
                                onChange={e => this.handleChangeFilterControl(e)}
                                onPaste={this.handlePasteId}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('Content')}</Form.Label>
                            <Form.Control as='input' type='text' size='sm' className='shadow-none' name='content'
                                value={this.state.filter.content}
                                autoComplete='off'
                                onChange={e => this.handleChange(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('Status')}</Form.Label>
                            <div className='form-control-wrapper'>
                                <MultipleSelect
                                    dataSource={this.state.statusOptions}
                                    keyField='id'
                                    valueField='name'
                                    statusField='checked'
                                    isSubmited={false}
                                    isAllTextShown
                                    onChange={(currentItem, selectedItemsKey) => this.handleStatusChange(currentItem, selectedItemsKey)}
                                />
                            </div>
                        </Form.Group>
                        {
                            this.state.showFilter &&
                            <Form.Group>
                                <div className='btn-submit'>
                                    <Button variant='primary' id='btn-submit-notification' size='sm' type='submit'>
                                        {LangHelper.getResource('Submit')}
                                    </Button>
                                </div>
                            </Form.Group>
                        }
                    </Form.Row>
                }
                {
                    this.state.showFilter
                        ? <span className="fa fa-caret-up icon-toggle fa-sm" onClick={() => this.handleToggleFilter(false)} />
                        : <span className="fa fa-caret-down icon-toggle fa-sm" onClick={() => this.handleToggleFilter(true)} />
                }
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        invalidParams,
        settings,
        headlineOptions,
        recipientOptions,
        autoRefresh,
        resendOptions
    } = state;

    return {
        gridParams,
        invalidParams,
        settings,
        headlineOptions,
        recipientOptions,
        autoRefresh,
        resendOptions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);