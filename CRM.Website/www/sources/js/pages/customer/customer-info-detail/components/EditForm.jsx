import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Collapse } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '../../../../components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { Policy } from '@jsroot/common/constants';

export class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: {
                personalInfo: false,
                communicationInfo: false,
                headlineInfo: false,
                homeAddress: false,
                bankInfo: false
            },
            isSubmitting: false,
            titleId: 0,
            firstName: '',
            lastName: '',
            maxDate: new Date(DateTimeService.toShortDateFormat(new Date(window.currentClientTime))),
            birthDay: '',
            passport: '',
            refCode2: '',
            languages: [],
            siteId: 0,
            refCode1: '',
            licenseeTypeId: 0,
            isVip: false,
            isIgnored: false,
            phoneCountryCode: '',
            phoneAreaCode: '',
            phone: '',
            phone2CountryCode: '',
            phone2AreaCode: '',
            phone2: '',
            phone3CountryCode: '',
            phone3AreaCode: '',
            phone3: '',
            checker: '',
            introducedBy: '',
            faxCountryCode: '',
            faxAreaCode: '',
            faxNumber: '',
            mobileCountryCode: '',
            mobileAreaCode: '',
            mobilePhoneNumber: '',
            pic1Name: '',
            pic1PhoneNumber: '',
            pic2Name: '',
            pic2PhoneNumber: '',
            pic3Name: '',
            pic3PhoneNumber: '',
            pic4Name: '',
            pic4PhoneNumber: '',
            skype: '',
            email: '',
            telegram: '',
            weChat: '',
            whatsApp: '',
            line: '',
            letstalk: '',
            qq: '',
            zalo: '',
            homeAddressLine1: '',
            homeAddressLine2: '',
            homeAddressLine3: '',
            homeAddressCity: '',
            homeAddressCountryId: 0,
            homeAddressState: '',
            homeAddressPostCode: '',
            bankInfoHolderName: '',
            bankInfoName: '',
            bankInfoAccNo: '',
            bankInfoSwiftCode: '',
            bankAddressLine1: '',
            bankAddressLine2: '',
            bankAddressLine3: '',
            bankAddressCity: '',
            bankAddressCountryId: 0,
            bankAddressState: '',
            bankAddressPostCode: ''
        };
    }

    async componentDidMount() {
        await this.props.getAllSettings();
        await this.props.getCustomerById({ customerId: 1754 });
        const { customerInfo } = this.props;
        this.setState({
            titleId: customerInfo.titleId,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            birthDay: customerInfo.birthday ? new Date(customerInfo.birthday) : '',
            passport: customerInfo.passport,
            refCode2: customerInfo.refCode2,
            languages: customerInfo.languages,
            siteId: customerInfo.siteId,
            refCode1: customerInfo.refCode1,
            licenseeTypeId: customerInfo.licenseeType,
            isVip: customerInfo.isVIP,
            isIgnored: customerInfo.ignored,
            phoneCountryCode: customerInfo.phoneInfo[0].countryCode,
            phoneAreaCode: customerInfo.phoneInfo[0].areaCode,
            phone: customerInfo.phoneInfo[0].phoneNumber,
            phone2CountryCode: customerInfo.phoneInfo[1].countryCode,
            phone2AreaCode: customerInfo.phoneInfo[1].areaCode,
            phone2: customerInfo.phoneInfo[1].phoneNumber,
            phone3CountryCode: customerInfo.phoneInfo[2].countryCode,
            phone3AreaCode: customerInfo.phoneInfo[2].areaCode,
            phone3: customerInfo.phoneInfo[2].phoneNumber,
            checker: customerInfo.checker,
            introducedBy: customerInfo.introducedBy,
            faxCountryCode: customerInfo.faxInfo.countryCode,
            faxAreaCode: customerInfo.faxInfo.areaCode,
            faxNumber: customerInfo.faxInfo.faxNumber,
            mobileCountryCode: customerInfo.mobile.countryCode,
            mobileAreaCode: customerInfo.mobile.areaCode,
            mobilePhoneNumber: customerInfo.mobile.phoneNumber,
            pic1Name: customerInfo.personalInfoContacts[0].name,
            pic1PhoneNumber: customerInfo.personalInfoContacts[0].phone,
            pic2Name: customerInfo.personalInfoContacts[1].name,
            pic2PhoneNumber: customerInfo.personalInfoContacts[1].phone,
            pic3Name: customerInfo.personalInfoContacts[2].name,
            pic3PhoneNumber: customerInfo.personalInfoContacts[2].phone,
            pic4Name: customerInfo.personalInfoContacts[3].name,
            pic4PhoneNumber: customerInfo.personalInfoContacts[3].phone,
            skype: customerInfo.skype,
            email: customerInfo.email,
            telegram: customerInfo.msn,
            weChat: customerInfo.weChat,
            whatsApp: customerInfo.whatsApp,
            line: customerInfo.line,
            letstalk: customerInfo.yahoo,
            qq: customerInfo.qq,
            zalo: customerInfo.bbm,
            homeAddressLine1: customerInfo.addressInfo.lineList[0],
            homeAddressLine2: customerInfo.addressInfo.lineList[1],
            homeAddressLine3: customerInfo.addressInfo.lineList[2],
            homeAddressCity: customerInfo.addressInfo.city,
            homeAddressCountryId: customerInfo.addressInfo.country.id,
            homeAddressState: customerInfo.addressInfo.state,
            homeAddressPostCode: customerInfo.addressInfo.postCode,
            bankInfoHolderName: customerInfo.bankInfo.holderName,
            bankInfoName: customerInfo.bankInfo.name,
            bankInfoAccNo: customerInfo.bankInfo.accountNumber,
            bankInfoSwiftCode: customerInfo.bankInfo.swiftCode,
            bankAddressLine1: customerInfo.bankInfo.addressInfo.lineList[0],
            bankAddressLine2: customerInfo.bankInfo.addressInfo.lineList[1],
            bankAddressLine3: customerInfo.bankInfo.addressInfo.lineList[2],
            bankAddressCity: customerInfo.bankInfo.addressInfo.city,
            bankAddressCountryId: customerInfo.bankInfo.addressInfo.country.id,
            bankAddressState: customerInfo.bankInfo.addressInfo.state,
            bankAddressPostCode: customerInfo.bankInfo.addressInfo.postCode
        });
    }

    handleCollapseExpand = (section = '') => {
        this.setState(prevState => ({
            collapse: { ...prevState.collapse, [section]: !prevState.collapse[section] }
        }));
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleChangeValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    handleChangeCheck = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.checked
        });
    };

    handleSubmit = event => {
        this.setState({ isSubmitting: true });
        event.preventDefault();
        const values = this.state;
        const params = {
            customerId: this.props.customerInfo.custId,
            firstName: values.firstName,
            lastName: values.lastName,
            titleId: values.titleId,
            birthDay: values.birthDay ? DateTimeService.toShortDateFormat(values.birthDay) : '',
            languageId: values.languages.toString(),
            phone: values.phone,
            phoneCountryCode: values.phoneCountryCode,
            phoneAreaCode: values.phoneAreaCode,
            phone2: values.phone2,
            phone2CountryCode: values.phone2CountryCode,
            phone2AreaCode: values.phone2AreaCode,
            phone3: values.phone3,
            phone3CountryCode: values.phone3CountryCode,
            phone3AreaCode: values.phone3AreaCode,
            passport: values.passport,
            mobilePhone: values.mobilePhoneNumber,
            mobilePhoneCountryCode: values.mobileCountryCode,
            mobilePhoneAreaCode: values.mobileAreaCode,
            fax: values.faxNumber,
            faxCountryCode: values.faxCountryCode,
            faxAreaCode: values.faxAreaCode,
            email: values.email,
            skype: values.skype,
            msn: values.telegram,
            pic1: values.pic1PhoneNumber,
            pic2: values.pic2PhoneNumber,
            pic3: values.pic3PhoneNumber,
            pic4: values.pic4PhoneNumber,
            pic1Name: values.pic1Name,
            pic2Name: values.pic2Name,
            pic3Name: values.pic3Name,
            pic4Name: values.pic4Name,
            siteId: values.siteId,
            bettingCode: values.refCode1,
            refCode2: values.refCode2,
            line1: values.homeAddressLine1,
            line2: values.homeAddressLine2,
            line3: values.homeAddressLine3,
            city: values.homeAddressCity,
            countryId: values.homeAddressCountryId,
            postCode: values.homeAddressPostCode,
            state: values.homeAddressState,
            isVip: values.isVip,
            ignored: values.isIgnored,
            introducedBy: values.introducedBy,
            bankHolderName: values.bankInfoHolderName,
            bankName: values.bankInfoName,
            bankAccountNumber: values.bankInfoAccNo,
            bankSwiftCode: values.bankInfoSwiftCode,
            bankLine1: values.bankAddressLine1,
            bankLine2: values.bankAddressLine2,
            bankLine3: values.bankAddressLine3,
            bankCity: values.bankAddressCity,
            bankCode: values.bankAddressPostCode,
            bankState: values.bankAddressState,
            bankCountryId: values.bankAddressCountryId,
            licenseeType: values.licenseeTypeId,
            whatsApp: values.whatsApp,
            line: values.line,
            weChat: values.weChat,
            yahoo: values.letstalk,
            qq: values.qq,
            bbm: values.zalo
        };

        this.props.editCustomerInfoDetail(params).then(() => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                this.props.setEditCustomerInfoDetailDialog({ show: true });
                this.setState({ isSubmitting: false });
            } else {
                this.setState({ isSubmitting: false });
            }
        });
    };

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    renderCheckVipIgnore = (data, values) => {
        if (!data.isHeadline && (data.isSuper || data.isDirectAccount || data.isGuest)) {
            return (
                <Fragment>
                    <Col sm="1" md="1">
                        <Form.Check type="checkbox"
                            label={LangHelper.getResource('VIP')}
                            checked={values.isVip}
                            name='isVip' id="isVip"
                            onChange={event => this.handleChangeCheck(event)}
                        />
                    </Col>
                    <Col sm="1" md="1">
                        <Form.Check type="checkbox"
                            label={LangHelper.getResource('Ignore')}
                            checked={values.isIgnored}
                            name='isIgnored' id="isIgnored"
                            onChange={event => this.handleChangeCheck(event)}
                        />
                    </Col>
                </Fragment>
            );
        }
        return null;
    };

    renderPersonalInfo = values => {
        const { customerInfo } = this.props;
        const languageSelected = this.props.allSettings.languages.map(item => {
            return {
                languageId: item.languageId,
                name: item.name,
                checked: values.languages.includes(item.languageId)
            };
        });
        return(
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('personalInfo')}
                    aria-controls="collapse-expand-personalInfo"
                    aria-expanded={!this.state.collapse.personalInfo}
                >
                    <Form.Label>{LangHelper.getResource('PersonalInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.personalInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="title">{LangHelper.getResource('Title')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" value={values.titleId}
                                            name="titleId" id="titleId" onChange={this.handleChange}
                                        >
                                            <option value="0"></option>
                                            {this.props.allSettings.titles.map(item => this.renderOptions(item.value, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="firstName">{LangHelper.getResource('FirstName')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.firstName}
                                            name="firstName" id="firstName" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="lastName">{LangHelper.getResource('LastName')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.lastName}
                                            name="lastName" id="lastName" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="birthDay">{LangHelper.getResource('Birthday')}</Form.Label>
                                    <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                        <DatePicker
                                            selected={values.birthDay}
                                            maxDate={values.maxDate}
                                            onChange={value => this.handleChangeValue('birthDay',value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="passPortNo">{LangHelper.getResource('PassportNo')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.passport}
                                            name="passport" id="passport" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="refCodes">{LangHelper.getResource('RefCodes')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.refCode2}
                                            id="refCode2" autoComplete="off" name="refCode2" onChange={this.handleChange}
                                        />
                                    </Col></Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="4" sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="languages" column sm="4" md="4">{LangHelper.getResource('Languages')}</Form.Label>
                                    <Col md="8" sm="8">
                                        <MultipleSelect
                                            dataSource={languageSelected}
                                            keyField='languageId'
                                            valueField='name'
                                            isAllTextShown
                                            isNAOption
                                            onChange={(currentItem, selectedItemsKey) => {
                                                this.handleChangeValue('languages',selectedItemsKey);
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="site">{LangHelper.getResource('Site')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <SelectWithSearch
                                            className='basic-single'
                                            options={this.props.allSettings.sites}
                                            value={values.siteId}
                                            name={customerInfo.siteSetting.name}
                                            isHideNA={false}
                                            OnChangeValue={item => this.handleChangeValue('siteId',item.id)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="secretCode">{LangHelper.getResource('SecretCode')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.refCode1}
                                            name="refCode1" id="refCode1" autoComplete="off" onChange={this.handleChange}
                                        ></Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="licenseeTypes">{LangHelper.getResource('LicenseeType')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" value={values.licenseeTypeId}
                                            id="licenseeTypeId" name="licenseeTypeId" onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.licenseeTypes.map(item => this.renderOptions(item.name, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>

                            { this.renderCheckVipIgnore(customerInfo, values) }
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        );
    };

    renderHeadlineInfo = (values, canEditHeadline) => {
        return (
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('headlineInfo')}
                    aria-controls="collapse-expand-headlineInfo"
                    aria-expanded={!this.state.collapse.headlineInfo}
                >
                    <Form.Label htmlFor="headlineInfo">{LangHelper.getResource('HeadlineInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.headlineInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="checker">{LangHelper.getResource('Checker')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.checker} disabled
                                            name="checker" id="checker" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="introducedBy">{LangHelper.getResource('IntroducedBy')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.introducedBy} disabled={!canEditHeadline}
                                            name="introducedBy" id="introducedBy" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="1" md="1">
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('VIP')}
                                    checked={values.isVip}
                                    name='isVip' id="isVip"
                                    disabled={!canEditHeadline}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                            </Col>
                            <Col sm="1" md="1">
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('Ignore')}
                                    checked={values.isIgnored}
                                    name='isIgnored' id="isIgnored"
                                    disabled={!canEditHeadline}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        );
    };

    renderCommunicationTool = values => {
        return(
            <Fragment>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="skype">{LangHelper.getResource('Skype')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.skype}
                                    name="skype" id="skype" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="email">{LangHelper.getResource('Email')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.email}
                                    name="email" id="email" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="telegram">{LangHelper.getResource('Telegram')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.telegram}
                                    name="telegram" id="telegram" autoComplete="off"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="weChats">{LangHelper.getResource('WeChat')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.weChat}
                                    name="weChat" id="weChat" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="whatApp">{LangHelper.getResource('WhatApp')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.whatsApp}
                                    name="whatsApp" id="whatsApp" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="line">{LangHelper.getResource('Line')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.line}
                                    name="line" id="line" autoComplete="off" onChange={this.handleChange}
                                >
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="letstalks">{LangHelper.getResource('Letstalk')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.letstalk}
                                    name="letstalk" id="letstalk" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="qq">{LangHelper.getResource('QQ')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.qq}
                                    name="qq" id="qq" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="zalo">{LangHelper.getResource('Zalo')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" className="shadow-none" value={values.zalo}
                                    name="zalo" id="zalo" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Fragment>
        );
    };

    renderCustomerInformation = values => {
        return(
            <Fragment>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="fax">{LangHelper.getResource('Fax')}</Form.Label>
                            <Col md="8" sm="8">
                                <div className="d-flex">
                                    <div className="code-country">
                                        <Form.Control name="faxCountryCode" id="faxCountryCode" autoComplete="off" value={values.faxCountryCode}
                                            type="text" size="sm" className="shadow-none" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.faxAreaCode}
                                            name="faxAreaCode" id="faxAreaCode" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.faxNumber}
                                            name="faxNumber" id="faxNumber" autoComplete="off" onChange={this.handleChange}
                                        ></Form.Control>
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="mobiles">
                                {LangHelper.getResource('Mobile')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="code-country">
                                        <Form.Control value={values.mobileCountryCode} size="sm" className="shadow-none" type="text"
                                            name="mobileCountryCode" id="mobileCountryCode" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.mobileAreaCode}
                                            name="mobileAreaCode" id="mobileAreaCode" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" onChange={this.handleChange}
                                            id="mobilePhoneNumber" autoComplete="off" name="mobilePhoneNumber" value={values.mobilePhoneNumber}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label md="4" column sm="4" htmlFor="pic1">{LangHelper.getResource('PIC1')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic1Name}
                                            name="pic1Name" id="pic1Name" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic1PhoneNumber}
                                            name="pic1PhoneNumber" id="pic1PhoneNumber" autoComplete="off" onChange={this.handleChange}
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
                            <Form.Label column sm="4" md="4" htmlFor="pic2">{LangHelper.getResource('PIC2')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic2Name}
                                            name="pic2Name" id="pic2Name" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic2PhoneNumber}
                                            name="pic2PhoneNumber" id="pic2PhoneNumber" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" md="4" column htmlFor="pic3">{LangHelper.getResource('PIC3')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic3Name}
                                            name="pic3Name" id="pic3Name" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic3PhoneNumber}
                                            name="pic3PhoneNumber" autoComplete="off" onChange={this.handleChange} id="pic3PhoneNumber"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="pic4" sm="4" md="4" column>{LangHelper.getResource('PIC4')}</Form.Label>
                            <Col md="8"  sm="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic4Name}
                                            name="pic4Name" id="pic4Name" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.pic4PhoneNumber}
                                            name="pic4PhoneNumber" id="pic4PhoneNumber" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Fragment>
        );
    };

    renderCommunicationInfo = values => {
        return(
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('communicationInfo')}
                    aria-controls="collapse-expand-communicationInfo"
                    aria-expanded={!this.state.collapse.communicationInfo}
                >
                    <Form.Label htmlFor="communicationInfo">{LangHelper.getResource('CommunicationInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.communicationInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="phone1">{LangHelper.getResource('Phone1')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control className="shadow-none" type="text" size="sm" value={values.phoneCountryCode}
                                                    name="phoneCountryCode" id="phoneCountryCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" className="shadow-none" value={values.phoneAreaCode}
                                                    name="phoneAreaCode" id="phoneAreaCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" value={values.phone}
                                                    name="phone" onChange={this.handleChange} id="phone" autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" htmlFor="phone2" md="4">{LangHelper.getResource('Phone2')}</Form.Label>
                                    <Col sm="8" md="8" >
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control size="sm" type="text" className="shadow-none" value={values.phone2CountryCode}
                                                    name="phone2CountryCode" id="phone2CountryCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" className="shadow-none" value={values.phone2AreaCode}
                                                    name="phone2AreaCode" id="phone2AreaCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" name="phone2" id="phone2" value={values.phone2}
                                                    size="sm" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md="4" sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label md="4" column sm="4" htmlFor="phone3">
                                        {LangHelper.getResource('Phone3')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control className="shadow-none" type="text" size="sm" value={values.phone3CountryCode}
                                                    name="phone3CountryCode" id="phone3CountryCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" className="shadow-none" value={values.phone3AreaCode}
                                                    name="phone3AreaCode" id="phone3AreaCode" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" value={values.phone3}
                                                    name="phone3" id="phone3" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        { this.renderCustomerInformation(values) }
                        { this.renderCommunicationTool(values) }
                    </div>
                </Collapse>
            </div>
        );
    };

    renderHomeAddress = values => {
        return(
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('homeAddress')}
                    aria-controls="collapse-expand-homeAddress"
                    aria-expanded={!this.state.collapse.homeAddress}
                >
                    <Form.Label htmlFor="homeAddress">{LangHelper.getResource('HomeAddress')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.homeAddress}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2" htmlFor="line1">{LangHelper.getResource('Line1')}</Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                            value={values.homeAddressLine1} id="homeAddressLine1" name="homeAddressLine1"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="12" sm="12">
                                <Form.Group as={Row}>
                                    <Form.Label sm="2" column md="2" htmlFor="line2">{LangHelper.getResource('Line2')}</Form.Label>
                                    <Col md="10" sm="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.homeAddressLine2}
                                            name="homeAddressLine2" id="homeAddressLine2" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label  htmlFor="line3" column sm="2" md="2">{LangHelper.getResource('Line3')}</Form.Label>
                                    <Col md="10" sm="10">
                                        <Form.Control size="sm" className="shadow-none" value={values.homeAddressLine3}
                                            name="homeAddressLine3" type="text" id="homeAddressLine3" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="6" sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label sm="4" column md="4" htmlFor="city">{LangHelper.getResource('City')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.homeAddressCity}
                                            name="homeAddressCity" id="homeAddressCity" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label sm="4" md="4" htmlFor="state" column>{LangHelper.getResource('State')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" value={values.homeAddressState} autoComplete="off" onChange={this.handleChange}
                                            name="homeAddressState" size="sm" className="shadow-none" id="homeAddressState"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="country">{LangHelper.getResource('Country')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" value={values.homeAddressCountryId}
                                            name="homeAddressCountryId" id="homeAddressCountryId" autoComplete="off" onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.countries.map(item => this.renderOptions(item.name, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="postCode">{LangHelper.getResource('PostCode')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.homeAddressPostCode}
                                            name="homeAddressPostCode" id="homeAddressPostCode" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        );
    };

    renderBankInfo = values => {
        return(
            <div className="panel-group">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('bankInfo')}
                    aria-controls="collapse-expand-bankInfo"
                    aria-expanded={!this.state.collapse.bankInfo}
                >
                    <Form.Label htmlFor="bankInfo">{LangHelper.getResource('BankInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.bankInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="accName">{LangHelper.getResource('AccName')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankInfoHolderName}
                                            name="bankInfoHolderName" id="bankInfoHolderName" autoComplete="off" onChange={this.handleChange}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md="6" sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label sm="4" md="4" column htmlFor="bankName">{LangHelper.getResource('BankName')}</Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankInfoName}
                                            name="bankInfoName" id="bankInfoName" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label md="4" column sm="4" htmlFor="accountNo">
                                        {LangHelper.getResource('AccountNo')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankInfoAccNo}
                                            name="bankInfoAccNo" id="bankInfoAccNo" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label md="4" htmlFor="iBanSwiftCode" column sm="4">{LangHelper.getResource('IBanSwiftCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankInfoSwiftCode}
                                            name="bankInfoSwiftCode" id="bankInfoSwiftCode" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column md="2" sm="2" htmlFor="bankLine1">{LangHelper.getResource('Line1')}</Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankAddressLine1}
                                            name="bankAddressLine1" id="bankAddressLine1" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2" htmlFor="bankLine2">{LangHelper.getResource('Line2')}</Form.Label>
                                    <Col md="10" sm="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankAddressLine2}
                                            name="bankAddressLine2" id="bankAddressLine2" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col md="12" sm="12">
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="bankLine3" sm="2" md="2" column>{LangHelper.getResource('Line3')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" value={values.bankAddressLine3} name="bankAddressLine3" id="bankAddressLine3"
                                             size="sm" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="6" sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="bankCity" column md="4" sm="4">{LangHelper.getResource('City')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankAddressCity}
                                            name="bankAddressCity" id="bankAddressCity" autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" htmlFor="bankState" md="4">{LangHelper.getResource('State')}</Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" value={values.bankAddressState}
                                             autoComplete="off" onChange={this.handleChange} name="bankAddressState" id="bankAddressState"
                                        /></Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="6" sm="6">
                                <Form.Group as={Row}>
                                    <Form.Label sm="4" column md="4" htmlFor="bankCountry">{LangHelper.getResource('Country')}</Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" value={values.bankAddressCountryId}
                                            name="bankAddressCountryId" id="bankAddressCountryId" autoComplete="off" onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.countries.map(element => this.renderOptions(element.name, element.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column md="4" sm="4" htmlFor="bankPostCode">{LangHelper.getResource('PostCode')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" id="bankAddressPostCode" className="shadow-none" name="bankAddressPostCode"
                                            value={values.bankAddressPostCode} autoComplete="off" onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        );
    };

    render() {
        const { allSettings, customerInfo } = this.props;
        const values = this.state;
        const updatePolicy = window.updateHeadlineInfoPolicy;
        const customerPolicy = window.customerInfoPolicy;
        const canEditHeadline = updatePolicy === Policy.Host;
        if (!allSettings || !customerInfo) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                {this.renderPersonalInfo(values)}
                {
                    (customerInfo.isHeadLine && (updatePolicy === Policy.Read || canEditHeadline))
                    && this.renderHeadlineInfo(values, canEditHeadline)
                }
                {this.renderCommunicationInfo(values)}
                {this.renderHomeAddress(values)}
                {this.renderBankInfo(values)}
                {
                    customerPolicy === Policy.Host &&
                    (
                        <Button type="submit" variant="primary" size="sm" className="mt-3" disabled={this.state.isSubmitting}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    )
                }
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, editCustomerInfoDetailResult } = state;
    return { allSettings, customerInfo, editCustomerInfoDetailResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
