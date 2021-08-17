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
    setGridParamRemovedLogs
} from './informHeadlineSlice';

const getInforms = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInforms(response.data));
    }).then(() => Site.unblockUI());
};

const ExportInforms = params => async () => {
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

const ExportContactInforms = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportContactInforms');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const ExportSearchInforms = params => async () => {
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

export const ActionCreators = {
    getInforms,
    ExportInforms,
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
    ExportContactInforms,
    ExportSearchInforms,
    getRemovedAccountLogs,
    getRemovedAccountLogDetails,
    setShowRemovedLogs,
    setShowRemovedLogDetails,
    setGridParamRemovedLogs
};