import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerInfo,
    setAllSettings,
    setEditCustomerInfoDetail
} from './customerInfoDetailSlice';

const getCustomerInfo = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetCustomerInfoDetailById');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerInfo(response.data));
    }).then(() => Site.unblockUI());
};

const getAllSettings = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetAllSettings');
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerInfo,
    getAllSettings
};