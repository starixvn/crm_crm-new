import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { renderTitleOptions, renderLicenseeTypeOptions, validateFormik } from '../common.functions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';


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
            birthDay: '',
            feedbackDate: new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toServerDateTime(new Date()))),
            resolutionTime: new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toServerDateTime(new Date()))),
            maxDate: now,
            isShowCustomerDetailOption: true,
            isShowDetailsOption: true
        };
    }

    handleToDateChange = (value, name) => {
        this.setState({[name]: value});
    }

    handleShowCustomerDetail = () =>{
        this.setState(prevState => ({
            isShowCustomerDetailOption: !prevState.isShowCustomerDetailOption
          }));
    }

    handleShowDetails = () =>{
        this.setState(prevState => ({
            isShowDetailsOption: !prevState.isShowDetailsOption
          }));
    }


    renderIdentityInformation = (values, errors, touched, handleChange) => {
        const titleOptions = [{title: 'Mr'},{title: 'Mrs'}];
        return (
        <div className="panel-group">
            <Form.Group as={Row} className='title'>
                    <Form.Label column sm="2" md="2" className="required" onClick={this.handleShowCustomerDetail}>
                        {LangHelper.getResource('IdentityInformation')}
                    </Form.Label>
                    <Col sm="2" md="2">
                        <Form.Control type="text" size="sm" value={values.identityInformation}
                            name="identityInformation" id="identityInformation"
                            className="shadow-none" autoComplete="off"
                            isInvalid={touched.identityInformation && errors.identityInformation}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm="8" md="8" />
            </Form.Group>
            <div className={`${this.state.isShowCustomerDetailOption ? '' : 'hideCustomerDetail'}`}>
            <Form.Group as={Row} className="pt-2">
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="title">
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="title" id="title"
                                value={values.title}
                                onChange={handleChange}
                            >
                                <option value="Mr" hidden disabled />
                                {titleOptions.map(renderTitleOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="firstName">
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
                        <Form.Label column sm="4" md="4" htmlFor="lastName">
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
                        <Form.Label column sm="4" md="4" htmlFor="birthDay">
                            {LangHelper.getResource('BirthDay')}
                        </Form.Label>
                        <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    selected={this.state.birthDay}
                                    maxDate={this.state.maxDate}
                                    onChange={value => this.handleToDateChange(value,'birthDay')}
                                />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="passportNo">
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
                        <Form.Label column sm="4" md="4" htmlFor="licenseeType">
                            {LangHelper.getResource('LicenseeType')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="licenseeType" id="licenseeType"
                                value={values.licenseeType}
                                onChange={handleChange}
                            >
                                <option value='' hidden disabled >{this.props.settings?.licenseeType[0]?.name}</option>
                                {this.props.settings.licenseeType.map(renderLicenseeTypeOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            <div className="separate">
                    <hr />
            </div>
            <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="phone1">
                            {LangHelper.getResource('Phone1')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.countryCode}
                                        name="countryCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode}
                                        name="areaCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber}
                                        name="phoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="phone2">
                            {LangHelper.getResource('Phone2')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.countryCode}
                                        name="countryCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode}
                                        name="areaCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber}
                                        name="phoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="phone3">
                            {LangHelper.getResource('Phone3')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.countryCode}
                                        name="countryCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode}
                                        name="areaCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber}
                                        name="phoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="fax">
                            {LangHelper.getResource('Fax')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.faxCountryCode}
                                        name="faxCountryCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.faxAreaCode}
                                        name="faxAreaCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.faxNumber}
                                        name="faxNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="mobile">
                            {LangHelper.getResource('Mobile')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.mobileCountryCode}
                                        name="mobileCountryCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.mobileAreaCode}
                                        name="mobileAreaCode"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.mobilePhoneNumber}
                                        name="mobilePhoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="pic1">
                            {LangHelper.getResource('PIC1')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="picName">
                                    <Form.Control type="text" size="sm" value={values.pic1Name}
                                        name="pic1Name"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.pic1PhoneNumber}
                                        name="pic1PhoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="pic2">
                            {LangHelper.getResource('PIC2')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="picName">
                                    <Form.Control type="text" size="sm" value={values.pic2Name}
                                        name="pic2Name"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.pic2PhoneNumber}
                                        name="pic2PhoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="pic3">
                            {LangHelper.getResource('PIC3')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="picName">
                                    <Form.Control type="text" size="sm" value={values.pic3Name}
                                        name="pic3Name"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.pic3PhoneNumber}
                                        name="pic3PhoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="pic4">
                            {LangHelper.getResource('PIC4')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="picName">
                                    <Form.Control type="text" size="sm" value={values.pic4Name}
                                        name="pic4Name"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.pic4PhoneNumber}
                                        name="pic4PhoneNumber"
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="skype">
                            {LangHelper.getResource('Skype')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.skype}
                                name="skype" id="skype"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="email">
                            {LangHelper.getResource('Email')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.email}
                                name="email" id="email"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="telegram">
                            {LangHelper.getResource('Telegram')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.telegram}
                                name="telegram" id="telegram"
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
                        <Form.Label column sm="4" md="4" htmlFor="weChat">
                            {LangHelper.getResource('WeChat')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.weChat}
                                name="weChat" id="weChat"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="whatApp">
                            {LangHelper.getResource('WhatApp')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.whatApp}
                                name="whatApp" id="whatApp"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="line">
                            {LangHelper.getResource('Line')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.line}
                                name="line" id="line"
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
                        <Form.Label column sm="4" md="4" htmlFor="letstalk">
                            {LangHelper.getResource('Letstalk')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.letstalk}
                                name="letstalk" id="letstalk"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="qq">
                            {LangHelper.getResource('QQ')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.qq}
                                name="qq" id="qq"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="zalo">
                            {LangHelper.getResource('Zalo')}
                        </Form.Label>
                        <Col sm="8" md="8">
                            <Form.Control type="text" size="sm" value={values.zalo}
                                name="zalo" id="zalo"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
            </div>
        </div>
        );
    };

    renderDetails = (values, errors, touched, handleChange, setFieldValue) =>{
        return (
            <div className='panel-group'>
                <Form.Group as={Row} className="title" onClick={this.handleShowDetails}>
                    <Form.Label column sm="2" md="2" className="required" htmlFor="identityInformation">
                        {LangHelper.getResource('Details')}
                    </Form.Label>
                </Form.Group>
                <div className={`${this.state.isShowDetailsOption ? '' : 'hideDetails'}`}>
                    <Form.Group as={Row} className="pt-2">
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="feedbackDate">
                                {LangHelper.getResource('FeedbackDate')}
                            </Form.Label>
                            <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker
                                        selected={this.state.feedbackDate}
                                        timeInputLabel="Time:"
                                        dateFormat="MMM dd, yyyy hh:mm aa"
                                        showTimeInput
                                        onChange={value => this.handleToDateChange(value, 'feedbackDate')}
                                    />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="resolutionTime">
                                {LangHelper.getResource('ResolutionTime')}
                            </Form.Label>
                            <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker
                                        selected={this.state.resolutionTime}
                                        timeInputLabel="Time:"
                                        dateFormat="MMM dd, yyyy hh:mm aa"
                                        showTimeInput
                                        onChange={value => this.handleToDateChange(value, 'resolutionTime')}
                                    />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="station">
                                {LangHelper.getResource('Station')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.station && errors.station}
                                dataSource={this.props.settings?.extensionList}
                                keyField='id'
                                valueField='value'
                                isAllTextShown
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('station', selectedItemsKey);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                </div>
            </div>
        )
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
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                {
                    this.props.createTemplateResult &&
                    <ResponseMessage isSuccessful={this.props.createTemplateResult.isSuccessful}
                        message={this.props.createTemplateResult.message || LangHelper.getResource('InsertNotificationTemplateSuccessfully')}
                    />
                }
                {
                    this.renderIdentityInformation(values, errors, touched, handleChange)
                }
                {
                    this.renderDetails(values, errors, touched, handleChange, setFieldValue)
                }
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
            licenseeType: '',
            countryCode: '',
            phoneNumber: '',
            areaCode: '',
            faxCountryCode: '',
            faxAreaCode: '',
            faxNumber: '',
            pic1Name: '',
            pic1PhoneNumber: '',
            pic2Name: '',
            pic2PhoneNumber: '',
            pic3Name: '',
            pic3PhoneNumber: '',
            pic4Name: '',
            pic4PhoneNumber: '',
            skype: '',
            email:'',
            telegram: '',
            weChat: '',
            whatApp: '',
            line: '',
            letstalk: '',
            qq: '',
            zalo: '',
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