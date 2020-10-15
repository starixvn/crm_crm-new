import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setAllSettings,
    setGridParamsCommunication,
    setGridCommunicationSetting,
    setSelectCommunicationId,
    setCreateCommunicationPopup,
    setCreateCommunicationResult,
    setEditCommunicationPopup,
    setEditCommunicationResult,
    setDeleteCommunicationPopup,
    setDeleteCommunicationResult
} from './communicationsettingSlice';

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('CommunicationSetting/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    });
};

const getGridCommunicationSetting = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationSetting/GetCommunicationToolSetting');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridCommunicationSetting(response.data));
    }).then(() => Site.unblockUI());
};

const getCommunicationById = (communicaitonId, callback) => async dispatch => {
    const url = Site.resolveClientUrl(`CommunicationSetting/GetById/${communicaitonId}`);
    DataService.getDataAsync(url).then(response => {
        dispatch(setSelectCommunicationId(response.data));
        if (typeof callback === 'function') {
            callback();
        }
    });
};

const createCommunication = data => async dispatch => {
    const url = Site.resolveClientUrl('CommunicationSetting/Create');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateCommunicationResult(response.data));
    });
};

const editCommunication = data => async dispatch => {
    const url = Site.resolveClientUrl('CommunicationSetting/Edit');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditCommunicationResult(response.data));
    });
};

const deleteCommunication = id => async () => {
    const url = Site.resolveClientUrl(`CommunicationSetting/Delete/${id}`);
    return await DataService.postDataAsync(url).then(response => response.data);
};

const verifyUserName = data => async () => {
    const url = Site.resolveClientUrl('CustomerSetting/VerifyUsername');
    return await DataService.postDataAsync(url, data).then(response => response.data);
};

export const ActionCreators = {
    setAllSettings,
    setGridParamsCommunication,
    setGridCommunicationSetting,
    setSelectCommunicationId,
    setCreateCommunicationPopup,
    setCreateCommunicationResult,
    setEditCommunicationPopup,
    setEditCommunicationResult,
    setDeleteCommunicationPopup,
    setDeleteCommunicationResult,
    getAllSettings,
    getGridCommunicationSetting,
    getCommunicationById,
    createCommunication,
    editCommunication,
    deleteCommunication,
    verifyUserName
};