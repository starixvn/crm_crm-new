import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Formik } from 'formik';
import moment from 'moment';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const fromDate = new Date(DateTimeService.toShortDateFormat(new Date()));
        const toDate = new Date(DateTimeService.toShortDateFormat(new Date(nextDay)));    
        this.state = {
            runningNumber: '',
            fromDate: fromDate,
            toDate: toDate,
            username: '',
            handler: '',
            mainCategoryId: 0,
            subCategoryId: 0,
            communicationId: 1005,
            reviewer: '',
            statusId: 0,
            responseId: 0,
            isReviewed: 0,
            isGuest: 0
        };
    }

    handleChangeFromDate = (fromDate, toDate) => {
        this.setState({fromDate});
        if (moment(fromDate).isAfter(moment(toDate))) {
            toDate = new Date(DateTimeService.toShortDateFormat(new Date(fromDate)));
            toDate.setMinutes(toDate.getMinutes() + 1);
            this.setState(toDate);
        }
    };

    handleChangeToDate = (fromDate, toDate) => {
        this.setState({toDate});
        if (moment(fromDate).isAfter(moment(toDate))) {
            fromDate = new Date(DateTimeService.toShortDateFormat(new Date(toDate)));
            fromDate.setMinutes(fromDate.getMinutes() - 1);
            this.setState({fromDate});
        }
    };

    handleChange = evt => {
        const value = evt.target.value;
        this.setState({
          ...this.state,
          [evt.target.name]: value
        });
      }

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const  {mainCategoryId, runningNumber, fromDate, toDate, username, handler, subCategoryId, communicationId,
                    reviewer, statusId, responseId, isReviewed, isGuest} = this.state; 
        const params = {
            FeedbackId: runningNumber !== '' ? runningNumber : null,
            UserName: username,
            IsGuest: isGuest > 0 ? 1 : 0,
            FromDate: DateTimeService.toShortDateFormat(fromDate),
            ToDate: DateTimeService.toShortDateFormat(toDate),
            MainCategoryId: mainCategoryId,
            subCategoryId: subCategoryId,
            CommunicationId: communicationId,
            StatusId: statusId,
            ResponseId: responseId,
            IsReviewed: isReviewed,
            HandledBy: handler,
            Reviewer: reviewer,
            ItemsPerPage: 1,
            PageSize: 100
        };

        this.props.setGridParams(params);
        this.props.getGridFeedbacks(params);
    }

    filterCategories = (mainCategories, subCategories) => {
        const mainCategoriesArr = [];
        mainCategories.map(value => {
            const subCategoriesFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
            subCategoriesFilter.unshift({name: 'All', subCategoryId: 0});
            mainCategoriesArr.push({
                mainCategoryID: value.mainCategoryID,
                name: value.name,
                subCate: subCategoriesFilter
            });
        });
        mainCategoriesArr.unshift({mainCategoryID: 0, name: 'All', subCate: [{name: 'All', subCategoryId: 0}]});
        return mainCategoriesArr;
    };

    filterSubCategories = (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10));


    render() {
        const { settings } = this.props;
        if (settings === null || this.initialValues === null) {
            return null;
        }

        const reviews = [
            { settingValue: 'All', settingId: 0 },
            { settingValue: 'Review', settingId: 1 },
            { settingValue: 'Not Reviewed', settingId: -1 }
        ];

        const  {mainCategoryId, runningNumber, fromDate, toDate, username, handler, subCategoryId, communicationId,
                reviewer, statusId, responseId, isReviewed, isGuest} = this.state;
        const {customerTypes, responses , mainCategories, subCategories, communications, statuses} = this.props.settings;
        const responsesOptions = [{ id: 0, value: 'All'}, ...responses];
        const statusesOptions= [{statusId: 0, name: 'All'}, ...statuses ];
        const mainCategoryOptions = this.filterCategories(mainCategories, subCategories);
        const subCategoryOptions = this.filterSubCategories(mainCategoryOptions, mainCategoryId);

        return (
            <Form className='form-filter' onSubmit={e => this.submitHandler(e)}>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="runningNumber">{LangHelper.getResource('RunningNumber')}</Form.Label>
                    <Form.Control type="text" size="sm"
                        value={runningNumber}
                        name="runningNumber" id="runningNumber"
                        className="shadow-none" autoComplete="off"
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group className='sm-width'>
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            selected={fromDate}
                            onChange={value => this.handleChangeFromDate(value, toDate)}
                        />
                        </div>
                </Form.Group>
                <Form.Group className='sm-width'>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            selected={toDate}
                            onChange={value => this.handleChangeToDate(fromDate, value)}    
                        />
                        </div>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="username">{LangHelper.getResource('Username')}</Form.Label>
                    <Form.Control type="text" size="sm" 
                        value={username}
                        name="username" id = "username"
                        className="shadow-none username-width" autoComplete="off"
                        onChange={this.handleChange}
                    />
                    <Form.Control as="select" size="sm"
                        name="isGuest" id = "isGuest"
                        className="shadow-none response-width"
                        value={isGuest}
                        onChange={this.handleChange}
                    >
                    {
                        customerTypes.map((value,key) => this.renderOptions(value.settingValue, value.settingId, key))
                    }
                     </Form.Control>
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="isReviewed">{LangHelper.getResource('IsReviewed')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="isReviewed" id = "isReviewed"
                        className='select-options'
                        value={isReviewed}
                        onChange={this.handleChange}
                    >
                    {
                        reviews.map((value,key) => this.renderOptions(value.settingValue, value.settingId, key))
                    }
                    </Form.Control>
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="responseId">{LangHelper.getResource('CustomerResponse')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="responseId" id = "responseId"
                        className='select-options'
                        value={responseId}
                        onChange={this.handleChange}
                    >
                    {
                        responsesOptions.map((value,key) => this.renderOptions(value.value, value.id, key))
                    }
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="mainCategoryId" id = "mainCategoryId"
                        value={mainCategoryId}
                        onChange={this.handleChange}
                    >
                        {
                            mainCategoryOptions.map((value,key) => this.renderOptions(value.name, value.mainCategoryID, key))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group className='subCategory-width'>
                    <Form.Label htmlFor="subCategoryId">{LangHelper.getResource('SubCategory')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="subCategoryId"
                        value={subCategoryId}
                        onChange={this.handleChange}
                    >
                        {
                            subCategoryOptions[0].subCate.map((value,key) => this.renderOptions(value.name, value.subCategoryId, key))
                        }
                </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="communicationId">{LangHelper.getResource('Communication')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="communicationId" id="communicationId"
                        className='select-options-sm mr-2'
                        value={communicationId}
                        onChange={this.handleChange}
                    >
                        {
                            communications.map((value,key) => this.renderOptions(value.name, value.id, key))
                        }
                    </Form.Control>
                    <Form.Label className="label-status" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="statusId" id="statusId"
                            className='select-options-sm'
                            value={statusId}
                            onChange={this.handleChange}
                        >
                        {
                            statusesOptions.map((value,key) => this.renderOptions(value.name, value.statusId, key))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                    <Form.Control type="text" size="sm" value={handler}
                        name="handler" 
                        autoComplete="off"
                        className="shadow-none select-options"
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="reviewer">{LangHelper.getResource('Reviewer')}</Form.Label>
                    <Form.Control type="text" size="sm" value={reviewer}
                        name="reviewer" autoComplete="off"
                        className="shadow-none select-options"
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                        {LangHelper.getResource('Save')}
                    </Button>
                </Form.Group>
            </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
