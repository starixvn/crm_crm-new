import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLastFiveSpecialRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    setCustomerInfoVerify,
    setEditCustomerVerifyDialog,
    setLastRemark,
    resetState
} from './dashboardSlice';

const getLastFiveSpecialRemarks = params => async dispatch => {
    const url = Site.resolveClientUrl(`Dashboard/GetLastFiveSpecialRemarks`);
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setLastFiveSpecialRemarks(response.data));
    }).catch(Site.handleAxiosError);
};

const getRedemptionLogs = params => async dispatch => {
    const url = Site.resolveClientUrl(`Dashboard/GetRedemptionLogs`);
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setRedemptionLogs(response.data));
    }).catch(Site.handleAxiosError);
};

const getCommunicationLogs = params => async dispatch => {
    const url = Site.resolveClientUrl('Dashboard/GetCommunicationLogs');
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setCommunicationLogs(response.data));
    }).catch(Site.handleAxiosError);
};

const getCustomerInfoVerify = params => async dispatch => {
    const url = Site.resolveClientUrl('Dashboard/GetCustomerInfoVerify');
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setCustomerInfoVerify(response.data));
    }).catch(Site.handleAxiosError);
};

const editCustomerVerify = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Dashboard/EditCustomerVerify');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const getLastRemark = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetLastRemark');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setLastRemark(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    getLastFiveSpecialRemarks,
    getRedemptionLogs,
    setEditRedemptionDialog,
    getCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    getCustomerInfoVerify,
    setEditCustomerVerifyDialog,
    editCustomerVerify,
    getLastRemark,
    setLastRemark,
    resetState
};