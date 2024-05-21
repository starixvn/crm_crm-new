import React, { PureComponent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DateTimeService from '@jsroot/common/dateTimeService';
import { changeSiteSetting, checkHostPermissionOnCurrentCustomer, getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class CustomerInfo extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            headlineInfoPolicy: null,
            isHostOnCurrentCustomer: false,
            headlineStaffInfoCommunications: [],
            otherAccountCommunicationInfos: [],
            guestCommunicationInfos: [],
            confirmDeleteCommunicationTool: {
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            }            
        };
    }

    componentDidMount() {
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({isHostOnCurrentCustomer: response});
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
                picID: item.picID,
                isNew: false
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
                communicationName: item.communicationName,
                communicationID: item.communicationID,
                communicationValue: item.communicationValue,
                custId: item.custId,
                isNew: false
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
                picName: pic.picName,
                picRoleName: pic.picRoleName
            });
        });
        return headlineCommunicationInfo;
    }   

    handleChangeValueHeadlineStaffInfoCommunications = (value, index) => {
        const headlineStaffInfoCommunications = this.state.headlineStaffInfoCommunications;
        headlineStaffInfoCommunications[index].picCommunicationValue = value;
        this.setState({ headlineStaffInfoCommunications: headlineStaffInfoCommunications });
        return headlineStaffInfoCommunications;
    }

    handleChangeTypeHeadlineStaffInfoCommunications = (value, index) => {
        const headlineStaffInfoCommunications = this.state.headlineStaffInfoCommunications;
        headlineStaffInfoCommunications[index].picCommunicationId = value;
        this.setState({ headlineStaffInfoCommunications: headlineStaffInfoCommunications });
        return headlineStaffInfoCommunications;
    }

    addNewHeadlineCommunicationTool = index => {
        const headlineStaffInfoCommunications = this.state.headlineStaffInfoCommunications;
        headlineStaffInfoCommunications.push({
            headlineID: headlineStaffInfoCommunications[index].headlineID,
            picCommunicationId : 0,
            picCommunicationName : null,
            picCommunicationValue : null,
            picID: headlineStaffInfoCommunications[index].picID,
            isNew: true
        });
        this.setState({ headlineStaffInfoCommunications: headlineStaffInfoCommunications });
        this.props.handleChangeValueInfo('headlineStaffInfoCommunications', headlineStaffInfoCommunications);
    }

    deleteHeadlineCommunicationTool = indexCom => {
        const data = [...this.state.headlineStaffInfoCommunications];
        data.splice(indexCom, 1);
        this.setState({
            headlineStaffInfoCommunications: data,
            confirmDeleteCommunicationTool: {
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            }
        });
        this.props.handleChangeValueInfo('headlineStaffInfoCommunications', data);
    }

    confirmDeleteHeadlineCommunicationTool = index => {
        if (this.state.headlineStaffInfoCommunications[index].isNew) {
            this.deleteHeadlineCommunicationTool(index);
        }
        else {
            this.setState({
                confirmDeleteCommunicationTool: {
                    show: true,
                    picCommunicationTool: this.props.customerInfo.headlineStaffInfoCommunications[index].picCommunicationId,
                    indexCom: index
                }
            });
        }
    }
       
    renderHeadlineAccountCommunication = customerInfo => {
        const headlineCommunicationInfo = this.getHeadlineCommunicationInfo(customerInfo);
        return <>
            {
                headlineCommunicationInfo.map(item => {
                    return <div key={`pic-${item.picName}-${item.picRoleName}`} className="headline-account-communication">
                            <div className="separate">
                                <hr />
                            </div>
                            <div className="bold">{`${item.picName} (${item.picRoleName})`}</div>
                            <Form.Group as={Row} className="pt-2">
                                {
                                    item.picCommunicationTools.map((itemCom, indexCom) => {
                                        return <>
                                            <Col sm="4" md="4">
                                                <Form.Group as={Row}>
                                                    <div className="custom-label-communicationTool">
                                                        <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="type" id="type"
                                                            style={{
                                                                width: `${itemCom.type !== '' ? this.getWidth(itemCom.type, this.props.settingCommunicationTool) : 115}px`
                                                            }}
                                                            value={itemCom.type} onChange={event => {
                                                                this.props.handleChangeValueInfo('headlineStaffInfoCommunications',
                                                                    this.handleChangeTypeHeadlineStaffInfoCommunications(parseInt(event.target.value, 10), itemCom.index));
                                                            }}>
                                                            <option value="0" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                            {this.props.settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                                        </Form.Control>
                                                    </div>
                                                    <Col sm="8" md="8">
                                                        <div className='field-icon comm-tool'>
                                                            <textarea type="text" size="sm" maxLength="200" value={itemCom.value} className="shadow-none textarea-communication-tool" autoComplete="off"
                                                                onChange={event => {
                                                                    this.props.handleChangeValueInfo('headlineStaffInfoCommunications',
                                                                        this.handleChangeValueHeadlineStaffInfoCommunications(event.target.value, itemCom.index));
                                                                }} />
                                                            {
                                                                this.state.isHostOnCurrentCustomer && item.picCommunicationTools.length > 1 &&
                                                                <div title='Delete communication tool'
                                                                    className='icon icon-delete' onClick={() => { this.confirmDeleteHeadlineCommunicationTool(itemCom.index); }}>
                                                                </div>
                                                            }
                                                            {
                                                                this.state.isHostOnCurrentCustomer && indexCom === (item.picCommunicationTools.length - 1) &&
                                                                <div title='Add communication tool'
                                                                    className='icon icon-plus' onClick={() => { this.addNewHeadlineCommunicationTool(itemCom.index); }}>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                        </>
                                    })
                                }
                            </Form.Group>
                        </div>
                })
            }
        </>
    }

    handleChangeOtherAccountCommunicationInfos = (value, index) => {
        const otherAccountCommunicationInfos = this.state.otherAccountCommunicationInfos;
        otherAccountCommunicationInfos[index].communicationValue = value;
        this.setState({ otherAccountCommunicationInfos: otherAccountCommunicationInfos });
        return otherAccountCommunicationInfos;
    }

    handleChangeTypeOtherAccountCommunicationInfos = (value, index) => {
        const otherAccountCommunicationInfos = this.state.otherAccountCommunicationInfos;
        otherAccountCommunicationInfos[index].communicationID = value;
        this.setState({ otherAccountCommunicationInfos: otherAccountCommunicationInfos });
        return otherAccountCommunicationInfos;
    }

    addNewOtherCommunicationTool = () => {
        const otherAccountCommunicationInfos = this.state.otherAccountCommunicationInfos;
        otherAccountCommunicationInfos.push({
            communicationName: null,
            communicationID: 0,
            communicationValue: null,
            custId: this.props.customerDetail.custId,
            isNew: true
        });
        this.setState({ otherAccountCommunicationInfos: otherAccountCommunicationInfos });
        this.props.handleChangeValueInfo('otherAccountCommunicationInfos', otherAccountCommunicationInfos);
    }

    deleteOtherCommunicationTool = indexCom => {
        const data = [...this.state.otherAccountCommunicationInfos];
        data.splice(indexCom, 1);
        this.setState({
            otherAccountCommunicationInfos: data,
            confirmDeleteCommunicationTool: {
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            }
        });
        this.props.handleChangeValueInfo('otherAccountCommunicationInfos', data);
    }

    confirmOtherHeadlineCommunicationTool = index => {
        if (this.state.otherAccountCommunicationInfos[index].isNew) {
            this.deleteOtherCommunicationTool(index);
        }
        else {
            this.setState({
                confirmDeleteCommunicationTool: {
                    show: true,
                    picCommunicationTool: this.props.customerInfo.otherAccountCommunicationInfos[index]?.communicationID,
                    indexCom: index
                }
            });
        }
    }

    renderOtherAccountCommunication = (customerInfo) => {
        return <div className="normal-account-communication">
            <div className="separate">
                <hr />
            </div>
            <Form.Group as={Row} className="pt-2">
                {
                    customerInfo.otherAccountCommunicationInfos.map((item, index) => {
                        return <>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <div className="custom-label-communicationTool">
                                        <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="type" id="type"
                                            style={{
                                                width: `${item.communicationID !== '' ? this.getWidth(item.communicationID, this.props.settingCommunicationTool) : 115}px`
                                            }}
                                            value={item.communicationID} onChange={event => {
                                                this.props.handleChangeValueInfo('otherAccountCommunicationInfos',
                                                    this.handleChangeTypeOtherAccountCommunicationInfos(parseInt(event.target.value, 10), index));
                                            }}>
                                            <option value="0" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                            {this.props.settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                        </Form.Control>
                                    </div>
                                    <Col sm="8" md="8">
                                        <div className='field-icon comm-tool'>
                                            <textarea type="text" size="sm" maxLength="200" value={item.communicationValue} className="shadow-none textarea-communication-tool" autoComplete="off"
                                                onChange={event => {
                                                    this.props.handleChangeValueInfo('otherAccountCommunicationInfos',
                                                        this.handleChangeOtherAccountCommunicationInfos(event.target.value, index));
                                                }} />
                                            {
                                                this.state.isHostOnCurrentCustomer && customerInfo.otherAccountCommunicationInfos.length > 1 &&
                                                <div title='Delete communication tool'
                                                    className='icon icon-delete' onClick={() => { this.confirmOtherHeadlineCommunicationTool(index); } }>
                                                </div>
                                            }
                                            {
                                                this.state.isHostOnCurrentCustomer && index === (customerInfo.otherAccountCommunicationInfos.length - 1) &&
                                                <div title='Add communication tool'
                                                        className='icon icon-plus' onClick={() => { this.addNewOtherCommunicationTool(); } }>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </>
                    })
                }
            </Form.Group>
        </div>
    }

    getWidth = (type, settingCommunicationTool) =>
        (8 * settingCommunicationTool.find(x => x.settingId === type)?.settingValue.length) + 20;

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    handleChangeGuestCommunicationInfo = (name, value, index) => {
        let { guestCommunicationInfos } = this.state;
        guestCommunicationInfos[index][name] = value;
        this.setState({ guestCommunicationInfos: guestCommunicationInfos });
        this.props.setFieldValue('guestCommunicationInfos', guestCommunicationInfos);
        this.props.handleChangeValueInfo('guestCommunicationInfos', guestCommunicationInfos);
    }

    addNewGuestCommunicationTool = () => {
        let { guestCommunicationInfos } = this.state;
        guestCommunicationInfos.push({
            communicationID: '',
            value: '',
            isError: false
        });
        this.setState({ guestCommunicationInfos: guestCommunicationInfos });
        this.props.handleChangeValueInfo('guestCommunicationInfos', guestCommunicationInfos);
    }

    deleteGuestCommunicationTool = (value, type) => {
        const data = [...this.state.guestCommunicationInfos];
        const index = data.findIndex(comTool => comTool.communicationID === type && comTool.communicationValue === value);
        data.splice(index, 1);
        this.setState({ guestCommunicationInfos: data });
        this.props.handleChangeValueInfo('guestCommunicationInfos', data);
        this.props.setFieldValue('guestCommunicationInfos', data);
    }

    renderGuestCommunication () {
        const { guestCommunicationInfos } = this.state;
        const { settingCommunicationTool, touched, errors } = this.props;
        return <>
            <div className="separate">
                <hr />
            </div>
            <div className="add-comm-tool">
                <Button className='btn-add' variant="primary" size="sm" onClick={this.addNewGuestCommunicationTool}>
                    {LangHelper.getResource('AddCommunicationTool')}
                </Button>
                <div>
                    {
                        guestCommunicationInfos.length !== 0 && 
                        <Form.Group as={Row}>
                            {
                                guestCommunicationInfos.map((picCommunicationTool, index) => {
                                    return <>
                                        <Col sm="4" md="4">
                                            <Form.Group as={Row}>
                                                <div className="custom-label-communicationTool">
                                                    <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="CommunicationID" id="CommunicationID"
                                                        style={{
                                                            width: `${picCommunicationTool.communicationID !== '' ? this.getWidth(picCommunicationTool.communicationID, this.props.settingCommunicationTool) : 115}px`
                                                        }}
                                                        value={picCommunicationTool.communicationID} onChange={event => {
                                                            this.handleChangeGuestCommunicationInfo('communicationID', parseInt(event.target.value, 10), index);
                                                        }}>
                                                        <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                        {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                                    </Form.Control>
                                                </div>
                                                <Col sm="8" md="8" className="guest-communication-value">
                                                    <Form.Control type="text" size="sm" value={picCommunicationTool.communicationValue} className="shadow-none" autoComplete="off"
                                                        isInvalid={picCommunicationTool.isError && touched.guestCommunicationInfos && errors.guestCommunicationInfos}
                                                        onChange={event => {
                                                            this.handleChangeGuestCommunicationInfo('communicationValue', event.target.value, index);
                                                        }} />
                                                    <div onClick={() => { this.deleteGuestCommunicationTool(picCommunicationTool.communicationValue, picCommunicationTool.communicationID); }}
                                                        className='icon icon-delete' title={LangHelper.getResource('DeleteCommunicationTool')}>
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </>
                                })
                            }
                        </Form.Group>
                    }                    
                </div>
            </div>
        </>
    }

    renderComfirmDeleteCommunicationTool() {
        const { settingCommunicationTool } = this.props;
        const communicationToolIndex = settingCommunicationTool.findIndex(x => x.settingId === this.state.confirmDeleteCommunicationTool.picCommunicationTool);
        return <>
            <div className="confirm-headline">Are you going to delete the <strong>{settingCommunicationTool[communicationToolIndex].settingValue}</strong> communication tool?</div>
        </>
    }

    handleDeleteCommunicationTool(isGuest, customerDetail) {
        if (!isGuest && customerDetail.isGroupHeadLine && this.state.headlineInfoPolicy >= Policy.Read) {
            this.deleteHeadlineCommunicationTool(this.state.confirmDeleteCommunicationTool.indexCom);
        }
        else if (!isGuest && !customerDetail.isGroupHeadLine) {
            this.deleteOtherCommunicationTool(this.state.confirmDeleteCommunicationTool.indexCom);
        }
    }

    render() {
        const { customerInfo, handleChange, settings, renderOptions, customerDetail, handleChangeValueInfo, isGuest } = this.props;
        const maxDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));
        const siteOptions = changeSiteSetting(settings.sites, 'childSites', 'childSites');
        const isAddGuestFb = customerInfo.siteId === undefined;
        const isDisplayOverrideCustInfo = this.state.isHostOnCurrentCustomer;
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
                {
                    customerDetail !== null && isDisplayOverrideCustInfo &&
                    <Form.Group as={Row} className="pt-1 pb-2">
                        <Col sm="3" md="3">
                            <Form.Check type="checkbox" id="check-box-overwrite" label={LangHelper.getResource('OverwriteCurrentAccountDetails')}
                                htmlFor="check-box-overwrite" checked={customerInfo.isOverwriteInfo}
                                onChange={() => handleChangeValueInfo('isOverwriteInfo', !customerInfo.isOverwriteInfo)}
                            />
                        </Col>
                    </Form.Group>
                }
                {
                    !isGuest && customerDetail.isGroupHeadLine && this.state.headlineInfoPolicy >= Policy.Read &&
                    this.renderHeadlineAccountCommunication(customerInfo)
                }
                {
                    !isGuest && !customerDetail.isGroupHeadLine &&
                    this.renderOtherAccountCommunication(customerInfo)
                }
                {
                    isGuest && 
                    this.renderGuestCommunication()
                }
                {
                    this.state.confirmDeleteCommunicationTool.show &&
                    <ConfirmPopup
                        className='confirm-headline-modal'
                        title={LangHelper.getResource('ConfirmDeleteCommunicationTool')}
                        content={this.renderComfirmDeleteCommunicationTool()}
                        size='lg'
                        onSubmit={() => {
                            this.handleDeleteCommunicationTool(isGuest, customerDetail);
                        }}
                        onClose={() => {
                            this.setState({
                                confirmDeleteCommunicationTool: {
                                    show: false,
                                    picCommunicationTool: null,
                                    indexCom: -1
                                }
                            });
                        }}
                    />
                }
            </div>
        );
    }
}

export default CustomerInfo;
