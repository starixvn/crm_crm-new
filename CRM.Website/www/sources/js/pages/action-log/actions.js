import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setAllLogAction,
    setActivityLog,
    setGridParams
} from './actionLogSlice';

const getAllLogAction = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`ActionLog/GetAllLogAction`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setAllLogAction(response.data));
    }).then(() => Site.unblockUI());
};

const getActivityLog = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ActionLog/GetActivityLog');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setActivityLog(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    getAllLogAction,
    getActivityLog,
    setGridParams
};