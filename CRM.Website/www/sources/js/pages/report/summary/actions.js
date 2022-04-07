import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

import {
    setAllSetting,
    setGridParams,
    setGridData,
    setChartPopup
} from './summaryReportSlice';

const getAllSetting = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SummaryReport/GetAllSettings');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setAllSetting(response.data));
    }).then(() => Site.unblockUI());
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('SummaryReport/GetSummaryReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('SummaryReport/ExportSummaryReport');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setAllSetting,
    setGridParams,
    setGridData,
    setChartPopup,
    getAllSetting,
    getGridData,
    exportExcel
};