import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';
import {getInvalidCategoryParams} from '@jsroot/common/shareScripts';

export const renderTitleOptions = item => {
    return (
        <option key={item.id} value={item.value}>
            {item.value}
        </option>
    );
};

export const renderLicenseeTypeOptions = item => {
    return (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
    );
};

export const renderStatus = item => {
    return (
        <option key={item.statusId} value={item.statusId}>
            {item.name}
        </option>
    );
};

export const renderLanguage = item => {
    return (
        <option key={item.settingId} value={item.settingName}>
            {item.settingName}
        </option>
    );
};


export const renderResponse = item => {
    return (
        <option key={item.id} value={item.value}>
            {item.value}
        </option>
    );
};

export const renderCountry = item => {
    return (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
    );
};


export const validateFormik = (values, settings) => {
    const errors = {};
    if (!values.identityInformation) {
        errors.identityInformation = LangHelper.formatString(LangHelper.getResource('FieldRequired'),LangHelper.getResource('Identity'));
    }

    if (moment(values.feedbackDate).isAfter(moment(values.resolutionTime))) {
        errors.startTime = LangHelper.formatString(LangHelper.getResource('FieldLessThanOrEqualTo'), LangHelper.getResource('FeedbackDate'), LangHelper.getResource('ResolutionTime'));
    }

    if (values.communication.length === 0) {
        errors.communication = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication'));
    }

    if (values.category === '') {
        errors.category = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Category'));
    }

    if (values.subCategory === '') {
        errors.subCategory = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory'));
    }

    if (values.category !== '' && values.subCategory !== '') {
        const invalidCategories = getInvalidCategoryParams(
            values.category.split(','),
            values.subCategory.split(','),
            settings.mainCategoryList,
            settings.subCategoryList
        );
        if (invalidCategories.length > 0) {
            errors.category = LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), invalidCategories.join(', '));
        }
    }

    if (values.language === 0) {
        errors.language = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language'));
    }

    if (values.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject'));
    }

    if (values.description === '') {
        errors.description = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Description'));
    }

    if (values.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution'));
    }

    return errors;
};