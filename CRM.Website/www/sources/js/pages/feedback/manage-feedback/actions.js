import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setGridParams,
    setGridFeedbacks
} from './manageFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageFeedback/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getGridFeedbacks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageFeedback/SearchManageFeedback');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridFeedbacks(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    setGridParams,
    getGridFeedbacks,
    setGridFeedbacks
};