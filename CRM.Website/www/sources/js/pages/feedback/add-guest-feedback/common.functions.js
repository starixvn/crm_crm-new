import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const renderTitleOptions = item => {
    return (
        <option key={item.title} value={item.title}>
            {item.title}
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
        <option key={item.settingId} value={item.settingName}>
            {item.settingName}
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


export const validateFormik = values => {
    const errors = {};
    if (!values.identityInformation) {
        errors.identityInformation = LangHelper.getResource('IdentityIsRequired');
    }

    // if (!values.communication) {
    //     errors.communication = LangHelper.getResource('CommunicationRequired');
    // }

    // if (!values.category) {
    //     errors.category = LangHelper.getResource('CategoryRequired');
    // }
    
    // if (!values.subcategory) {
    //     errors.subcategory = LangHelper.getResource('SubCategoryRequired');
    // }

    // if (!values.language) {
    //     errors.language = LangHelper.getResource('LanguageRequired');
    // }

    if (!values.subject) {
        errors.subject = LangHelper.getResource('SubjectRequired');
    }

    return errors;
};