import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setGridParams,
    setGridData,
    setCreateAnnouncement,
    setLanguages,
    setNotificationTemplates,
    setOpenNewAnnouncementPopup
} from './announcementSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Announcement/GetAnnouncement');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const createAnnouncement = data => async dispatch => {
    const url = Site.resolveClientUrl('Announcement/Create');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateAnnouncement(response.data));
    });
};

const getLanguages = () => async dispatch => {
    const url = Site.resolveClientUrl('NotificationTemplate/GetLanguages');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setLanguages(response.data));
    });
};

const getNotificationTemplates = params => async dispatch => {
    const url = Site.resolveClientUrl('NotificationTemplate/GetNotificationTemplate');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setNotificationTemplates(response.data.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    setGridParams,
    setGridData,
    getGridData,
    createAnnouncement,
    setCreateAnnouncement,
    getLanguages,
    setLanguages,
    getNotificationTemplates,
    setNotificationTemplates,
    setOpenNewAnnouncementPopup
};