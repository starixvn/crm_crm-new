import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setMainSettings,
    setParentSettings,
    setLicensees,
    setLicenseeMapping,
    setLicenseeManager,
    setGridParams,
    setSettingTypes,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenLicenseeMappingPopup,
    setInsertNewSettingResult,
    setOpenEdiPopup,
    setEditNewSettingResult,
    setConfirmCancelPopup,
    setSourceMapping
} from './settingManagementSlice';

const getMainSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetMainSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setMainSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getParentSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetParentSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setParentSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getLicensees = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetLicensees');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setLicensees(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getLicenseeManager = username => async dispatch => {
    const url = Site.resolveClientUrl('SettingManagement/GetLicenseeManager');
    await DataService.postDataAsync(url, username).then(response => {
        const options = response.data.map(item => {
            return { value: item.username, label: item.username };
        });
        dispatch(setLicenseeManager(options));
    }).catch(Site.handleAxiosError);
};

const getLicenseesMapping = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetLicenseesMapping');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setLicenseeMapping(response.data));
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
    const url = Site.resolveClientUrl('SettingManagement/EditStatusSetting');
    return await DataService.postDataAsync(url, params).then(response => response.data)
    .catch(Site.handleAxiosError);
};

const insertNewSetting = params => async dispatch => {
    const url = Site.resolveClientUrl('SettingManagement/InsertNewSetting');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setInsertNewSettingResult(response.data));
    }).catch(Site.handleAxiosError);
};

const editNewSetting = params => async dispatch => {
    const url = Site.resolveClientUrl('SettingManagement/EditNewSetting');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditNewSettingResult(response.data));
    }).catch(Site.handleAxiosError);
};

const editLicenseeMapping = params => async () => {
    const url = Site.resolveClientUrl('SettingManagement/EditLicenseeMapping');
    return await DataService.postDataAsync(url, params).then(response => response.data)
    .catch(Site.handleAxiosError);
};

const getSourceMapping = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingManagement/GetSourceMappingByType');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSourceMapping(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getMainSettings,
    setMainSettings,
    getParentSettings,
    setParentSettings,
    getLicensees,
    setLicensees,
    getLicenseesMapping,
    setLicenseeMapping,
    getLicenseeManager,
    setLicenseeManager,
    setGridParams,
    getSettingTypes,
    setSettingTypes,
    setEditStatusPopup,
    editStatusSetting,
    setOpenInsertNewSettingPopup,
    setOpenLicenseeMappingPopup,
    insertNewSetting,
    setInsertNewSettingResult,
    setOpenEdiPopup,
    editNewSetting,
    setEditNewSettingResult,
    editLicenseeMapping,
    setConfirmCancelPopup,
    setSourceMapping,
    getSourceMapping
};