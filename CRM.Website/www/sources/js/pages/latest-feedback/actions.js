import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setGridParams,
    setLatestFeedback,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    setTops,
    setEditQuickUpdateFeedbackPopup,
    setEditQuickUpdateFeedbackResult,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    setSelectedFeedback,
    setAllSettings
} from './latestFeedbackSlide';

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    });
};

const getLatestFeedback = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LatestFeedback/GetLatestFeedback');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setLatestFeedback(response.data));
    }).then(() => Site.unblockUI());
};

const editLatestFeedback = data => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/EditFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditLatestFeedbackResult(response.data));
    });
};

const getTops = () => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/GetTops');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setTops(response.data));
    });
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('LatestFeedback/ExportLatestFeedbackReport');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const editQuickUpdateFeedback = data => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/EditQuickUpdateFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditQuickUpdateFeedbackResult(response.data));
    });
};

const getNoInquiriesByFeedbackId = (feedbackId, callback) => async dispatch => {
    const url = Site.resolveClientUrl(`LatestFeedback/GetNoInquiries/${feedbackId}`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSelectedFeedback(response.data));
        if (typeof callback === 'function') {
            callback();
        }
    });
};

export const ActionCreators = {
    setLatestFeedback,
    setGridParams,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    getLatestFeedback,
    editLatestFeedback,
    setTops,
    getTops,
    exportExcel,
    setEditQuickUpdateFeedbackPopup,
    setEditQuickUpdateFeedbackResult,
    editQuickUpdateFeedback,
    setSelectedFeedback,
    getNoInquiriesByFeedbackId,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    getAllSettings,
    setAllSettings
};