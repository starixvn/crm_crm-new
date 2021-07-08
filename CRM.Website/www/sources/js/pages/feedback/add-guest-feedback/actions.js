import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setFeedbackSubjectTemplate,
    setAddFeedback
} from './addGuestFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuestFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getFeedbackSubjectTemplate = subject => async dispatch => {
    const url = Site.resolveClientUrl(`Common/GetFeedbackSubjectTemplate?subject=${subject}`);
    await DataService.getDataAsync(url).then(response => {
       dispatch(setFeedbackSubjectTemplate(response.data));
    });
};

const addFeedback = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuestFeedback/AddGuestFeedback');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setAddFeedback(response.data));
    }).then(() => Site.unblockUI());
};

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    getFeedbackSubjectTemplate,
    setFeedbackSubjectTemplate,
    addFeedback,
    setAddFeedback,
    verifyUserName
};