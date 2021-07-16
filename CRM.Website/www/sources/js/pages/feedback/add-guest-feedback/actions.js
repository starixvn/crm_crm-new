import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog
} from './addGuestFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuestFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

const addFeedback =  params => async () => {
    const url = Site.resolveClientUrl('AddGuestFeedback/Create');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    getFeedbackSubjectTemplates,
    setFeedbackSubjectTemplates,
    addFeedback,
    setAddFeedback,
    verifyUserName,
    setConfirmCreateGuestDialog
};