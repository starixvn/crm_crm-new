import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams
} from './communicationLogSlice';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLogsByCustomerId(response.data));
    }).then(() => Site.unblockUI());
};

const getAllStatus = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetAllStatus');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllStatus(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getLogsByCustomerId,
    getAllStatus,
    setGridParams
};