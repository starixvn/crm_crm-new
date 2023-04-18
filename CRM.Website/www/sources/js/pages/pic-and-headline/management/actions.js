import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setSetting,
    setGridParams,
    setGridData,
    setSelectedPic,
    setCreatePicPopup,
    setCreatePicResult,
    setEditPicPopup,
    setEditPicResult,
    setActiveResult,
    setConfirmPopup,
    setValidateEditPicResult
} from './picManagementSlice';

const getAllSetting = () => async dispatch => {
    const url = Site.resolveClientUrl('PicManagement/GetAllSetting');
    await DataService.postDataAsync(url).then(response => {
        if(!response || !response.data){
            return;
        }
        dispatch(setSetting(response.data));
    }).catch(Site.handleAxiosError);
};

const getRolesByPic = id => async () => {
    const url = Site.resolveClientUrl(`PicManagement/GetRolesByPic/${id}`);
    return await DataService.getDataAsync(url, id).then(response => response.data).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicManagement/GetReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicManagement/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split("\"")[1];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const changeActiveStatus = params => async dispatch => {
    const url = Site.resolveClientUrl('PicManagement/ChangePicState');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setActiveResult(response.data));
    }).catch(Site.handleAxiosError);
};

const createPic = params => async dispatch => {
    const url = Site.resolveClientUrl('PicManagement/CreatePic');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setCreatePicResult(response.data));
    }).catch(Site.handleAxiosError);
};

const editPic = params => async dispatch => {
    const url = Site.resolveClientUrl('PicManagement/EditPic');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setEditPicResult(response.data));
    }).catch(Site.handleAxiosError);
};

const validateEditPic = params => async dispatch => {
    const url = Site.resolveClientUrl('PicManagement/ValidateEditPic');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setValidateEditPicResult(response.data));
    }).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    resetState,
    setSetting,
    getRolesByPic,
    setGridParams,
    setGridData,
    setSelectedPic,
    setCreatePicPopup,
    setCreatePicResult,
    setEditPicPopup,
    setEditPicResult,
    setActiveResult,
    setConfirmPopup,
    setValidateEditPicResult,
    getAllSetting,
    getGridData,
    exportExcel,
    changeActiveStatus,
    createPic,
    editPic,
    validateEditPic
};