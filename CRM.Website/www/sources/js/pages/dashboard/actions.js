import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setRedemptionById,
    setStatus
} from './dashboardSlice';

const getCustomerRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Dashboard/GetCustomerRemarks`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCustomerRemarks(response.data));
    }).then(() => Site.unblockUI());
};

const getRedemptionLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Dashboard/GetRedemptionLogs`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setRedemptionLogs(response.data));
    }).then(() => Site.unblockUI());
};

const getRedemptionById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/getLogById');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setRedemptionById(response.data));
    }).then(() => Site.unblockUI());
};

const getStatus = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Redemption/GetAllStatus?isEdit=true`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setStatus(response.data));
    }).then(() => Site.unblockUI());
};

const editRedemption = params => async () => {
    const url = Site.resolveClientUrl('Redemption/EditRedemptionLog');
    return await DataService.postDataAsync(url,params).then(response => response);
};

export const ActionCreators = {
    getCustomerRemarks,
    getRedemptionLogs,
    setEditRedemptionDialog,
    getRedemptionById,
    getStatus,
    editRedemption
};