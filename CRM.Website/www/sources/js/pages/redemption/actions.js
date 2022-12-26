import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog,
    setSettings,
    setCreateRedemptionDialog
} from './redemptionSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getAllStatus = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Redemption/GetAllStatus?isEdit=true`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllStatus(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getLogById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/GetLogById');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setLogById(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editRedemptionLog = params => async () => {
    const url = Site.resolveClientUrl('Redemption/EditRedemptionLog');
    return await DataService.postDataAsync(url,params).catch(Site.handleAxiosError).then(response => response);
};

const getSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Redemption/GetAllStatus?isEdit=false`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const createRedemptionLog = params => async () => {
    const url = Site.resolveClientUrl('Redemption/CreateRedemptionLog');
    return await DataService.postDataAsync(url,params).catch(Site.handleAxiosError).then(response => response);
};

export const ActionCreators = {
    resetState,
    getLogsByCustomerId,
    setLogsByCustomerId,
    getAllStatus,
    getLogById,
    setGridParams,
    setEditRedemptionDialog,
    editRedemptionLog,
    getSettings,
    setCreateRedemptionDialog,
    createRedemptionLog
};