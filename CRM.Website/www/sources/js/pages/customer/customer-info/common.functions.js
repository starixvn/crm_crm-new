import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const renderSystemOption = item => {
    return (
        <option key={item.id} value={item.id} >{item.name}</option>
    );
};

export const validateFormik = (values) => {
    const errors = {};

    if (!values.languageId) {
        errors.languageId = LangHelper.getResource('SystemRequired');
    }

    return errors;
};
const functions = {
    renderSystemOption
};

export default functions;