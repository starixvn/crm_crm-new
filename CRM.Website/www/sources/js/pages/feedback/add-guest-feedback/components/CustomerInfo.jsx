import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
export class CustomerInfo extends Component {
    constructor(props) {
        super(props);
    }
    renderCustomerInformation = (values, handleChange) => {
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="fax">{LangHelper.getResource('Fax')}</Form.Label>
                            <Col md="8" sm="8">
                                <div className="d-flex">
                                    <div className="code-country">
                                        <Form.Control type="text" size="sm" value={values.faxCountryCode}
                                            name="faxCountryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" value={values.faxAreaCode}
                                            className="shadow-none" autoComplete="off" name="faxAreaCode" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.faxNumber}
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
                                        <Form.Control type="text" size="sm" value={values.mobileCountryCode}
                                            name="mobileCountryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="code-area">
                                        <Form.Control type="text" size="sm" value={values.mobileAreaCode}
                                            name="mobileAreaCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.mobilePhoneNumber}
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
                                        <Form.Control type="text" size="sm" value={values.pic1Name}
                                            name="pic1Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.pic1PhoneNumber}
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
                                        <Form.Control type="text" size="sm" value={values.pic2Name}
                                            name="pic2Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.pic2PhoneNumber}
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
                                        <Form.Control type="text" size="sm" value={values.pic3Name}
                                            name="pic3Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.pic3PhoneNumber}
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
                                        <Form.Control type="text" size="sm" value={values.pic4Name}
                                            name="pic4Name" className="shadow-none" autoComplete="off" onChange={handleChange}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm" value={values.pic4PhoneNumber}
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

    renderCommunicationToolCustomer = (values, handleChange) => {
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="skype" column sm="4" md="4">{LangHelper.getResource('Skype')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.skype}
                                    name="skype" id="skype" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="email" column sm="4" md="4">{LangHelper.getResource('Email')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.email}
                                    name="email" id="email" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="telegram" column sm="4" md="4">{LangHelper.getResource('Telegram')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.telegram}
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
                                <Form.Control type="text" size="sm" value={values.weChat}
                                    name="weChat" id="weChat" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="whatApp" column sm="4" md="4">{LangHelper.getResource('WhatApp')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.whatApp}
                                    name="whatApp" id="whatApp" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="line" column sm="4" md="4">{LangHelper.getResource('Line')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.line}
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
                                <Form.Control type="text" size="sm" value={values.letstalk}
                                    name="letstalk" id="letstalk" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="qq" column sm="4" md="4">{LangHelper.getResource('QQ')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.qq}
                                    name="qq" id="qq" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="zalo" column sm="4" md="4">{LangHelper.getResource('Zalo')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={values.zalo}
                                    name="zalo" id="zalo" className="shadow-none" autoComplete="off" onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };


    render() {
        const {values, handleChange, setFieldValue, settings, maxDate, renderOptions} = this.props;
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
                                    name="title" id="title" value={values.title} onChange={handleChange}
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
                                <Form.Control type="text" size="sm" value={values.firstName}
                                    name="firstName" id="firstName" className="shadow-none" autoComplete="off" onChange={handleChange}
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
                                    name="lastName" id="lastName" className="shadow-none" autoComplete="off" onChange={handleChange}
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
                                    selected={values.birthday}
                                    maxDate={maxDate}
                                    onChange={value => setFieldValue('birthday', value)}
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
                                    name="passportNo" id="passportNo" className="shadow-none" autoComplete="off" onChange={handleChange}
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
                                    name="licenseeType" id="licenseeType" value={values.licenseeType} onChange={handleChange}
                                >
                                    <option value='' hidden disabled />
                                    {settings.licenseeTypes.map(item => renderOptions(item.name, item.id))}
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
                        <Form.Label column sm="4" md="4" htmlFor="phone1">{LangHelper.getResource('Phone1')}</Form.Label>
                        <Col sm="8" md="8">
                            <div className="d-flex">
                                <div className="code-country">
                                    <Form.Control type="text" size="sm" value={values.countryCode}
                                        name="countryCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode}
                                        name="areaCode" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber}
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
                                    <Form.Control type="text" size="sm" value={values.countryCode2}
                                        name="countryCode2" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode2}
                                        name="areaCode2" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber2}
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
                                    <Form.Control type="text" size="sm" value={values.countryCode3}
                                        name="countryCode3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="code-area">
                                    <Form.Control type="text" size="sm" value={values.areaCode3}
                                        name="areaCode3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                                <div className="phone">
                                    <Form.Control type="text" size="sm" value={values.phoneNumber3}
                                        name="phoneNumber3" className="shadow-none" autoComplete="off" onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Col>
                </Form.Group>
                {
                    this.renderCustomerInformation(values, handleChange)
                }
                {
                    this.renderCommunicationToolCustomer(values, handleChange)
                }
            </div>
        );
    }
}

export default CustomerInfo;
