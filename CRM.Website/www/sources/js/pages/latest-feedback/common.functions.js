import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const validateNoOfInquiries = event => {
    return event.target.validity.valid
        || event.target.value < 1 && (event.target.value = 1)
        || event.target.value > 32000 && (event.target.value = 32000);
}

export const validateInquiriesInput = (event) => {
    if ([8, 46, 37, 39, 35, 36].includes(event.which)) {
        return;
    }

    if (!event.ctrlKey && !event.key.match(/^\d+$/)) {
        event.preventDefault();
    }
};

export const validateFormik = (values) => {
    const errors = {};

    if (!values.subject || values.subject.trim().length === 0) {
        errors.subject = LangHelper.getResource('SubjectRequired');
    }

    if (!values.comunicationToolTypesEdit) {
        errors.comunicationToolTypesEdit = LangHelper.getResource('CommunicationRequired');
    }

    if (!values.mainCategoryOptionsEdit) {
        errors.mainCategoryOptionsEdit = LangHelper.getResource('CategoryRequired');
    }

    if (!values.subCategoryOptionsEdit) {
        errors.subCategoryOptionsEdit = LangHelper.getResource('SubCategoryRequied');
    }

    if (!values.language) {
        errors.language = LangHelper.getResource('LanguageRequied');
    }

    return errors;
};

const functions = {
    validateFormik
};

export default functions;