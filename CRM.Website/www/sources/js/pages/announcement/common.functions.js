import LangHelper from '@jsroot/common/langHelper';
import React from 'react';
import DateTimeService from '@jsroot/common/dateTimeService';

export const validateFormik = (values, files) => {
    let errors = {};
    if (!values.notificationTemplate) {
        errors.notificationTemplate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('NotificationTemplate'));
    }

    if (!values.title) {
        errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
    }

    if (!values.content.EN) {
        errors.content = LangHelper.formatString(LangHelper.getResource('FieldRequired'), 'Content EN');
    }

    if ((values.content.EN.includes('{') || values.content.EN.includes('}'))) {
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

export const getParams = (values, state) => {
    const {notificationTemplateId, content, headlineType, sendDate, sendType} = values;
    const splitFiles = values.oldFileName?.split(',');
    const formData = new FormData();
    if(splitFiles){
        const oldFileRemove = splitFiles && splitFiles.filter(x => !state.uploadedFiles.find(file => typeof file === 'string' ? file === x : file.name === x));
        oldFileRemove.forEach(oldFile => {
            formData.append('fileStringRemove', oldFile);
        });
    }
    state.uploadedFiles.forEach(file => {
        formData.append(typeof file === 'string' ? 'fileString' : 'formFile', file);
    });

    for (const [index, [key, value]] of Object.entries(content).entries()) {
            const languageId = state.languages.filter(x => x.mapLabel === key)[0].settingId;
            formData.append(`contents[${index}][languageId]`, languageId);
            formData.append(`contents[${index}][value]`, value);
    }

    const params = {
        notificationTemplateId: notificationTemplateId,
        headlineNameList: state.headlineGroups.join(','),
        siteNameList: !state.options.site ? '' : state.options.site,
        currencyList: !state.options.currency ? '' : state.options.currency,
        headlineType: headlineType,
        title: values.title,
        sendDate: DateTimeService.toLongDateTimeFormat(sendDate),
        sendImmediately: sendType !== 'Send At'
    };
    Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
    });

    return formData;
};

export const renderOption = (key, value, label) => (<option key={key} value={value}>{label}</option>);

export const setValueContent = (setFieldValue, contents) => {
    contents.length > 0 && contents.forEach(content =>{
        const key = content.language === 'EN & SC' ? 'content.ENSC' : `content.${content.language}`;
        setFieldValue(key, content.content);
        if(content.language === 'EN'){
            setFieldValue('cloneContentEN', content.content);
        }
    });
};

export const mapLabelLanguage = languages =>{
    return languages.map(data =>{
        return {
            ...data, mapLabel: data.settingValue === 'EN & SC' ? 'ENSC' : data.settingValue
        };
    });
};

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