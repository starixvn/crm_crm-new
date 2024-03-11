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
            isHostOnCurrentCustomer: false,
            headlineStaffInfoCommunications: []
        };
    }

    componentDidMount() {
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({
                isHostOnCurrentCustomer: response
            });
        });
        this.getHeadlineStaffInfoCommunications();
        this.getOtherAccountCommunicationInfos();
    }

    getHeadlineStaffInfoCommunications() {
        const headlineStaffInfoCommunications = [];
        this.props.customerInfo.headlineStaffInfoCommunications?.map(item => {
            headlineStaffInfoCommunications.push({
                headlineID: item.headlineID,
                picCommunicationId: item.picCommunicationId,
                picCommunicationName: item.picCommunicationName,
                picCommunicationValue: item.picCommunicationValue,
                picID: item.picID
            });
        });
        this.setState({
            headlineStaffInfoCommunications: headlineStaffInfoCommunications
        });
    }

    getOtherAccountCommunicationInfos() {
        const otherAccountCommunicationInfos = [];
        this.props.customerInfo.otherAccountCommunicationInfos?.map(item => {
            otherAccountCommunicationInfos.push({
                communiationName: item.communiationName,
                communicationID: item.communicationID,
                communicationValue: item.communicationValue,
                custId: item.custId
            });
        });
        this.setState({
            otherAccountCommunicationInfos: otherAccountCommunicationInfos
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
            let communicationTools = [];            
            customerInfo.headlineStaffInfoCommunications.map((communication, indexCom) => {
                if (communication.picID === pic.picID) {
                    communicationTools.push({
                        type: communication.picCommunicationId,
                        name: communication.picCommunicationName,
                        value: communication.picCommunicationValue,
                        index: indexCom
                    });
                }
            });
            headlineCommunicationInfo.push({
                picCommunicationTools: communicationTools,
                picId: pic.picID,
                picName: pic.picName
            });
        });
        return headlineCommunicationInfo;
    }   

    handleChangeHeadlineStaffInfoCommunications = (value, index) => {
        const headlineStaffInfoCommunications = this.state.headlineStaffInfoCommunications;
        headlineStaffInfoCommunications[index].picCommunicationValue = value;
        this.setState({ headlineStaffInfoCommunications: headlineStaffInfoCommunications })
        return headlineStaffInfoCommunications;
    }

    handleChangeOtherAccountCommunicationInfos = (value, index) => {
        const otherAccountCommunicationInfos = this.state.otherAccountCommunicationInfos;
        otherAccountCommunicationInfos[index].communicationValue = value;
        this.setState({ otherAccountCommunicationInfos: otherAccountCommunicationInfos })
        return otherAccountCommunicationInfos;
    }

    renderHeadlineAccountCommunication = customerInfo => {
        const headlineCommunicationInfo = this.getHeadlineCommunicationInfo(customerInfo);
        return <>
            {
                headlineCommunicationInfo.map(item => {
                    return <>
                        <p>{item.picName}</p>
                        <div>
                            {
                                item.picCommunicationTools.map((itemCom, indexCom) => {
                                    return <>
                                        <Form.Group>
                                            <Form.Label htmlFor="title">
                                                {itemCom.name}
                                            </Form.Label>
                                            <Form.Control type="text" size="sm" value={itemCom.value} className="shadow-none" autoComplete="off"
                                                onChange={event => {
                                                    this.props.handleChangeValueInfo('headlineStaffInfoCommunications',
                                                        this.handleChangeHeadlineStaffInfoCommunications(event.target.value, itemCom.index));
                                                }}/>
                                        </Form.Group>                                        
                                    </>
                                })
                            }
                        </div>
                    </>
                })
            }
        </>
    }

    renderOtherAccountCommunication = (customerInfo) => {
        return <>
            {
                customerInfo.otherAccountCommunicationInfos.map((item, index) => {
                    return <>
                        <Form.Group>
                            <Form.Label htmlFor="title">
                                {item.communiationName}
                            </Form.Label>
                            <Form.Control type="text" size="sm" value={item.communicationValue} className="shadow-none" autoComplete="off"
                                onChange={event => {
                                    this.props.handleChangeValueInfo('otherAccountCommunicationInfos',
                                        this.handleChangeOtherAccountCommunicationInfos(event.target.value, index));
                                }}/>
                        </Form.Group>
                    </>
                })
            }
        </>
    }

    render() {
        const { customerInfo, handleChange, settings, renderOptions, customerDetail, handleChangeValueInfo, isGuest } = this.props;
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
                    !isGuest && customerDetail.isGroupHeadLine &&
                    this.renderHeadlineAccountCommunication(customerInfo)
                }
                {
                    !isGuest && !customerDetail.isGroupHeadLine &&
                    this.renderOtherAccountCommunication(customerInfo)
                }
                {
                    isGuest && 
                    <p>Add Guest Feedback</p>
                }
            </div>
        );
    }
}

export default CustomerInfo;
