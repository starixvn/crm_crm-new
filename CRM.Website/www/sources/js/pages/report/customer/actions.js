import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setCustomerReport,
    setAllSettings,
    setGridParams
} from './customerReportSlice';

const getCustomerReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerReport/GetCustomerReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setCustomerReport(response.data));
    }).then(() => Site.unblockUI());
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerReport/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerReport,
    getAllSettings,
    setGridParams
};