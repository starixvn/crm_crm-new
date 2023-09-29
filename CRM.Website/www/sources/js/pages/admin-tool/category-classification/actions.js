import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setGridParams,
    setGridData,
    setCategoryClassId,
    setEditCategoryClassResult,
    setEditCategoryClassPopup,
    setDeleteCategoryClassPopup
} from './categoryClassificationSlice';

const getAllSettings = () => async () => {
    const url = Site.resolveClientUrl('CategoryClassification/GetAllSettings');
    return await DataService.getDataAsync(url).then(response => response.data).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CategoryClassification/GetCategoryClassification');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getCategoryClassById = (mainCategoryId, subCategoryId) => async dispatch => {
    const params = { mainCategoryId, subCategoryId };
    const url = Site.resolveClientUrl('CategoryClassification/GetCategoryClassById');
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setCategoryClassId(response.data));
    }).catch(Site.handleAxiosError);
};

const editCategoryClass = data => async dispatch => {
    const url = Site.resolveClientUrl('CategoryClassification/EditCategoryClassification');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditCategoryClassResult(response.data));
    }).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    getAllSettings,
    getGridData,
    setCategoryClassId,
    getCategoryClassById,
    editCategoryClass,
    setEditCategoryClassPopup,
    setEditCategoryClassResult,
    setDeleteCategoryClassPopup
};