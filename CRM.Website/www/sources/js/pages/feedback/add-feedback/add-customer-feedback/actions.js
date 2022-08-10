import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setBalanceUpday,
    setCustomerDetail,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog,
    resetState
} from './addCustomerFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddCustomerFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getBalanceUpday = () => async dispatch => {
    const url = Site.resolveClientUrl('Feedback/GetBalanceUpday');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setBalanceUpday(response.data));
    });
};

const getCustomerDetail = param => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetCustomerById');
    return await DataService.postDataAsync(url, param).then(response => {
        dispatch(setCustomerDetail(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

const addFeedback =  params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddCustomerFeedback/Create');
    return await DataService.postDataAsync(url, params).then(response => {
        dispatch(setAddFeedback(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

const getTicketInfoByRef = params => async () => {
    const url = Site.resolveClientUrl('Feedback/GetTicketInfoByRefNo');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    getBalanceUpday,
    setBalanceUpday,
    getCustomerDetail,
    setCustomerDetail,
    getFeedbackSubjectTemplates,
    setFeedbackSubjectTemplates,
    addFeedback,
    setAddFeedback,
    verifyUserName,
    setConfirmCreateGuestDialog,
    getTicketInfoByRef,
    resetState
};