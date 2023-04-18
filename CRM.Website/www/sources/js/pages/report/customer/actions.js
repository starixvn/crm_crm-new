import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setCustomerReport,
    setAllSettings,
    setGridParams,
    resetState
} from './customerReportSlice';

const getCustomerReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerReport/GetCustomerReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setCustomerReport(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerReport/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerReport/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerReport,
    getAllSettings,
    setGridParams,
    exportExcel,
    resetState
};