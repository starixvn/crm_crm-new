import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import{
    setInforms,
    setTitleDetail,
    setContactInformSettings,
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
    setInsertInforms,
    setOptionDialog,
    setGridData,
    setFilterData
} from './informHeadlineSlice';

const getInforms = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInforms(response.data));
    }).then(() => Site.unblockUI());
};

const exportInforms = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/ExportInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const getTitleDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetTitleDetail');
    await DataService.getDataAsync(url, params).then(response => {
        dispatch(setTitleDetail(response.data));
    }).then(() => Site.unblockUI());
};

const getContactInformSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetContactInformSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setContactInformSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getContactInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setContactInforms(response.data));
    }).then(() => Site.unblockUI());
}

const editContactInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/EditContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setResultEditContactInforms(response.data));
    }).then(() => Site.unblockUI());
}

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getEditInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetEditInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditInforms(response.data));
    }).then(() => Site.unblockUI());
};

const editInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/EditInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setResultEditInforms(response.data));
    }).then(() => Site.unblockUI());
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
    }).then(() => Site.unblockUI());
};

const getNewInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetNewInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setNewInforms(response.data));
    }).then(() => Site.unblockUI());
};

const insertInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/InsertInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setInsertInforms(response.data));
    }).then(() => Site.unblockUI());
};

const editInformStatus = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/EditInformStatus');
    await DataService.postDataAsync(url, params).then(() => Site.unblockUI());
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
    getInforms,
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
    setOptionDialog,
    setGridData,
    setFilterData
};