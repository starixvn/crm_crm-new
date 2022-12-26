import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setGridParams,
    setGridData,
    setRemoveOptions,
    setSettings,
    setRemovePicAssignmentPopup,
    setAssignPicPopup,
    setAssignPicResult,
    setAssignPicFilter,
    setValidateAssignPicResult,
    setConfirmAssignedDirectAccountPopup,
    setDefaultPicPopup
} from './picAssignmentSlice';

const getSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('PicAssignment/AllSetting');
    await DataService.postDataAsync(url).then(response => {
        if(!response || !response.data){
            return;
        }
        dispatch(setSettings(response.data));
    }).catch(Site.handleAxiosError);
};

const getGridData = (params, callback) => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/GetAllPICAssignment');
    await DataService.postDataAsync(url, params).then(response => {
        if (typeof callback === 'function') {
            callback(response.data.data);
        }
        
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const validateAssignPic = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('PicAssignment/ValidateAssignPic');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setValidateAssignPicResult(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    resetState,
    setGridParams,
    setGridData,
    setSettings,
    setRemoveOptions,
    setRemovePicAssignmentPopup,
    setAssignPicPopup,
    setAssignPicResult,
    setValidateAssignPicResult,
    setAssignPicFilter,
    setConfirmAssignedDirectAccountPopup,
    setDefaultPicPopup,
    getSettings,
    getGridData,
    validateAssignPic
};