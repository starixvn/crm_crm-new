import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import{
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setEditInformHeadline,
    setUpdateContentInforms,
    setGridParams
} from './informHeadlineSlice';

const getInforms = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInforms(response.data));
    }).then(() => Site.unblockUI());
};

const ExportInformExcel = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportInformExcel');
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

const getUpdateContentInforms = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('InformHeadline/UpdateContentInforms');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setUpdateContentInforms(response.data));
    }).then(() => Site.unblockUI());
}

export const ActionCreators = {
    getInforms,
    ExportInformExcel,
    getTitleDetail,
    getContactInformSettings,
    getContactInforms,
    setEditInformHeadline,
    getUpdateContentInforms,
    setGridParams
};