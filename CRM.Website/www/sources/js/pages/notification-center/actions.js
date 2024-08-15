import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridData,
    setEditAdmNotification,
    setAutoRefresh,
    setIsRefresh
} from './notificationCenterSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NotificationCenter/GetResultAdmNotification');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const getAdmNotificationById =  id => async () => {
    const url = Site.resolveClientUrl(`NotificationCenter/GetResultAdmNotificationById/${id}`);
    return await DataService.getDataAsync(url).then(response => response);
};

const editAdmNotification = data => async dispatch => {
    const url = Site.resolveClientUrl('NotificationCenter/EditResultAdmNotification');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditAdmNotification(response.data));
    });
};

const editAdmStatus = params => async () => {
    const url = Site.resolveClientUrl('NotificationCenter/EditResultAdmStatus');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

const getSiteTicketsById =  id => async () => {
    const url = Site.resolveClientUrl(`NotificationCenter/GetSiteTicketsById/${id}`);
    return await DataService.getDataAsync(url).then(response => response);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NotificationCenter/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    setAutoRefresh,
    setIsRefresh,
    setEditAdmNotification,
    getGridData,
    getAdmNotificationById,
    editAdmNotification,
    editAdmStatus,
    getSiteTicketsById,
    exportExcel
};