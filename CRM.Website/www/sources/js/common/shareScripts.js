import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Policy, FunctionKey } from '@jsroot/common/constants';

export const getPermission = async (functionKey, isNoRedirectAccessDeniedPage) => {
    const url = Site.resolveClientUrl('Common/GetPermission');
    return await DataService.postDataAsync(url, { functionKey: functionKey }).then(response => {
        if (!response) {
            return;
        }

        if (response.data === 0 && !isNoRedirectAccessDeniedPage) {
            window.location = Site.resolveClientUrl('error/AccessDenied');
        } else {
            return response.data;
        }
    }).catch(Site.handleAxiosError);
};

export const checkHostPermissionPicAssign = async () => {
    const url = Site.resolveClientUrl('Common/GetPermission');
    return await DataService.postDataAsync(url, { functionKey: FunctionKey.PICAssignment }).then(response => {
        return response?.data === Policy.Host;
    }).catch(Site.handleAxiosError);
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
    const selectedProductIdsDistinct = selectedProductIds.filter((v, i, a) => a.findIndex(t => t === v) === i);
    const selectedSubProductIdsDistinct = selectedSubProductIds.filter((v, i, a) => a.findIndex(t => t === v) === i);
    const selectedBettypeIdsDistinct = selectedBettypeIds.filter((v, i, a) => a.findIndex(t => t === v) === i);

    if (selectedProductIdsDistinct.length === 0) {
        products = [
            {
                productId: settings.productNA?.id,
                subProductId: settings.subProductNA?.id,
                betTypeId: settings.bettypeNA?.id
            }
        ];
    } else {
        selectedProductIdsDistinct.forEach(productId => {
            if (selectedSubProductIdsDistinct.length === 0) {
                products.push({
                    productId: parseInt(productId, 10),
                    subProductId: settings.subProductNA?.id,
                    betTypeId: settings.bettypeNA?.id
                });
            } else {
                selectedSubProductIdsDistinct.forEach(subProductId => {
                    const index = settings.subProducts.findIndex(item => item.id === parseInt(subProductId, 10) && item.parentId === parseInt(productId, 10));
                    if (index >= 0) {
                        const subProductBettypes = [];
                        selectedBettypeIdsDistinct.forEach(betTypeId => {
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
        customers = relatedCustomers.filter(item => item.custId !== 0 && item.isAuthorized).map(item => item.val);
    }

    return 'System ID: ' + customers.join(', ');
}

export const getBackGroundColor = index => {
    const backGroundColors = [
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

function shadeColor(color, percent) {
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

const handleSortDateAsc = (sortBy, first, second) => new Date(first[`${sortBy}`]) > new Date(second[`${sortBy}`]) ? 1 : -1;

const handleSortDateDesc = (sortBy, first, second) => new Date(first[`${sortBy}`]) < new Date(second[`${sortBy}`]) ? 1 : -1;

const handleSortStringAsc = (sortBy, first, second) => first[`${sortBy}`] > (second[`${sortBy}`] || '') ? 1 : -1;

const handleSortStringDesc = (sortBy, first, second) => first[`${sortBy}`] < (second[`${sortBy}`] || '') ? 1 : -1;

export const handleSort = (cloneGridData, sortBy, sortOrder) => {
    let gridDataSortAsc = null;
    if (!cloneGridData || cloneGridData.length === 0) {
        return cloneGridData;
    }
    const findSortType = cloneGridData[0][`${sortBy}`];
    const isDateType = moment(findSortType, moment.ISO_8601, true).isValid();
    if (isDateType) {
        if (sortOrder === 'asc') {
            gridDataSortAsc = [...cloneGridData].sort((first, second) => handleSortDateAsc(sortBy, first, second));
        } else {
            gridDataSortAsc = [...cloneGridData].sort((first, second) => handleSortDateDesc(sortBy, first, second));
        }
    } else {
        if (sortOrder === 'asc') {
            gridDataSortAsc = [...cloneGridData].sort((first, second) => handleSortStringAsc(sortBy, first, second));
        } else {
            gridDataSortAsc = [...cloneGridData].sort((first, second) => handleSortStringDesc(sortBy, first, second));
        }
    }

    return gridDataSortAsc;
};

export const changeSiteSetting = (siteOptions, subItem, childList) => {
    const sites = JSON.parse(JSON.stringify(siteOptions));
    sites.map(item => {
        if (item[`${subItem}`] && item[`${subItem}`].length > 0) {
            const data = item[`${subItem}`].reduce((accumulator, currentValue) => {
                if (currentValue.name === null || currentValue.name === '') {
                    currentValue[`${childList}`].map(item => accumulator.push(item));
                } else {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);
            item[`${subItem}`].splice(0, item[`${subItem}`].length);
            data.map(element => item[`${subItem}`].push(element));
        }
    });
    return sites;
};

export const getSiteLabel = (sites, siteId) => {
    let siteLabel = '';
    sites.forEach(item => {
        if (item.childSites && item.childSites.length > 0) {
            item.childSites.forEach(element => {
                if (element.childSites && element.childSites.length > 0) {
                    if (element.childSites.find(data => data.id === siteId)) {
                        siteLabel = element.childSites.find(data => data.id === siteId).siteLabel;
                    }
                }
            });
        }
    });
    return siteLabel;
};

export const sortAndReplaceRelatedCust = (relatedCustomers, autoGenerated) => {
    if (!relatedCustomers || relatedCustomers.length === 0) {
        return autoGenerated;
    } else {
        const relatedCustJoin = relatedCustomers.map(x => x.val).join(', ');
        const sortRelatedCustomers = relatedCustomers.sort((first, second) => first.val.localeCompare(second.val));
        const sortRelatedCustomersJoin = sortRelatedCustomers.map(x => x.val).join(', ');
        const autoGeneratedReplace = autoGenerated.replace(relatedCustJoin, sortRelatedCustomersJoin);
        return autoGeneratedReplace;
    }
};

export const checkHostPermissionOnCurrentCustomer = async () => {
    const url = Site.resolveClientUrl('Common/GetHostPermissionOnCurrentCustomer');
    return await DataService.getDataAsync(url).then(response => {
        if (!response) {
            return;
        }
        return response.data;
    }).catch(Site.handleAxiosError);
};

export const getIdDefaultValueResponse = response => {
    const neutral = response.find(item => item.value === 'Neutral');
    if (neutral) {
        return neutral.id;
    }
    return response[0].id;
};

export const isHavePermissionOnSite = () => {
    const hasPermissionOnSite = document.getElementById('hasReadSitePermission').checked;
    if (!hasPermissionOnSite) {
        toast.error(LangHelper.getResource('NoPermissionOnCreditOrLicensee'));
    }
    return hasPermissionOnSite;
};

export const isHaveLicenseePermissionOnSite = () => {
    const hasPermissionOnSite = document.getElementById('hasReadLicenseePermission').checked;
    if (!hasPermissionOnSite) {
        toast.error(LangHelper.getResource('NoPermissionOnCreditOrLicensee'));
    }
    return hasPermissionOnSite;
};

export const filterCategories = (mainCategories, subCategories) => {
    const mainCategoriesArr = [];
    mainCategories.map(value => {
        const subCategoriesFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
        subCategoriesFilter.unshift({ name: 'All', subCategoryId: 0 });
        mainCategoriesArr.push({
            mainCategoryID: value.mainCategoryID,
            name: value.name,
            subCate: subCategoriesFilter
        });
    });
    mainCategoriesArr.unshift({ mainCategoryID: 0, name: 'All', subCate: [{ name: 'All', subCategoryId: 0 }] });
    return mainCategoriesArr;
};

export const filterSubCategories = (mainCategories, mainCategoryId, subCategoryId, setState) => {
    const categoryId = parseInt(mainCategoryId, 10);
    const filteredMainCategories = mainCategories.filter(item => item.mainCategoryID === categoryId);
    if (filteredMainCategories.length > 0) {
        const subCate = filteredMainCategories[0].subCate;
        const isExistSubCate = subCate?.some(item => item.subCategoryId === subCategoryId);

        if (!isExistSubCate) {
            setState({ subCategoryId: 0 });
        }
    }
    return filteredMainCategories[0].subCate;
};