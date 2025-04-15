import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    setReviewStatusSetting,
    resetState
} from './smaFeedbackSlice';

const getReviewStatusSetting = () => async() => {
    const url = Site.resolveClientUrl('ManageSmaFeedback/GetReviewStatusSetting');
    return await DataService.getDataAsync(url).then(response => response.data).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageSmaFeedback/GetSmaFeedback');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editSmaFeedback = data => async() => {
    const url = Site.resolveClientUrl('ManageSmaFeedback/EditSmaFeedback');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageSmaFeedback/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    setReviewStatusSetting,
    getReviewStatusSetting,
    getGridData,
    editSmaFeedback,
    exportExcel,
    resetState
};