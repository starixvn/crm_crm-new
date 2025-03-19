import React, { PureComponent } from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { validateNoOfInquiry, ratings } from '../common.functions';
import LangHelper from '@jsroot/common/langHelper';

export default class Detail extends PureComponent {
    renderDetailDropdown = () => {
        const { subCategoriesOptions, subProductOptions, betTypeOptions, handleCommunicationChange, mainCategoriesHandleChange,
                productHandleChange, subProductHandleChange, values, errors, touched, setFieldValue } = this.props;
        const { mainCategories, products, communicationTools } = this.props.settings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="communication" className="required">
                                {LangHelper.getResource('Communication')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    keyField='id'
                                    valueField='name'
                                    hasAllOption={communicationTools.length > 0}
                                    isAllTextShown={communicationTools.length > 0}
                                    isInvalid={touched.communication && errors.communication}
                                    dataSource={communicationTools}
                                    hasSearchBox
                                    isNAOption
                                    onChange={(currentItem, selectedItemsKey) => handleCommunicationChange(currentItem, selectedItemsKey, setFieldValue)}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="category" className="required">
                                {LangHelper.getResource('Category')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    hasAllOption={mainCategories.length > 0}
                                    isAllTextShown={mainCategories.length > 0}
                                    hasSearchBox
                                    isNAOption maxDisplayItemCount={1}
                                    isInvalid={touched.category && errors.category}
                                    dataSource={mainCategories}
                                    keyField='mainCategoryID'
                                    valueField='name'
                                    onChange={(currentItem, selectedItemsKey) => {
                                        mainCategoriesHandleChange(currentItem, selectedItemsKey, setFieldValue, values);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row} className="custom-form-group">
                            <Form.Label column sm="4" md="4" htmlFor="subCategory" className="custom-label required">
                                {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                            <Col sm="8" md="8" className="custom-input">
                                <MultipleSelect
                                    hasAllOption={subCategoriesOptions.length > 0}
                                    isAllTextShown={subCategoriesOptions.length > 0}
                                    hasSearchBox
                                    isNAOption maxDisplayItemCount={1}
                                    isInvalid={touched.subCategory && errors.subCategory}
                                    dataSource={subCategoriesOptions}
                                    keyField='subCategoryId'
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('subCategory', selectedItemsKey);
                                    }}
                                    valueField='name'
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
                <Form.Group as={Row}>
                    <Col md="4" sm="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="product">{LangHelper.getResource('Product')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    valueField='value'
                                    hasAllOption={products.length > 0}
                                    isAllTextShown={products.length > 0}
                                    isInvalid={touched.product && errors.product}
                                    dataSource={products}
                                    keyField='id' maxDisplayItemCount={2}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        productHandleChange(currentItem, selectedItemsKey, setFieldValue, values.subProduct);
                                    }}
                                    hasSearchBox
                                    isNAOption
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subProduct">
                                {LangHelper.getResource('SubProduct')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    keyField='id'
                                    valueField='value'
                                    isInvalid={touched.subProduct && errors.subProduct}
                                    dataSource={subProductOptions}
                                    isNAOption maxDisplayItemCount={3}
                                    hasAllOption={subProductOptions.length > 0}
                                    isAllTextShown={subProductOptions.length > 0}
                                    hasSearchBox
                                    onChange={(currentItem, selectedItemsKey) => {
                                        subProductHandleChange(currentItem, selectedItemsKey, setFieldValue, values.betType);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="betType">
                                {LangHelper.getResource('BetType')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    hasAllOption={betTypeOptions.length > 0}
                                    isAllTextShown={betTypeOptions.length > 0}
                                    hasSearchBox
                                    isNAOption
                                    isInvalid={touched.betType && errors.betType}
                                    dataSource={betTypeOptions}
                                    keyField='id' maxDisplayItemCount={2}
                                    valueField='value'
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('betType', selectedItemsKey);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    render() {
        const {
            values, errors, touched, handleChange, setFieldValue, settings, handleChangeFeedbackTime,
            handleChangeResolutionTime, renderOptions, customerDetail, handleChangeFirstResponseTime
        } = this.props;
        const { statuses, languages, responses, roles, countries, extensions } = settings;

        return (
            <>
                <Form.Group as={Row} className="pt-2">
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="feedbackDate">{LangHelper.getResource('FeedbackDate')}
                            </Form.Label>
                            <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    dropdownMode="select" showMonthDropdown useShortMonthInDropdown
                                    showYearDropdown showTimeInput selected={values.feedbackDate}
                                    isInvalid={touched.feedbackDate && errors.feedbackDate}
                                    timeInputLabel="Time:" dateFormat="MMM dd, yyyy hh:mm aa"
                                    onChange={value => handleChangeFeedbackTime(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {
                        customerDetail !== null &&
                        (
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="firstResponseTime">{LangHelper.getResource('FirstResponseTime')}
                                    </Form.Label>
                                    <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                        <DatePicker
                                            selected={values.firstResponseTime} timeInputLabel="Time:"
                                            dateFormat="MMM dd, yyyy hh:mm aa"
                                            dropdownMode="select" showMonthDropdown useShortMonthInDropdown
                                            showYearDropdown showTimeInput
                                            onChange={value => handleChangeFirstResponseTime(value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        )
                    }
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="resolutionTime">{LangHelper.getResource('ResolutionTime')}
                            </Form.Label>
                            <Col sm="8" md="8" className='react-datepicker-wrapper-container form-control-wrapper'>
                                <DatePicker
                                    selected={values.resolutionTime} timeInputLabel="Time:"
                                    dateFormat="MMM dd, yyyy hh:mm aa"
                                    dropdownMode="select" showMonthDropdown useShortMonthInDropdown
                                    showYearDropdown showTimeInput
                                    onChange={value => handleChangeResolutionTime(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {
                        customerDetail === null &&
                        (
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="extension">
                                        {LangHelper.getResource('Station')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <MultipleSelect
                                            isInvalid={touched.extension && errors.extension}
                                            dataSource={extensions} hasSearchBox isNAOption
                                            keyField='id' valueField='value' isAllTextShown
                                            onChange={(currentItem, selectedItemsKey) => {
                                                setFieldValue('extension', selectedItemsKey);
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        )
                    }
                </Form.Group>
                {this.renderDetailDropdown()}
                <Form.Group as={Row}>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="statusId">{LangHelper.getResource('Status')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="statusId" id="statusId" value={values.statusId}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {statuses.map(item => renderOptions(item.name, item.statusId))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="languageId" className="required">{LangHelper.getResource('Language')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="languageId" id="languageId" value={values.languageId}
                                    onChange={handleChange} isInvalid={touched.languageId && errors.languageId}
                                >
                                    <option value="" hidden disabled />
                                    {languages.map(item => renderOptions(item.name, item.languageId))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="responseId">{LangHelper.getResource('Response')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="responseId" id="responseId"
                                    value={values.responseId} onChange={handleChange}>
                                    <option value="" hidden disabled />
                                    {responses.map(item => renderOptions(item.value, item.id))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    {
                        customerDetail !== null &&
                        <Col sm="4" md="4">
                            <Form.Group as={Row}>
                                <Form.Label column sm="4" md="4" htmlFor="role">{LangHelper.getResource('Role')}</Form.Label>
                                <Col sm="8" md="8">
                                    <Form.Control as="select" size="sm" className="shadow-none"
                                        name="role" id="role" value={values.role} onChange={handleChange}
                                    >
                                        <option value="" hidden disabled />
                                        {roles.map(item => renderOptions(item.value, item.id))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    }
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="country">{LangHelper.getResource('Country')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="country" id="country" value={values.country} onChange={handleChange}
                                >
                                    <option value="" hidden disabled />
                                    {countries.map(item => renderOptions(item.name, item.id))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="noOfInquiries">{LangHelper.getResource('NoOfInquiries')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="number" size="sm" className="shadow-none" name="noOfInquiries"
                                    min={1} max={3200} value={values.noOfInquiries}
                                    onInput={validateNoOfInquiry} onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {
                        customerDetail !== null &&
                        (
                            <Col sm="4" md="4">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" md="4" htmlFor="extension">
                                        {LangHelper.getResource('Station')}
                                    </Form.Label>
                                    <Col sm="8" md="8">
                                        <MultipleSelect
                                            isInvalid={touched.extension && errors.extension}
                                            dataSource={extensions} hasSearchBox isNAOption
                                            keyField='id' valueField='value' isAllTextShown
                                            onChange={(currentItem, selectedItemsKey) => {
                                                setFieldValue('extension', selectedItemsKey);
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        )
                    }
                    <Col sm="4" md="4">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="rating">{LangHelper.getResource('Rating')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="rating" id="rating" value={values.rating} onChange={handleChange}
                                >
                                    {ratings.map(item => renderOptions(item.value, item.id))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col> 
                </Form.Group>
            </>
        );
    }
}