import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setMainSettingRelation,
    setUpdateResult,
    setOpenUpdatePopup
} from './settingRelationSlice';

const getMainSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('SettingRelation/GetMainSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setMainSettings(response.data));
    }).catch(Site.handleAxiosError);
};

const getSettingTypes = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/GetSettingByType');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSettingTypes(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getMainSettingRelation = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/GetMainSettingRelation');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setMainSettingRelation(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const updateRelation = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/Update');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setUpdateResult(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    getMainSettings,
    setMainSettings,
    setGridParams,
    getSettingTypes,
    setSettingTypes,
    getMainSettingRelation,
    setMainSettingRelation,
    updateRelation,
    setUpdateResult,
    setOpenUpdatePopup
};