import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridData,
    setRatingGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog,
    resetState
} from './feedbackStatisticSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/GetFeedbackStatistic');
    await DataService.postDataAsync(url, params).then(response => {
        if (params.type === 12 || params.type === 13) {
            dispatch(setRatingGridData(response.data));
        } else {
            dispatch(setGridData(response.data));
        }
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/GetFeedbackStatisticDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDetailsDataGrid(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const exportExcelDetails = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('FeedbackStatistic/ExportExcelDetails');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
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
    exportExcelDetails,
    resetState
};