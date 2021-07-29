import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row } from 'react-bootstrap';
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
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);

        const fromDate = new Date(DateTimeService.toShortDateFormat(new Date()));
        const toDate = new Date(DateTimeService.toShortDateFormat(new Date(nextDay)));      
        return{
            userName: '',
            isGuest: 0,
            fromDate,
            toDate,
            mainCategoryId: 0,
            subCategoryId: 0,
            communicationId: 1005,
            responseId: 10002,
            isReviewed: 0,
        };
    };

    handleChangeFromDate = (setFieldValue, fromDate, toDate) => {
        setFieldValue('fromDate', fromDate);

        if (moment(fromDate).isAfter(moment(toDate))) {
            toDate = new Date(DateTimeService.toShortDateFormat(new Date(fromDate)));
            toDate.setMinutes(toDate.getMinutes() + 1);

            setFieldValue('toDate', toDate);
        };
    };

    handleChangeToDate = (setFieldValue, fromDate, toDate) => {
        setFieldValue('toDate', toDate);

        if (moment(fromDate).isAfter(moment(toDate))) {
            fromDate = new Date(DateTimeService.toShortDateFormat(new Date(toDate)));
            fromDate.setMinutes(fromDate.getMinutes() - 1);

            setFieldValue('fromDate', fromDate);
        };
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
        }
        this.props.getGridParams(params);
        this.props.getDeletedFeedback(params);
    };

    filterMainCategory = data => {
        const mainCategories = [];
        data.mainCategory.map(value => {            
            const filter = data.subCategory.filter(item => item.mainCategoryID === value.mainCategoryID);
            filter.unshift({name: "All", subCategoryId: 0});
            mainCategories.push({
                mainCategoryID: value.mainCategoryID, 
                name: value.name, 
                subCate: filter
            });            
        });
        mainCategories.unshift({mainCategoryID: 0, name: "All", subCate: [{name: "All", subCategoryId: 0}]});

        return mainCategories;
    };

    filterSubCategory = (mainCate,values) =>{
        const subCategories = mainCate.filter(item => item.mainCategoryID === values.mainCategoryId);
        return subCategories;
    };
 
    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
    }) => {       
        const data = this.props.settings;
        const mainCategories = this.filterMainCategory(data);
        const subCategories = this.filterSubCategory(mainCategories,values);

        const review = [
            { settingValue: "All", settingId: 0 },
            { settingValue: "Review", settingId: 1 },
            { settingValue: "Not Reviewd", settingId: -1 }
        ]
        return (
            <Form onSubmit={handleSubmit} className="form-filter">
                <div className="panel-content">
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control type="text" size="sm" 
                                name="userName"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isGuest"
                                onChange={value => setFieldValue('isGuest', parseInt(value.target.value))}
                            >
                                {
                                    data.customerType.map((value,key) => this.renderOptions(value.settingValue,value.settingId,key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('From Date')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper">
                            <DatePicker isInvalid={touched.fromDate && errors.fromDate}
                                selected={values.fromDate}
                                timeInputLabel="Time:"
                                dateFormat="MMM dd, yyyy"
                                showTimeInput
                                onChange={value => this.handleChangeFromDate(setFieldValue, value, values.fromDate)}
                            />
                        </Col>

                        <Form.Label column sm="1" md="1">
                            {LangHelper.getResource('To Date')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper">
                            <DatePicker
                                selected={values.toDate}
                                timeInputLabel="Time:"
                                dateFormat="MMM dd, yyyy"
                                showTimeInput
                                onChange={value => this.handleChangeToDate(setFieldValue, values.fromDate, value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Main Category')}
                        </Form.Label>
                        <Col sm="4" md="4">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="mainCategoryId"
                                onChange={value => setFieldValue('mainCategoryId', parseInt(value.target.value))}
                            >
                                {
                                    mainCategories.map((value,key) => this.renderOptions(value.name, value.mainCategoryID, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('SubCategory')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="subCategoryId"
                                onChange={value => setFieldValue('subCategoryId', parseInt(value.target.value))}
                            >
                                {
                                    subCategories[0].subCate.map((value,key) => this.renderOptions(value.name, value.subCategoryId, key))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Communication')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-title">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="communicationId"
                                onChange={value => setFieldValue('communicationId', parseInt(value.target.value))}
                            >
                                {
                                    data.communication.map((value,key) => this.renderOptions(value.name, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Customer Response')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-res">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="responseId"
                                onChange={value => setFieldValue('responseId', parseInt(value.target.value))}
                            >
                                {
                                    data.customerResponse.map((value,key) => this.renderOptions(value.value, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Is Reviewed')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isReviewed"
                                onChange={value => setFieldValue('isReviewed', parseInt(value.target.value))}
                            >
                                {
                                    review.map((value,key) => this.renderOptions(value.settingValue, value.settingId, key))
                                }
                            </Form.Control>
                        </Col>

                        <Col sm="2" md="2">
                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </Col>

                    </Form.Group>
                </div>       
            </Form>
        );
    };

    render() {
        const { settings } = this.props;
        if (settings === null || this.initialValues === null) {
            return null;
        }
        return (
            <>
                <Formik
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings } = state;
    return { gridParams, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
