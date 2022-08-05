import moment from 'moment';
import LangHelper from '@jsroot/common/langHelper';
import { ActionCreators } from './actions';
import {
    getSubCategories, getSubProducts, getBetTypes, getSubjectOnChangeCategories
} from '@jsroot/common/shareScripts';
import Site from '@jsroot/common/site';
import { validateMainCategorySubCategory } from '../feedback/common.functions';

export const validateFormik = (values, settings) => {
    const errors = {};
    const { mainCategories, subCategories } = settings;
    validateMainCategorySubCategory(errors, values.mainCategoryIds, values.subCategoryIds, mainCategories, subCategories);

    if (values.customerNameInput !== '') {
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

    if (values.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Subject'));
    }

    if (values.remark === '') {
        errors.remark = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Remark'));
    }

    if (values.solution === '') {
        errors.solution = LangHelper.formatString(LangHelper.getResource('FieldRequired'),
            LangHelper.getResource('Solution'));
    }

    if (values.isReviewed && (values.review === null || values.review === '')) {
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

export const handleChangeMainCategory = (setFieldValue, categoryIds, subCategoryIds, subject, settings, setStateSubcategory) => {
    const tempSubject = getSubjectOnChangeCategories(categoryIds ? categoryIds.split(',') : [], subject, settings.mainCategories);
    setFieldValue('mainCategoryIds', categoryIds);
    setFieldValue('subject', tempSubject);
    if (categoryIds) {
        const subCategoryId = subCategoryIds.length > 0 ? subCategoryIds.split(',') : [];
        const subCategories = getSubCategories(categoryIds.split(','), settings.subCategories, subCategoryId, false);
        setStateSubcategory(subCategories);
    } else {
        setFieldValue('subCategoryIds', '');
        setStateSubcategory([]);
    }
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
    if (customers.length > 50)
        return false;
    return true;
};

export const handleGetFeedbackSubjectTemplates = Site.debounce(searchText => {
    if (searchText.length >= 2) {
        ActionCreators.getFeedbackSubjectTemplates(searchText);
    } else {
        ActionCreators.setFeedbackSubjectTemplates([]);
    }
});