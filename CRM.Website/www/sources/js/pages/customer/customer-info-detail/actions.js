import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerInfoDetail,
    setAllSettings,
    setEditCustomerInfoDetail,
    setEditCustomerInfoDetailDialog
} from './customerInfoDetailSlice';

const getCustomerInfoDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfoDetail/GetCustomerInfoDetailById');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerInfoDetail(response.data));
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
    const url = Site.resolveClientUrl('CustomerInfoDetail/EditCustomerDetailInfo');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setEditCustomerInfoDetail(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerInfoDetail,
    getAllSettings,
    editCustomerInfoDetail,
    setEditCustomerInfoDetailDialog
};