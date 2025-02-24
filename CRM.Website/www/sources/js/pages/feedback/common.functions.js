import LangHelper from '@jsroot/common/langHelper';
import { getInvalidCategoryParams } from '@jsroot/common/shareScripts';

export const validateMainCategorySubCategory = (
    errors = {},
    selectedMainCategoryIds = '',
    selectedSubCategoryIds = '',
    mainCategories = [],
    subCategories = []) => {
    if (selectedMainCategoryIds === '') {
        errors.mainCategoryIds = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Category'));
    }

    if (selectedSubCategoryIds === '') {
        errors.subCategoryIds = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory'));
    }

    if (selectedMainCategoryIds !== '' && selectedSubCategoryIds !== '') {
        const invalidCategories = getInvalidCategoryParams(
            selectedMainCategoryIds.split(','),
            selectedSubCategoryIds.split(','),
            mainCategories,
            subCategories
        );
        if (invalidCategories.length > 0) {
            errors.mainCategoryIds = LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), invalidCategories.join(', '));
        }
    }
};

export const validateNoOfInquiry = event => {
    return event.target.validity.valid
        || event.target.value < 1 && (event.target.value = 1)
        || event.target.value > 32000 && (event.target.value = 32000);
};

export const ratings = [
    { id: 0, value: 0 },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
];