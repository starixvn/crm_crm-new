import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setGridParams,
    setLatestFeedback,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    setEditNoInquiriesPopup,
    setEditNoInquiriesResult,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    setSelectedFeedback,
    setAllSettings,
    setFeedback
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

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('LatestFeedback/ExportLatestFeedbackReport');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const editNoInquiries = data => async dispatch => {
    const url = Site.resolveClientUrl('LatestFeedback/EditNoInquiries');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditNoInquiriesResult(response.data));
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

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

const getFeedbackById = (id, callback) => async dispatch => {
    const url = Site.resolveClientUrl(`LatestFeedback/GetFeedbackById/${id}`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setFeedback(response.data));
        if (typeof callback === 'function') {
            callback();
        }
    });
};

export const updateFeedback = data => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('LatestFeedback/EditFeedback');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditNotificationTypeResult(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setLatestFeedback,
    setGridParams,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    getLatestFeedback,
    editLatestFeedback,
    exportExcel,
    setEditNoInquiriesPopup,
    setEditNoInquiriesResult,
    editNoInquiries,
    setSelectedFeedback,
    getNoInquiriesByFeedbackId,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    updateFeedback,
    getAllSettings,
    setAllSettings,
    verifyUserName,
    getFeedbackById,
    setFeedback
};