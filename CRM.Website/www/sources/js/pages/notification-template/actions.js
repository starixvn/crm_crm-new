import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setNotificationTypes,
    setLanguages,
    setGridParams,
    setGridData,
    setSelectedTemplate,
    setCreateTemplatePopup,
    setCreateTemplateResult,
    setEditTemplatePopup,
    setEditTemplateResult,
    setDeleteTemplatePopup,
    setContentDetailPopup
} from './notificationTemplateSlice';

const getNotificationTypes = () => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetNotificationTypes');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setNotificationTypes(response.data));
    }).catch(Site.handleAxiosError);
};

const getLanguages = () => async dispatch => {
    const url = Site.resolveClientUrl('NotificationTemplate/GetLanguages');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setLanguages(response.data));
    }).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NotificationTemplate/GetNotificationTemplate');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getTemplateById = (templateId, callback) => async dispatch => {
    const url = Site.resolveClientUrl(`NotificationTemplate/GetById/${templateId}`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSelectedTemplate(response.data));
        if (typeof callback === 'function') {
            callback();
        }
    }).catch(Site.handleAxiosError);
};

const createTemplate = data => async dispatch => {
    const url = Site.resolveClientUrl('NotificationTemplate/Create');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateTemplateResult(response.data));
    }).catch(Site.handleAxiosError);
};

const editTemplate = data => async dispatch => {
    const url = Site.resolveClientUrl('NotificationTemplate/Edit');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditTemplateResult(response.data));
    }).catch(Site.handleAxiosError);
};

const deleteTemplate = params => async () => {
    const url = Site.resolveClientUrl(`NotificationTemplate/Delete`);
    return await DataService.postDataAsync(url, params).catch(Site.handleAxiosError).then(response => response);
};

export const ActionCreators = {
    resetState,
    setNotificationTypes,
    setLanguages,
    setGridParams,
    setGridData,
    setSelectedTemplate,
    setCreateTemplatePopup,
    setCreateTemplateResult,
    setEditTemplatePopup,
    setEditTemplateResult,
    setDeleteTemplatePopup,
    setContentDetailPopup,
    getNotificationTypes,
    getLanguages,
    getGridData,
    getTemplateById,
    createTemplate,
    editTemplate,
    deleteTemplate
};