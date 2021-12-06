import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog
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

const getCommunicationLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Dashboard/GetCommunicationLogs');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCommunicationLogs(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerRemarks,
    getRedemptionLogs,
    setEditRedemptionDialog,
    getCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog
};