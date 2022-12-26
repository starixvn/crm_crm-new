import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setActionLog,
    setGridParams,
    setGridSettingLogs
} from './settingLogSlice';

const getActionLogs = () => async dispatch => {
    const url = Site.resolveClientUrl('SettingLog/GetActionLog');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setActionLog(response.data));
    }).catch(Site.handleAxiosError);
};

const getGridSettingLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingLog/GetSettingLog');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridSettingLogs(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};


export const ActionCreators = {
    resetState,
    setActionLog,
    getActionLogs,
    setGridParams,
    getGridSettingLogs,
    setGridSettingLogs
};