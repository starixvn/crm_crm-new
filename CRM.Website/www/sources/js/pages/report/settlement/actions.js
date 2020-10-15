import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridData,
    setChartPopup
} from './settlementReportSlice';


const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Report/Settlement/GetSettlementReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('Report/Settlement/ExportSettlementReport');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    setChartPopup,
    getGridData,
    exportExcel
};