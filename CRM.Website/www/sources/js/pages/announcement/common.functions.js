import LangHelper from '@jsroot/common/langHelper';
import React from 'react';
import DateTimeService from '@jsroot/common/dateTimeService';

export const validateFormik = (values, files, state) => {
    const dateTimeNowClient= new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    const { invalidWidthHeight, errorDrafts, isHeadlineGroup } = state;
    let errors = {};

    if (!values.title) {
        errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
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

    if (values.sendType === 'Send At' && values.sendDate && values.sendDate < dateTimeNowClient) {
        errors.sendType = LangHelper.getResource('SendDateSmallerThanNow');
    }

    const invalidFileType = files.filter(x => !validFileType(x) || !validFileExtension(x));
    if(invalidFileType.length > 0 || errorDrafts?.invalidFileTypeDraft.length > 0){
        errorDrafts?.invalidFileTypeDraft.map(item => invalidFileType.push(item));
        const newInvalidFileType = [...new Set(invalidFileType)];
        const nameFileError = newInvalidFileType.map(x => x.name).join(', ');
        errors.imageFileType = LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), nameFileError);
    }

    const invalidFileSize = files.filter(x => !validFileSize(x));
    if(invalidFileSize.length > 0 || errorDrafts?.invalidFileSizeDraft.length > 0){
        errorDrafts?.invalidFileSizeDraft.map(item => invalidFileSize.push(item));
        const newInvalidFileSize = [...new Set(invalidFileSize)];
        const nameFileError = newInvalidFileSize.map(x => x.name).join(', ');
        errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
    }

    if(invalidWidthHeight.length > 0){
        const uniqInvalidImage = [...new Set(invalidWidthHeight)];
        const nameFileError = uniqInvalidImage.map(x => x).join(', ');
        errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
    }

    if (isHeadlineGroup.isSiteType) {
        if (!values.site) {
            errors.site = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'));
        }
        if (!values.currency) {
            errors.currency = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency'));
        }
        if (values.headlineType === '') {
            errors.headlineType = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('HeadlineType'));
        }
    }

    return errors;
};

const getFileName = (uploadedFiles, languageKey) => {
    const arrFileName = [];
    uploadedFiles.forEach(item => {
        if (item.key === languageKey) {
            arrFileName.push(item.name);
        }
    });
    return arrFileName.join(',');
};

const filterDuplicate = files => {
    return files.reduce((acc, current) => {
        const found = acc.find(item => item?.name === current?.name);
        if (!found) {
            acc.push(current);
        }
        return acc;
    }, []);
};

const filterFormStringFiles = uploadedFiles => {
    const formFiles = uploadedFiles.filter(item => item.type !== 'string');
    const fileStrings = uploadedFiles.filter(item => item.type === 'string');

    const filterFormFiles = filterDuplicate(formFiles);
    const filterFileStrings = filterDuplicate(fileStrings);

    if (filterFileStrings.length > 0) {
        const filterFormFileByString = filterFormFiles.filter(item => !filterFileStrings.find(x => x.name === item.name))
        return filterFileStrings.concat(filterFormFileByString);
    }
    else return filterFormFiles;
};

const getFileStringRemove = (oldFileName, uploadedFiles) => {
    const fileStringRemove = [];
    if (oldFileName.length > 0) {
        oldFileName.forEach(item => {
            if (!uploadedFiles.find(element => element.name === item.name)) {
                fileStringRemove.push(item);
            }
        })
    }
    return filterDuplicate(fileStringRemove);
};

