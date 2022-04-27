import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenInsertNewValuePopup,
    setOpenLicenseeMappingPopup
} from './settingManagementSlice';

const getMainSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetMainSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setMainSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getSettingTypes = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetSettingByType');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSettingTypes(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const editStatusSetting = params => async () => {
    const url = Site.resolveClientUrl('SettingManagement/EditStatusSettingAsync');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

// const getMainSettingRelation = params => async dispatch => {
//     Site.blockUI();
//     const url = Site.resolveClientUrl('SettingRelation/GetMainSettingRelation');
//     await DataService.postDataAsync(url, params).then(response => {
//         dispatch(setMainSettingRelation(response.data));
//     }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
// };

// const updateRelation = params => async dispatch => {
//     Site.blockUI();
//     const url = Site.resolveClientUrl('SettingRelation/Update');
//     await DataService.postDataAsync(url, params).then(response => {
//         dispatch(setUpdateResult(response.data));
//     }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
// };

export const ActionCreators = {
    getMainSettings,
    setMainSettings,
    setGridParams,
    getSettingTypes,
    setSettingTypes,
    setEditStatusPopup,
    editStatusSetting,
    setOpenInsertNewSettingPopup,
    setOpenInsertNewValuePopup,
    setOpenLicenseeMappingPopup
};