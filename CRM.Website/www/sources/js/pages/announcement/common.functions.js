import LangHelper from '@jsroot/common/langHelper';
import React from 'react';

export const validateFormik = (values, state, files) => {
    let errors = {};
    if (!values.notificationTemplate) {
        errors.notificationTemplate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('NotificationTemplate'));
    }

    if (!values.title) {
        errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
    }

    if (!values.content) {
        const contentEnglish = `Content (${state.tab})`;
        errors.content = LangHelper.formatString(LangHelper.getResource('FieldRequired'), contentEnglish);
    }

    if (state.tab === 'EN' && (values.content.includes('{') || values.content.includes('}'))) {
        errors.content = LangHelper.getResource('ContentLanguageError');
    }

    if (values.sendType === 'Send At' && !values.sendDate) {
        errors.sendDate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
    }

    if (!values.sendType) {
        errors.sendType = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
    }

    const invalidFileType = files.filter(x => !validFileType(x));
    if(invalidFileType.length > 0){
        const nameFileError = invalidFileType.map(x => x.name).join(', ');
        errors.imageFileType = LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), nameFileError);
    }

    const invalidFileSize = files.filter(x => !validFileSize(x));
    const invalidFileWidthHeigh = files.filter(x => !validateWidthHeigh(x));

    if(invalidFileSize.length > 0 || invalidFileWidthHeigh.length > 0){
        const nameFileError = invalidFileSize.map(x => x.name).join(', ');
        errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
    }

    return errors;
};

export const renderOption = (key, value, label) => (<option key={key} value={value}>{label}</option>);

function validateWidthHeigh(file){
    const url = URL.createObjectURL(file);
    const img = new Image();
    const maximumHeighWidth = 2560;
    img.src = url;
    const result = img.onload = function() {
        if(img.width > maximumHeighWidth || img.height > maximumHeighWidth){
            return false;
        }
        return true;
    }();
    return result;
}

function validFileSize(file){
    const convertSize = Math.round(file.size / 1024).toFixed(2);
    const maximumSize10MB = 10000;
    if(convertSize > maximumSize10MB){
        return false;
    }
    return true;
}

function validFileType(file){
    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    return fileTypes.includes(file.type);
}