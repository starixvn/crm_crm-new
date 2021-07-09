import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

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