import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { renderTitleOptions, validateFormik } from '../common.functions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGrid extends Component {
    static propTypes = {
        feedbackSubjectTemplateByPagingIndex: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        feedbackSubjectTemplateByPagingIndex:[]
    };

    constructor(props) {
        super(props);
        const now = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            birthDay: now,
            maxDate: now
        }
    }

    handleToDateChange = value => {
        this.setState({birthDay: value});
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const titleOptions = [{title: 'Mr'},{title: 'Mrs'}];
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                {
                    this.props.createTemplateResult &&
                    <ResponseMessage isSuccessful={this.props.createTemplateResult.isSuccessful}
                        message={this.props.createTemplateResult.message || LangHelper.getResource('InsertNotificationTemplateSuccessfully')}
                    />
                }
                <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="5" md="5"
                            className="required" htmlFor="identityInformation"
                        >
                            {LangHelper.getResource('IdentityInformation')}
                        </Form.Label>
                        <Col sm="7" md="7">
                            <Form.Control type="text" size="sm" value={values.identityInformation}
                                name="identityInformation" id="identityInformation"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.identityInformation && errors.identityInformation}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                 </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="title"
                        >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="title" id="title"
                                value={values.title}
                                onChange={handleChange}
                            >
                                <option value="" hidden disabled>Mr</option>
                                {titleOptions.map(renderTitleOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="firstName"
                        >
                            {LangHelper.getResource('FirstName')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.firstName}
                                name="firstName" id="firstName"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="lastName"
                        >
                            {LangHelper.getResource('LastName')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.lastName}
                                name="lastName" id="lastName"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
                <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="birthDay"
                        >
                            {LangHelper.getResource('BirthDay')}
                        </Form.Label>
                        <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    selected={this.state.birthDay}
                                    maxDate={this.state.maxDate}
                                    onChange={value => this.handleToDateChange(value)}
                                />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="passportNo"
                        >
                            {LangHelper.getResource('PassportNo')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.passportNo}
                                name="passportNo" id="passportNo"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="licenseeType"
                        >
                            {LangHelper.getResource('LicenseeType')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.licenseeType}
                                name="licenseeType" id="licenseeType"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        
    };

    render() {
        const initialValues = {
            identityInformation: '',
            title: '',
            firstName: '',
            lastName : '',
            passportNo: '',
            licenseeType: ''
        };

        return (
                <Formik
                    initialValues={initialValues}
                    validate={values => validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { feedbackSubjectTemplateByPagingIndex, settings, addFeedbackResult } = state;
    return {
        feedbackSubjectTemplateByPagingIndex,
        settings,
        addFeedbackResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);