import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setGridParams,
    setGridData,
    setCreateAnnouncement,
    setEditAnnouncement,
    setAnnouncementTemplate,
    setSettings,
    setOpenNewAnnouncementPopup,
    setOpenActionAnnouncementPopup,
    setOpenCancelAnnouncementPopup,
    setContentPopup,
    setViewDetailPopup,
    setAutoRefresh,
    setIsRefresh,
    setValidateAnnouncement,
    setRedirectActionParams,
    setLanguageType
} from './announcementSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Announcement/GetAnnouncement');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const getAnnouncementById = id => async () => {
    const url = Site.resolveClientUrl(`Announcement/GetAnnouncementById/${id}`);
    return await DataService.getDataAsync(url).then(response => response);
};

const createAnnouncement = data => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Announcement/SaveFilesAndCreate');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateAnnouncement(response.data));
    }).then(() => Site.unblockUI());
};

const sendMessageAnnouncementToBotEndpoint = () => async () => {
    const url = Site.resolveClientUrl('Announcement/SendMessageAnnouncementToBotEndpoint');
    await DataService.getDataAsync(url);
};

const editAnnouncement = data => async dispatch => {
    const url = Site.resolveClientUrl('Announcement/Edit');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditAnnouncement(response.data));
    });
};

const getLanguages = () => async () => {
    const url = Site.resolveClientUrl('Announcement/GetLanguages');
    return await DataService.getDataAsync(url).then(response => response.data);
};

const getAnnouncementTemplate = params => async dispatch => {
    const url = Site.resolveClientUrl('Announcement/GetAnnouncementTemplate');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setAnnouncementTemplate(response.data));
    }).then(() => Site.unblockUI());
};

const getSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('Announcement/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    });
};

const cancelAnnouncementId = (announcementId, status) => async () => {
    const url = Site.resolveClientUrl(`Announcement/Cancel?id=${announcementId}&status=${status}`);
    return await DataService.getDataAsync(url).then(response => response.data);
};

const validateAnnouncement = data => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Announcement/ValidateAnnouncement');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setValidateAnnouncement(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    setGridParams,
    setGridData,
    getGridData,
    getAnnouncementById,
    createAnnouncement,
    setCreateAnnouncement,
    sendMessageAnnouncementToBotEndpoint,
    editAnnouncement,
    setEditAnnouncement,
    getAnnouncementTemplate,
    setAnnouncementTemplate,
    getSettings,
    setSettings,
    getLanguages,
    setOpenNewAnnouncementPopup,
    setOpenActionAnnouncementPopup,
    setOpenCancelAnnouncementPopup,
    setContentPopup,
    setViewDetailPopup,
    setAutoRefresh,
    setIsRefresh,
    cancelAnnouncementId,
    validateAnnouncement,
    setValidateAnnouncement,
    setRedirectActionParams,
    setLanguageType
};