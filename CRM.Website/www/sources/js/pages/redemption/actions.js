import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setAllStatus
} from './redemptionSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Redemption/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getAllStatus = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Redemption/GetAllStatus`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setAllStatus(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getLogsByCustomerId,
    getAllStatus
};