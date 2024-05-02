import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridData,
    setEditAdmNotification
} from './messageNotificationCenterSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MessageNotificationCenter/GetResultAdmNotification');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const getAdmNotificationById =  id => async () => {
    const url = Site.resolveClientUrl(`MessageNotificationCenter/GetResultAdmNotificationById/${id}`);
    return await DataService.getDataAsync(url).then(response => response);
};

const editAdmNotification = data => async dispatch => {
    const url = Site.resolveClientUrl('MessageNotificationCenter/EditResultAdmNotification');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditAdmNotification(response.data));
    });
};

const editAdmStatus = params => async () => {
    const url = Site.resolveClientUrl('MessageNotificationCenter/EditResultAdmStatus');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

const getSiteTicketsById =  id => async () => {
    const url = Site.resolveClientUrl(`MessageNotificationCenter/GetSiteTicketsById/${id}`);
    return await DataService.getDataAsync(url).then(response => response);
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    getGridData,
    getAdmNotificationById,
    editAdmNotification,
    editAdmStatus,
    getSiteTicketsById
};