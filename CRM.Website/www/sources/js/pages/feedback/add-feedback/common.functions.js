import LangHelper from '@jsroot/common/langHelper';
import {
    getInvalidCategoryParams,
    getProductParams,
    getCategoryParams,
    sortAndReplaceRelatedCust,
    getIdDefaultValueResponse
} from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import { DefaultLanguages } from '@jsroot/common/constants';
import moment from 'moment';

export const validateFormik = (values, customerDetail, settings, state) => {
    const errors = {};
    if (customerDetail === null && values.identityInformation ==='') {
        errors.identityInformation = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Identity'));
    }

    if (moment(values.feedbackDate).isAfter(moment(values.resolutionTime))) {
        errors.feedbackDate = LangHelper.formatString(
            LangHelper.getResource('FieldLessThanOrEqualTo'),
            LangHelper.getResource('FeedbackDate'),
            LangHelper.getResource('ResolutionTime'));
    }

    var isNotValidFirstRT = moment(values.firstResponseTime).isAfter(moment(values.resolutionTime)) || moment(values.firstResponseTime).isBefore(moment(values.feedbackDate));

    if (customerDetail !== null && isNotValidFirstRT) {
        errors.firstResponseTime = LangHelper.formatString(
            LangHelper.getResource('FieldBetween'),
            LangHelper.getResource('FirstResponseTime'),
            LangHelper.getResource('FeedbackDate'),
            LangHelper.getResource('ResolutionTime'));
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

    if (state.content.description === '') {
        errors.description = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Description'));
    }

    if (state.content.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution'));
    }

    values.guestCommunicationInfos?.map((comTool, indexTool) => {
        if (!comTool.communicationID || !comTool.communicationValue) {
            errors.guestCommunicationInfos =LangHelper.getResource('CommunicationRequired');
            comTool.isError = true;
        }
        else {
            comTool.isError = false;
        }

        const lengthValue = GetLengthNormalCommunicationValue(comTool, indexTool, values.guestCommunicationInfos);
        if (comTool.communicationID && comTool.communicationValue && lengthValue > 200) {
            errors.guestCommunicationInfos = LangHelper.getResource('CommunicationExceedMaxLength');
            comTool.isError = true;
        }
    });

    values.headlineStaffInfoCommunications?.map((comTool, indexTool) => {
        if (!comTool.picCommunicationId || !comTool.picCommunicationValue) {
            errors.headlineStaffInfoCommunications = LangHelper.getResource('CommunicationRequired');
            comTool.isError = true;
        }
        else {
            comTool.isError = false;
        }

        const lengthValue = GetLengthHeadlineCommunicationValue(comTool, indexTool, values.headlineStaffInfoCommunications);
        if (comTool.picCommunicationId && comTool.picCommunicationValue && lengthValue > 200) {
            errors.headlineStaffInfoCommunications = LangHelper.getResource('CommunicationExceedMaxLength');
            comTool.isError = true;
        }
    });

    values.otherAccountCommunicationInfos?.map((comTool, indexTool) => {
        if (!comTool.communicationID || !comTool.communicationValue) {
            errors.otherAccountCommunicationInfos = LangHelper.getResource('CommunicationRequired');
            comTool.isError = true;
        }
        else {
            comTool.isError = false;
        }

        const lengthValue = GetLengthNormalCommunicationValue(comTool, indexTool, values.otherAccountCommunicationInfos);
        if (comTool.communicationID && comTool.communicationValue && lengthValue > 200) {
            errors.otherAccountCommunicationInfos = LangHelper.getResource('CommunicationExceedMaxLength');
            comTool.isError = true;
        }
    });

    return errors;
};

export const GetLengthHeadlineCommunicationValue = (compic, indexCompic, communicationTools) => {
    let value = compic.picCommunicationValue;
    communicationTools.map((item, index) => {
        if (item.picCommunicationId && item.picCommunicationValue &&
            index !== indexCompic && compic.picCommunicationId === item.picCommunicationId && item.picID === compic.picID) {
            value += `, ${item.picCommunicationValue}`;
        }
    })
    return value.length;
}

export const GetLengthNormalCommunicationValue = (compic, indexCompic, communicationTools) => {
    let value = compic.communicationValue;
    communicationTools.map((item, index) => {
        if (item.communicationID && item.communicationValue &&
            index !== indexCompic && compic.communicationID === item.communicationID) {
            value += `, ${item.communicationValue}`;
        }
    })
    return value.length;
}

export const initValues = (settings, customerInfo) =>{
    const { statuses, languages, responses } = settings;
    const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);
    const firstResponseTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));

    const initialValues = {
        identityInformation: '',
        feedbackDate: feedbackDate,
        resolutionTime: resolutionTime,
        firstResponseTime: firstResponseTime,
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
        solution: '',
        guestCommunicationInfos: customerInfo.guestCommunicationInfos,
        rating: 0
    };

    return initialValues;
};

