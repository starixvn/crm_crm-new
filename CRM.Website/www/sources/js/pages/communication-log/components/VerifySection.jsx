import React, { PureComponent, Fragment } from 'react';
import AutoComplete from '@jsroot/components/AutoComplete';
import { Button, Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import VerifyCustomer from '@jsroot/components/VerifyCustomer';
import { validateNoOfInquiry, ratings } from '../../feedback/common.functions';
import UnderlineButton from '@jsroot/common/underlineButton';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export default class VerifySection extends PureComponent {
    validateRefInput = event =>{
        if ([8, 46, 37, 39, 35, 36].includes(event.which)) {
            return;
        }

        if (!event.ctrlKey && !event.key.match(/^\d+$/)) {
            event.preventDefault();
        }
    }
    
    render() {
    const { handleVerifyCreateRelatedCustomer, relatedCustomers, deleteVerifyCreateCustomer, balanceUpday, extensions,
        handleChangeRefTicket, handleClickFillEvent, feedbackSubjectTemplates, verifySection, onPasteRefTicketHandler,
        handlePasteCustomer, handleChangeVerifySection, isValidSubject, isValidCustomerInput, handleGetFeedbackSubjectTemplates } = this.props;

        return(
            <Fragment>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="noOfInquiry">{LangHelper.getResource('NoOfInquiries')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control size="sm" type="number" id="noInquiries" name="noInquiries"
                                    value={verifySection.noInquiries} min={1} max={3200} className="shadow-none" autoComplete="off"
                                    onInput={validateNoOfInquiry} onChange={event => handleChangeVerifySection(event.target.name, event.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="ext">Ext</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    keyField='id' valueField='value'
                                    hasSearchBox isNAOption
                                    dataSource={extensions}
                                    hasAllOption={extensions.length > 0}
                                    isAllTextShown={extensions.length > 0}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('extensionIds', selectedItemsKey);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="rating">{LangHelper.getResource('Rating')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="rating" id="rating" value={verifySection.rating} onChange={event => handleChangeVerifySection(event.target.name, event.target.value)}
                                >
                                    {ratings.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="12" md="12">
                        <Form.Group as={Row}>
                            <Form.Label sm="2" md="2" column htmlFor="relatedTo">{LangHelper.getResource('RelatedTo')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" className="shadow-none" size="sm" autoComplete="off"
                                    name="customerNameInput"
                                    value={verifySection.customerNameInput}
                                    isInvalid={isValidCustomerInput}
                                    onPaste={event => handlePasteCustomer(event, verifySection.customerNameInput)}
                                    onChange={event => handleChangeVerifySection(event.target.name, event.target.value)}
                                />
                            </Col>
                            <Col sm="2" md="2">
                                <Button type="button" variant="primary" size="sm"
                                    disabled={!verifySection.customerNameInput}
                                    onClick={() => handleVerifyCreateRelatedCustomer(verifySection.customerNameInput)}
                                >
                                    <UnderlineButton.verifyButton />
                                </Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                {
                    relatedCustomers.length > 0 &&
                    <div className="verify-customer">
                        <VerifyCustomer listOfCustomers={relatedCustomers} onClick={deleteVerifyCreateCustomer} isSmallWidth/>
                    </div>
                }
                {
                    verifySection.ticketRefInput !== undefined &&
                    <Form.Group as={Row}>
                        <Col sm="2" md="2">
                            <Form.Group as={Row}>
                                <Form.Label column sm="9" md="9" htmlFor="ticketRefNo">{LangHelper.getResource('TicketRefNo')}</Form.Label>
                                <Col sm="3" md="3">
                                <Form.Label>
                                    <OverlayTrigger placement="bottom-start" overlay={
                                        <Tooltip id="communication-tooltip-ref-ticket">
                                            {LangHelper.getResource('TooltipRefTicket') + balanceUpday}
                                        </Tooltip>}
                                    >
                                        <span className="fa fa-question-circle-o" />
                                    </OverlayTrigger>
                                </Form.Label>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col sm="4" md="4" className="ref-ticket-input">
                                <Form.Control type="number" size="sm" value={verifySection.ticketRefInput}
                                    id="refNo" name="refNo" className="shadow-none" autoComplete="off"
                                    onKeyDown={event => this.validateRefInput(event)}
                                    onPaste={event => onPasteRefTicketHandler(event)}
                                    onChange={handleChangeRefTicket}
                                />
                        </Col>
                        <Col sm="2" md="2">
                            <Button type="button" variant="primary" size="sm"
                                disabled={verifySection.ticketRefInput === ''}
                                onClick={() =>handleClickFillEvent(verifySection.ticketRefInput)}
                            >
                                {LangHelper.getResource('FillEventDetails')}
                            </Button>
                        </Col>
                    </Form.Group>
                }
                <Form.Group as={Row}>
                    <Col sm="12" md="12">
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="subject" className="required">{LangHelper.getResource('Subject')}</Form.Label>
                            <Col sm="8" md="8">
                                <AutoComplete isInvalid={isValidSubject}
                                    value={verifySection.subject}
                                    options={feedbackSubjectTemplates} displayField="subject"
                                    onChange={value => handleChangeVerifySection('subject', value.subject || value)}
                                    onInputChange={handleGetFeedbackSubjectTemplates}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Fragment>
        );
    }
}