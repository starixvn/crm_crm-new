import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setHeadlinePicRoles,
    setAccountingPicRoles,
    setSettingCommunicationTool,
    setErrors,
    setHeadlineCompanyService,
    setHeadlineStaffsAndAuthority,
    setSettingStaffAndAuthority,
    setSettingPicRole,
    setActiveTab
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

const getSettingPicCommunicationTools = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetSettingPicCommunicationTools');
    await DataService.postDataAsync(url).then(response => {
        dispatch(setSettingCommunicationTool(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getSettingPicRole = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetSettingPicRole');
    await DataService.postDataAsync(url).then(response => {
        dispatch(setSettingPicRole(response.data));
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

const getHeadlineCompanyService = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetHeadlineCompanyService');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setHeadlineCompanyService(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getHeadlineStaffsAndAuthority = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetHeadlineStaffsAndAuthority');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setHeadlineStaffsAndAuthority(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getStaffAndAuthority = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('AccountDetail/GetSettingStaffAndAuthority');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSettingStaffAndAuthority(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    resetState,
    setErrors,
    getCustomerById,
    getAllSettings,
    editCustomerInfoDetail,
    getSettingPicCommunicationTools,
    getHeadlinePicRoles,
    getAccountingPicRoles,
    getHeadlineCompanyService,
    getHeadlineStaffsAndAuthority,
    getStaffAndAuthority,
    getSettingPicRole,
    setActiveTab
};