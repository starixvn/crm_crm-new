import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setHeadlinePicRoles,
    setAccountingPicRoles,
    setCommunicationTool,
    setErrors
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

const getPicCommunicationTools = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetPicCommunicationTools');
    await DataService.postDataAsync(url).then(response => {
        dispatch(setCommunicationTool(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getHeadlinePicRoles = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetRolesByPic?id=' + params);
    await DataService.postDataAsync(url).then(response => {
        dispatch(setHeadlinePicRoles(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getAccountingPicRoles = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetRolesByPic?id=' + params);
    await DataService.postDataAsync(url).then(response => {
        dispatch(setAccountingPicRoles(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};


export const ActionCreators = {
    resetState,
    setErrors,
    getCustomerById,
    getAllSettings,
    editCustomerInfoDetail,
    getPicCommunicationTools,
    getHeadlinePicRoles,
    getAccountingPicRoles
};