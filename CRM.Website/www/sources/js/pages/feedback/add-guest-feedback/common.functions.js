import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';
import { getInvalidCategoryParams } from '@jsroot/common/shareScripts';

export const renderTitleOptions = item => {
    return (
        <option key={item.id} value={item.id}>
            {item.value}
        </option>
    );
};

export const renderLicenseeTypeOptions = item => {
    return (
        <option key={item.id} value={item.id}>
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
        <option key={item.languageId} value={item.languageId}>
            {item.name}
        </option>
    );
};

export const renderResponse = item => {
    return (
        <option key={item.id} value={item.id}>
            {item.value}
        </option>
    );
};

export const renderCountry = item => {
    return (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    );
};

export const validateFormik = (values, settings) => {
    const errors = {};
    if (!values.identityInformation) {
        errors.identityInformation = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Identity'));
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
            settings.mainCategories,
            settings.subCategories
        );
        if (invalidCategories.length > 0) {
            errors.category = LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), invalidCategories.join(', '));
        }
    }

    if (values.languageId === 0) {
        errors.languageId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language'));
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