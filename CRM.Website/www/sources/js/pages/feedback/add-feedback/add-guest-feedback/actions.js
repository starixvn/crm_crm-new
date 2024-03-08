import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setBalanceUpday,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog,
    resetState,
    setCustomerDetail
} from './addGuestFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuestFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getBalanceUpday = () => async dispatch => {
    const url = Site.resolveClientUrl('Feedback/GetBalanceUpday');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setBalanceUpday(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};


const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    }).catch(Site.handleAxiosError);
};

const addFeedback =  params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuestFeedback/Create');
    return await DataService.postDataAsync(url, params).then(response => {
        dispatch(setAddFeedback(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data).catch(Site.handleAxiosError);
};

const getTicketInfoByRef = refNo => async () => {
    const url = Site.resolveClientUrl('Feedback/GetTicketInfoByRefNo');
    return await DataService.getDataAsync(url, refNo).then(response => response.data).catch(Site.handleAxiosError);
};

const getCustomerDetail = param => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetCustomerById');
    return await DataService.postDataAsync(url, param).then(response => {
        dispatch(setCustomerDetail(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    getBalanceUpday,
    setBalanceUpday,
    getFeedbackSubjectTemplates,
    setFeedbackSubjectTemplates,
    addFeedback,
    setAddFeedback,
    verifyUserName,
    setConfirmCreateGuestDialog,
    getTicketInfoByRef,
    resetState,
    setCustomerDetail,
    getCustomerDetail
};