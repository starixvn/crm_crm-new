import LangHelper from '@jsroot/common/langHelper';
import React from 'react';
import DateTimeService from '@jsroot/common/dateTimeService';

export const validateFormik = (values, files, invalidWidthHeight) => {
    const dateTimeNowClient= new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    let errors = {};

    if (!values.title) {
        errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
    }

    if (!values.content.EN) {
        errors.content = LangHelper.formatString(LangHelper.getResource('FieldRequired'), 'Content EN');
    }

    const isInvalidContent = Object.entries(values.content).filter(([key, value]) => value && (value.includes('{') || value.includes('}'))).length > 0;
    if(isInvalidContent){
        errors.content = LangHelper.getResource('ContentLanguageError');
    }

    if (values.sendType === 'Send At' && !values.sendDate) {
        errors.sendDate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
    }

    if (!values.sendType) {
        errors.sendType = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
    }

    if (values.sendType === 'Send At' && values.sendDate < dateTimeNowClient) {
        errors.sendType = LangHelper.getResource('SendDateSmallerThanNow');
    }

    const invalidFileType = files.filter(x => !validFileType(x) || !validFileExtension(x));
    if(invalidFileType.length > 0){
        const nameFileError = invalidFileType.map(x => x.name).join(', ');
        errors.imageFileType = LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), nameFileError);
    }

    const invalidFileSize = files.filter(x => !validFileSize(x));

    if(invalidFileSize.length > 0){
        const nameFileError = invalidFileSize.map(x => x.name).join(', ');
        errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
    }

    if(invalidWidthHeight.length > 0){
        const uniqInvalidImage = [...new Set(invalidWidthHeight)];
        const nameFileError = uniqInvalidImage.map(x => x).join(', ');
        errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
    }

    return errors;
};

export const getParams = (values, state) => {
    const {notificationTemplateId, content, headlineType, sendDate, sendType} = values;
    const splitFiles = !values.oldFileName ? values.oldFileName : values.oldFileName?.split(',');
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

    let index = 0;
    for (const [key, value] of Object.entries(content)) {
        if(value && value.length > 0){
            const languageId = state.languages.filter(x => x.mapLabel === key)[0].settingId;
            if(languageId){
                formData.append(`contents[${index}][languageId]`, languageId);
                formData.append(`contents[${index}][value]`, value);
                index++;
            }
        }
    }

    const isSendImmediately = sendType !== 'Send At';

    const params = {
        notificationTemplateId: notificationTemplateId,
        headlineNameList: state.headlineGroups.join(','),
        siteNameList: !state.options.site ? '' : state.options.site,
        currencyList: !state.options.currency ? '' : state.options.currency,
        headlineType: headlineType,
        title: values.title,
        sendDate: isSendImmediately ? null : DateTimeService.toLongDateTimeFormat(sendDate),
        sendImmediately: isSendImmediately
    };
    Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
    });

    return formData;
};

export const renderOption = (key, value, label) => (<option key={key} value={value}>{label}</option>);

export const setValueContent = (setFieldValue, contents) => {
    contents.length > 0 && contents.forEach(content =>{
        const replaceLanguage = content.language.replace(/[^A-Z0-9]/ig, '');
        const key = `content.${replaceLanguage}`;
        const cloneKey =  `cloneContent.${replaceLanguage}`;
        const contentReplace = content.content.replace( /\n/g, '<br />');
        setFieldValue(key, contentReplace);
        setFieldValue(cloneKey, contentReplace);
    });
};

export const mapLabelLanguage = languages =>{
    return languages.map(data =>{
        const replaceLanguage = data.settingValue.replace(/[^A-Z0-9]/ig, '');
        return {
            ...data, mapLabel: replaceLanguage
        };
    });
};

export const checkInvalidMaxLengthContent = (content, tab) =>{
    if(!content || !tab){
        return {invalidContentMaxLength: false};
    }
    const tabRemoveSpace = tab.replace(/[^A-Z0-9]/ig, '');
    const contentByTab = content[tabRemoveSpace];
    const contentReplaceHtml = contentByTab?.replace(/(<([^>]+)>)/gi, '');
    const MAX_LENGTH_TELEGRAM = 4096;
    let invalidContentMaxLength = false;
    if(contentReplaceHtml?.length + 1 > MAX_LENGTH_TELEGRAM){
        invalidContentMaxLength = true;
    }
    const textInvalidContentMaxLength = `Max length ${contentReplaceHtml?.length + 1}/${MAX_LENGTH_TELEGRAM}`;
    return {invalidContentMaxLength, textInvalidContentMaxLength};
};

function validFileSize(file){
    const convertSize = Math.round(file.size / 1024).toFixed(2);
    const maximumSize10MB = 10000;
    if(convertSize > maximumSize10MB){
        return false;
    }
    return true;
}

function validFileType(file) {
    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    return fileTypes.includes(file.type);
}

function validFileExtension(file) {
    const validFileFormat = ["jpeg", "pjpeg", "jpg", "png"];
    let extension = file.name.split('.').pop();
    return validFileFormat.includes(extension);
}