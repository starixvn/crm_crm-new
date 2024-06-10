import React, { PureComponent } from 'react';
import { Col, Form, Row, Collapse, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { changeSiteSetting, getPermission, checkHostPermissionOnCurrentCustomer, checkHostPermissionPicAssign } from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { Link } from 'react-router-dom';

export default class CustomerInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            picAssignmentPolicy: null,
            latestFeedbackCommunicationTools: [],
            isHostOnCurrentCustomer: false,
            headlineInfoPolicy: null,
            confirmDeleteCommunicationTool: {
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            }
        };
    }

    componentDidMount() {
        this.setState({ latestFeedbackCommunicationTools: this.props.fieldInput.latestFeedbackCommunicationTools });
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({ isHostOnCurrentCustomer: response });
        });
        checkHostPermissionPicAssign().then(response => {
            this.setState({ picAssignmentPolicy: response });
        });
    }

    getLatestFeedbackCommunicationTools = newCommunicationTools => {
        let latestFeedbackCommunicationTools = [];
        newCommunicationTools?.map(pic => {
            let communicationTools = [];
            if (latestFeedbackCommunicationTools.findIndex(x => x.picInfo === pic.picInfo) === -1) {
                newCommunicationTools?.map((communication, indexCom) => {
                    if (communication.picInfo === pic.picInfo) {
                        communicationTools.push({
                            communicationID: communication.communicationID,
                            communicationName: communication.communicationName,
                            communicationValue: communication.communicationValue,
                            indexCom: indexCom,
                            isNew: communication.isNew,
                            isError: communication.isError
                        });
                    }
                });
                latestFeedbackCommunicationTools.push({
                    picCommunicationTools: communicationTools,
                    picInfo: pic.picInfo,
                    isHeadline: pic.isHeadline,
                    custID: pic.custID,
                    feedbackID: pic.feedbackID
                });
            }
        });
        return latestFeedbackCommunicationTools;
    }

    handleChangeCommunicationTools = (name, value, index) => {
        const latestFeedbackCommunicationTools = this.state.latestFeedbackCommunicationTools;
        latestFeedbackCommunicationTools[index][name] = value;
        this.setState({ latestFeedbackCommunicationTools: latestFeedbackCommunicationTools });
        const params = {
            target: {
                name: 'latestFeedbackCommunicationTools',
                value: latestFeedbackCommunicationTools
            }
        };
        this.props.setFieldValue('latestFeedbackCommunicationTools', latestFeedbackCommunicationTools);
        this.props.handleChangeInput(params);
    }

    addNewHeadlineCommunicationTools = pic => {
        const latestFeedbackCommunicationTools = this.state.latestFeedbackCommunicationTools;
        latestFeedbackCommunicationTools.push({
            communicationID: 0,
            communicationName: '',
            communicationValue: '',
            custID: pic.custID,
            feedbackID: pic.feedbackID,
            isHeadline: pic.isHeadline,
            picInfo: pic.picInfo,
            isNew: true
        });
        this.setState({ latestFeedbackCommunicationTools: latestFeedbackCommunicationTools });
        this.props.setFieldValue('latestFeedbackCommunicationTools', latestFeedbackCommunicationTools);
        this.props.handleChangeInput({
            target: {
                name: 'latestFeedbackCommunicationTools',
                value: latestFeedbackCommunicationTools
            }
        });
    }

    deleteHeadlineCommunicationTool = indexCom => {
        const data = [...this.state.latestFeedbackCommunicationTools];
        data.splice(indexCom, 1);
        this.setState({
            latestFeedbackCommunicationTools: data,
            confirmDeleteCommunicationTool: {
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            }
        });
        this.props.setFieldValue('latestFeedbackCommunicationTools', data);
        this.props.handleChangeInput({
            target: {
                name: 'latestFeedbackCommunicationTools',
                value: data
            }
        });
    }

    confirmDeleteHeadlineCommunicationTool = index => {
        const { latestFeedbackCommunicationTools } = this.state;
        if (latestFeedbackCommunicationTools[index].isNew) {
            this.deleteHeadlineCommunicationTool(index);
        }
        else {
            this.setState({
                confirmDeleteCommunicationTool: {
                    show: true,
                    picCommunicationTool: latestFeedbackCommunicationTools[index].communicationID,
                    indexCom: index
                }
            });
        }
    }

    getWidth = (type, settingCommunicationTool) =>
        (8 * settingCommunicationTool.find(x => x.settingId === type)?.settingValue.length) + 20;

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    renderHeadlineCommunicationTools(latestFeedbackCommunicationTools) {
        const communicationTools = this.getLatestFeedbackCommunicationTools(latestFeedbackCommunicationTools);
        const { touched, errors, hasCreateFeedbackPermission } = this.props;        
        return <>
            {
                latestFeedbackCommunicationTools.length === 0 && 
                <div className="none-communication-tool">
                    <div>{LangHelper.getResource('NoCommunicationInfo')}</div>
                    <span>{LangHelper.getResource('AddHeadlineCommunicationToolNoneData')}</span>
                    <Link to='/PicOfHeadline' onClick={() => {
                        if (latestFeedbackCommunicationTools.length === 0) {
                            window.assignPIC = {
                                username: this.props.customerInfo.username
                            };
                        }
                    }} className="add-communication-tool">Assign PIC</Link>
                </div>
            }
            {
                communicationTools.map((item, indexCom) => {
                    return <div key={`pic-${item.picInfo}`} className="headline-account-communication">
                        {
                            indexCom !== 0 &&
                            <div className="separate">
                                <hr />
                            </div>
                        }
                        <div className="bold">{item.picInfo}</div>
                        <Form.Group as={Row} className="pt-2">
                            {
                                item.picCommunicationTools.map((itemCom, index) => {
                                    return <>
                                        <Col sm="4" md="4">
                                            <Form.Group as={Row}>
                                                <div className="custom-label-communicationTool">
                                                    <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="type" id="type"
                                                        style={{
                                                            width: `${itemCom.communicationID !== '' ? this.getWidth(itemCom.communicationID, this.props.settingCommunicationTool) : 115}px`
                                                        }}
                                                        value={itemCom.communicationID} onChange={event => {
                                                            this.handleChangeCommunicationTools('communicationID', parseInt(event.target.value, 10), itemCom.indexCom);
                                                        }}>
                                                        <option value="0" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                        {this.props.settingCommunicationTool.map(setting => this.renderOptions(setting.settingValue, setting.settingId))}
                                                    </Form.Control>
                                                </div>
                                                <Col sm="8" md="8">
                                                    <div className='field-icon comm-tool'>
                                                        <textarea type="text" size="sm" value={itemCom.communicationValue} autoComplete="off"
                                                            placeholder={LangHelper.getResource('SeparatedByComma')}
                                                            className={`textarea-communication-tool shadow-none 
                                                                ${itemCom.isError && touched.latestFeedbackCommunicationTools && errors.latestFeedbackCommunicationTools && 'invalid'}`}
                                                            onChange={event => {
                                                                this.handleChangeCommunicationTools('communicationValue', event.target.value, itemCom.indexCom);
                                                            }} />
                                                        {
                                                            hasCreateFeedbackPermission && item.picCommunicationTools.length > 1 &&
                                                            <div title='Delete communication tool'
                                                                className='icon icon-delete' onClick={() => { this.confirmDeleteHeadlineCommunicationTool(itemCom.indexCom); }}>
                                                            </div>
                                                        }
                                                        {
                                                            hasCreateFeedbackPermission && index === (item.picCommunicationTools.length - 1) &&
                                                            <div title='Add communication tool'
                                                                className='icon icon-plus' onClick={() => { this.addNewHeadlineCommunicationTools(item); }} >
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

    renderNoneHeadlineCommunicationTools(latestFeedbackCommunicationTools) {
        const { touched, errors, customerInfo, feedback, hasCreateFeedbackPermission } = this.props;
        const picInfo = {
            custID: customerInfo.custId,
            feedbackID: feedback.feedbackId,
            isHeadline: customerInfo.isGroupHeadLine,
            picInfo: ''
        };
        return <>
            <div className="normal-account-communication">
                {
                    hasCreateFeedbackPermission &&
                    <Button className='btn-add' variant="primary" size="sm" onClick={() => { this.addNewHeadlineCommunicationTools(picInfo); }}>
                        {LangHelper.getResource('AddCommunicationTool')}
                    </Button>
                }
                {
                    latestFeedbackCommunicationTools.length === 0 &&
                    <div>
                        <div className="none-normal-communication-tool">
                            <div>{LangHelper.getResource('NoCommunicationInfo')}</div>
                            {
                                hasCreateFeedbackPermission &&
                                <>
                                    <span>{LangHelper.getResource('AddCommunicationToolNoneData')}</span>
                                    <span className="add-communication-tool" onClick={() => { this.addNewHeadlineCommunicationTools(picInfo); }}>{`Add Communication Tool`}</span>
                                </>
                            }
                        </div>
                    </div>
                }
                {
                    latestFeedbackCommunicationTools.length > 0 &&
                    <Form.Group as={Row} className="pt-2">
                        {
                            latestFeedbackCommunicationTools.map((item, index) => {
                                return <>
                                    <Col sm="4" md="4">
                                        <Form.Group as={Row}>
                                            <div className="custom-label-communicationTool">
                                                <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="type" id="type"
                                                    style={{
                                                        width: `${item.communicationID !== '' ? this.getWidth(item.communicationID, this.props.settingCommunicationTool) : 115}px`
                                                    }}
                                                    value={item.communicationID} onChange={event => {
                                                        this.handleChangeCommunicationTools('communicationID', parseInt(event.target.value, 10), index);
                                                    }}>
                                                    <option value="0" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                    {this.props.settingCommunicationTool.map(setting => this.renderOptions(setting.settingValue, setting.settingId))}
                                                </Form.Control>
                                            </div>
                                            <Col sm="8" md="8">
                                                <div className='field-icon comm-tool'>
                                                    <textarea type="text" size="sm" value={item.communicationValue} autoComplete="off"
                                                        placeholder={LangHelper.getResource('SeparatedByComma')}
                                                        className={`textarea-communication-tool shadow-none 
                                                                    ${item.isError && touched.latestFeedbackCommunicationTools && errors.latestFeedbackCommunicationTools && 'invalid'}`}
                                                        onChange={event => {
                                                            this.handleChangeCommunicationTools('communicationValue', event.target.value, index);
                                                        }} />
                                                    {
                                                        hasCreateFeedbackPermission &&
                                                        <div title='Delete communication tool'
                                                            className='icon icon-delete' onClick={() => { this.confirmDeleteHeadlineCommunicationTool(index); }}>
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
                }
            </div>
        </>
    }

    renderNewCommunicationTool() {
        const { latestFeedbackCommunicationTools, headlineInfoPolicy } = this.state;

        return <>
            {
                this.props.customerInfo?.isGroupHeadLine && headlineInfoPolicy >= Policy.Read &&
                this.renderHeadlineCommunicationTools(latestFeedbackCommunicationTools)
            }
            {
                !this.props.customerInfo?.isGroupHeadLine &&
                this.renderNoneHeadlineCommunicationTools(latestFeedbackCommunicationTools)
            }
        </>
    }

    renderPhoneSection = () => {
        const { fieldInput, handleChangeInput } = this.props;
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
                                            value={fieldInput.countryCode1} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode1" className="shadow-none" autoComplete="off"
                                            value={fieldInput.areaCode1} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber1" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phoneNumber1} onChange={handleChangeInput}
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
                                            value={fieldInput.countryCode2} onChange={handleChangeInput}
                                            name="countryCode2" className="shadow-none" autoComplete="off"
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode2" className="shadow-none" autoComplete="off"
                                            value={fieldInput.areaCode2} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber2" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phoneNumber2} onChange={handleChangeInput} />
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
                                            value={fieldInput.countryCode3} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="areaCode3" className="shadow-none" autoComplete="off"
                                            value={fieldInput.areaCode3} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phoneNumber3" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phoneNumber3} onChange={handleChangeInput}
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

    renderCustomerInformationSection = () => {
        const { fieldInput, handleChangeInput } = this.props;
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
                                            value={fieldInput.faxCountryCode} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="faxAreaCode" className="shadow-none" autoComplete="off"
                                            value={fieldInput.faxAreaCode} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="faxNumber" className="shadow-none" autoComplete="off"
                                            value={fieldInput.faxNumber} onChange={handleChangeInput}
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
                                            value={fieldInput.mobileCountryCode} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="area">
                                        <Form.Control type="text" size="sm"
                                            name="mobileAreaCode" className="shadow-none" autoComplete="off"
                                            value={fieldInput.mobileAreaCode} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="mobilePhoneNumber" className="shadow-none" autoComplete="off"
                                            value={fieldInput.mobilePhoneNumber} onChange={handleChangeInput}
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
                                            value={fieldInput.name1} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone1" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phone1} onChange={handleChangeInput}
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
                                            value={fieldInput.name2} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone2" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phone2} onChange={handleChangeInput}
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
                                            value={fieldInput.name3} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone3" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phone3} onChange={handleChangeInput}
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
                                            value={fieldInput.name4} onChange={handleChangeInput}
                                        />
                                    </div>
                                    <div className="phone">
                                        <Form.Control type="text" size="sm"
                                            name="phone4" className="shadow-none" autoComplete="off"
                                            value={fieldInput.phone4} onChange={handleChangeInput}
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

    renderCommunicationToolSection = () => {
        const { fieldInput, handleChangeInput } = this.props;
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
                                    value={fieldInput.skype} onChange={handleChangeInput}
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
                                    value={fieldInput.email} onChange={handleChangeInput}
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
                                    value={fieldInput.telegram} onChange={handleChangeInput}
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
                                    value={fieldInput.weChat} onChange={handleChangeInput}
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
                                    value={fieldInput.whatsApp} onChange={handleChangeInput}
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
                                    value={fieldInput.line} onChange={handleChangeInput}
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
                                    value={fieldInput.letstalk} onChange={handleChangeInput}
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
                                    value={fieldInput.qq} onChange={handleChangeInput}
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
                                    value={fieldInput.zalo} onChange={handleChangeInput}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };


    renderOldCommunicationTool() {
        return <>
            <hr className="mt-0" />

            {this.renderPhoneSection()}
            {this.renderCustomerInformationSection()}
            {this.renderCommunicationToolSection()}

        </>
    }

    renderComfirmDeleteCommunicationTool() {
        const { settingCommunicationTool } = this.props;
        const communicationToolIndex = settingCommunicationTool.findIndex(x => x.settingId === this.state.confirmDeleteCommunicationTool.picCommunicationTool);
        return <>
            <div className="confirm-headline">Are you going to delete the <strong>{settingCommunicationTool[communicationToolIndex].settingValue}</strong> communication tool?</div>
        </>
    }

    render() {
        const { collapse, fieldInput, settings, values, handleChangeInput, setFieldValue } = this.props;

        const siteOptions = changeSiteSetting(settings.sites, 'childSites', 'childSites');
        return (
            <div className="panel-group">
                <Form.Group as={Row} className="panel-title border-bottom-0" onClick={() => this.props.onCollapseExpand('customerInfo')}
                    aria-controls="collapse-expand-customerInfo"
                    aria-expanded={!collapse.customerInfo}
                >
                    <Form.Label className="customer-name font-weight-bold text-danger">{fieldInput.username}</Form.Label>
                </Form.Group>
                <Collapse in={!collapse.customerInfo}>
                    <div id="collapse-expand-customerInfo" className="panel-content">
                        <div className={`${fieldInput.isCheckFeedbackIdIsNew && 'tab-account-info'}`}>
                            {
                                fieldInput.isCheckFeedbackIdIsNew &&
                                <div className='group-title group-tab'>
                                    <div className="group-title-tab" >
                                        <span className='icon-dropdown' />
                                        {LangHelper.getResource('AccountInfo')}
                                    </div>
                                </div>
                            }
                            <div className={`${fieldInput.isCheckFeedbackIdIsNew && 'group-content'}`}>
                                <Form.Group as={Row}>
                                    <Col sm="4" md="4">
                                        <Form.Group as={Row}>
                                            <Form.Label column sm="4" md="4" htmlFor="titleId">
                                                {LangHelper.getResource('Title')}
                                            </Form.Label>
                                            <Col sm="8" md="8">
                                                <Form.Control as="select" size="sm" className="shadow-none"
                                                    id="titleId" name="titleId" value={fieldInput.titleId} onChange={handleChangeInput}
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
                                                    name="firstName" id="firstName" value={fieldInput.firstName} onChange={handleChangeInput}
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
                                                    name="lastName" id="lastName" value={fieldInput.lastName} onChange={handleChangeInput}
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
                                                        onChange={value => setFieldValue('birthday', value)} useShortMonthInDropdown
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
                                                    value={fieldInput.passport} onChange={handleChangeInput}
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
                                                    OnChangeValue={value => setFieldValue('siteId', value.id)}
                                                    options={siteOptions}
                                                    value={fieldInput.siteId}
                                                    name={values.siteName}
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
                                                    name="refCode2" id="refCode2" value={fieldInput.refCode2} onChange={handleChangeInput}
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
                                                    value={fieldInput.refCode1} onChange={handleChangeInput}
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
                                                    value={fieldInput.licenseeTypeId} onChange={handleChangeInput}
                                                >
                                                    {settings.licenseeTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>

                        <div className={`${fieldInput.isCheckFeedbackIdIsNew && "tab-account-info"}`}>
                            {
                                fieldInput.isCheckFeedbackIdIsNew &&
                                <div className='group-title group-tab'>
                                    <div className="group-title-tab" >
                                        <span className='icon-dropdown' />
                                        {LangHelper.getResource('CommunicationInfo')}
                                    </div>
                                </div>
                            }
                            <div className={`${fieldInput.isCheckFeedbackIdIsNew && 'group-content'}`}>
                                {
                                    fieldInput.isCheckFeedbackIdIsNew && this.renderNewCommunicationTool()
                                }
                                {
                                    !fieldInput.isCheckFeedbackIdIsNew && this.renderOldCommunicationTool()
                                }
                            </div>
                        </div>
                        {
                            this.state.isHostOnCurrentCustomer && fieldInput.isCheckFeedbackIdIsNew &&
                            <Form.Group as={Row} className="pt-1 pb-2">
                                <Col sm="3" md="3">
                                    <Form.Check type="checkbox" id="check-box-overwrite" label={LangHelper.getResource('OverwriteCurrentAccountDetails')}
                                        htmlFor="check-box-overwrite" checked={fieldInput.isOverwrite}
                                        onChange={() => handleChangeInput({
                                            target: {
                                                name: 'isOverwrite',
                                                value: !fieldInput.isOverwrite
                                            }
                                        })}
                                    />
                                </Col>
                            </Form.Group>
                        }
                        {
                            this.state.confirmDeleteCommunicationTool.show &&
                            <ConfirmPopup
                                className='confirm-headline-modal'
                                title={LangHelper.getResource('ConfirmDeleteCommunicationTool')}
                                content={this.renderComfirmDeleteCommunicationTool()}
                                size='lg'
                                onSubmit={() => {
                                    this.deleteHeadlineCommunicationTool(this.state.confirmDeleteCommunicationTool.indexCom);
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
                </Collapse>
            </div>
        );
    }
}