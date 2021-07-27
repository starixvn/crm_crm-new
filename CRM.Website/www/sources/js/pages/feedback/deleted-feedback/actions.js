import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setAllSettings,
    setDeletedFeedback
} from './deletedFeedbackSlice';

const getGridParams = (params) => dispatch => {
    dispatch(setGridParams(params));
}

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('DeletedFeedback/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    });
};

const getDeletedFeedback = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DeletedFeedback/SearchDeletedFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDeletedFeedback(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getGridParams,
    getAllSettings,
    getDeletedFeedback
};