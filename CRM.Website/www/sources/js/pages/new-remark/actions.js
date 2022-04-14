import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setRemarkTitle,
    setGridParams,
    setRemarks,
    handleOpenConfirmDelete,
    setDelete
} from './newRemarkSlice';


const getRemarksTitle = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetRemarkTitles');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setRemarkTitle(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const validateUsername = params => async () => {
    const url = Site.resolveClientUrl('NewRemark/ValidateUsername');
    return await DataService.postDataAsync(url, params).then(response => response.data);
};

const getNewRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetNewRemarks');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarks(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const editRemarks = params => async () => {
    const url = Site.resolveClientUrl('Remark/EditRemarks');
    return await DataService.postDataAsync(url,params).then(response => response);
};

const deleteNewRemark = params => async () => {
    const url = Site.resolveClientUrl('NewRemark/Delete');
    return await DataService.postDataAsync(url,params).then(response => response.data);
};

export const ActionCreators = {
    getRemarksTitle,
    setRemarkTitle,
    validateUsername,
    setGridParams,
    getNewRemarks,
    setRemarks,
    editRemarks,
    handleOpenConfirmDelete,
    deleteNewRemark,
    setDelete
};