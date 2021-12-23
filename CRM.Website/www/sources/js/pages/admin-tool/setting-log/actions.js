import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setActionLog,
    setGridParams,
    setGridSettingLogs
} from './settingLogSlice';

const getActionLogs = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingLog/GetActionLog');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setActionLog(response.data));
    }).then(() => Site.unblockUI());
};

const getGridSettingLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingLog/GetSettingLog');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridSettingLogs(response.data));
    }).then(() => Site.unblockUI());
};


export const ActionCreators = {
    setActionLog,
    getActionLogs,
    setGridParams,
    getGridSettingLogs,
    setGridSettingLogs
};