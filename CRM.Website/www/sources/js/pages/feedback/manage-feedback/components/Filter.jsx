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
        this.initialValues = this.initFormData();
    }

    initFormData = () => {
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const fromDate = new Date(DateTimeService.toShortDateFormat(new Date()));
        const toDate = new Date(DateTimeService.toShortDateFormat(new Date(nextDay)));      
        return {
            username: '',
            isGuest: 0,
            fromDate,
            toDate,
            mainCategoryId: 0,
            subCategoryId: 0,
            communicationId: 1005,
            responseId: 10002,
            isReviewed: 0
        };
    }

    handleChangeFromDate = (setFieldValue, fromDate, toDate) => {
        setFieldValue('fromDate', fromDate);
        if (moment(fromDate).isAfter(moment(toDate))) {
            toDate = new Date(DateTimeService.toShortDateFormat(new Date(fromDate)));
            toDate.setMinutes(toDate.getMinutes() + 1);
            setFieldValue('toDate', toDate);
        }
    };

    handleChangeToDate = (setFieldValue, fromDate, toDate) => {
        setFieldValue('toDate', toDate);
        if (moment(fromDate).isAfter(moment(toDate))) {
            fromDate = new Date(DateTimeService.toShortDateFormat(new Date(toDate)));
            fromDate.setMinutes(fromDate.getMinutes() - 1);
            setFieldValue('fromDate', fromDate);
        }
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = {
            userName: values.userName,
            isGuest: values.isGuest > 0 ? 1 : 0,
            fromDate: DateTimeService.toShortDateFormat(values.fromDate),
            toDate: DateTimeService.toShortDateFormat(values.toDate),
            mainCategoryId: values.mainCategoryId > 0 ? values.mainCategoryId : null,
            subCategoryId: values.subCategoryId,
            communicationId: values.communicationId,
            responseId: values.responseId,
            isReviewed: values.isReviewed === 1 ? 1 : 0
        };

        this.props.getGridParams(params);
        this.props.getDeletedFeedback(params);
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
 
    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
    }) => {       
        const {customerTypes, responses , mainCategories, subCategories, communications, statuses, reviews} = this.props.settings;
        const mainCategoryOptions = this.filterCategories(mainCategories, subCategories);
        const subCategoryOptions = this.filterSubCategories(mainCategoryOptions, values.mainCategoryId);
        
        return (
            <Form className='form-filter' onSubmit={e => this.submitHandler(e)}>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="runningNumber">{LangHelper.getResource('RunningNumber')}</Form.Label>
                    <Form.Control type="text" size="sm" value={values.runningNumber}
                        name="runningNumber" id="runningNumber"
                        className="shadow-none" autoComplete="off"
                        isInvalid={touched.runningNumber && errors.runningNumber}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='sm-width'>
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            selected={values.fromDate}
                            onChange={value => this.handleChangeFromDate(setFieldValue, value, values.fromDate)}
                        />
                        </div>
                </Form.Group>
                <Form.Group className='sm-width'>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            selected={values.toDate}
                            onChange={value => this.handleChangeToDate(setFieldValue, value, values.toDate)}    
                        />
                        </div>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="username">{LangHelper.getResource('Username')}</Form.Label>
                    <Form.Control type="text" size="sm" value={values.username}
                        name="username" id = "username"
                        className="shadow-none username-width" autoComplete="off"
                        isInvalid={touched.username && errors.username}
                        onChange={handleChange}
                    />
                    <Form.Control as="select" size="sm"
                        name="responseId" className="shadow-none response-width"
                        onChange={value => setFieldValue('responseId', parseInt(value.target.value))}
                    >
                    {
                        customerTypes.map((value,key) => this.renderOptions(value.value, value.id, key))
                    }
                     </Form.Control>
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="isReviewed">{LangHelper.getResource('IsReviewed')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="isReviewed" id = "isReviewed"
                        className='select-options'
                        onChange={handleChange}
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
                        onChange={handleChange}
                    >
                    {
                        responses.map((value,key) => this.renderOptions(value.value, value.id, key))
                    }
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="mainCategoryId" id = "mainCategoryId"
                        onChange={handleChange}
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
                        onChange={value => setFieldValue('subCategoryId', parseInt(value.target.value))}
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
                        onChange={handleChange}
                    >
                        {
                            communications.map((value,key) => this.renderOptions(value.name, value.id, key))
                        }
                    </Form.Control>
                    <Form.Label className="label-status" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="statusId" id="statusId"
                            className='select-options-sm'
                            onChange={value => setFieldValue('statusId', parseInt(value.target.value))}
                        >
                        {
                            statuses.map((value,key) => this.renderOptions(value.value, value.id, key))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                    <Form.Control type="text" size="sm" value={values.handler}
                        name="isReviewed" autoComplete="off"
                        className="shadow-none select-options"
                        isInvalid={touched.handler && errors.handler}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='sm-width'>
                    <Form.Label htmlFor="handler">{LangHelper.getResource('Reviewer')}</Form.Label>
                    <Form.Control type="text" size="sm" value={values.reviewer}
                        name="reviewer" autoComplete="off"
                        className="shadow-none select-options"
                        isInvalid={touched.reviewer && errors.reviewer}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit" variant="primary" size="sm">
                        {LangHelper.getResource('Save')}
                    </Button>
                </Form.Group>
            </Form.Row>
            </Form>
        );
    }

    render() {
        const { settings } = this.props;
        if (settings === null || this.initialValues === null) {
            return null;
        }
        return (
            <Formik
                initialValues={this.initialValues}
                onSubmit={this.handleSubmit}
            >
                    {this.renderForm}
            </Formik>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
