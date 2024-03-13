import LangHelper from '@jsroot/common/langHelper';
import { getInvalidCategoryParams } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import { getProductParams, getCategoryParams }from '@jsroot/common/shareScripts';
import { DefaultLanguages } from '@jsroot/common/constants';
import { sortAndReplaceRelatedCust, getIdDefaultValueResponse } from '@jsroot/common/shareScripts';
import moment from 'moment';

export const validateFormik = (values, customerDetail, settings, content) => {
    const errors = {};
    if (customerDetail === null && values.identityInformation ==='') {
        errors.identityInformation = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Identity'));
    }

    if (moment(values.feedbackDate).isAfter(moment(values.resolutionTime))) {
        errors.feedbackDate = LangHelper.formatString(LangHelper.getResource('FieldLessThanOrEqualTo'), LangHelper.getResource('FeedbackDate'), LangHelper.getResource('ResolutionTime'));
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

    if (!values.languageId || values.languageId === 0) {
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
        responseId: getIdDefaultValueResponse(responses),
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
        siteName: customerDetail.siteSetting.name,
        headlineStaffInfoCommunications: customerDetail.headlineStaffInfoCommunications,
        headlineStaffInfoPics: customerDetail.headlineStaffInfoPics,
        otherAccountCommunicationInfos: customerDetail.otherAccountCommunicationInfos,
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
        responseId: getIdDefaultValueResponse(responses),
        product: '',
        subProduct: '',
        betType: '',
        role: customerDetail.roleId, 
        country: customerDetail.countryId,
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
    const autoGeneratedReplace = sortAndReplaceRelatedCust(listOfCustomerValid, content.autoGenerated);

    const params = {
        CustId: customerDetail !== null ? customerDetail.custId : null,
        UserName: customerDetail !== null ? customerDetail.username : values.identityInformation,
        FirstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        TitleId: parseInt(customerInfo.title, 10),
        Birthday: customerInfo.birthday === '' ? null : DateTimeService.toShortDateTimeFormat(new Date(customerInfo.birthday)),
        LanguageId: parseInt(values.languageId, 10),
        RefCode: customerInfo?.refCodes,
        SecretCode: customerInfo?.secretCode,
        IsHeadline: customerDetail !== null ? customerDetail.isGroupHeadLine : false,
        IsVIP: customerDetail !== null ? customerDetail.isVIP : false,
        Passport: customerInfo.passportNo,
        SiteId: customerInfo.siteId !== null ? parseInt(customerInfo.siteId, 10) : null,
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
        RoleId: !values.role ? 7004 : parseInt(values.role, 10),
        Subject: values.subject,
        AutoField: autoGeneratedReplace,
        Description: content.description,
        Solution: content.solution,
        NoInquiries: values.noOfInquiries === '' ? 0 : values.noOfInquiries,
        RelatedCustID: listOfCustomerValid.length > 0 ? listOfCustomerValid.map(x => x.custId).join(',') : null,
        HeadlineStaffInfoCommunications: getCommunicationToolAddFeedBack(customerInfo.headlineStaffInfoCommunications, customerDetail),
        OtherAccountCommunicationInfos: getCommunicationToolAddFeedBack(customerInfo.otherAccountCommunicationInfos, customerDetail),
        GuestCommunicationInfos: getCommunicationToolAddGuestFeedBack(customerInfo.guestCommunicationInfos)
    };

    return params;
};

export const GetParamsNewUser = (custId, values) => {
    return {
        customerId: custId,
        firstName: values.firstName,
        lastName: values.lastName,
        titleId: values.titleId,
        birthDay: values.birthDay ? DateTimeService.toShortDateFormat(values.birthDay) : null,
        languageId: values.languages.toString(),
        phone: values.phone,
        phoneCountryCode: values.phoneCountryCode,
        phoneAreaCode: values.phoneAreaCode,
        phone2: values.phone2,
        phone2CountryCode: values.phone2CountryCode,
        phone2AreaCode: values.phone2AreaCode,
        phone3: values.phone3,
        phone3CountryCode: values.phone3CountryCode,
        phone3AreaCode: values.phone3AreaCode,
        passport: values.passport,
        mobilePhone: values.mobilePhoneNumber,
        mobilePhoneCountryCode: values.mobileCountryCode,
        mobilePhoneAreaCode: values.mobileAreaCode,
        fax: values.faxNumber,
        faxCountryCode: values.faxCountryCode,
        faxAreaCode: values.faxAreaCode,
        email: values.email,
        skype: values.skype,
        msn: values.telegram,
        pic1: values.pic1PhoneNumber,
        pic2: values.pic2PhoneNumber,
        pic3: values.pic3PhoneNumber,
        pic4: values.pic4PhoneNumber,
        pic1Name: values.pic1Name,
        pic2Name: values.pic2Name,
        pic3Name: values.pic3Name,
        pic4Name: values.pic4Name,
        siteId: values.siteId,
        bettingCode: values.refCode1,
        refCode2: values.refCode2,
        line1: values.homeAddressLine1,
        line2: values.homeAddressLine2,
        line3: values.homeAddressLine3,
        city: values.homeAddressCity,
        countryId: values.homeAddressCountryId,
        postCode: values.homeAddressPostCode,
        state: values.homeAddressState,
        isVip: values.isVip,
        ignored: values.isIgnored,
        introducedBy: values.introducedBy,
        bankHolderName: values.bankInfoHolderName,
        bankName: values.bankInfoName,
        bankAccountNumber: values.bankInfoAccNo,
        bankSwiftCode: values.bankInfoSwiftCode,
        bankLine1: values.bankAddressLine1,
        bankLine2: values.bankAddressLine2,
        bankLine3: values.bankAddressLine3,
        bankCity: values.bankAddressCity,
        bankCode: values.bankAddressPostCode,
        bankState: values.bankAddressState,
        bankCountryId: values.bankAddressCountryId,
        licenseeType: values.licenseeTypeId,
        whatsApp: values.whatsApp,
        line: values.line,
        weChat: values.weChat,
        yahoo: values.letstalk,
        qq: values.qq,
        bbm: values.zalo
    };
};

const getCommunicationToolAddFeedBack = (communicationTools, customerDetail) => {
    let newCommunicationTools = [];
    communicationTools?.map(item => {
        newCommunicationTools.push({
            isHeadline: customerDetail.isGroupHeadLine,
            picInfo: getPicInfo(item, customerDetail),
            communicationID: item.picCommunicationId,
            communicationValue: item.picCommunicationValue
        });
    });
    return newCommunicationTools;
};

const getCommunicationToolAddGuestFeedBack = communicationTools => {
    let newCommunicationTools = [];
    communicationTools?.map(item => {
        newCommunicationTools.push({
            communicationID: item.picCommunicationId,
            communicationValue: item.picCommunicationValue
        });
    });
    return newCommunicationTools;
};

const getPicInfo = (communicationTool, customerDetail) => {
    let picInfo = "";
    customerDetail.headlineStaffInfoPics?.map(pic => {
        if (pic.picID === communicationTool.picID) {
            picInfo = (`${pic.picName} (${pic.picRoleName})`);
        }
    });
    return picInfo;
};

const getDefaultLanguage = languages =>{
    let language = null;
    const defaultId = [ DefaultLanguages.English, DefaultLanguages.Mandarin, DefaultLanguages.Cantonese];
    for (let i = 0; i < languages.length; i++) {
        const langue = languages[i];
        const isDefaultLanguage = defaultId.includes(langue?.id);
        if (isDefaultLanguage && (language === null || defaultLanguage.id > langue.id)) {
            defaultLanguage = langue;
        }
    }
    language = language || languages[0];
    return language;
};