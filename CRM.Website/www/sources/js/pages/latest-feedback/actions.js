import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setGridParams,
    setLatestFeedback,
    setSelectLatestFeedbackId,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult
} from './latestFeedbackSlide';


const getLatestFeedback = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LatestFeedback/GetLatestFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLatestFeedback(response.data));
    }).then(() => Site.unblockUI());
};

const editLatestFeedback = data => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/EditFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditLatestFeedbackResult(response.data));
    });
};


export const ActionCreators = {
    setLatestFeedback,
    setGridParams,
    setSelectLatestFeedbackId,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    getLatestFeedback,
    editLatestFeedback
};