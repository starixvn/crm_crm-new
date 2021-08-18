import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import{
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setShowEditContactInform,
    setGridParams,
    setAllSettings,
    setSearchInforms,
    setShowEditSearchInform,
    setUpdateContactInforms,
    setUpdateSearchInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setShowRemovedLogs,
    setShowRemovedLogDetails,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    setNewInforms,
    setShowNewInforms,
    setInsertInforms
} from './informHeadlineSlice';

const getInforms = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInforms(response.data));
    }).then(() => Site.unblockUI());
};

const exportInforms = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const getTitleDetail = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetTitleDetail');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setTitleDetail(response.data));
    }).then(() => Site.unblockUI());
};

const getContactInformSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('InformHeadline/GetContactInformSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setContactInformSettings(response.data));
    });
};

const getContactInforms = params => async dispatch => {
    const url = Site.resolveClientUrl('InformHeadline/GetContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setContactInforms(response.data));
    });
}

const updateContactInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/UpdateContactInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setUpdateContactInforms(response.data));
    }).then(() => Site.unblockUI());
}

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI());
};

const getSearchInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetSearchInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setSearchInforms(response.data));
    }).then(() => Site.unblockUI());
};

const updateSearchInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/UpdateSearchInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setUpdateSearchInforms(response.data));
    }).then(() => Site.unblockUI());
};

const exportContactInforms = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportContactInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const exportSearchInforms = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportSearchInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
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

const updateInformStatus = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/UpdateInformStatus');
    await DataService.postDataAsync(url, params).then(() => Site.unblockUI());
};

const exportNewInforms = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportNewInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    getInforms,
    exportInforms,
    getTitleDetail,
    getContactInformSettings,
    getContactInforms,
    setShowEditContactInform,
    updateContactInforms,
    setGridParams,
    getAllSettings,
    getSearchInforms,
    setShowEditSearchInform,
    updateSearchInforms,
    exportContactInforms,
    exportSearchInforms,
    getRemovedAccountLogs,
    getRemovedAccountLogDetails,
    setShowRemovedLogs,
    setShowRemovedLogDetails,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    getNewInforms,
    setShowNewInforms,
    insertInforms,
    updateInformStatus,
    exportNewInforms
};