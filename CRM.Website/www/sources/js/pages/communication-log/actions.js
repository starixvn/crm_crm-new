import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setStatusForEdit,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setLogByFeedbackId,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setCreateCommunicationDialog,
    setAllSettings
    setBalanceUpday
} from './communicationLogSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getStatusForEdit = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`CommunicationLog/GetAllStatus?isEdit=true`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setStatusForEdit(response.data));
    }).then(() => Site.unblockUI());
};

const getStatusForFilter = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`CommunicationLog/GetAllStatus?isEdit=false`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setStatusForFilter(response.data));
    }).then(() => Site.unblockUI());
};

const getLogByFeedbackId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`CommunicationLog/GetLogByFeedbackId/${params}`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setLogByFeedbackId(response.data));
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

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
}; 

const createCommunicationLog = params => async () => {
    const url = Site.resolveClientUrl('CommunicationLog/CreateCommunicationLog');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const getBalanceUpday = () => async dispatch => {
    const url = Site.resolveClientUrl('Feedback/GetBalanceUpday');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setBalanceUpday(response.data));
    });
};

const getTicketInfoByRef = Refno => async () => {
    const url = Site.resolveClientUrl('Feedback/GetTicketInfoByRefNoAsync');
    return await DataService.getDataAsync(url, Refno).then(response => response.data);
};

export const ActionCreators = {
    getLogsByCustomerId,
    getStatusForEdit,
    getStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    getLogByFeedbackId,
    setFeedbackSubjectTemplates,
    getFeedbackSubjectTemplates,
    verifyCustomers,
    editCommunicationLog,
    checkFeedbackDuplication,
    setCreateCommunicationDialog,
    getAllSettings,
    createCommunicationLog
    getBalanceUpday,
    setBalanceUpday,
    getTicketInfoByRef
};