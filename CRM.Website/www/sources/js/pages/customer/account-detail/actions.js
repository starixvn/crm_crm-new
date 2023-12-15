import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail
} from './accountDetailSlice';

const getCustomerById = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetCustomerById');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerById(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editCustomerInfoDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/EditCustomerInfoDetail');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setEditCustomerInfoDetail(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    resetState,
    getCustomerById,
    getAllSettings,
    editCustomerInfoDetail
};