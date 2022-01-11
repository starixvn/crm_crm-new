import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridData
} from './deletedFeedbackStatisticSlice';

const getDeletedFeedbackStatistic = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Report/DeletedFeedbackStatistic/GetDeletedFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('Report/DeletedFeedbackStatistic/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setGridParams,
    getDeletedFeedbackStatistic,
    setGridData,
    exportExcel
};