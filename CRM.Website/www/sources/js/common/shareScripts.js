export const getSubCategories = (selectedCategories, subCategoryList, selectedSubCategoryIds, isCheckDefault) =>{
    const subCategories = subCategoryList.filter(item => selectedCategories.includes(item.mainCategoryID.toString()));
    const selectedIdsDistinct = [];
    const distinctSub = [];
    subCategories.forEach(sub => {
        if (selectedIdsDistinct.indexOf(sub.subCategoryId) < 0) {
            selectedIdsDistinct.push(sub.subCategoryId);
            distinctSub.push(sub);
        }
    });

    const distinctSubCheck = distinctSub.map(sub => {
        return {
            settingName: sub.settingName,
            subCategoryId: sub.subCategoryId,
            checked: isCheckDefault ? true : selectedSubCategoryIds.indexOf(sub.subCategoryId.toString()) >= 0 ? true : false
        };
    });

    return distinctSubCheck;
};

export const getSubProducts = (selectedProductsId, subProductList, selectedSubProductIds, isCheckDefault) =>{
    const subProducts = [];
    subProductList.forEach(subProduct => {
            if (selectedProductsId.indexOf(subProduct.parentId.toString()) >= 0) {
                subProducts.push(subProduct);
            }
        });

    const subProductsCheck =  subProducts.map(subProduct => {
        return {
            value: subProduct.value,
            id: subProduct.id,
            checked: isCheckDefault ? true : selectedSubProductIds.indexOf(subProduct.id.toString()) >= 0 ? true : false
        };
    });
    
        return subProductsCheck;
};


export const getBetTypes = (selectedSubProducts, betTypeList, selectedBetTypeIds, isCheckDefault) =>{
    const betTypes = betTypeList.filter(item => selectedSubProducts.includes(item.parentId.toString()));
    const selectedIdsDistinct = [];
    const distinctBetTypes = [];
    betTypes.forEach(bet => {
        if (selectedIdsDistinct.indexOf(bet.id) < 0) {
            selectedIdsDistinct.push(bet.id);
            distinctBetTypes.push(bet);
        }
    });

    const distinctBetTypesCheck = distinctBetTypes.map(bet => {
        return {
            value: bet.value,
            id: bet.id,
            checked: isCheckDefault ? true : selectedBetTypeIds.indexOf(bet.id.toString()) >= 0 ? true : false
        };
    });

    return distinctBetTypesCheck;
};
