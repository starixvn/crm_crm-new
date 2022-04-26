import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setRemarkTitle,
    setAllSettings,
    setGridParams,
    setRemarks,
    setOpenCreatePopup,
    setOpenEditPopup,
    setEditResult,
    setOpenConfirmDelete,
    setCreateResult,
    setValidateResult,
    setRemarksHistory,
    setShowHistory,
    setHistoryGridParams
} from './newRemarkSlice';

const getRemarkTitles= () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetRemarkTitles');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setRemarkTitle(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getAllSettings= () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetAllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const validateUsername = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/ValidateUsername');
    return await DataService.postDataAsync(url, params).then(response => {
        dispatch(setValidateResult(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getNewRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetNewRemarks');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarks(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const editNewRemarks = params => async dispatch => {
    const url = Site.resolveClientUrl('NewRemark/Edit');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setEditResult(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const createNewRemarks = params => async dispatch => {
    const url = Site.resolveClientUrl('NewRemark/Create');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCreateResult(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const deleteNewRemark = params => async () => {
    const url = Site.resolveClientUrl('NewRemark/Delete');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

const getNewRemarkHistory = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/getNewRemarkHistory');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarksHistory(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getRemarkTitles,
    setRemarkTitle,
    getAllSettings,
    setAllSettings,
    validateUsername,
    setGridParams,
    getNewRemarks,
    setRemarks,
    setOpenCreatePopup,
    setOpenEditPopup,
    deleteNewRemark,
    createNewRemarks,
    editNewRemarks,
    setEditResult,
    setCreateResult,
    setOpenConfirmDelete,
    setValidateResult,
    setRemarksHistory,
    getNewRemarkHistory,
    setShowHistory,
    setHistoryGridParams
};