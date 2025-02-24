import React, { PureComponent, Fragment } from 'react';
import { Button, Col, Form, Row, Collapse } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import VerifyCustomer from '@jsroot/components/VerifyCustomer';
import AutoComplete from '@jsroot/components/AutoComplete';
import { validateNoOfInquiry, ratings } from '../common.functions';
import Details from './Details';
import CommentInfo from './CommentInfo';
import UnderlineButton from '@jsroot/common/underlineButton';

export default class FeedbackInfo extends PureComponent {
    renderRoleSection = () => {
        const { values, touched, errors, setFieldValue, handleChange, settings, relatedCustomers, feedbackSubjectTemplates,
            onChangeCheckboxHasRelatedCustomer, onPasteCustomer, onVerifyRelatedCustomer, onDeleteCustomer,
            onGetFeedbackSubjectTemplates ,handleChangeInput ,fieldInput
        } = this.props;
        const { roles, countries } = settings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="roleId">
                                {LangHelper.getResource('Role')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <Form.Control as="select" size="sm" className="shadow-none" id='roleId' name='roleId' value={values.roleId} onChange={handleChange}>
                                    {roles.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="countryId">
                                {LangHelper.getResource('Country')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    id="countryId" name="countryId"
                                    value={values.countryId} onChange={handleChange}
                                >
                                    {countries.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="noInquiries">
                                {LangHelper.getResource('NoOfInquiries')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control size="sm" type="number" min={1} max={3200}
                                    value={values.noInquiries} id="noInquiries" name="noInquiries"
                                    className="shadow-none" autoComplete="off"
                                    onInput={validateNoOfInquiry} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="rating">
                                {LangHelper.getResource('Rating')}
                            </Form.Label>
                            <Col md="8" sm="8">
                                <Form.Control as="select" size="sm" className="shadow-none" id='rating' name='rating' value={values.rating} onChange={handleChange}>
                                    {ratings.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="2" md="2">
                        <Form.Group as={Row}>
                            <Col>
                                <div className="d-flex">
                                    <Form.Check type="checkbox" id="checkbox-related-customer" htmlFor="checkbox-related-customer"
                                        label={LangHelper.getResource('IsRelatedToCustomer')}
                                        checked={values.hasRelated}
                                        onChange={onChangeCheckboxHasRelatedCustomer}
                                    />
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip-customers">
                                                {LangHelper.getResource('MultipleCustomersTooltip')}
                                            </Tooltip>
                                        }
                                    >
                                        <span className="fa fa-question-circle-o" />
                                    </OverlayTrigger>
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="8" md="8">
                        <Form.Group as={Row}>
                            <Col>
                            <Form.Control type="text" size="sm" className="shadow-none" autoComplete="off"
                                name="customerNameInput"
                                disabled={!values.hasRelated} value={fieldInput.customerNameInput}
                                isInvalid={touched.customerNameInput && errors.customerNameInput}
                                onPaste={event => onPasteCustomer(event, fieldInput.customerNameInput)}
                                onChange={handleChangeInput}
                            />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="2" md="2">
                        <Form.Group as={Row}>
                            <Col>
                                <Button type="button" variant="primary" size="sm"
                                    disabled={!fieldInput.customerNameInput}
                                    onClick={onVerifyRelatedCustomer}
                                >
                                    <UnderlineButton.verifyButton />
                                </Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                {
                    values.hasRelated && relatedCustomers.length > 0 &&
                    <div className="verify-customer">
                        <VerifyCustomer listOfCustomers={relatedCustomers} onClick={onDeleteCustomer} isSmallWidth/>
                    </div>
                }
                <Form.Group as={Row}>
                    <Col sm="2" md="2">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subject" className="required">
                                {LangHelper.getResource('Subject')}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col sm="8" md="8">
                        <Form.Group as={Row}>
                            <Col>
                                <AutoComplete isInvalid={touched.subject && errors.subject}
                                    value={values.subject}
                                    options={feedbackSubjectTemplates} displayField="subject"
                                    onChange={value => setFieldValue('subject', value.subject || value)}
                                    onInputChange={onGetFeedbackSubjectTemplates}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };
    render() {
        const { collapse, values, touched, errors,
            extensionOptions, communicationToolOptions, mainCategoryOptions, subCategoryOptions,
            setFieldValue, onCollapseExpand, onChangeMainCategory, handleChange, settings, productOptions, subProductOptions,
            betTypeOptions,onChangeProduct, onChangeSubProduct
        } = this.props;

        return (
            <Fragment>
                <div className="panel-group border-bottom-0 border-top-0">
                    <Form.Group as={Row} className="panel-title border-bottom-0" onClick={() => onCollapseExpand('details')}
                        aria-controls="collapse-expand-details"
                        aria-expanded={!collapse.details}
                    >
                        <Form.Label>{LangHelper.getResource('Details')}</Form.Label>
                    </Form.Group>
                    <Collapse in={!collapse.details}>
                        <div id="collapse-expand-details" className="panel-content border-bottom-0">
                            {
                                <Details values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} handleChange={handleChange}
                                    settings={settings} productOptions={productOptions} subProductOptions={subProductOptions}
                                    betTypeOptions={betTypeOptions} onChangeProduct={onChangeProduct} onChangeSubProduct={onChangeSubProduct}
                                    extensionOptions={extensionOptions} communicationToolOptions={communicationToolOptions}
                                    mainCategoryOptions={mainCategoryOptions} subCategoryOptions={subCategoryOptions} onChangeMainCategory={onChangeMainCategory}
                                />
                            }
                            { this.renderRoleSection() }
                        </div>
                    </Collapse>
                </div>
                {
                    <CommentInfo
                        collapse={collapse} values={values} touched={touched} errors={errors}
                        setFieldValue={setFieldValue} onCollapseExpand={onCollapseExpand} handleChange={handleChange}
                    />
                }
            </Fragment>
        );
    }
}