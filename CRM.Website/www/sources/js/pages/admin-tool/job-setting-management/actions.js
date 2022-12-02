import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setServiceNameSetting,
    setSettingNames,
    setGridParams,
    setConfigSettings,
    setEditPopup,
    setEditJobSetting,
    resetState
} from './jobSettingManagementSlice';

const getServiceNameSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('JobSettingManagement/GetServiceNameSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setServiceNameSetting(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getSettingNames = params=> async dispatch => {
    const url = Site.resolveClientUrl('JobSettingManagement/GetSettingNames');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSettingNames(response.data));
    }).catch(Site.handleAxiosError);
};

const getConfigSettings = params=> async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('JobSettingManagement/GetConfigSettings');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setConfigSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const editJobSetting = params=> async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('JobSettingManagement/EditJobSetting');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditJobSetting(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};


export const ActionCreators = {
    getServiceNameSettings,
    getSettingNames,
    setGridParams,
    getConfigSettings,
    setConfigSettings,
    setEditPopup,
    editJobSetting,
    setEditJobSetting,
    resetState
};