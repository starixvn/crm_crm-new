import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setGridParams,
    setLatestFeedback,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog
} from './latestFeedbackSlide';

const getLatestFeedback = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LatestFeedback/GetLatestFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLatestFeedback(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('LatestFeedback/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    setLatestFeedback,
    setGridParams,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    getLatestFeedback,
    exportExcel,
    setEditNoOfInquiryDialog
};