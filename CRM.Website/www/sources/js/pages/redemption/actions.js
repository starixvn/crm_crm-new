import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog
} from './redemptionSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getAllStatus = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Redemption/GetAllStatus`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setAllStatus(response.data));
    }).then(() => Site.unblockUI());
};

const getLogById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/GetLogById');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setLogById(response.data));
    }).then(() => Site.unblockUI());
};

const editRedemptionLog = params => async () => {
    const url = Site.resolveClientUrl('Redemption/EditRedemptionLog');
    return await DataService.postDataAsync(url,params).then(response => response);
};

export const ActionCreators = {
    getLogsByCustomerId,
    getAllStatus,
    getLogById,
    setGridParams,
    setEditRedemptionDialog,
    editRedemptionLog
};