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
import { renderTitleOptions, renderLicenseeTypeOptions, renderStatus, renderLanguage, renderResponse, renderCountry, validateFormik } from '../common.functions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { getSubCategories, getSubProducts, getBetTypes } from '@jsroot/common/shareScripts';
import VerifyCustomer from '@jsroot/components/verifyCustomer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


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
            isShowDetailsOption: true,
            isVerifyCustomer: false,
            subCategoriesOptions: [],
            subCategoriesSelected: '',
            subProductOptions: [],
            subProductSelected: '',
            betTypeOptions: [],
            betTypeSelected: [],
            listOfCustomerValid: [],
            listOfCustomer: []
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

    mainCategoriesHandleChange = (currentItem, selectedItemsKey, setFieldValue) => {
        if (selectedItemsKey) {
            setFieldValue('category', selectedItemsKey);
            const {subCategoriesSelected} = this.state;
            const subCategoryList = this.props.settings.subCategoryList;
            const selectedMainCategories = selectedItemsKey.split(',');
            const subCategoriesSelectedArr = subCategoriesSelected.length > 0 ? subCategoriesSelected.split(',') : [];
            const findSubByMain = getSubCategories(selectedMainCategories, subCategoryList, subCategoriesSelectedArr, false);
            this.setState({subCategoriesOptions: findSubByMain});
        }
        else{
            this.setState({
                subCategoriesOptions: [],
                subCategoriesSelected: []
            });
        }
    }

    subCategoriesHandleChange= (currentItem, selectedItemsKey, setFieldValue) => {
        setFieldValue('subCategory', selectedItemsKey);
        this.setState({subCategoriesSelected: selectedItemsKey});
    }

    productHandleChange = (currentItem, selectedItemsKey, setFieldValue) => {
        if (selectedItemsKey) {
            setFieldValue('product', selectedItemsKey);
            const {subProductSelected} = this.state;
            const subProductList = this.props.settings.subProductList;
            const selectedProduct = selectedItemsKey.split(',');
            const subProductSelectedArr = subProductSelected.length > 0 ? subProductSelected.split(',') : [];
            const findSubProductByProduct = getSubProducts(selectedProduct, subProductList, subProductSelectedArr, false);
            this.setState({subProductOptions: findSubProductByProduct});
        }
        else{
            this.setState({
                subProductOptions: [],
                subProductSelected: []
            });
        }
    }
    
    subProductHandleChange= (currentItem, selectedItemsKey, setFieldValue) => {
        setFieldValue('subCategory', selectedItemsKey);
        this.setState(
            {
                subProductSelected: selectedItemsKey
            },() =>{
                if (selectedItemsKey) {
                    const {betTypeSelected} = this.state;
                    const betTypeList = this.props.settings.bettypeList;
                    const selectedSubProducts = selectedItemsKey.split(',');
                    const betTypeSelectedArr = betTypeSelected.length > 0 ? betTypeSelected.split(',') : [];
                    const findBetTypeBySubProduct = getBetTypes(selectedSubProducts, betTypeList, betTypeSelectedArr, false);
                    this.setState({betTypeOptions: findBetTypeBySubProduct});
                }
                else{
                    this.setState({
                        betTypeOptions: [],
                        betTypeSelected: []
                    });
                }
            }
        );
    }

    betTypeHandleChange= (currentItem, selectedItemsKey, setFieldValue) => {
        setFieldValue('betType', selectedItemsKey);
        this.setState({betTypeSelected: selectedItemsKey});
    }

    validateInquiriesInput = (event) => {
        if ([8, 46, 37, 39, 35, 36].includes(event.which)) {
            return;
        }

        if (!event.ctrlKey && !event.key.match(/^\d+$/)) {
            event.preventDefault();
        }
    }

    renderTooltipCustomers = props => (
        <Tooltip id="tooltip-customers" {...props}>
            {LangHelper.getResource('MultiplecustomersToolTip')}
        </Tooltip>
    );

    handleChangeCheckVerifyCustomer = () =>{
        this.setState(prevState => ({
            isVerifyCustomer: !prevState.isVerifyCustomer
          }));
    }

    isValidCustomer = customers => {
        return customers.split(',').filter(function (value) {
            return value.length > 50;
        }).length === 0;
    };

    handleVerify = (event, setFieldValue, value) => {
        event.preventDefault();
        const regex1 = new RegExp(/,\s+/g);
        const regex2 = new RegExp(/^,+|,+$/g);
        const regex3 = new RegExp(/,{2,}/g);

        const customersInput = value.trim().replace(regex1, ',') // NOSONAR
            .replace(regex2, '') // NOSONAR
            .replace(regex3, ','); // NOSONAR
        if (this.isValidCustomer(customersInput)) {
            this.props.verifyUserName({ Username: customersInput }).then(data => {
                let customers = [...this.state.listOfCustomer, ...data];
                customers = customers.filter((v, i, a) => a.findIndex(t => t.custId === v.custId && t.val === v.val) === i);
                this.setState({
                    listOfCustomer: customers,
                    listOfCustomerValid: customers.filter(item => item.custId !== 0)
                });
            });
            setFieldValue('isVerifiedCustomers', true);
        }
        setFieldValue('customerNameInput', '');
    };

    pasteCustomerHandler = (event, customers, setFieldValue) => {
        const customer = customers.trim();
        const items = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',')
            .replace(/\r\n/g, ',')
            .replace(/\n/g, ',')
            .replace(/\t/g, ',')
            .split(',').filter(item => item !== '');

        setTimeout(() => {
            const customersInput = (customer.length > 0 ? customer + ',' : '').concat(items.join(','));
            setFieldValue('customerNameInput', customersInput);
        }, 100);
    };

    deleteCustomer = id => {
        const listOfCustomer = this.state.listOfCustomer.filter(item => item.id !== id);
        const listOfCustomerValid = this.state.listOfCustomerValid.filter(item => item.id !== id);
        this.setState({
            listOfCustomer,
            listOfCustomerValid
        });
    };

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
                                <option value='' hidden disabled />
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
        const {subCategoriesOptions, subProductOptions, betTypeOptions} = this.state;
        const {mainCategoryList, productList, statusList, languageList, responseList, countryList} = this.props.settings;
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
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('station', selectedItemsKey);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="communication">
                                {LangHelper.getResource('Communication')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.communication && errors.communication}
                                dataSource={this.props.settings?.communicationToolList}
                                keyField='id'
                                valueField='settingName'
                                hasAllOption={this.props.settings?.communicationToolList.length > 0}
                                isAllTextShown={this.props.settings?.communicationToolList.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('communication', selectedItemsKey);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="category">
                                {LangHelper.getResource('Category')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.category && errors.category}
                                dataSource={mainCategoryList}
                                keyField='mainCategoryID'
                                valueField='settingName'
                                hasAllOption={mainCategoryList.length > 0}
                                isAllTextShown={mainCategoryList.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.mainCategoriesHandleChange(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subCategory">
                                {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.subCategory && errors.subCategory}
                                dataSource={subCategoriesOptions}
                                keyField='subCategoryId'
                                valueField='settingName'
                                hasAllOption={subCategoriesOptions.length > 0}
                                isAllTextShown={subCategoriesOptions.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.subCategoriesHandleChange(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="product">
                                {LangHelper.getResource('Product')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.product && errors.product}
                                dataSource={productList}
                                keyField='id'
                                valueField='value'
                                hasAllOption={productList.length > 0}
                                isAllTextShown={productList.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.productHandleChange(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subProduct">
                                {LangHelper.getResource('SubProduct')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.subProduct && errors.subProduct}
                                dataSource={subProductOptions}
                                keyField='id'
                                valueField='value'
                                hasAllOption={subProductOptions.length > 0}
                                isAllTextShown={subProductOptions.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.subProductHandleChange(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="betType">
                                {LangHelper.getResource('BetType')}
                            </Form.Label>
                            <Col sm="8" md="8">
                            <MultipleSelect
                                isInvalid={touched.betType && errors.betType}
                                dataSource={betTypeOptions}
                                keyField='id'
                                valueField='value'
                                hasAllOption={betTypeOptions.length > 0}
                                isAllTextShown={betTypeOptions.length > 0}
                                hasSearchBox
                                isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                this.betTypeHandleChange(currentItem, selectedItemsKey, setFieldValue);
                            }}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="status">
                                {LangHelper.getResource('Status')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="status" id="status"
                                    value={values.status}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {statusList.map(renderStatus)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="language">
                                {LangHelper.getResource('Language')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="language" id="language"
                                    value={values.language}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {languageList.map(renderLanguage)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="response">
                                {LangHelper.getResource('Response')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="response" id="response"
                                    value={values.response}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {responseList.map(renderResponse)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="country">
                                {LangHelper.getResource('Country')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="country" id="country"
                                    value={values.country}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {countryList.map(renderCountry)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="noEfInquiries">
                                {LangHelper.getResource('NoEfInquiries')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="number" size="sm" value={values.noEfInquiries}
                                    name="noEfInquiries" id="noEfInquiries"
                                    min="1" max="32000"
                                    onKeyDown={this.validateInquiriesInput}
                                    className="shadow-none"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="pt-1 pb-1" controlId="formBasicCheckbox">
                    <Col sm="2" md="2">
                        <Form.Check type="checkbox" className="check-box-verify" label={LangHelper.getResource('IsRelatedToCustomer')}
                            checked={this.state.isVerifyCustomer}
                            onChange={this.handleChangeCheckVerifyCustomer}
                        />
                    </Col>
                    <Col sm="1" md="1">
                        <Form.Label>
                                <OverlayTrigger
                                    placement="bottom-start"
                                    overlay={this.renderTooltipCustomers()}
                                >
                                    <span className="fa fa-question-circle-o" />
                                </OverlayTrigger>
                        </Form.Label>
                    </Col>
                    <Col sm="9" md="9">
                        <Row>
                            <Col sm="10" md="11">
                                <Form.Control type="text" size="sm" value={values.customerNameInput}
                                    name="customerNameInput"
                                    onPaste={event => this.pasteCustomerHandler(event, values.customerNameInput, setFieldValue)}
                                    isInvalid={touched.customerNameInput && errors.customerNameInput}
                                    className="shadow-none" autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Button  name="isVerifiedCustomers" id="isVerifiedCustomers" type="submit" variant="primary"
                                    disabled={!this.state.isVerifyCustomer}
                                    size="sm" onClick={event => this.handleVerify(event, setFieldValue, values.customerNameInput)}
                                >
                                    {LangHelper.getResource('Verify')}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    </Form.Group>
                    <VerifyCustomer listOfCustomers={this.state.listOfCustomer} onClick={this.deleteCustomer} />
                </div>
            </div>
        );
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
            noEfInquiries: '',
            customerNameInput: ''
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