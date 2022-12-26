import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    setCustomerInfoVerify,
    setEditCustomerVerifyDialog,
    setLastFiveRemark,
    resetState
} from './dashboardSlice';

const getCustomerRemarks = params => async dispatch => {
    const url = Site.resolveClientUrl(`Dashboard/GetCustomerRemarks`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCustomerRemarks(response.data));
    }).catch(Site.handleAxiosError);
};

const getRedemptionLogs = params => async dispatch => {
    const url = Site.resolveClientUrl(`Dashboard/GetRedemptionLogs`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setRedemptionLogs(response.data));
    }).catch(Site.handleAxiosError);
};

const getCommunicationLogs = params => async dispatch => {
    const url = Site.resolveClientUrl('Dashboard/GetCommunicationLogs');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCommunicationLogs(response.data));
    }).catch(Site.handleAxiosError);
};

const getCustomerInfoVerify = params => async dispatch => {
    const url = Site.resolveClientUrl('Dashboard/GetCustomerInfoVerify');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCustomerInfoVerify(response.data));
    }).catch(Site.handleAxiosError);
};

const editCustomerVerify = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Dashboard/EditCustomerVerify');
    return await DataService.postDataAsync(url,params).then(response => response);
};


const getLastFiveRemark = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetLastFiveRemark');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLastFiveRemark(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    getCustomerRemarks,
    getRedemptionLogs,
    setEditRedemptionDialog,
    getCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    getCustomerInfoVerify,
    setEditCustomerVerifyDialog,
    editCustomerVerify,
    getLastFiveRemark,
    setLastFiveRemark,
    resetState
};