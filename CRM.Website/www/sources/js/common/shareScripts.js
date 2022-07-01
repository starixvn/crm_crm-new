import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

export const getPermission = async functionKey =>{
    const url = Site.resolveClientUrl('Common/GetPermission');
    return await DataService.postDataAsync(url, {functionKey : functionKey}).then(response => response.data);
};

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
            name: sub.name,
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
            if (checkCategorySubCategory(categoryId, subCategoryId, subCategories)) {
                isInvalid = true;
            }
        });

        if (!isInvalid) {
            const index = categories.findIndex(item => item.mainCategoryID === parseInt(categoryId, 10));
            invalidCategories.push(categories[index].name);
        }
    });

    return invalidCategories;
};

const checkCategorySubCategory = (categoryId, subCategoryId, subCategories) => {
    return subCategories.filter(sub => sub.subCategoryId === parseInt(subCategoryId, 10)
        && sub.mainCategoryID === parseInt(categoryId, 10)).length > 0;
};

const checkExistProductParams = (products, productId, subProductId, betTypeId) => {
    return products.filter(item => item.productId === parseInt(productId, 10)
        && item.subProductId === parseInt(subProductId, 10)
        && item.betTypeId === parseInt(betTypeId, 10)
    ).length > 0;
};

const checkExistBetType = (subProductId, betTypeId, betTypes) => {
    return betTypes.filter(item => item.id === parseInt(betTypeId, 10) && item.parentId === parseInt(subProductId, 10)).length > 0;
};

export const getProductParams = (selectedProductIds, selectedSubProductIds, selectedBettypeIds, settings) => {
    let products = [];
    if (selectedProductIds.length === 0) {
        products = [
            {
                productId: settings.productNA?.id,
                subProductId: settings.subProductNA?.id,
                betTypeId: settings.bettypeNA?.id
            }
        ];
    } else {
        selectedProductIds.forEach(productId => {
            if (selectedSubProductIds.length === 0) {
                products.push({
                    productId: parseInt(productId, 10),
                    subProductId: settings.subProductNA?.id,
                    betTypeId: settings.bettypeNA?.id
                });
            } else {
                selectedSubProductIds.forEach(subProductId => {
                    const index = settings.subProducts.findIndex(item => item.id === parseInt(subProductId, 10) && item.parentId === parseInt(productId, 10));
                    if (index >= 0) {
                        const subProductBettypes = [];
                        selectedBettypeIds.forEach(betTypeId => {
                            if (checkExistBetType(subProductId, betTypeId, settings.bettypes)) {
                                subProductBettypes.push({
                                    productId: parseInt(productId, 10),
                                    subProductId: parseInt(subProductId, 10),
                                    betTypeId: parseInt(betTypeId, 10)
                                });
                            }
                        });

                        if (subProductBettypes.length === 0) {
                            subProductBettypes.push({
                                productId: parseInt(productId, 10),
                                subProductId: parseInt(subProductId, 10),
                                betTypeId: settings.bettypeNA?.id
                            });
                        }

                        products = products.concat(subProductBettypes);
                    } else {
                        if (!checkExistProductParams(products, productId, settings.subProductNA?.id, settings.bettypeNA?.id)) {
                            products.push({
                                productId: parseInt(productId, 10),
                                subProductId: settings.subProductNA?.id,
                                betTypeId: settings.bettypeNA?.id
                            });
                        }
                    }
                });
            }
        });
    }

    return products;
};

export const getSubjectOnChangeCategories = (selectedCategoryIds, subject, categories) => {
    let tempSubject = subject;
    if (selectedCategoryIds.length === 0 && subject !== '') {
        tempSubject = '';
    } else {
        if (selectedCategoryIds.length === 1) {
            const index = categories.findIndex(item => item.mainCategoryID === parseInt(selectedCategoryIds[0], 10));
            tempSubject = categories[index].name;
        }
    }

    return tempSubject;
};

export const updateAutoGeneratedCustomerPrefix = (hasRelated, relatedCustomers, autoGeneratedText) => {
    const customerPrefix = generateCustomerPrefix(hasRelated, relatedCustomers);
    autoGeneratedText = autoGeneratedText.indexOf('System ID:') >= 0
        ? autoGeneratedText.replace(/System ID:.*/, customerPrefix)
        : autoGeneratedText + '\n' + customerPrefix;

    return autoGeneratedText;
};

function generateCustomerPrefix(hasRelated, relatedCustomers) {
    let customers = [];
    if (hasRelated) {
        customers = relatedCustomers.filter(item => item.custId !== 0).map(item => item.val);
    }

    return 'System ID: ' + customers.join(', ');
}

export const getBackGroundColor = index => {
    const backGroundColors= [
        '#3F5D7D', '#279B61', '#008AB8',
        '#993333', '#A3E496', '#95CAE4',
        '#CC3333', '#FFCC33', '#FFFF7A',
        '#CC6699', '#9370db'
    ];
    const backGroundColorLength = backGroundColors.length;
    const backGroundColorIndex = index % backGroundColorLength;
    let darkenPercent = Math.floor(index / backGroundColorLength) / 5;
    if (darkenPercent >= 1) {
        darkenPercent = 0;
    }

    const backGroundColor = darkenPercent === 0 ?
        backGroundColors[backGroundColorIndex] :
        shadeColor(backGroundColors[backGroundColorIndex], - darkenPercent);
    return backGroundColor;
};

function shadeColor(color, percent){
    const colorHexValue = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const redColor = colorHexValue >> 16;
    const greenColor = colorHexValue >> 8 & 0x00FF;
    const blueColor = colorHexValue & 0x0000FF;
    const backGroundColor = {
        Red: 0x1000000 + (Math.round((t - redColor) * p) + redColor) * 0x10000,
        Green: (Math.round((t - greenColor) * p) + greenColor) * 0x100,
        Blue: (Math.round((t - blueColor) * p) + blueColor)
    };

    return '#' + (backGroundColor.Red +
           backGroundColor.Green +
           backGroundColor.Blue).toString(16).slice(1);
}