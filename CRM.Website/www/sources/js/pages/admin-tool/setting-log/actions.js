import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setActionLog,
    setGridParams,
    setGridActionLogs
} from './settingLogSlice';

const getActionLogs = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingLog/GetActionLogAsync');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setActionLog(response.data));
    }).then(() => Site.unblockUI());
};

const getGridActionLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SettingLog/SearchActionLogsAsync');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridActionLogs(response.data));
    }).then(() => Site.unblockUI());
};


export const ActionCreators = {
    setActionLog,
    getActionLogs,
    setGridParams,
    setGridActionLogs,
    getGridActionLogs
};