import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setAllSettings,
    setDeletedFeedback,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog,
    resetState
} from './deletedFeedbackSlice';

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('DeletedFeedback/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError);
};

const getDeletedFeedback = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DeletedFeedback/GetDeletedFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDeletedFeedback(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('DeletedFeedback/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setGridParams,
    getAllSettings,
    getDeletedFeedback,
    exportExcel,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog,
    resetState
};