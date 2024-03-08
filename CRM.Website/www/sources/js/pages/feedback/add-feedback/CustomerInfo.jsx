import React, { PureComponent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DateTimeService from '@jsroot/common/dateTimeService';
import { changeSiteSetting, checkHostPermissionOnCurrentCustomer } from '@jsroot/common/shareScripts';

export class CustomerInfo extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            isHostOnCurrentCustomer: false
        };
    }

    componentDidMount() {
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({
                isHostOnCurrentCustomer: response
            });
        });
    }

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

    getHeadlineCommunicationInfo = customerInfo => {
        let headlineCommunicationInfo = [];
        customerInfo.headlineStaffInfoPics.map(pic => {
            let languages = [];
            let communicationTools = [];
            customerInfo.headlineStaffInfoLanguages.map(language => {
                if (language.picID === pic.picID) {
                    languages.push(language.picLanguageID);
                }
            });
            customerInfo.headlineStaffInfoCommunications.map(communication => {
                if (communication.picID === pic.picID) {
                    communicationTools.push({
                        type: communication.picCommunicationId,
                        value: communication.picCommunicationValue,
                        isError: false
                    });
                }
            });
            headlineCommunicationInfo.push({
                country: pic.picCountryID,
                language: languages.join(","),
                picCommunicationTools: communicationTools,
                picId: pic.picID,
                picName: pic.picName,
                picType: pic.picTypeID,
                role: pic.picRoleID,
                roleName: pic.picRoleName,
                isNameError: false,
                isRoleError: false
            });
        });
        return headlineCommunicationInfo;
    }   

    renderHeadlineAccountCommunication = (customerDetail) => {
        //return <>
        //    {
        //        customerDetail.
        //    }
        //</>
    }

    renderOtherAccountCommunication = (customerDetail) => {

    }

    render() {
        const {customerInfo, handleChange, settings, renderOptions, customerDetail, handleChangeValueInfo} = this.props;
        const maxDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));
        const siteOptions = changeSiteSetting(settings.sites, 'childSites', 'childSites');
        const isAddGuestFb = customerInfo.siteId === undefined;
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
                                        OnChangeValue={item => handleChangeValueInfo('siteId', item.id)}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    }
                </Form.Group>
                {
                    customerDetail === null &&
                    <Form.Group as={Row}>
                        <Col sm="8" md="8"/>
                        <Col sm="4" md="4">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="site">
                                    {LangHelper.getResource('Site')}
                                </Form.Label>
                                <Col sm="8" md="8">
                                    <SelectWithSearch
                                        className='basic-single'
                                        options={siteOptions}
                                        value={!isAddGuestFb ? customerInfo.siteId : 0}
                                        name={!isAddGuestFb ? customerInfo.siteName : ''}
                                        isSelectOption={!isAddGuestFb}
                                        isHideNA={!isAddGuestFb}
                                        OnChangeValue={item => handleChangeValueInfo('siteId', item.id)}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                }
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
                <div className="separate">
                    <hr />
                </div>        
                {
                    customerDetail.isGroupHeadLine &&
                    this.renderHeadlineAccountCommunication(customerDetail)
                }
                {
                    !customerDetail.isGroupHeadLine &&
                    this.renderOtherAccountCommunication(customerDetail)
                }
            </div>
        );
    }
}

export default CustomerInfo;
