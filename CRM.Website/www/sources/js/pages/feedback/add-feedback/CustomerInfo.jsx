import React, { PureComponent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DateTimeService from '@jsroot/common/dateTimeService';
import { changeSiteSetting } from '@jsroot/common/shareScripts';

export class CustomerInfo extends PureComponent{
    renderCustomerInformation = (customerInfo, handleChange) => {
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="fax">{LangHelper.getResource('Fax')}</Form.Label>
                            <Col md="8" sm="8">
                                <div className="d-flex">
                                    <div className="code-country">
                                        <Form.Control type="text" size="sm" value={customerInfo.faxCountryCode}
                                            name="faxCountryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" value={customerInfo.faxAreaCode}
                                            className="shadow-none" autoComplete="off" name="faxAreaCode" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.faxNumber}
                                            autoComplete="off" name="faxNumber" className="shadow-none" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="mobile">{LangHelper.getResource('Mobile')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="code-country">
                                        <Form.Control type="text" size="sm" value={customerInfo.mobileCountryCode}
                                            name="mobileCountryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" value={customerInfo.mobileAreaCode}
                                            name="mobileAreaCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.mobilePhoneNumber}
                                            onChange={handleChange} name="mobilePhoneNumber" className="shadow-none" autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="pic1">{LangHelper.getResource('PIC1')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic1Name}
                                            name="pic1Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic1PhoneNumber}
                                            name="pic1PhoneNumber" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="pic2" md="4" column sm="4" >{LangHelper.getResource('PIC2')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic2Name}
                                            name="pic2Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic2PhoneNumber}
                                            name="pic2PhoneNumber" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}><Form.Label htmlFor="pic3" column sm="4" md="4" >{LangHelper.getResource('PIC3')}</Form.Label>
                            <Col sm="8" md="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic3Name}
                                            name="pic3Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic3PhoneNumber}
                                            name="pic3PhoneNumber" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="pic4" column md="4" sm="4">{LangHelper.getResource('PIC4')}</Form.Label>
                            <Col md="8" sm="8">
                                <div className="d-flex">
                                    <div className="picName">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic4Name}
                                            name="pic4Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={customerInfo.pic4PhoneNumber}
                                            name="pic4PhoneNumber" className="shadow-none" autoComplete="off" onChange={handleChange}
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

    renderCommunicationToolCustomer = (customerInfo, handleChange) => {
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="skype" column sm="4" md="4">{LangHelper.getResource('Skype')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.skype}
                                    name="skype" id="skype" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="email" column sm="4" md="4">{LangHelper.getResource('Email')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.email}
                                    name="email" id="email" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="telegram" column sm="4" md="4">{LangHelper.getResource('Telegram')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.telegram}
                                    name="telegram" id="telegram" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}><Form.Label htmlFor="weChat" column sm="4" md="4">{LangHelper.getResource('WeChat')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.weChat}
                                    name="weChat" id="weChat" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="whatApp" column sm="4" md="4">{LangHelper.getResource('WhatApp')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.whatApp}
                                    name="whatApp" id="whatApp" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="line" column sm="4" md="4">{LangHelper.getResource('Line')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.line}
                                    name="line" id="line" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}><Form.Label htmlFor="letstalk" column sm="4" md="4">{LangHelper.getResource('Letstalk')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.letstalk}
                                    name="letstalk" id="letstalk" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="qq" column sm="4" md="4">{LangHelper.getResource('QQ')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.qq}
                                    name="qq" id="qq" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="zalo" column sm="4" md="4">{LangHelper.getResource('Zalo')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={customerInfo.zalo}
                                    name="zalo" id="zalo" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderContact = (customerInfo, handleChange) =>{
        return (
            <Form.Group as={Row}>
                <Col sm="4" md="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="phone1">{LangHelper.getResource('Phone1')}</Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={customerInfo.countryCode}
                                        name="countryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={customerInfo.areaCode}
                                        name="areaCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={customerInfo.phoneNumber}
                                        className="shadow-none" autoComplete="off" onChange={handleChange} name="phoneNumber"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col md="4" sm="4">
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="4" htmlFor="phone2">{LangHelper.getResource('Phone2')}</Form.Label>
                        <Col md="8" sm="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={customerInfo.countryCode2}
                                        name="countryCode2" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={customerInfo.areaCode2}
                                        name="areaCode2" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={customerInfo.phoneNumber2}
                                        name="phoneNumber2" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="4" md="4">
                    <Form.Group as={Row}><Form.Label htmlFor="phone3" column sm="4" md="4" >{LangHelper.getResource('Phone3')}</Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={customerInfo.countryCode3}
                                        name="countryCode3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={customerInfo.areaCode3}
                                        name="areaCode3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={customerInfo.phoneNumber3}
                                        name="phoneNumber3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
            </Form.Group>
        );
    };

    renderLicenseeType = (customerInfo, handleChange) => (
        <Col sm="4" md="4">
            <Form.Group as={Row}>
                <Form.Label column sm="4" md="4" htmlFor="licenseeType">
                    {LangHelper.getResource('LicenseeType')}
                </Form.Label>
                <Col sm="8" md="8">
                    <Form.Control as="select" size="sm" className="shadow-none"
                        name="licenseeType" id="licenseeType" value={customerInfo.licenseeType} onChange={handleChange}
                    >
                        <option value='' hidden disabled />
                        {this.props.settings.licenseeTypes.map(item => this.props.renderOptions(item.name, item.id))}
                    </Form.Control>
                </Col>
            </Form.Group>
        </Col>
    );

    render() {
        const {customerInfo, handleChange, settings, renderOptions, customerDetail, handleChangeValueInfo} = this.props;
        const maxDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));
        const siteOptions = changeSiteSetting(settings.sites, 'childSites', 'childSites');
        return (
            <div>
                <Form.Group as={Row} className="pt-2" >
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="title">
                                {LangHelper.getResource('Title')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="title" id="title" value={customerInfo.title} onChange={handleChange}
                                >
                                    <option value="Mr" hidden disabled />
                                    {settings.titles.map(value => renderOptions(value.value, value.id))}
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
                                <Form.Control type="text" size="sm" value={customerInfo.firstName}
                                    name="firstName" id="firstName" className="shadow-none" autoComplete="off"
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
                                <Form.Control type="text" size="sm" value={customerInfo.lastName}
                                    name="lastName" id="lastName" className="shadow-none" autoComplete="off"
                                    onChange={handleChange}
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
                            <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    useShortMonthInDropdown
                                    selected={customerInfo.birthday}
                                    maxDate={maxDate}
                                    onChange={value => handleChangeValueInfo('birthday', value)}
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
                                <Form.Control type="text" size="sm" value={customerInfo.passportNo}
                                    name="passportNo" id="passportNo" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {
                        customerDetail === null ?
                        this.renderLicenseeType(customerInfo, handleChange)
                        :
                        <Col sm="4" md="4">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="site">
                                    {LangHelper.getResource('Site')}
                                </Form.Label>
                                <Col sm="8" md="8">
                                    <SelectWithSearch
                                        className='basic-single'
                                        options={siteOptions}
                                        value={customerInfo.siteId}
                                        name={customerInfo.siteName}
                                        isSelectOption
                                        isHideNA
                                        OnChangeValue={item => handleChangeValueInfo('siteId', item.id)}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    }
                </Form.Group>
                {
                    customerDetail !== null &&
                    <Form.Group as={Row}>
                        <Col sm="4" md="4">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="birthday">
                                    {LangHelper.getResource('RefCodes')}
                                </Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control type="text" size="sm" value={customerInfo.refCodes}
                                        name="refCodes" id="refCodes" className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm="4" md="4">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="secretCode">
                                    {LangHelper.getResource('SecretCode')}
                                </Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control type="text" size="sm" value={customerInfo.secretCode}
                                        name="secretCode" id="secretCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        {this.renderLicenseeType(customerInfo, handleChange)}
                    </Form.Group>
                }
                {
                    customerDetail !== null &&
                    <Form.Group as={Row} className="pt-1 pb-2">
                        <Col sm="3" md="3">
                            <Form.Check type="checkbox" id="check-box-overwrite" label={LangHelper.getResource('OverwriteCurrentCRMInfo')}
                                htmlFor="check-box-overwrite" checked={customerInfo.isOverwriteInfo}
                                onChange={() => handleChangeValueInfo('isOverwriteInfo', !customerInfo.isOverwriteInfo)}
                            />
                        </Col>
                    </Form.Group>
                }
                <div className="separate">
                    <hr />
                </div>
                {
                    this.renderContact(customerInfo, handleChange)
                }
                {
                    this.renderCustomerInformation(customerInfo, handleChange)
                }
                {
                    this.renderCommunicationToolCustomer(customerInfo, handleChange)
                }
            </div>
        );
    }
}

export default CustomerInfo;
