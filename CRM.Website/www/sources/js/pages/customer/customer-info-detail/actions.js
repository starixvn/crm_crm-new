import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail
} from './customerInfoDetailSlice';

const getCustomerById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetCustomerById');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerById(response.data));
    }).then(() => Site.unblockUI());
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const editCustomerInfoDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/EditCustomerInfoDetail');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setEditCustomerInfoDetail(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    getCustomerById,
    getAllSettings,
    editCustomerInfoDetail
};