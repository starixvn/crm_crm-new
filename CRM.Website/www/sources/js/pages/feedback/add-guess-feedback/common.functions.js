import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

export const renderTitleOptions = item => {
    return (
        <option key={item.title} value={item.title}>
            {item.title}
        </option>
    );
};

export const validateFormik = (values, languages = []) => {
    const errors = {};
    if (!values.notificationTypeId) {
        errors.notificationTypeId = LangHelper.getResource('NotificationTypeRequired');
    }

    if (!values.notificationTemplateName || values.notificationTemplateName.trim().length === 0) {
        errors.notificationTemplateName = LangHelper.getResource('TemplateNameRequired');
    } else {
        if (values.notificationTemplateName.trim().length > 1000) {
            errors.notificationTemplateName = LangHelper.formatString(
                LangHelper.getResource('FieldMaxLength'),
                LangHelper.getResource('TemplateName'),
                1000);
        }
    }

    if (!values.title || values.title.trim().length === 0) {
        errors.title = LangHelper.getResource('TitleRequired');
    } else {
        if (values.title.trim().length > 2000) {
            errors.title = LangHelper.formatString(
                LangHelper.getResource('FieldMaxLength'),
                LangHelper.getResource('Title'),
                2000);
        }
    }

    return errors;
};