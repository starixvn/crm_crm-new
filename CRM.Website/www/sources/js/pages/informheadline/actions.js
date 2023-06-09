import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import{
    resetState,
    setInforms,
    setPermissions,
    setTitleDetail,
    setContactInforms,
    setEditContactInformDialog,
    setGridParams,
    setAllSettings,
    setEditInforms,
    setEditInformDialog,
    setResultEditContactInforms,
    setResultEditInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setRemovedLogDialog,
    setRemovedLogDetailDialog,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    setNewInforms,
    setNewInformDialog,
    setResultInsertInforms,
    setEditedInforms,
    setFilterData
} from './informHeadlineSlice';

const getInforms = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getPermissions = () => async dispatch => {
    const url = Site.resolveClientUrl('InformHeadline/GetPermissions');
    return await DataService.getDataAsync(url).then(response => {
        dispatch(setPermissions(response.data));
    }).catch(Site.handleAxiosError);
};


const exportInforms = () => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/ExportInforms');
    await DataService.getFileAsync(url).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const getTitleDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetTitleDetail');
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setTitleDetail(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getContactInformSettings = () => async () => {
    const url = Site.resolveClientUrl('InformHeadline/GetContactInformSettings');
    return await DataService.getDataAsync(url).then(response => response).catch(Site.handleAxiosError);
};

const getContactInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setContactInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editContactInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/EditContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setResultEditContactInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('InformHeadline/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError);
};

const getEditInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetEditInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/EditInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setResultEditInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportContactInforms = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/ExportContactInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const exportEditInforms = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/ExportEditInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const getRemovedAccountLogs = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetRemovedAccountLogs');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setRemovedAccountLogs(response.data));
    }).then(() => Site.unblockUI());
};

const getRemovedAccountLogDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetRemovedAccountLogDetails');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setRemovedAccountLogDetails(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getNewInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetNewInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setNewInforms(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const insertInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/InsertInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setResultInsertInforms(response.data));
    }).then(() => Site.unblockUI());
};

const editInformStatus = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/EditInformStatus');
    return await DataService.postDataAsync(url, params);
};

const exportNewInforms = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/ExportNewInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    resetState,
    getInforms,
    getPermissions,
    exportInforms,
    getTitleDetail,
    getContactInformSettings,
    getContactInforms,
    setContactInforms,
    setEditContactInformDialog,
    editContactInforms,
    setGridParams,
    getAllSettings,
    getEditInforms,
    setEditInforms,
    setEditInformDialog,
    editInforms,
    setResultEditContactInforms,
    setResultEditInforms,
    exportContactInforms,
    exportEditInforms,
    getRemovedAccountLogs,
    getRemovedAccountLogDetails,
    setRemovedLogDialog,
    setRemovedLogDetailDialog,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    getNewInforms,
    setNewInforms,
    setNewInformDialog,
    insertInforms,
    editInformStatus,
    exportNewInforms,
    setEditedInforms,
    setFilterData
};