export const getSubCategories = (isCheckDefault, subCategoryList, selectedSubCategoryIds) => {
    const selectedIdsDistinct = [];
    const distinctSub = [];
    subCategoryList.map(sub => {
        if (selectedIdsDistinct.indexOf(sub.subCategoryId) < 0) {
            selectedIdsDistinct.push(sub.subCategoryId);
            distinctSub.push(sub);
        }
    });

    const distinctSubCategories = distinctSub.map(sub => {
        return {
            name: sub.name,
            subCategoryId: sub.subCategoryId,
            checked: isCheckDefault ? true : selectedSubCategoryIds.indexOf(sub.subCategoryId.toString()) >= 0 ? true : false
        };
    });

    return distinctSubCategories;
};

const functions = {
    getSubCategories
};