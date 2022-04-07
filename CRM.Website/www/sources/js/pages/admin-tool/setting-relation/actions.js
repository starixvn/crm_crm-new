import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setMainSettingRelation,
    setUpdate,
    setOpenUpdatePopup
} from './settingRelationSlice';

const getMainSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/GetMainSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setMainSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getSettingTypes = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/GetSettingByType');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setSettingTypes(response.data));
    }).then(() => Site.unblockUI());
};

const getMainSettingRelation = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/GetMainSettingRelation');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setMainSettingRelation(response.data));
    }).then(() => Site.unblockUI());
};

const updateRelation = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingRelation/Update');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setUpdate(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getMainSettings,
    setMainSettings,
    setGridParams,
    getSettingTypes,
    setSettingTypes,
    getMainSettingRelation,
    setMainSettingRelation,
    updateRelation,
    setUpdate,
    setOpenUpdatePopup
};