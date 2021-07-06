import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setNumberOfFeedbackSubjectTemplate,
    setFeedbackSubjectTemplateByPagingIndex,
    setAddFeedback
} from './addGuessFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AddGuessFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getNumberOfFeedbackSubjectTemplate = () => async dispatch => {
    //const url = Site.resolveClientUrl('Setting/GetNumberOfFeedbackSubjectTemplate');
    //await DataService.getDataAsync(url).then(response => {
    //    dispatch(setNumberOfFeedbackSubjectTemplate(response.data));
    //});
};

const getFeedbackSubjectTemplateByPagingIndex = pageIndex => async dispatch => {
    //Site.blockUI();
    //const url = Site.resolveClientUrl(`Setting/GetFeedbackSubjectTemplate?pageIndex=${pageIndex}`);
    //await DataService.getDataAsync(url).then(response => {
    //    dispatch(setFeedbackSubjectTemplateByPagingIndex(response.data));
    //}).then(() => Site.unblockUI());
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
    getNumberOfFeedbackSubjectTemplate,
    setNumberOfFeedbackSubjectTemplate,
    getFeedbackSubjectTemplateByPagingIndex,
    setFeedbackSubjectTemplateByPagingIndex,
    addFeedback,
    setAddFeedback,
    verifyUserName
};