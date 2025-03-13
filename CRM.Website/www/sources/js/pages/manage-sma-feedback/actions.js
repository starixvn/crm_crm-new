import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    setSMAFeedbacks,
    setEditSMAFeedback
} from './smaFeedbackSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NotificationCenter/GetResultAdmNotification');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const getSMAFeedbacks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageSMAFeedback/GetSMAFeedback');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setSMAFeedbacks(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editSMAFeedback = data => async dispatch => {
    const url = Site.resolveClientUrl('ManageSMAFeedback/EditSMAFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditSMAFeedback(response.data));
    });
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageSMAFeedback/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    getGridData,
    getSMAFeedbacks,
    editSMAFeedback,
    exportExcel
};