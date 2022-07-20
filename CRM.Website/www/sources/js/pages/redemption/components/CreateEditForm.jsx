import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import DatePicker from '@jsroot/components/date-picker/index';
import LangHelper from '@jsroot/common/langHelper';

export class CreateEditForm extends Component {
    render() {
        const { values, errors, touched, setFieldValue, handleChange, statuses } = this.props;
        return (
            <div className="panel-group border-bottom-0">
                <div className="panel-content">
                    <Form.Group as={Row}>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="ClaimedTime">{LangHelper.getResource('ClaimedTime')}</Form.Label>
                                <Col md="8" sm="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                    <DatePicker selected={values.claimTime}
                                        dropdownMode="select"
                                        showMonthDropdown
                                        showYearDropdown
                                        useShortMonthInDropdown
                                        onChange={value => setFieldValue('claimTime', value)}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="currencyId">{LangHelper.getResource('Currency')}</Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control as="select" size="sm" className="shadow-none"
                                        name="currencyId" id="currencyId"
                                        value={values.currencyId}
                                        onChange={handleChange}
                                    >
                                        <option value="0">N/A</option>
                                        {
                                            statuses.currencies.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="doneBy" className="required">{LangHelper.getResource('DoneBy')}</Form.Label>
                                <Col md="8" sm="8">
                                    <Form.Control isInvalid={touched.doneBy && errors.doneBy}
                                        type="text" className="shadow-none" size="sm"
                                        name="doneBy" id="doneBy"
                                        value={values.doneBy}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="amount">{LangHelper.getResource('Amount')}</Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control size="sm" type="number" className="shadow-none"
                                        name="amount" id="amount"
                                        value={values.amount}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="subject" className="required">{LangHelper.getResource('Subject')}</Form.Label>
                                <Col md="8" sm="8">
                                    <Form.Control isInvalid={touched.subject && errors.subject}
                                        type="text" size="sm" className="shadow-none"
                                        name="subject" id="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm="6" md="6">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="statusId">{LangHelper.getResource('Status')}</Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control as="select" className="shadow-none"
                                        name="statusId" id="statusId" size="sm"
                                        value={values.statusId} onChange={handleChange}
                                    >
                                        {
                                            statuses.statuses.map((value, key) => <option key={key} value={value.statusId}>{value.name}</option>)
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                </div>
                <div className="panel-remark">
                    <Form.Group className="panel-title">
                        <Form.Label className="required">{LangHelper.getResource('Remark')}</Form.Label>
                    </Form.Group>
                    <div className="panel-content">
                        <CkEditor isInvalid={touched.remark && errors.remark}
                            data={values.remark} username={window.currentUsername}
                            onChange={value => setFieldValue('remark', value)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEditForm;
