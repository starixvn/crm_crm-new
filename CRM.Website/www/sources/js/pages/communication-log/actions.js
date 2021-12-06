import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    setCreateCommunicationDialog
} from './communicationLogSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getStatusForFilter = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`CommunicationLog/GetAllStatus?isEdit=false`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setStatusForFilter(response.data));
    }).then(() => Site.unblockUI());
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

const checkFeedbackDuplication = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Feedback/CheckFeedbackDuplication');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDuplicateFeedback(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setLogsByCustomerId,
    getLogsByCustomerId,
    getStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    getFeedbackSubjectTemplates,
    checkFeedbackDuplication,
    setCreateCommunicationDialog
};