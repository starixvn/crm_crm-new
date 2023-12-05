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