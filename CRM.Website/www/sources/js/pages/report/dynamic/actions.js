import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setDynamicReports,
    setAllSettings,
    setGridParams
} from './dynamicReportSlice';

const getDynamicReports = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DynamicReport/GetDynamicReport');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDynamicReports(response.data));
    }).then(() => Site.unblockUI());
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DynamicReport/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getDynamicReports,
    getAllSettings,
    setGridParams
};