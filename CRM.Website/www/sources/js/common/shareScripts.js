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