export const getParams = (values, state) => {
    const {notificationTemplateId, content, headlineType, sendDate, sendType} = values;
    const formData = new FormData();

    if (values.oldFileName) {
        const fileStringRemoves = getFileStringRemove(values.oldFileName, state.uploadedFiles);
        if (fileStringRemoves.length > 0) {
            fileStringRemoves.forEach(oldFile => {
                formData.append('fileStringRemove', oldFile.name);
            });
        }
    }

    const filerDupFiles = filterFormStringFiles(state.uploadedFiles);
    filerDupFiles.forEach(file => {
        if (file.type === 'string') {
            formData.append('fileString', file.name);
        } else {
            formData.append('formFile', file);
        }
    });

    let index = 0;
    for (const [key, value] of Object.entries(content)) {
        if((value && value.length > 0) || state.uploadedFiles.filter(item => item?.key === key).length > 0){
            const languageId = state.languages.filter(x => x.mapLabel === key)[0].settingId;
            const fileNames = getFileName(state.uploadedFiles, key);

            if(languageId){
                formData.append(`contents[${index}][languageId]`, languageId);
                formData.append(`contents[${index}][value]`, value.replace( /\n/g, ''));
                formData.append(`contents[${index}][fileName]`, fileNames);
                index++;
            }
        }
    }

    const isSendImmediately = sendType === 'Send immediately';

    const params = {
        notificationTemplateId: notificationTemplateId,
        headlineNameList: state.isHeadlineGroup.isUsername ? state.headlineGroups.join(',') : '',
        siteNameList: (!values.site || !state.isHeadlineGroup.isSiteType) ? '' : values.site,
        currencyList: (!values.currency || !state.isHeadlineGroup.isSiteType) ? '' : values.currency,
        headlineType: state.isHeadlineGroup.isSiteType ? headlineType : '',
        title: values.title,
        sendDate: isSendImmediately ? null : (sendType === 'Send At' ? DateTimeService.toLongDateTimeFormat(sendDate) : null),
        sendImmediately: isSendImmediately,
        status: values.status
    };

    Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
    });

    return formData;
};

export const getFileString = contents => {
    const fileStrings = [];
    contents.forEach(item => {
        if (item.fileName) {
            const fileNames = item.fileName.split(',');
            fileNames.forEach(file => {
                const fileString = {
                    key: item.languageCode.replace(/[^A-Z0-9]/ig, ''),
                    name: file,
                    type: 'string'
                };
                fileStrings.push(fileString);
            });
        }
    });
    return fileStrings;
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
    const contentLength = contentReplaceHtml?.trim()?.length;
    if(contentLength > MAX_LENGTH_TELEGRAM){
        invalidContentMaxLength = true;
    }
    const textInvalidContentMaxLength = `Max length ${contentLength}/${MAX_LENGTH_TELEGRAM}`;
    return {invalidContentMaxLength, textInvalidContentMaxLength};
};

export function validFileSize(file){
    const convertSize = Math.round(file.size / 1024).toFixed(2);
    const maximumSize10MB = 10000;
    if(convertSize > maximumSize10MB){
        return false;
    }
    return true;
}

export function validFileType(file) {
    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    return fileTypes.includes(file.type);
}

export function validFileExtension(file) {
    const validFileFormat = ["jpeg", "pjpeg", "jpg", "png"];
    let extension = file.name.split('.').pop();
    return validFileFormat.includes(extension);
}

export const handleResetWhenBackPage = (props) => {
    props.setCreateAnnouncement(null);
    props.setEditAnnouncement(null);
    props.setValidateAnnouncement(null);
};

const isValidSiteCurrencyHeadline = values => {
    const { site, currency, headlineType } = values;
    return site && currency && headlineType !== '';
};

const isValidGroupHeadline = (values, state) => {
    const { isHeadlineGroup, headlineGroups } = state;
    if (isHeadlineGroup.isUsername && headlineGroups.length > 0) {
        return true;
    }
    return isHeadlineGroup.isSiteType && isValidSiteCurrencyHeadline(values);
};

const isValidSendType = (values, state) => {
    const { isSendNow, isSendAt } = state.isSendType;
    return isSendNow || (isSendAt && values.sendDate);
};

export const isDisableSubmit = (values, state, isSubmitting) => {
    if (!isSubmitting && values.title && isValidSendType(values, state) && isValidGroupHeadline(values, state)){
        return false;
    }
    return true;
};

export const getUsernames = (headlineNameList, directAccountList) => {
    if (headlineNameList && directAccountList) {
        return `${headlineNameList},${directAccountList}`;
    } else if (directAccountList) {
        return directAccountList;
    } else if (headlineNameList) {
        return headlineNameList;
    }
    return '';
};