export const initCustomerInfo = customerDetail =>{
    const birthday = customerDetail.birthday ? new Date(DateTimeService.toShortDateTimeFormat(new Date(customerDetail.birthday))) : null;
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
        headlineStaffInfoCommunications: getHeadlineStaffInfoCommunications(customerDetail.headlineStaffInfoCommunications),
        headlineStaffInfoLanguages: customerDetail.headlineStaffInfoLanguages,
        headlineStaffInfoPics: customerDetail.headlineStaffInfoPics,
        otherAccountCommunicationInfos: getOtherAccountCommunicationInfos(customerDetail.otherAccountCommunicationInfos,),
        rating: customerDetail.rating ? customerDetail.rating : 0
    };

    return initialValues;
};

export const initValuesAddCustomerFb = (settings, customerDetail, customerInfo) =>{
    const { statuses, responses  } = settings;
    const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
    resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);
    const firstResponseTime = new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(new Date())));

    const initialValues = {
        feedbackDate: feedbackDate,
        resolutionTime: resolutionTime,
        firstResponseTime: firstResponseTime,
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
        solution: '',
        headlineStaffInfoCommunications: customerInfo.headlineStaffInfoCommunications,
        otherAccountCommunicationInfos: customerInfo.otherAccountCommunicationInfos,
        rating: customerInfo.rating ? customerInfo.rating : 0
    };

    return initialValues;
};

export const getHeadlineCommunicationInfoPIC = (communications, headlineStaffInfoPics) => {
    let headlineCommunicationInfo = [];
    headlineStaffInfoPics.map(pic => {
        let communicationTools = [];
        communications.map((communication, indexCom) => {
            if (communication.picID === pic.picID) {
                communicationTools.push({
                    picCommunicationId: communication.picCommunicationId,
                    picCommunicationName: communication.picCommunicationName,
                    picCommunicationValue: communication.picCommunicationValue,
                    index: indexCom,
                    isError: communication.isError
                });
            }
        });
        headlineCommunicationInfo.push({
            picCommunicationTools: communicationTools,
            picId: pic.picID,
            picName: pic.picName,
            picRoleName: pic.picRoleName
        });
    });
    return headlineCommunicationInfo;
}

export const getHeadlineStaffInfoCommunications = communications => {
    const headlineStaffInfoCommunications = [];
    communications?.map(item => {
        headlineStaffInfoCommunications.push({
            headlineID: item.headlineID,
            picCommunicationId: item.picCommunicationId,
            picCommunicationName: item.picCommunicationName,
            picCommunicationValue: item.picCommunicationValue,
            picID: item.picID,
            isNew: false,
            isError: false
        });
    });
    return headlineStaffInfoCommunications;
}

export const getOtherAccountCommunicationInfos = communications => {
    const otherAccountCommunicationInfos = [];
    communications?.map(item => {
        otherAccountCommunicationInfos.push({
            communicationName: item.communicationName,
            communicationID: item.communicationID,
            communicationValue: item.communicationValue,
            custId: item.custId,
            isNew: false,
            isError: false
        });
    });
    return otherAccountCommunicationInfos;
}

