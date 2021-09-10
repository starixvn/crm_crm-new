import React, { Component } from 'react';
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
        const now = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            collapse: {
                personalInfo: false,
                communicationInfo: false,
                headlineInfo: false,
                homeAddress: false,
                bankInfo: false
            },
            titleId: 0,
            firstName: '',
            lastName: '',
            maxDate: now,
            birthDay: new Date('Sep 01, 2021'),
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
            line1HomeAddress: '',
            line2HomeAddress: '',
            line3HomeAddress: '',
            cityHomeAddress: '',
            countryIdHomeAddress: 0,
            stateHomeAddress: '',
            postCodeHomeAddress: '',
            bankInfoHolderName: '',
            bankInfoName: '',
            bankInfoAccNo: '',
            bankInfoSwiftCode: '',
            line1BankAddress: '',
            line2BankAddress: '',
            line3BankAddress: '',
            cityBankAddress: '',
            countryIdBankAddress: '',
            stateBankAddress: '',
            postCodeBankAddress: ''
        };
    }

    async componentDidMount() {
        await this.props.getAllSettings();
        await this.props.getCustomerInfo({customerId: 1754});
        const { data } = this.props.gridData;
        this.setState({
            titleId: data.titleId || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            birthDay: data.birthday ? new Date(data.birthday) : '',
            passport: data.passport || '',
            refCode2: data.refCode2 || '',
            languages: data.languages,
            siteId: data.siteId,
            refCode1: data.refCode1 || '',
            licenseeTypeId: data.licenseeType || '',
            isVip: data.isVIP,
            isIgnored: data.isIgnored,
            phoneCountryCode: data.phoneInfo[0].countryCode || '',
            phoneAreaCode: data.phoneInfo[0].areaCode || '',
            phone: data.phoneInfo[0].phoneNumber || '',
            phone2CountryCode: data.phoneInfo[1].countryCode || '',
            phone2AreaCode: data.phoneInfo[1].areaCode || '',
            phone2: data.phoneInfo[1].phoneNumber || '',
            phone3CountryCode: data.phoneInfo[2].countryCode || '',
            phone3AreaCode: data.phoneInfo[2].areaCode || '',
            phone3: data.phoneInfo[2].phoneNumber || '',
            checker: data.checker || '',
            introducedBy: data.introducedBy || '',
            faxCountryCode: data.faxInfo.countryCode || '',
            faxAreaCode: data.faxInfo.areaCode || '',
            faxNumber: data.faxInfo.faxNumber || '',
            mobileCountryCode: data.mobile.countryCode || '',
            mobileAreaCode: data.mobile.areaCode || '',
            mobilePhoneNumber: data.mobile.phoneNumber || '',
            pic1Name: data.personalInfoContacts[0].name || '',
            pic1PhoneNumber: data.personalInfoContacts[0].phone || '',
            pic2Name: data.personalInfoContacts[1].name || '',
            pic2PhoneNumber: data.personalInfoContacts[1].phone || '',
            pic3Name: data.personalInfoContacts[2].name || '',
            pic3PhoneNumber: data.personalInfoContacts[2].phone || '',
            pic4Name: data.personalInfoContacts[3].name || '',
            pic4PhoneNumber: data.personalInfoContacts[3].phone || '',
            skype: data.skype || '',
            email: data.email || '',
            telegram: data.msn || '',
            weChat: data.weChat || '',
            whatsApp: data.whatsApp || '',
            line: data.line || '',
            letstalk: data.yahoo || '',
            qq: data.qq || '',
            zalo: data.bbm || '',
            line1HomeAddress: data.addressInfo.lineList[0] || '',
            line2HomeAddress: data.addressInfo.lineList[1] || '',
            line3HomeAddress: data.addressInfo.lineList[2] || '',
            cityHomeAddress: data.addressInfo.city || '',
            countryIdHomeAddress: data.addressInfo.country.id || 0,
            stateHomeAddress: data.addressInfo.state || '',
            postCodeHomeAddress: data.addressInfo.postCode || '',
            bankInfoHolderName: data.bankInfo.holderName || '',
            bankInfoName: data.bankInfo.name || '',
            bankInfoAccNo: data.bankInfo.accountNumber || '',
            bankInfoSwiftCode: data.bankInfo.swiftCode || '',
            line1BankAddress: data.bankInfo.addressInfo.lineList[0] || '',
            line2BankAddress: data.bankInfo.addressInfo.lineList[1] || '',
            line3BankAddress: data.bankInfo.addressInfo.lineList[2] || '',
            cityBankAddress: data.bankInfo.addressInfo.city || '',
            countryIdBankAddress: data.bankInfo.addressInfo.country.id || 0,
            stateBankAddress: data.bankInfo.addressInfo.state || '',
            postCodeBankAddress: data.bankInfo.addressInfo.postCode || '',
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
        const name = event.target.name
        this.setState({
            [name]: event.target.checked
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    renderPersonalInfo = () => {
        const { maxDate, titleId, firstName, lastName, birthDay, passport,
            refCode2, languages, siteId, refCode1, licenseeTypeId, isVip, isIgnored } = this.state;
        const { data } = this.props.gridData;
        const languageSelected = this.props.allSettings.languages.map(item => {
            return {
                languageId: item.languageId,
                name: item.name,
                checked: languages.includes(item.languageId)
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
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Title')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none"
                                            name="titleId" id="titleId" value={titleId} onChange={this.handleChange}
                                        >
                                            <option value="Mr" hidden disabled />
                                            {this.props.allSettings.titles.map(item => this.renderOptions(item.value, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('FirstName')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="firstName" id="firstName" value={firstName} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('LastName')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="lastName" id="lastName" value={lastName} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="birthday">
                                        {LangHelper.getResource('Birthday')}
                                    </Form.Label>
                                    <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                        <DatePicker
                                            selected={birthDay}
                                            maxDate={maxDate}
                                            onChange={value => this.handleChangeValue('birthDay',value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('PassportNo')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="passport" id="passport" value={passport} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('RefCodes')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="refCode2" id="refCode2" value={refCode2} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Languages')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
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
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Site')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <SelectWithSearch
                                            className='basic-single'
                                            options={this.props.allSettings.sites}
                                            value={siteId}
                                            name={data.siteSetting.name}
                                            isHideNA={false}
                                            OnChangeValue={item => this.handleChangeValue('siteId',item.id)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('SecretCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="refCode1" id="refCode1" value={refCode1} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('LicenseeType')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none"
                                            id="licenseeTypeId" name="licenseeTypeId"
                                            value={licenseeTypeId} onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.licenseeTypes.map(item => this.renderOptions(item.name, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            {
                                (!data.isHeadline && (data.isSuper || data.isDirectAccount || data.isGuest)) &&
                                (
                                    <>
                                        <Col sm="1" md="1">      
                                            <Form.Check type="checkbox"
                                                label={LangHelper.getResource('VIP')}
                                                checked={isVip}
                                                name='isVip' id="isVip"
                                                onChange={event => this.handleChangeCheck(event)}
                                            />
                                        </Col>
                                        <Col sm="1" md="1">                
                                            <Form.Check type="checkbox"
                                                label={LangHelper.getResource('Ignore')}
                                                checked={isIgnored}
                                                name='isIgnored' id="isIgnored"
                                                onChange={event => this.handleChangeCheck(event)}
                                            />
                                        </Col>
                                    </>
                                )
                            }
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        )
    };

    renderHeadlineInfo = canEditHeadline => {
        const { checker, introducedBy, isVip, isIgnored } = this.state;
        return (
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('headlineInfo')}
                    aria-controls="collapse-expand-headlineInfo"
                    aria-expanded={!this.state.collapse.headlineInfo}
                >
                    <Form.Label>{LangHelper.getResource('HeadlineInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.headlineInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Checker')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off" disabled
                                            name="checker" id="checker" value={checker} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('IntroducedBy')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off" disabled={!canEditHeadline}
                                            name="introducedBy" id="introducedBy" value={introducedBy} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="1" md="1">      
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('VIP')}
                                    checked={isVip}
                                    name='isVip' id="isVip"
                                    disabled={!canEditHeadline}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                            </Col>
                            <Col sm="1" md="1">                
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('Ignore')}
                                    checked={isIgnored}
                                    name='isIgnored' id="isIgnored"
                                    disabled={!canEditHeadline}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        )
    };

    renderCommunicationInfo = () => {
        const { phoneCountryCode, phoneAreaCode, phone, phone2CountryCode,
            phone2AreaCode, phone2, phone3CountryCode, phone3AreaCode, phone3,
            faxCountryCode, faxAreaCode, faxNumber, mobileCountryCode, mobileAreaCode,
            mobilePhoneNumber, pic1Name, pic1PhoneNumber, pic2Name, pic2PhoneNumber,
            pic3Name, pic3PhoneNumber, pic4Name, pic4PhoneNumber, skype, email,
            telegram, weChat, whatsApp, line, letstalk, qq, zalo } = this.state;
        return(
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('communicationInfo')}
                    aria-controls="collapse-expand-communicationInfo"
                    aria-expanded={!this.state.collapse.communicationInfo}
                >
                    <Form.Label>{LangHelper.getResource('CommunicationInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.communicationInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('Phone1')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control type="text" size="sm" value={phoneCountryCode}
                                                    name="phoneCountryCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" value={phoneAreaCode}
                                                    name="phoneAreaCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" value={phone}
                                                    name="phone" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('Phone2')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control type="text" size="sm" value={phone2CountryCode}
                                                    name="phone2CountryCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" value={phone2AreaCode}
                                                    name="phone2AreaCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" value={phone2}
                                                    name="phone2" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('Phone3')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control type="text" size="sm" value={phone3CountryCode}
                                                    name="phone3CountryCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" value={phone3AreaCode}
                                                    name="phone3AreaCode" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" value={phone3}
                                                    name="phone3" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col md="4" sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('Fax')}</Form.Label>
                                    <Col md="8" sm="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="faxCountryCode" id="faxCountryCode" value={faxCountryCode} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="faxAreaCode" id="faxAreaCode" value={faxAreaCode} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="faxNumber" id="faxNumber" value={faxNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('Mobile')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="code-country">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="mobileCountryCode" id="mobileCountryCode" value={mobileCountryCode} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="code-area">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="mobileAreaCode" id="mobileAreaCode" value={mobileAreaCode} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="mobilePhoneNumber" id="mobilePhoneNumber" value={mobilePhoneNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('PIC1')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="picName">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic1Name" id="pic1Name" value={pic1Name} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic1PhoneNumber" id="pic1PhoneNumber" value={pic1PhoneNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('PIC2')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="picName">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic2Name" id="pic2Name" value={pic2Name} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic2PhoneNumber" id="pic2PhoneNumber" value={pic2PhoneNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('PIC3')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="picName">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic3Name" id="pic3Name" value={pic3Name} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic3PhoneNumber" id="pic3PhoneNumber" value={pic3PhoneNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">{LangHelper.getResource('PIC4')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <div className="d-flex">
                                            <div className="picName">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic4Name" id="pic4Name" value={pic4Name} onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="phone">
                                                <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                                    name="pic4PhoneNumber" id="pic4PhoneNumber" value={pic4PhoneNumber} onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Skype')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="skype" id="skype" value={skype} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Email')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="email" id="email" value={email} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Telegram')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="telegram" id="telegram" value={telegram} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('WeChat')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="weChat" id="weChat" value={weChat} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('WhatApp')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="whatsApp" id="whatsApp" value={whatsApp} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Line')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line" id="line" value={line} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Letstalk')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="letstalk" id="letstalk" value={letstalk} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('QQ')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="qq" id="qq" value={qq} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Zalo')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="zalo" id="zalo" value={zalo} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        )
    };

    renderHomeAddress = () => {
        const { line1HomeAddress, line2HomeAddress, line3HomeAddress,
            cityHomeAddress, countryIdHomeAddress, stateHomeAddress,
            postCodeHomeAddress } = this.state;
        return(
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('homeAddress')}
                    aria-controls="collapse-expand-homeAddress"
                    aria-expanded={!this.state.collapse.homeAddress}
                >
                    <Form.Label>{LangHelper.getResource('HomeAddress')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.homeAddress}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line1')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line1HomeAddress" id="line1HomeAddress" value={line1HomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line2')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line2HomeAddress" id="line2HomeAddress" value={line2HomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line3')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line3HomeAddress" id="line3HomeAddress" value={line3HomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('City')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="cityHomeAddress" id="cityHomeAddress" value={cityHomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('State')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="stateHomeAddress" id="stateHomeAddress" value={stateHomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Country')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" autoComplete="off"
                                            name="countryIdHomeAddress" id="countryIdHomeAddress" value={countryIdHomeAddress} onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.countries.map(item => this.renderOptions(item.name, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('PostCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="postCodeHomeAddress" id="postCodeHomeAddress" value={postCodeHomeAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        )
    };

    renderBankInfo = () => {
        const { bankInfoHolderName, bankInfoName, bankInfoAccNo,
            bankInfoSwiftCode, line1BankAddress, line2BankAddress, line3BankAddress,
            cityBankAddress, countryIdBankAddress, stateBankAddress, postCodeBankAddress } = this.state;
        return(
            <div className="panel-group">
                <Form.Group as={Row} className="panel-title" onClick={() => this.handleCollapseExpand('bankInfo')}
                    aria-controls="collapse-expand-bankInfo"
                    aria-expanded={!this.state.collapse.bankInfo}
                >
                    <Form.Label>{LangHelper.getResource('BankInfo')}</Form.Label>
                </Form.Group>
                <Collapse in={!this.state.collapse.bankInfo}>
                    <div className="panel-content">
                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('AccName')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="bankInfoHolderName" id="bankInfoHolderName" value={bankInfoHolderName} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('BankName')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="bankInfoName" id="bankInfoName" value={bankInfoName} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('AccountNo')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="bankInfoAccNo" id="bankInfoAccNo" value={bankInfoAccNo} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('IBanSwiftCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="bankInfoSwiftCode" id="bankInfoSwiftCode" value={bankInfoSwiftCode} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line1')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line1BankAddress" id="line1BankAddress" value={line1BankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line2')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line2BankAddress" id="line2BankAddress" value={line2BankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="12" md="12">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2" md="2">
                                        {LangHelper.getResource('Line3')}
                                    </Form.Label>
                                    <Col sm="10" md="10">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="line3BankAddress" id="line3BankAddress" value={line3BankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('City')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="cityBankAddress" id="cityBankAddress" value={cityBankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('State')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="stateBankAddress" id="stateBankAddress" value={stateBankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="pt-2">
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('Country')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none" autoComplete="off"
                                            name="countryIdBankAddress" id="countryIdBankAddress" value={countryIdBankAddress} onChange={this.handleChange}
                                        >
                                            {this.props.allSettings.countries.map(item => this.renderOptions(item.name, item.id))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="6" md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4">
                                        {LangHelper.getResource('PostCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="postCodeBankAddress" id="postCodeBankAddress" value={postCodeBankAddress} onChange={this.handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
            </div>
        )
    };

    render() {
        const { allSettings, gridData } = this.props;
        const updatePolicy = window.updateHeadlineInfoPolicy;
        const canEditHeadline = updatePolicy === Policy.Host;
        if (!allSettings || !gridData) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                {this.renderPersonalInfo()}

                {
                    (gridData.data.isHeadLine && (updatePolicy === Policy.Read || canEditHeadline))
                    && this.renderHeadlineInfo(canEditHeadline)
                }

                {this.renderCommunicationInfo()}

                {this.renderHomeAddress()}

                {this.renderBankInfo()}
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, gridData } = state;
    return { allSettings, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
