import LangHelper from '@jsroot/common/langHelper';
import { getInvalidCategoryParams } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import { getProductParams, getCategoryParams }from '@jsroot/common/shareScripts';
import { DefaultLanguages }from '@jsroot/common/constants';


export const validateFormik = (values, customerDetail, settings, content) => {
    const errors = {};
    if (customerDetail === null && values.identityInformation ==='') {
        errors.identityInformation = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Identity'));
    }

    if (values.communication.length === 0) {
        errors.communication = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication'));
    }

    if (values.category === '') {
        errors.category = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Category'));
    }

    if (values.subCategory === '') {
        errors.subCategory = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory'));
    }

    if (values.category !== '' && values.subCategory !== '') {
        const invalidCategories = getInvalidCategoryParams(
            values.category.split(','),
            values.subCategory.split(','),
            settings.mainCategories,
            settings.subCategories
        );
        if (invalidCategories.length > 0) {
            errors.category = LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), invalidCategories.join(', '));
        }
    }

    if (values.languageId === 0) {
        errors.languageId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language'));
    }

    if (values.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject'));
    }

    if (content.description === '') {
        errors.description = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Description'));
    }

    if (content.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution'));
    }

    return errors;
};

export const initValues = settings =>{
    const { statuses, languages, responses  } = settings;
    const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);

    const initialValues = {
        identityInformation: '',
        feedbackDate: feedbackDate,
        resolutionTime: resolutionTime,
        communication: '',
        category: '',
        subCategory: '',
        statusId: statuses[0].statusId,
        responseId: responses[0].id,
        product: '',
        subProduct: '',
        betType: '',
        languageId: languages[0].languageId,
        noOfInquiries: '',
        customerNameInput: '',
        subject: '',
        ticketRefInput: '',
        description: '',
        solution: ''
    };

    return initialValues;
};

export const initCustomerInfo = customerDetail =>{
    const birthday = new Date(DateTimeService.toShortDateTimeFormat(new Date(customerDetail.birthday)));
    const initialValues = {
        title: customerDetail.titleId,
        firstName: customerDetail.firstName,
        lastName: customerDetail.lastName,
        birthday: birthday,
        passportNo: customerDetail.passport,
        licenseeType: customerDetail.licenseeType,
        countryCode: customerDetail.phoneInfo[0].countryCode,
        phoneNumber: customerDetail.phoneInfo[0].phoneNumber,
        areaCode: customerDetail.phoneInfo[0].areaCode,
        countryCode2: customerDetail.phoneInfo[1].countryCode,
        phoneNumber2: customerDetail.phoneInfo[1].phoneNumber,
        areaCode2: customerDetail.phoneInfo[1].areaCode,
        countryCode3: customerDetail.phoneInfo[2].countryCode,
        phoneNumber3: customerDetail.phoneInfo[2].phoneNumber,
        areaCode3: customerDetail.phoneInfo[2].areaCode,
        mobileCountryCode: customerDetail.mobile.countryCode,
        mobileAreaCode: customerDetail.mobile.areaCode,
        mobilePhoneNumber: customerDetail.mobile.phoneNumber,
        faxCountryCode: customerDetail.faxInfo.countryCode,
        faxAreaCode: customerDetail.faxInfo.areaCode,
        faxNumber: customerDetail.faxInfo.faxNumber,
        pic1Name: customerDetail.pic1Name,
        pic1PhoneNumber: customerDetail.pic1,
        pic2Name: customerDetail.pic2Name,
        pic2PhoneNumber: customerDetail.pic2,
        pic3Name: customerDetail.pic3Name,
        pic3PhoneNumber: customerDetail.pic3,
        pic4Name: customerDetail.pic4Name,
        pic4PhoneNumber: customerDetail.pic4,
        refCodes: customerDetail.bettingCode[1],
        secretCode: customerDetail.bettingCode[0],
        skype: customerDetail.skype,
        email: customerDetail.email,
        telegram: customerDetail.msn,
        weChat: customerDetail.weChat,
        whatApp: customerDetail.whatsApp,
        line: customerDetail.line,
        letstalk: customerDetail.yahoo,
        qq: customerDetail.qq,
        zalo: customerDetail.bbm,
        isOverwriteInfo: false,
        siteId: customerDetail.siteId,
        siteName: customerDetail.siteSetting.name
    };

    return initialValues;
};