export const getParams = (values, customerDetail, settings, state) =>{
    const {customerInfo, listOfCustomerValid, content} = state;
    const autoGeneratedReplace = sortAndReplaceRelatedCust(listOfCustomerValid, content.autoGenerated);

    const params = {
        CustId: customerDetail !== null ? customerDetail.custId : null,
        UserName: customerDetail !== null ? customerDetail.username : values.identityInformation,
        FirstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        TitleId: parseInt(customerInfo.title, 10),
        Birthday: (customerInfo.birthday === '' || customerInfo.birthday === null) ? null : DateTimeService.toShortDateTimeFormat(new Date(customerInfo.birthday)),
        LanguageId: parseInt(values.languageId, 10),
        RefCode: customerInfo?.refCodes,
        SecretCode: customerInfo?.secretCode,
        IsHeadline: customerDetail !== null ? customerDetail.isGroupHeadLine : false,
        IsOverwrite: customerInfo.isOverwriteInfo,
        IsVIP: customerDetail !== null ? customerDetail.isVIP : false,
        Passport: customerInfo.passportNo,
        SiteId: customerInfo.siteId !== null ? parseInt(customerInfo.siteId, 10) : null,
        LicenseeType: parseInt(customerInfo.licenseeType, 10),
        FeedbackDate: DateTimeService.toLongDateTimeFormat(values.feedbackDate),
        ResolutionDate: DateTimeService.toLongDateTimeFormat(values.resolutionTime),
        FirstResponseTime: DateTimeService.toLongDateTimeFormat(values.firstResponseTime),
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
        HeadlineStaffInfoCommunications: getHeadlineCommunicationToolAddFeedBack(customerInfo.headlineStaffInfoCommunications, customerDetail),
        OtherAccountCommunicationInfos: getNoneHeadlineCommunicationToolAddFeedBack(customerInfo.otherAccountCommunicationInfos, customerDetail),
        GuestCommunicationInfos: getCommunicationToolAddGuestFeedBack(customerInfo.guestCommunicationInfos),
        rating: parseInt(values.rating, 10)
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

const getHeadlineCommunicationToolAddFeedBack = (communicationTools, customerDetail) => {
    let newCommunicationTools = [];
    communicationTools?.map((picCom, indexCom) => {
        const picinfo2 = getPicInfo(picCom, customerDetail);
        const index = newCommunicationTools.findIndex(item => item.communicationID === picCom.picCommunicationId && item.picInfo === picinfo2);
        if (index >= 0 && index !== indexCom) {
            const newValue = newCommunicationTools[index].communicationValue.concat(', ', picCom.picCommunicationValue);
            newCommunicationTools[index].communicationValue = newValue;
        }
        else {
            const newPicCom = {
                isHeadline: customerDetail.isGroupHeadLine,
                picInfo: getPicInfo(picCom, customerDetail),
                communicationID: picCom.picCommunicationId,
                communicationValue: picCom.picCommunicationValue
            };
            newCommunicationTools.push({ ...newPicCom });
        }
    });
    return newCommunicationTools;
};

const getNoneHeadlineCommunicationToolAddFeedBack = (communicationTools, customerDetail) => {
    let newCommunicationTools = [];
    communicationTools?.map((picCom, indexCom) => {
        const index = newCommunicationTools.findIndex(item => item.communicationID === picCom.communicationID);
        if (index >= 0 && index !== indexCom) {
            const newValue = newCommunicationTools[index].communicationValue.concat(', ', picCom.communicationValue);
            newCommunicationTools[index].communicationValue = newValue;
        }
        else {
            const newPicCom = {
                isHeadline: customerDetail.isGroupHeadLine,
                picInfo: getPicInfo(picCom, customerDetail),
                communicationID: picCom.communicationID,
                communicationValue: picCom.communicationValue
            };
            newCommunicationTools.push({ ...newPicCom });
        }
    });
    return newCommunicationTools;
};

const getCommunicationToolAddGuestFeedBack = communicationTools => {
    let newCommunicationTools = [];
    communicationTools?.map((picCom, indexCom) => {
        const index = newCommunicationTools.findIndex(item => item.communicationID === picCom.communicationID);
        if (index >= 0 && index !== indexCom) {
            const newValue = newCommunicationTools[index].communicationValue.concat(', ', picCom.communicationValue);
            newCommunicationTools[index].communicationValue = newValue;
        }
        else {
            const newPicCom = {
                communicationID: picCom.communicationID,
                communicationValue: picCom.communicationValue
            };
            newCommunicationTools.push({ ...newPicCom });
        }
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