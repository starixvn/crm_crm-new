import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setMainReport,
    setReportDetails,
    setChartData,
    setDetailsDataGrid,
    resetState
} from './logStatisticsSlice';

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('LogStatistics/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError);
};

const getMainReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LogStatistics/GetMainReport');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setMainReport(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getReportDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LogStatistics/GetReportDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setReportDetails(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('LogStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const exportExcelDetails = params => async () => {
    const url = Site.resolveClientUrl('LogStatistics/ExportExcelDetails');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    getAllSettings,
    setGridParams,
    setAllSettings,
    setGridParamDetails,
    getMainReport,
    setMainReport,
    getReportDetails,
    setReportDetails,
    setDetailsDataGrid,
    setChartData,
    exportExcel,
    exportExcelDetails,
    resetState
};