export const initValuesAddCustomerFb = (settings, customerDetail) =>{
    const { statuses, responses  } = settings;
    const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);

    const initialValues = {
        feedbackDate: feedbackDate,
        resolutionTime: resolutionTime,
        communication: '',
        category: '',
        subCategory: '',
        statusId: statuses[0].statusId,
        responseId: responses[0].id,
        product: '',
        subProduct: '',
        betType: '',
        role: customerDetail.roleId, 
        country: customerDetail.country.id,
        siteName: customerDetail.siteSetting.name,
        refCodes: customerDetail.bettingCode[1],
        secretCode: customerDetail.bettingCode[0],
        languageId: getDefaultLanguage(customerDetail.languages),
        noOfInquiries: '',
        customerNameInput: '',
        subject: '',
        ticketRefInput: '',
        description: '',
        solution: ''
    };

    return initialValues;
};

export const getParams = (values, customerDetail, settings, state) =>{
    const {customerInfo, listOfCustomerValid, content} = state;
    const params = {
        CustId: customerDetail !== null ? customerDetail.custId : null,
        IsOverWrite: customerInfo.isOverwriteInfo,
        UserName: customerDetail !== null ? customerDetail.username : values.identityInformation,
        FirstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        TitleId: parseInt(customerInfo.title, 10),
        Birthday: customerInfo.birthday === '' ? null : DateTimeService.toShortDateTimeFormat(new Date(customerInfo.birthday)),
        LanguageId: parseInt(values.languageId, 10),
        Phone: customerInfo.phoneNumber,
        PhoneCountryCode: customerInfo.countryCode,
        PhoneAreaCode: customerInfo.areaCode,
        Phone2: customerInfo.phoneNumber2,
        Phone2CountryCode: customerInfo.countryCode2,
        Phone2AreaCode: customerInfo.areaCode2,
        Phone3: customerInfo.phoneNumber3,
        Phone3CountryCode: customerInfo.countryCode3,
        Phone3AreaCode: customerInfo.areaCode3,
        RefCode: customerInfo?.refCodes,
        SecretCode: customerInfo?.secretCode,
        IsVIP: customerDetail !== null ? customerDetail.isVIP : false,
        Passport: customerInfo.passportNo,
        MobilePhone: customerInfo.mobilePhoneNumber,
        MobilePhoneCountryCode: customerInfo.mobileCountryCode,
        MobilePhoneAreaCode: customerInfo.mobileAreaCode,
        Fax: customerInfo.faxNumber,
        FaxCountryCode: customerInfo.faxCountryCode,
        FaxAreaCode: customerInfo.faxAreaCode,
        Email: customerInfo.email,
        Skype: customerInfo.skype,
        MSN: customerInfo.telegram,
        Pic1: customerInfo.pic1PhoneNumber,
        Pic2: customerInfo.pic2PhoneNumber,
        Pic3: customerInfo.pic3PhoneNumber,
        Pic4: customerInfo.pic4PhoneNumber,
        Pic1Name: customerInfo.pic1Name,
        Pic2Name: customerInfo.pic2Name,
        Pic3Name: customerInfo.pic3Name,
        Pic4Name: customerInfo.pic4Name,
        WeChat: customerInfo.weChat,
        WhatsApp: customerInfo.whatApp,
        Line: customerInfo.line,
        Yahoo: customerInfo.letstalk,
        QQ: customerInfo.qq,
        BBM: customerInfo.zalo,
        SiteId: customerDetail !== null ? parseInt(customerInfo.siteId, 10) : null,
        LicenseeType: parseInt(customerInfo.licenseeType, 10),
        FeedbackDate: DateTimeService.toLongDateTimeFormat(values.feedbackDate),
        ResolutionDate: DateTimeService.toLongDateTimeFormat(values.resolutionTime),
        CommunicationID: values.communication,
        Products: getProductParams(values.product.length > 0 ? values.product.split(',') : [],
            values.subProduct.length > 0 ? values.subProduct.split(',') : [],
            values.betType.length > 0 ? values.betType.split(',') : [],
            settings),
        ResponseId: parseInt(values.responseId, 10),
        Categories: getCategoryParams(values.category.split(','), values.subCategory.split(','), settings.subCategories),
        StatusId: parseInt(values.statusId, 10),
        StationId: !values.extension ? settings.extensionNA.id : values.extension,
        CountryId: !values.country ? 0 : parseInt(values.country, 10),
        Subject: values.subject,
        AutoField: content.autoGenerated,
        Description: content.description,
        Solution: content.solution,
        NoInquiries: values.noOfInquiries === '' ? 0 : values.noOfInquiries,
        RelatedCustId: listOfCustomerValid.length > 1 ? listOfCustomerValid.map(x => x.custId).join(',') : null
    };

    return params;
};

const getDefaultLanguage = languages =>{
    let language = '';
    languages.forEach(lang => {
        const isDefault = DefaultLanguages.NotApply === lang ||DefaultLanguages.English === lang
                        || DefaultLanguages.Mandarin === lang || DefaultLanguages.Cantonese === lang;
        if(isDefault && (language === '' || language.languageId >  lang)){
            language = lang;
        }
    });

    language = language || languages[0];
    return language;
};