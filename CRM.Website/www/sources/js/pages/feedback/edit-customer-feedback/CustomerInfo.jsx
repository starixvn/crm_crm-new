import React, { PureComponent } from 'react';
import { Col, Form, Row, Collapse } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { changeSiteSetting, getPermission } from '@jsroot/common/shareScripts';
import { Policy } from '../../../common/constants';

export default class CustomerInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            latestFeedbackCommunicationTools: []
        };
    }

    componentDidMount() {
        this.setState({ latestFeedbackCommunicationTools: this.props.fieldInput.latestFeedbackCommunicationTools });
    }

    getLatestFeedbackCommunicationTools = newCommunicationTools => {
        let latestFeedbackCommunicationTools = [];
        newCommunicationTools.map(pic => {
            let communicationTools = [];
            if (latestFeedbackCommunicationTools.findIndex(x => x.picInfo === pic.picInfo) === -1) {
                newCommunicationTools.map((communication, indexCom) => {
                    if (communication.picInfo === pic.picInfo) {
                        communicationTools.push({
                            communicationID: communication.communicationID,
                            communicationName: communication.communicationName,
                            communicationValue: communication.communicationValue,
                            indexCom: indexCom
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

    handleChangeCommunicationTools = (value, index) => {
        const latestFeedbackCommunicationTools = this.state.latestFeedbackCommunicationTools;
        latestFeedbackCommunicationTools[index].communicationValue = value;
        this.setState({ latestFeedbackCommunicationTools: latestFeedbackCommunicationTools });
        const params = {
            target: {
                name: 'latestFeedbackCommunicationTools',
                value: latestFeedbackCommunicationTools
            }
        };
        this.props.handleChangeInput(params);
    }

    renderHeadlineCommunicationTools(latestFeedbackCommunicationTools) {
        const communicationTools = this.getLatestFeedbackCommunicationTools(latestFeedbackCommunicationTools);
        return <>
            {
                communicationTools.map(item => {
                    return <>
                        <div className="separate">
                            <hr />
                        </div>
                        <div className="bold">{item.picInfo}</div>
                        <Form.Group as={Row} className="pt-2">
                            {
                                item.picCommunicationTools.map(itemCom => {
                                    return <>
                                        <Col sm="4" md="4">
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4" md="4" htmlFor="title">
                                                    {itemCom.communicationName}
                                                </Form.Label>
                                                <Col sm="8" md="8">
                                                    <Form.Control type="text" size="sm" value={itemCom.communicationValue} className="shadow-none" autoComplete="off"
                                                        onChange={event => {
                                                            this.handleChangeCommunicationTools(event.target.value, itemCom.indexCom);
                                                        }}/>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </>
                                })
                            }
                        </Form.Group>
                    </>
                })
            }
        </>
    }

    renderNoneHeadlineCommunicationTools(latestFeedbackCommunicationTools) {
        return <>
            <div className="separate">
                <hr />
            </div>
            <Form.Group as={Row} className="pt-2">
                {
                    latestFeedbackCommunicationTools.map(item => {
                        return <>
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="title">
                                        {item.communicationName}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <Form.Control type="text" size="sm" value={item.communicationValue} className="shadow-none" autoComplete="off"/>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </>
                    })
                }
            </Form.Group>
        </>
    }

    renderCommunicationTool() {
        const { latestFeedbackCommunicationTools } = this.state;
        if (latestFeedbackCommunicationTools.length < 1) {
            return null;
        }
        return <>
            {
                latestFeedbackCommunicationTools[0].isHeadline &&
                this.renderHeadlineCommunicationTools(latestFeedbackCommunicationTools)
            }
            {
                !latestFeedbackCommunicationTools[0].isHeadline &&
                this.renderNoneHeadlineCommunicationTools(latestFeedbackCommunicationTools)
            }
        </>
    }

    render() {
        const { collapse, fieldInput, settings, values, handleChangeInput, setFieldValue
        } = this.props;
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
                        {
                            this.renderCommunicationTool()
                        }
                    </div>
                </Collapse>
            </div>
        );
    }
}