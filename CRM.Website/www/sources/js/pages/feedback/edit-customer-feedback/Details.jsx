import React, { PureComponent, Fragment } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';

class Details extends PureComponent {
    renderProductSection = () => {
        const { values, touched, errors, setFieldValue, handleChange, settings, productOptions, subProductOptions,
            betTypeOptions,onChangeProduct, onChangeSubProduct
        } = this.props;
        const { responses, languages, statuses } = settings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label htmlFor="product" column sm="4" md="4">{LangHelper.getResource('Product')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    dataSource={productOptions}
                                    keyField='id' valueField='value'
                                    hasAllOption={productOptions.length > 0}
                                    isAllTextShown={productOptions.length > 0}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={2}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        onChangeProduct(setFieldValue, selectedItemsKey, values.subProductIds);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subProductIds">{LangHelper.getResource('SubProduct')}</Form.Label>
                            <Col md="8" sm="8">
                                <MultipleSelect
                                    isAllTextShown={subProductOptions.length > 0}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={3}
                                    dataSource={subProductOptions}
                                    keyField='id' valueField='value'
                                    onChange={(currentItem, selectedItemsKey) => {
                                        onChangeSubProduct(setFieldValue, selectedItemsKey, values.betTypeIds);
                                    }}
                                    hasAllOption={subProductOptions.length > 0}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column md="4" sm="4" htmlFor="betTypeIds">{LangHelper.getResource('BetType')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    hasSearchBox isNAOption
                                    keyField='id' valueField='value'
                                    hasAllOption={betTypeOptions.length > 0}
                                    maxDisplayItemCount={2}
                                    dataSource={betTypeOptions}
                                    isAllTextShown={betTypeOptions.length > 0}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('betTypeIds', selectedItemsKey);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="responseId">
                                {LangHelper.getResource('Response')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    id="responseId" name="responseId"
                                    value={values.responseId} onChange={handleChange}
                                >
                                    {responses.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="languageId" className="required">
                                {LangHelper.getResource('Language')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    isInvalid={touched.languageId && errors.languageId}
                                    id="languageId" name="languageId"
                                    value={values.languageId} onChange={handleChange}
                                >
                                    {languages.map(item => <option key={item.languageId} value={item.languageId}>{item.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="statusId">
                                {LangHelper.getResource('Status')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    id="statusId" name="statusId"
                                    value={values.statusId} onChange={handleChange}
                                >
                                    {statuses.map(item => <option key={item.statusId} value={item.statusId}>{item.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    handleChangeFeedbackDate = value => {
        this.props.setFieldValue('feedbackDate', value);
    }

    handleChangeResolutionDate = value => {
        this.props.setFieldValue('resolutionDate', value);
    }

    handleChangeFirstResponseTime = value => {
        this.props.setFieldValue('firstResponseTime', value);
    }
    
    render() {
        const {values, touched, errors,
            communicationToolOptions, mainCategoryOptions, subCategoryOptions,
            setFieldValue, onChangeMainCategory } = this.props;
        return (
            <Fragment>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="feedbackDate">
                                {LangHelper.getResource('FeedbackDate')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker timeInputLabel="Time:" showTimeInput useShortMonthInDropdown
                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                        selected={values.feedbackDate} isInvalid={touched.feedbackDate && errors.feedbackDate}
                                        onChange={value => this.handleChangeFeedbackDate(value)}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="firstResponseTime">
                                {LangHelper.getResource('FirstResponseTime')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className={`react-datepicker-wrapper-container form-control-wrapper`}>
                                    <DatePicker timeInputLabel="Time:" showTimeInput useShortMonthInDropdown
                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                        isInvalid={touched.firstResponseTime && errors.firstResponseTime}
                                        selected={values.firstResponseTime}
                                        onChange={value => this.handleChangeFirstResponseTime(value)}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="resolutionDate">
                                {LangHelper.getResource('ResolutionTime')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker timeInputLabel="Time:" showTimeInput useShortMonthInDropdown
                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                        selected={values.resolutionDate}
                                        onChange={value => this.handleChangeResolutionDate(value)}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="communicationToolId" className="required">
                                {LangHelper.getResource('Communication')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    isInvalid={touched.communicationToolIds && errors.communicationToolIds}
                                    dataSource={communicationToolOptions}
                                    keyField='id' valueField='name'
                                    hasAllOption={communicationToolOptions.length > 0}
                                    isAllTextShown={communicationToolOptions.length > 0}
                                    hasSearchBox isNAOption
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('communicationToolIds', selectedItemsKey);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="mainCategoryIds" className="required">
                                {LangHelper.getResource('Category')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    isInvalid={touched.mainCategoryIds && errors.mainCategoryIds}
                                    dataSource={mainCategoryOptions}
                                    keyField='mainCategoryID' valueField='name'
                                    hasAllOption={mainCategoryOptions.length > 0}
                                    isAllTextShown={mainCategoryOptions.length > 0}
                                    hasSearchBox isNAOption
                                    onChange={(currentItem, selectedItemsKey) => {
                                        onChangeMainCategory(setFieldValue, selectedItemsKey, values.subCategoryIds, values.subject);
                                    }}
                                    maxDisplayItemCount={1}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row} className="custom-form-group">
                            <Form.Label column sm="4" md="4" htmlFor="subCategoryIds" className="custom-label required">
                                {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                            <Col sm="8" md="8" className="custom-input">
                                <MultipleSelect
                                    hasAllOption={subCategoryOptions.length > 0}
                                    isAllTextShown={subCategoryOptions.length > 0}
                                    isInvalid={touched.subCategoryIds && errors.subCategoryIds}
                                    dataSource={subCategoryOptions}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={1}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('subCategoryIds', selectedItemsKey);
                                    }}
                                    keyField='subCategoryId' valueField='name'
                                />
                                <OverlayTrigger placement="bottom-start"
                                    overlay={<Tooltip id={'view-category-classification'}>{LangHelper.getResource('ViewCategoryClassification')}</Tooltip>}
                                >
                                    <span onClick={() => window.open('/CategoryClassification')} className="fa fa-question-circle-o" />
                                </OverlayTrigger>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                {this.renderProductSection()}
            </Fragment>
        );
    }
}

export default Details;