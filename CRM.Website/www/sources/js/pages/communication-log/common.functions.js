import React, { Component } from 'react';
import moment from 'moment';
import LangHelper from '@jsroot/common/langHelper';
import { ActionCreators } from './actions';
import {
    getSubCategories, getSubProducts, getBetTypes, getSubjectOnChangeCategories
} from '@jsroot/common/shareScripts';
import Site from '@jsroot/common/site';
import { Button, Form, Modal, Row, Col, Collapse } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { validateMainCategorySubCategory } from '../feedback/common.functions';

export const validateFormik = (values, settings) => {
    const errors = {};
    const { mainCategories, subCategories } = settings;
    validateMainCategorySubCategory(errors, values.mainCategoryIds, values.subCategoryIds, mainCategories, subCategories);

    if (values.customerNameInput !== '') {
        errors.customerNameInput = 'You must verify the username before saving this feedback.';
    }

    if (moment(values.startTime).isAfter(moment(values.endTime))) {
        errors.startTime = LangHelper.formatString( LangHelper.getResource('FieldLessThanOrEqualTo'),
            LangHelper.getResource('StartTime'),LangHelper.getResource('EndTime'));
    }

    if (values.communicationToolIds.length === 0) {
        errors.communicationToolIds = LangHelper.formatString( LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('CommunicationTool'));
    }

    if (parseInt(values.languageId, 10) === 0) {
        errors.languageId = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Language'));
    }

    if (values.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Subject'));
    }

    if (values.remark === '') {
        errors.remark = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Remark'));
    }

    if (values.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Solution'));
    }

    if (values.isReviewed && (values.review === null || values.review === '')) {
        errors.review = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Review'));
    }

    return errors;
};

export const handleChangeMainCategory = (setFieldValue, categoryIds, subCategoryIds, subject, settings, setStateSubcategory) => {
    const tempSubject = getSubjectOnChangeCategories(categoryIds ? categoryIds.split(',') : [], subject, settings.mainCategories);
    setFieldValue('mainCategoryIds', categoryIds);
    setFieldValue('subject', tempSubject);
    if (categoryIds) {
        const subCategoryId = subCategoryIds.length > 0 ? subCategoryIds.split(',') : [];
        const subCategories = getSubCategories(categoryIds.split(','), settings.subCategories, subCategoryId, false);
        setStateSubcategory(subCategories);
    } else {
        setFieldValue('subCategoryIds', '');
        setStateSubcategory([]);
    }
};

export const handleChangeProduct = (setFieldValue, productIds, subProductIds, settings, setStateSubProduct, setStateBetType) => {
    setFieldValue('productIds', productIds);
    if (productIds) {
        const subProductId = subProductIds.length > 0 ? subProductIds.split(',') : [];
        const subProducts = getSubProducts(productIds.split(','), settings.subProducts, subProductId, false);
        setStateSubProduct(subProducts);
    } else {
        setFieldValue('subProductIds', '');
        setFieldValue('betTypeIds', '');
        setStateSubProduct([]);
        setStateBetType([]);
    }
};

export const handleChangeSubProduct = (setFieldValue, subProductIds, selectedBetTypeIds, settings, setStateBetType) => {
    setFieldValue('subProductIds', subProductIds);
    if (subProductIds) {
        const betTypeIds = selectedBetTypeIds.length > 0 ? selectedBetTypeIds.split(',') : [];
        const betTypes = getBetTypes(subProductIds.split(','), settings.bettypes, betTypeIds, false);
        setStateBetType(betTypes);
    } else {
        setFieldValue('betTypeIds', '');
        setStateBetType([]);
    }
};

export const handlePasteCustomer = (setFieldValue, event, data) => {
    const customer = data.trim();
    const item = (event.clipboardData || window.clipboardData).getData('text')
        .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
        .split(',').filter(item => item !== '');
    setTimeout(() => {
        const customerInput = (customer.length > 0 ? customer + ',' : '').concat(item.join(','));
        setFieldValue('customerNameInput', customerInput);
    }, 100);
};

export const isValidCustomer = customers => {
    if (customers.length > 50)
        return false;
    return true;
};

export const handleGetFeedbackSubjectTemplates = Site.debounce(searchText => {
    if (searchText.length >= 2) {
        ActionCreators.getFeedbackSubjectTemplates(searchText);
    } else {
        ActionCreators.setFeedbackSubjectTemplates([]);
    }
});

export const renderCollapse = (values, errors, touched, collapse, setFieldValue, handleChange, handleCollapseExpand) => {
    return (
        <div>
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => handleCollapseExpand('autoGenerated')}
                    aria-controls="collapse-expand-autoGenerated"
                    aria-expanded={!collapse.autoGenerated}
                >
                    <Form.Label>{LangHelper.getResource('AutoGenerated')}</Form.Label>
                </Form.Group>
                <Collapse in={!collapse.autoGenerated}>
                    <div className="panel-content">
                        <Form.Control as="textarea" rows={3} className="shadow-none" name="autoGenerated"
                            value={values.autoGenerated} onChange={handleChange}
                        />
                    </div>
                </Collapse>
            </div>
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => handleCollapseExpand('remark')}
                    aria-controls="collapse-expand-remark"
                    aria-expanded={!collapse.remark}
                >
                    <Form.Label className="required">{LangHelper.getResource('Remark')}</Form.Label>
                </Form.Group>
                <Collapse in={!collapse.remark}>
                    <div id="collapse-expand-remark" className="panel-content">
                        <CkEditor isInvalid={touched.remark && errors.remark}
                            data={values.remark} username={window.currentUsername}
                            onChange={value => setFieldValue('remark', value)}
                        />
                    </div>
                </Collapse>
            </div>
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title" onClick={() => handleCollapseExpand('solution')}
                    aria-controls="collapse-expand-solution"
                    aria-expanded={!collapse.solution}
                >
                    <Form.Label className="required">{LangHelper.getResource('Solution')}</Form.Label>
                </Form.Group>
                <Collapse in={!collapse.solution}>
                    <div id="collapse-expand-solution" className="panel-content">
                        <CkEditor isInvalid={touched.solution && errors.solution}
                            data={values.solution} username={window.currentUsername}
                            onChange={value => setFieldValue('solution', value)}
                        />
                    </div>
                </Collapse>
            </div>
            <div className="panel-group">
                <Form.Group as={Row} className="panel-title">
                    <Form.Label className={values.isReviewed ? 'required' : ''}>{LangHelper.getResource('Review')}</Form.Label>
                    <input className="ml-2" type='checkbox'
                        onChange={event => setFieldValue('isReviewed', event.target.checked)}
                        checked={values.isReviewed}
                    />
                    <span className="font-italic ml-2">
                        {values.reviewerName ? LangHelper.formatString(LangHelper.getResource('ReviewerBy'), values.reviewerName, values.solveDate) : ''}
                    </span>
                </Form.Group>
                <Collapse in={values.isReviewed}>
                    <div className="panel-content">
                        <CkEditor isInvalid={touched.review && errors.review}
                            data={values.review} username={window.currentUsername}
                            onChange={value => setFieldValue('review', value)}
                        />
                    </div>
                </Collapse>
            </div>
        </div>
    );
};