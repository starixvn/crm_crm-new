import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setGridParams,
    setFeedBack,
    setSelectFeedbackId,
    setEditStatusFeedbackPopup,
    setEditFeedbackPopup,
    setEditFeedbackResult
} from './latestFeedbackSlide';


const getFeedBack = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LatestFeedback/GetFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setFeedBack(response.data));
    }).then(() => Site.unblockUI());
};

const editFeedback = data => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/EditFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditFeedbackResult(response.data));
    });
};


export const ActionCreators = {
    setFeedBack,
    setGridParams,
    setSelectFeedbackId,
    setEditStatusFeedbackPopup,
    setEditFeedbackPopup,
    setEditFeedbackResult,
    getFeedBack,
    editFeedback
};