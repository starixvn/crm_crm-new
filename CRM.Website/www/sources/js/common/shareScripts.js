import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export const generateTimeAndToolPrefix = (startTime, communicationTool) => {
    return LangHelper.formatString('Date Time & Tool: {0}/{1}', DateTimeService.toStartTimePrefix(startTime), communicationTool);
};

export const getSubCategories = (selectedCategories, subCategories, selectedSubCategoryIds, isCheckDefault) => {
    const tempSubCategories = subCategories.filter(item => selectedCategories.includes(item.mainCategoryID.toString()));
    const selectedIdsDistinct = [];
    const distinctSub = [];
    tempSubCategories.forEach(sub => {
        if (selectedIdsDistinct.indexOf(sub.subCategoryId) < 0) {
            selectedIdsDistinct.push(sub.subCategoryId);
            distinctSub.push(sub);
        }
    });

    return distinctSub.map(sub => {
        return {
            settingName: sub.settingName,
            subCategoryId: sub.subCategoryId,
            checked: isCheckDefault ? true : selectedSubCategoryIds.indexOf(sub.subCategoryId.toString()) >= 0
        };
    });
};

export const getSubProducts = (selectedProductIds, subProducts, selectedSubProductIds, isCheckDefault) => {
    const tempSubProducts = [];
    subProducts.forEach(subProduct => {
        if (selectedProductIds.indexOf(subProduct.parentId.toString()) >= 0) {
            tempSubProducts.push(subProduct);
        }
    });

    return tempSubProducts.map(subProduct => {
        return {
            value: subProduct.value,
            id: subProduct.id,
            checked: isCheckDefault ? true : selectedSubProductIds.indexOf(subProduct.id.toString()) >= 0
        };
    });
};

export const getBetTypes = (selectedSubProducts, betTypes, selectedBetTypeIds, isCheckDefault) => {
    const tempBetTypes = betTypes.filter(item => selectedSubProducts.includes(item.parentId.toString()));
    const selectedIdsDistinct = [];
    const distinctBetTypes = [];
    tempBetTypes.forEach(bet => {
        if (selectedIdsDistinct.indexOf(bet.id) < 0) {
            selectedIdsDistinct.push(bet.id);
            distinctBetTypes.push(bet);
        }
    });

    return distinctBetTypes.map(bet => {
        return {
            value: bet.value,
            id: bet.id,
            checked: isCheckDefault ? true : selectedBetTypeIds.indexOf(bet.id.toString()) >= 0
        };
    });
};

export const getCategoryParams = (selectedCategoryIds, selectedSubCategoryIds, subCategories) => {
    const categories = [];
    selectedCategoryIds.forEach(categoryId => {
        selectedSubCategoryIds.forEach(subCategoryId => {
            if (subCategories.filter(item => item.subCategoryId === parseInt(subCategoryId, 10) && item.mainCategoryID === parseInt(categoryId, 10)).length > 0) {
                categories.push({
                    mainCategoryId: parseInt(categoryId, 10),
                    subCategoryId: parseInt(subCategoryId, 10)
                });
            }
        });
    });

    return categories;
};

export const getInvalidCategoryParams = (selectedCategoryIds, selectedSubCategoryIds, categories, subCategories) => {
    const invalidCategories = [];
    selectedCategoryIds.forEach(categoryId => {
        let isInvalid = false;
        selectedSubCategoryIds.forEach(subCategoryId => {
            if (subCategories.filter(item => item.subCategoryId === parseInt(subCategoryId, 10) && item.mainCategoryID === parseInt(categoryId, 10)).length === 0) {
                isInvalid = true;
            }
        });

        if (isInvalid) {
            const index = categories.findIndex(item => item.mainCategoryID === parseInt(categoryId, 10));
            invalidCategories.push(categories[index].settingName);
        }
    });

    return invalidCategories;
};

export const getProductParams = function (selectedProductIds, selectedSubProductIds, selectedBettypeIds, settings) {
    let products = [];
    if (selectedProductIds.length === 0) {
        products = [
            {
                productId: settings.productNA.id,
                subProductId: settings.subProductNA.id,
                bettypeId: settings.bettypeNA.id
            }
        ];
    } else {
        const processedProductIds = [];
        selectedSubProductIds.forEach(subProductId => {
            const index = settings.subProducts.findIndex(item => item.id === parseInt(subProductId, 10));
            const subProductBettypes = [];
            selectedBettypeIds.forEach(bettypeId => {
                if (settings.bettypes.filter(item => item.id === parseInt(bettypeId, 10) && item.parentId === parseInt(subProductId, 10)).length > 0) {
                    subProductBettypes.push({
                        productId: settings.subProducts[index].parentId,
                        subProductId: settings.subProducts[index].id,
                        bettypeId: bettypeId
                    });
                }
            });

            if (subProductBettypes.length === 0) {
                subProductBettypes.push({
                    productId: settings.subProducts[index].parentId,
                    subProductId: settings.subProducts[index].id,
                    bettypeId: settings.bettypeNA.id
                });
            }

            products = products.concat(subProductBettypes);
            processedProductIds.push(settings.subProducts[index].parentId);
        });

        selectedProductIds.forEach(productId => {
            if (processedProductIds.indexOf(parseInt(productId, 10)) < 0) {
                products.push({
                    productId: parseInt(productId, 10),
                    subProductId: settings.subProductNA.Id,
                    bettypeId: settings.bettypeNA.Id
                });
            }
        });
    }

    return products;
};

export const getSubjectOnChangeCategories = function (selectedCategoryIds, subject, categories) {
    let tempSubject = subject;
    if (selectedCategoryIds.length === 0 && subject !== '') {
        tempSubject = '';
    } else {
        if (selectedCategoryIds.length === 1) {
            const index = categories.findIndex(item => item.mainCategoryID === parseInt(selectedCategoryIds[0], 10));
            tempSubject = categories[index].settingName;
        }
    }

    return tempSubject;
};