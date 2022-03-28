import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog
} from './feedbackStatisticSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/GetFeedbackStatistic');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const getDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/GetFeedbackStatisticDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDetailsDataGrid(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('FeedbackStatistic/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const exportExcelDetails = params => async () => {
    const url = Site.resolveClientUrl('FeedbackStatistic/ExportExcelDetails');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog,
    getGridData,
    getDetails,
    exportExcel,
    exportExcelDetails
};