import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const renderOption = (item, key, label) => {
    return (
        <option key={item[key]} value={item[key]}>
            {item[label]}
        </option>
    );
};

export const validateFormik = (values) => {
    const errors = {};

    if (!values.picName || values.picName.trim().length === 0) {
        errors.picName = LangHelper.getResource('NameRequired');
    }

    if (!values.roleId) {
        errors.roleId = LangHelper.getResource('RoleRequired');
    }

    let validCommunication = false;
    for (let key in values) {
        if (key.includes('communication') && values[key]) {
            validCommunication = true;
            if (!values[key].type || !values[key].value) {
                errors[key] = LangHelper.getResource('CommunicationMustHaveValue');
            }
        }
    }

    if (!validCommunication) {
        errors.communication = LangHelper.getResource('CommunicationRequired');
    }
    return errors;
};

export const getTemplateCommunicationTool = () => {
    return { type: '', value: '', unique: new Date().getTime() };
};