import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setAllSettings,
    setMainReport,
    setMainReportDetails
} from './logStatisticsSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LogStatistics/getAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getMainReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LogStatistics/getMainReport');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setMainReport(response.data));
    }).then(() => Site.unblockUI());
};

const getMainReportDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LogStatistics/getMainReportDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setMainReportDetails(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('LogStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    getAllSettings,
    setGridParams,
    getMainReport,
    setMainReport,
    getMainReportDetails,
    setMainReportDetails,
    exportExcel
};