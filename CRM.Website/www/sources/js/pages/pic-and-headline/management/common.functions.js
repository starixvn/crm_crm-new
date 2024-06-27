import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const renderOption = (item, key, label) => {
    return (
        <option key={item[key]} value={item[key]}>
            {item[label]}
        </option>
    );
};

const getTotalValueByType = (values, targetType) => {
    return Object.entries(values)
        .filter(([key, value]) => value && value.type && parseInt(value.type, 10) === parseInt(targetType, 10))
        .reduce((acc, [key, value]) => {
            if (acc.length !== 0) {
                acc.push(` ${value.value}`);
            } else {
                acc.push(value.value);
            }
            return acc;
        }, []).toString();
};

export const validateFormik = values => {
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
            if (values[key].type && values[key].value) {
                const demo = getTotalValueByType(values, values[key].type).length;
                const demo2 = getTotalValueByType(values, values[key].type);
                if (getTotalValueByType(values, values[key].type).length > 200) {
                    errors[key] = LangHelper.formatString(LangHelper.getResource('CommunicationExceed200Characters'), values[key].channelName);
                }
            }
        }
    }

    if (!validCommunication) {
        errors.communication = LangHelper.getResource('CommunicationRequired');
    }
    return errors;
};

export const getTemplateCommunicationTool = () => {
    return { type: '', value: '', unique: new Date().getTime(), channelName: '' };
};

export const getChannelName = (settings, settingId) => {
    let channelName = settings.find(item => item.settingId === parseInt(settingId, 10));
    return channelName ? channelName.settingValue : '';
};

export const handleChangeCommunicationTool = (unique, event, settingCommunications ,setFieldValue) => {
    const value = event.target.value;
    setFieldValue(`communication-${unique}.type`, value);
    setFieldValue(`communication-${unique}.channelName`, getChannelName(settingCommunications, value));
};