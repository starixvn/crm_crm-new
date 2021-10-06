import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams,
    setEditNoOfInquiryDialog,
    setCustomerFeedbackById,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setInsertCommunicationDialog,
    setInsertSettings
} from './communicationLogSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getAllStatus = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`CommunicationLog/GetAllStatus`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllStatus(response.data));
    }).then(() => Site.unblockUI());
};

const getCustomerFeedbackById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Feedback/GetCustomerFeedbackById/${params}`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setCustomerFeedbackById(response.data));
    }).then(() => Site.unblockUI());
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

const verifyCustomers = params => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const editCommunicationLog = params => async () => {
    const url = Site.resolveClientUrl('CommunicationLog/EditCommunicationLog');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const checkFeedbackDuplication = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Feedback/CheckFeedbackDuplication');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDuplicateFeedback(response.data));
    }).then(() => Site.unblockUI());
};

const getInsertSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetInsertSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInsertSettings(response.data));
    }).then(() => Site.unblockUI());
}; 

const insertCommunicationLog = params => async () => {
    const url = Site.resolveClientUrl('CommunicationLog/InsertCommunicationLog');
    return await DataService.postDataAsync(url, params).then(response => response);
};

export const ActionCreators = {
    getLogsByCustomerId,
    getAllStatus,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    getCustomerFeedbackById,
    setFeedbackSubjectTemplates,
    getFeedbackSubjectTemplates,
    verifyCustomers,
    editCommunicationLog,
    checkFeedbackDuplication,
    setInsertCommunicationDialog,
    getInsertSettings,
    insertCommunicationLog
};