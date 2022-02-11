import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setGridParams,
    setFeedBackSubject,
    setAllActiveFeedbackSubject,
    setSelectFeedbackSubjectId,
    setCreateFeedbackSubjectPopup,
    setCreateFeedbackSubjectResult,
    setEditStatusFeedbackSubjectPopup,
    setEditFeedbackSubjectPopup,
    setEditFeedbackSubjectResult
} from './feedbackSubjectSlide';


const getFeedBackSubject = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackSubject/GetFeedbackSubject');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setFeedBackSubject(response.data));
    }).then(() => Site.unblockUI());
};

const getAllActiveFeedbackSubject = () => async dispatch => {
    const url = Site.resolveClientUrl('FeedbackSubject/GetAllActiveFeedbackSubject');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllActiveFeedbackSubject(response.data));
    });
};

const createFeedbackSubject = data => async dispatch => {
    const url = Site.resolveClientUrl('FeedbackSubject/CreateFeedbackSubject');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateFeedbackSubjectResult(response.data));
    });
};

const editStatusFeedbackSubject = data => async dispatch => {
    const url = Site.resolveClientUrl('FeedbackSubject/EditStatusFeedbackSubject');
    return await DataService.postDataAsync(url, data).then(response => response);
};

const editFeedbackSubject = data => async dispatch => {
    const url = Site.resolveClientUrl('FeedbackSubject/EditFeedbackSubject');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditFeedbackSubjectResult(response.data));
    });
};



export const ActionCreators = {
    setFeedBackSubject,
    setGridParams,
    setSelectFeedbackSubjectId,
    setCreateFeedbackSubjectPopup,
    setCreateFeedbackSubjectResult,
    setEditStatusFeedbackSubjectPopup,
    setEditFeedbackSubjectPopup,
    setEditFeedbackSubjectResult,
    getFeedBackSubject,
    getAllActiveFeedbackSubject,
    createFeedbackSubject,
    editStatusFeedbackSubject,
    editFeedbackSubject
};