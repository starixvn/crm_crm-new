import React, { Component } from 'react';
import { Col, Form, Row, Collapse } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';

export default class CustomerInfo extends Component {
    renderCommunicationToolSection = () => {
        const { values, handleChange } = this.props;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="skype">{LangHelper.getResource('Skype')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm"
                                    name="skype" id="Skype" className="shadow-none" autoComplete="off"
                                    value={values.skype} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="email">
                                {LangHelper.getResource('Email')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm"
                                    name="email" id="email" className="shadow-none" autoComplete="off"
                                    value={values.email} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="telegram">
                                {LangHelper.getResource('Telegram')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <Form.Control type="text" size="sm"
                                    name="telegram" id="telegram" className="shadow-none" autoComplete="off"
                                    value={values.telegram} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" column md="4" htmlFor="weChat">{LangHelper.getResource('WeChat')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm"
                                    value={values.weChat} onChange={handleChange}
                                    name="weChat" id="weChat" className="shadow-none" autoComplete="off"
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="whatsApp">
                                {LangHelper.getResource('WhatApp')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm"
                                    name="whatsApp" id="whatsApp" className="shadow-none" autoComplete="off"
                                    value={values.whatsApp} onChange={handleChange}
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
                                <Form.Control type="text" size="sm"
                                    name="line" id="line" className="shadow-none" autoComplete="off"
                                    value={values.line} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column htmlFor="letstalk" sm="4" md="4">{LangHelper.getResource('Letstalk')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" name="letstalk" id="letstalk"
                                    className="shadow-none" autoComplete="off"
                                    value={values.letstalk} onChange={handleChange}
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
                                <Form.Control type="text" size="sm"
                                    name="qq" id="qq" className="shadow-none" autoComplete="off"
                                    value={values.qq} onChange={handleChange}
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
                                <Form.Control type="text" size="sm"
                                    name="zalo" id="zalo" className="shadow-none" autoComplete="off"
                                    value={values.zalo} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderCustomerInformationSection = () => {
        const { values, handleChange } = this.props;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" htmlFor="fax" md="4">
                                {LangHelper.getResource('Fax')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <div className="phone-container">
                                    <div className="country">
                                        <Form.Control type="text" size="sm"
                                            name="faxCountryCode" className="shadow-none" autoComplete="off"
                                            value={values.faxCountryCode} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="faxAreaCode" className="shadow-none" autoComplete="off"
                                            value={values.faxAreaCode} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="faxNumber" className="shadow-none" autoComplete="off"
                                            value={values.faxNumber} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" column md="4" htmlFor="mobile">{LangHelper.getResource('Mobile')}</Form.Label>
                            <Col md="8" sm="8">
                                <div className="phone-container">
                                    <div className="country">
                                        <Form.Control type="text" size="sm"
                                            name="mobileCountryCode" className="shadow-none" autoComplete="off"
                                            value={values.mobileCountryCode} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="mobileAreaCode" className="shadow-none" autoComplete="off"
                                            value={values.mobileAreaCode} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="mobilePhoneNumber" className="shadow-none" autoComplete="off"
                                            value={values.mobilePhoneNumber} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label md="4" column sm="4" htmlFor="pic1">
                                {LangHelper.getResource('PIC1')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <div className="pic-container">
                                    <div className="pic-name">
                                        <Form.Control type="text" size="sm"
                                            name="name1" className="shadow-none" autoComplete="off"
                                            value={values.name1} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone1" className="shadow-none" autoComplete="off"
                                            value={values.phone1} onChange={handleChange}
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
                            <Form.Label column htmlFor="pic2" sm="4" md="4">{LangHelper.getResource('PIC2')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="pic-container">
                                    <div className="pic-name">
                                        <Form.Control type="text" size="sm"
                                            name="name2" className="shadow-none" autoComplete="off"
                                            value={values.name2} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone2" className="shadow-none" autoComplete="off"
                                            value={values.phone2} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" md="4" column htmlFor="pic3">
                                {LangHelper.getResource('PIC3')}
                            </Form.Label>
                            <Col md="8" sm="8" >
                                <div className="pic-container">
                                    <div className="pic-name">
                                        <Form.Control type="text" size="sm"
                                            name="name3" className="shadow-none" autoComplete="off"
                                            value={values.name3} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone3" className="shadow-none" autoComplete="off"
                                            value={values.phone3} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" md="4" htmlFor="pic4" column>
                                {LangHelper.getResource('PIC4')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="pic-container">
                                    <div className="pic-name">
                                        <Form.Control type="text" size="sm"
                                            name="name4" className="shadow-none" autoComplete="off"
                                            value={values.name4} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone4" className="shadow-none" autoComplete="off"
                                            value={values.phone4} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderPhoneSection = () => {
        const {  values, handleChange } = this.props;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="phone1">
                                {LangHelper.getResource('Phone1')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className="phone-container">
                                    <div className="country">
                                        <Form.Control type="text" size="sm"
                                            name="countryCode1" className="shadow-none" autoComplete="off"
                                            value={values.countryCode1} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode1" className="shadow-none" autoComplete="off"
                                            value={values.areaCode1} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber1" className="shadow-none" autoComplete="off"
                                            value={values.phoneNumber1} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" column md="4" htmlFor="phone2">
                                {LangHelper.getResource('Phone2')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <div className="phone-container">
                                    <div className="country">
                                        <Form.Control type="text" size="sm"
                                            value={values.countryCode2} onChange={handleChange}
                                            name="countryCode2" className="shadow-none" autoComplete="off"
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode2" className="shadow-none" autoComplete="off"
                                            value={values.areaCode2} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber2" className="shadow-none" autoComplete="off"
                                            value={values.phoneNumber2} onChange={handleChange}/>
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="phone3" column sm="4" md="4">{LangHelper.getResource('Phone3')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className="phone-container">
                                    <div className="country">
                                        <Form.Control type="text" size="sm"
                                            name="countryCode3" className="shadow-none" autoComplete="off"
                                            value={values.countryCode3} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode3" className="shadow-none" autoComplete="off"
                                            value={values.areaCode3} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber3" className="shadow-none" autoComplete="off"
                                            value={values.phoneNumber3} onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    render() {
        const { collapse, values, settings,
            handleChange, setFieldValue
        } = this.props;

        return (
            <div className="panel-group">
                <Form.Group as={Row} className="panel-title border-bottom-0" onClick={() => this.props.onCollapseExpand('customerInfo')}
                    aria-controls="collapse-expand-customerInfo"
                    aria-expanded={!collapse.customerInfo}
                >
                    <Form.Label className="customer-name font-weight-bold text-danger">{values.username}</Form.Label>
                </Form.Group>
                <Collapse in={!collapse.customerInfo}>
                    <div id="collapse-expand-customerInfo" className="panel-content">
                        <Form.Group as={Row}>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="titleId">
                                        {LangHelper.getResource('Title')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none"
                                            id="titleId" name="titleId" value={values.titleId} onChange={handleChange}
                                        >
                                            {settings.titles.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
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
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="firstName" id="firstName" value={values.firstName} onChange={handleChange}
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
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="lastName" id="lastName" value={values.lastName} onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="birthday">
                                        {LangHelper.getResource('Birthday')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                            <DatePicker
                                                selected={values.birthday} maxDate={values.maxDate}
                                                onChange={value => setFieldValue('birthday', value)}
                                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="passport">
                                        {LangHelper.getResource('PassportNo')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm"
                                            name="passport" id="passport" className="shadow-none" autoComplete="off"
                                            value={values.passport} onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="siteId">
                                        {LangHelper.getResource('Site')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <SelectWithSearch className='basic-single'
                                            OnChange={value => setFieldValue('siteId', value.id)}
                                            options={settings.sites}
                                            name={values.siteName} value={values.siteId}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col md="4" sm="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="refCode2">{LangHelper.getResource('RefCodes')}</Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                            name="refCode2" id="refCode2" value={values.refCode2} onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="refCode1">
                                        {LangHelper.getResource('SecretCode')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm"
                                            name="refCode1" id="refCode1" className="shadow-none" autoComplete="off"
                                            value={values.refCode1} onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="licenseeTypeId">
                                        {LangHelper.getResource('LicenseeType')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control as="select" size="sm" className="shadow-none"
                                            id="licenseeTypeId" name="licenseeTypeId"
                                            value={values.licenseeTypeId} onChange={handleChange}
                                        >
                                            {settings.licenseeTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Col>
                                        <Form.Check type="checkbox" id="checkbox-overwrite-customerInfo"
                                            htmlFor="checkbox-overwrite-customerInfo"
                                            label={LangHelper.getResource('OverwriteCurrentCRMInfo')}
                                            checked={values.isOverwrite}
                                            onChange={event => setFieldValue('isOverwrite', event.target.checked)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                        <hr className="mt-0" />

                        { this.renderPhoneSection() }
                        { this.renderCustomerInformationSection() }
                        { this.renderCommunicationToolSection() }
                    </div>
                </Collapse>
            </div>
        );
    }
}