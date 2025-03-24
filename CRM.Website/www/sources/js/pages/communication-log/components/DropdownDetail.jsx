import React, { PureComponent, Fragment } from 'react';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Row, Col } from 'react-bootstrap';
import { changeSiteSetting } from '@jsroot/common/shareScripts';
export default class DropdownDetail extends PureComponent {
    renderCreateCommunication = () => {
        const { values, touched, errors, handleChange, setFieldValue, onChangeStartTime, onChangeEndTime,
            handleChangeCommunicationTool, communicationTools, onChangeFirstResponseTime } = this.props;
        const { languages, responses } = this.props.allSettings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="startTime">{LangHelper.getResource('StartTime')}</Form.Label>
                            <Col sm="8" md="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                <DatePicker isInvalid={touched.startTime && errors.startTime}
                                    timeInputLabel="Time:"
                                    dropdownMode="select"
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showYearDropdown
                                    showTimeInput
                                    selected={values.startTime}
                                    onChange={value => onChangeStartTime(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="firstResponseTime">{LangHelper.getResource('FirstResponseTime')}</Form.Label>
                            <Col sm="8" md="8" className={`react-datepicker-wrapper-container form-control-wrapper ${!values.firstResponseTime ? 'disable-field' : ''}`}>
                                <DatePicker isInvalid={touched.firstResponseTime && errors.firstResponseTime}
                                    timeInputLabel="Time:"
                                    dropdownMode="select"
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showYearDropdown
                                    showTimeInput
                                    selected={values.firstResponseTime}
                                    onChange={value => onChangeFirstResponseTime(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    {/* <Col sm="6" md="6">
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
                    </Col> */}
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="endTime">{LangHelper.getResource('EndTime')}</Form.Label>
                            <Col sm="8" md="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                <DatePicker
                                    timeInputLabel="Time:"
                                    showTimeInput
                                    dropdownMode="select"
                                    useShortMonthInDropdown
                                    showMonthDropdown
                                    showYearDropdown
                                    selected={values.endTime}
                                    onChange={value => onChangeEndTime(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="response">{LangHelper.getResource('Response')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    id="responseId" name="responseId"
                                    value={values.responseId} onChange={handleChange}
                                >
                                    {responses.map(element => <option key={element.id} value={element.id}>{element.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="communicationTools" className="required">{LangHelper.getResource('Communication')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    isInvalid={touched.communicationToolIds && errors.communicationToolIds}
                                    dataSource={communicationTools}
                                    keyField='id' valueField='name'
                                    hasAllOption={communicationTools.length > 0}
                                    isAllTextShown={communicationTools.length > 0}
                                    hasSearchBox isNAOption
                                    onChange={(currentItem, selectedItemsKey) => {
                                        handleChangeCommunicationTool(setFieldValue, currentItem, selectedItemsKey);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="language" className="required">{LangHelper.getResource('Language')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" isInvalid={touched.languageId && errors.languageId}
                                    className="shadow-none" id="languageId" name="languageId"
                                    value={values.languageId} onChange={handleChange}
                                >
                                    {languages.map(element => <option key={element.languageId} value={element.languageId}>{element.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderCreateDropDown = () => {
        const { subCategories, subProducts, betTypes, allSettings, values, touched, errors, handleChange, setFieldValue, setStateSubProduct,
            setStateBetType, handleChangeProduct, handleChangeSubProduct, handleChangeMainCategory, mainCategories, products } = this.props;
        const { countries, statuses, roles, sites, licenseeTypes } = allSettings;
        const siteOptions = changeSiteSetting(sites, 'childSites', 'childSites');
        
        return (
            <div>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="mainCategory" className="required">{LangHelper.getResource('Category')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    isInvalid={touched.mainCategoryIds && errors.mainCategoryIds}
                                    dataSource={mainCategories}
                                    keyField='mainCategoryID' valueField='name'
                                    hasAllOption={mainCategories.length > 0}
                                    isAllTextShown={mainCategories.length > 0}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={1}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        handleChangeMainCategory(setFieldValue, selectedItemsKey, values.subCategoryIds, allSettings);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row} className="custom-form-group">
                            <Form.Label column sm="4" md="4" htmlFor="subCategory" className="required">{LangHelper.getResource('SubCategory')}</Form.Label>
                            <Col sm="8" md="8" className="custom-input">
                                <MultipleSelect
                                    isInvalid={touched.subCategoryIds && errors.subCategoryIds}
                                    dataSource={subCategories}
                                    maxDisplayItemCount={1}
                                    keyField='subCategoryId' valueField='name'
                                    hasAllOption={subCategories.length > 0}
                                    isAllTextShown={subCategories.length > 0}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('subCategoryIds', selectedItemsKey);
                                    }}
                                    hasSearchBox isNAOption
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
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="products">{LangHelper.getResource('Product')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    dataSource={products}
                                    keyField='id' valueField='value'
                                    hasAllOption={products.length > 0}
                                    isAllTextShown={products.length > 0}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={1}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        handleChangeProduct(setFieldValue, selectedItemsKey,
                                            values.subProductIds, allSettings, setStateSubProduct, setStateBetType);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="subProduct">{LangHelper.getResource('SubProduct')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    dataSource={subProducts}
                                    hasAllOption={subProducts.length > 0}
                                    isAllTextShown={subProducts.length > 0}
                                    hasSearchBox isNAOption
                                    maxDisplayItemCount={1}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        handleChangeSubProduct(setFieldValue, selectedItemsKey,
                                            values.betTypeIds, allSettings, setStateBetType);
                                    }}
                                    keyField='id' valueField='value'
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="statuses">{LangHelper.getResource('Status')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" className="shadow-none" size="sm"
                                    name="statusId" id="statusId"
                                    value={values.statusId} onChange={handleChange}
                                >
                                    {statuses.map(element => <option key={element.statusId} value={element.statusId}>{element.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="betType">{LangHelper.getResource('BetType')}</Form.Label>
                            <Col sm="8" md="8">
                                <MultipleSelect
                                    dataSource={betTypes}
                                    keyField='id' valueField='value'
                                    hasSearchBox isNAOption
                                    hasAllOption={betTypes.length > 0}
                                    isAllTextShown={betTypes.length > 0}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        setFieldValue('betTypeIds', selectedItemsKey);
                                    }}
                                    maxDisplayItemCount={1}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" md="4" column htmlFor="role">{LangHelper.getResource('Role')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" className="shadow-none" size="sm"
                                    id='roleId' name='roleId'
                                    value={values.roleId}
                                    onChange={handleChange}
                                >
                                    {roles.map(element => <option key={element.id} value={element.id}>{element.value}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="site">{LangHelper.getResource('Site')}</Form.Label>
                            <Col sm="8" md="8">
                                <SelectWithSearch className='basic-single'
                                    OnChangeValue={value => setFieldValue('siteId', value.id)}
                                    options={siteOptions}
                                    isHideNA={false}
                                    name={values.siteName}
                                    value={values.siteId}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label sm="4" column md="4" htmlFor="countries">{LangHelper.getResource('Country')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" className="shadow-none" size="sm"
                                    id="countryId" name="countryId"
                                    value={values.countryId} onChange={handleChange}
                                >
                                    {countries.map(element => <option key={element.id} value={element.id}>{element.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6" md="6">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="licenseeTypes">{LangHelper.getResource('LicenseeType')}</Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none" value={values.licenseeTypeId}
                                    id="licenseeTypeId" name="licenseeTypeId" onChange={handleChange}
                                >
                                    {licenseeTypes.map(element => <option key={element.id} value={element.id}>{element.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </div>
        );
    };
    render() {
        return (
            <Fragment>
                {this.renderCreateCommunication()}
                {this.renderCreateDropDown()}
            </Fragment>
        );
    }
}