import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setSettings,
    setVerifyCustomerResults,
    setReVerifyCustomerResults,
    removeCustomer,
    setRelatedCustomerResults,
    setFeedbackSubjectTemplates,
    setAddRelatedCustomerDialog,
    setViewRelatedCustomerDialog,
    setConfirmCreateMultipleLogsDialog
} from './createMultipleLogSlice';

const getSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MultipleLogs/GetSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    }).then(() => Site.unblockUI());
};

const verifyCustomers = params => async () => {
    const url = Site.resolveClientUrl('MultipleLogs/VerifyCustomer');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const verifyRelatedCustomers = params => async () => {
    const url = Site.resolveClientUrl('MultipleLogs/VerifyRelatedCustomer');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

const checkNotExistCommunicationToolSetting = params => async () => {
    const url = Site.resolveClientUrl('MultipleLogs/CheckNotExistCommunicationToolSetting');
    return await DataService.postDataAsync(url, params).then(response => response);
};
 
const createMultipleLogs = params => async () => {
    const url = Site.resolveClientUrl('MultipleLogs/Create');
    return await DataService.postDataAsync(url, params).then(response => response);
};

export const ActionCreators = {
    setVerifyCustomerResults,
    setReVerifyCustomerResults,
    setAddRelatedCustomerDialog,
    setRelatedCustomerResults,
    setFeedbackSubjectTemplates,
    setViewRelatedCustomerDialog,
    setSettings,
    getSettings,
    verifyCustomers,
    verifyRelatedCustomers,
    removeCustomer,
    getFeedbackSubjectTemplates,
    checkNotExistCommunicationToolSetting,
    setConfirmCreateMultipleLogsDialog,
    createMultipleLogs
};