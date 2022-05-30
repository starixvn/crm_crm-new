import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridData,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog
} from './deletedFeedbackStatisticSlice';

const getDeletedFeedbackStatistic = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DeletedFeedbackStatistics/GetDeletedFeedbackStatistics');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setGridData(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('DeletedFeedbackStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setGridParams,
    getDeletedFeedbackStatistic,
    setGridData,
    exportExcel,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog
};