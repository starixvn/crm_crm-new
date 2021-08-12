import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings,
    setGridParams,
    setGridFeedbacks,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog,
    setEditMultipleLogStatuses,
    setEditMultipleLogStatusDialog
} from './manageFeedbackSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageFeedback/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getGridFeedbacks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageFeedback/SearchManageFeedback');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridFeedbacks(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('ManageFeedback/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const editMultipleLogStatuses =  params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ManageFeedback/EditMultipleLogStatuses');
    return await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditMultipleLogStatuses(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings,
    setGridParams,
    getGridFeedbacks,
    setGridFeedbacks,
    exportExcel,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog,
    editMultipleLogStatuses,
    setEditMultipleLogStatuses,
    setEditMultipleLogStatusDialog
};