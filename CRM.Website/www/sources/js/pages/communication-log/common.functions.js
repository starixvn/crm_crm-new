import moment from 'moment';
import LangHelper from '@jsroot/common/langHelper';
import { getSubProducts, getBetTypes } from '@jsroot/common/shareScripts';
import { validateMainCategorySubCategory } from '../feedback/common.functions';

export const validateFormik = (values, contents, verifySection, settings) => {
    const errors = {};
    const { mainCategories, subCategories } = settings;
    validateMainCategorySubCategory(errors, values.mainCategoryIds, values.subCategoryIds, mainCategories, subCategories);

    if (verifySection.customerNameInput !== '') {
        errors.customerNameInput = 'You must verify the username before saving this feedback.';
    }

    if (moment(values.startTime).isAfter(moment(values.endTime))) {
        errors.startTime = LangHelper.formatString( LangHelper.getResource('FieldLessThanOrEqualTo'),
            LangHelper.getResource('StartTime'),LangHelper.getResource('EndTime'));
    }

    if (values.firstResponseTime) {
        var isNotValidFirstRT = moment(values.firstResponseTime).isAfter(moment(values.endTime)) || moment(values.firstResponseTime).isBefore(moment(values.startTime));

        if (isNotValidFirstRT) {
            errors.firstResponseTime = LangHelper.formatString(
                LangHelper.getResource('FieldBetween'),
                LangHelper.getResource('FirstResponseTime'),
                LangHelper.getResource('StartTime'),
                LangHelper.getResource('EndTime'));
        }
    }

    if (values.communicationToolIds.length === 0) {
        errors.communicationToolIds = LangHelper.formatString( LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('CommunicationTool'));
    }

    if (parseInt(values.languageId, 10) === 0) {
        errors.languageId = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Language'));
    }

    if (verifySection.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Subject'));
    }

    if (contents.remark === '') {
        errors.remark = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Remark'));
    }

    if (contents.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Solution'));
    }

    if (contents.isReviewed && (contents.review === null || contents.review === '')) {
        errors.review = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Review'));
    }

    return errors;
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

export const filterGroupCategory = category => {
    const groupCategory = category.reduce( (accumulator, currentValue) => {
        const itemExist = accumulator.find(item => currentValue.mainCategoryId === item.mainCategoryId);
        if (itemExist) {
            itemExist.subCategoryId = [...itemExist.subCategoryId, currentValue.subCategoryId];
        }else {
            accumulator.push({mainCategoryId: currentValue.mainCategoryId, subCategoryId: [currentValue.subCategoryId]});
        }
        return accumulator;
    },[]);
    return groupCategory;
};

export const handleChangeProduct = (setFieldValue, productIds, subProductIds, settings, setStateSubProduct, setStateBetType) => {
    setFieldValue('productIds', productIds);
    if (productIds) {
        const subProductId = subProductIds.length > 0 ? subProductIds.split(',') : [];
        const subProducts = getSubProducts(productIds.split(','), settings.subProducts, subProductId, false);
        setStateSubProduct(subProducts);
    } else {
        setFieldValue('subProductIds', '');
        setFieldValue('betTypeIds', '');
        setStateSubProduct([]);
        setStateBetType([]);
    }
};

export const handleChangeSubProduct = (setFieldValue, subProductIds, selectedBetTypeIds, settings, setStateBetType) => {
    setFieldValue('subProductIds', subProductIds);
    if (subProductIds) {
        const betTypeIds = selectedBetTypeIds.length > 0 ? selectedBetTypeIds.split(',') : [];
        const betTypes = getBetTypes(subProductIds.split(','), settings.bettypes, betTypeIds, false);
        setStateBetType(betTypes);
    } else {
        setFieldValue('betTypeIds', '');
        setStateBetType([]);
    }
};

export const handlePasteCustomer = (setFieldValue, event, data) => {
    const customer = data.trim();
    const item = (event.clipboardData || window.clipboardData).getData('text')
        .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
        .split(',').filter(item => item !== '');
    setTimeout(() => {
        const customerInput = (customer.length > 0 ? customer + ',' : '').concat(item.join(','));
        setFieldValue('customerNameInput', customerInput);
    }, 100);
};

export const isValidCustomer = customers => {
    if(customers.includes(',')){
        const customersSplit = customers.split(',');
        const isAnyOverTextLong = customersSplit.filter(x=> x.length > 50).length > 0;
        if (isAnyOverTextLong)
        {
            return false;
        }
    }else if(customers.length > 50){
        return false;
    }else{
        return true;
    }

    return true;
};