import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setAllSettings,
    setGridData,
    setChartData,
    resetState
} from './issueStatisticsSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('IssueStatistics/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('IssueStatistics/GetIssuesStatistics');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('IssueStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setGridParams,
    getAllSettings,
    setAllSettings,
    getGridData,
    setGridData,
    setChartData,
    exportExcel,
    resetState
};