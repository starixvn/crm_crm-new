import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setRemarks,
    resetState
} from './remarkSlice';

const getRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Remark/GetRemarks');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarks(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const editRemarks = params => async () => {
    const url = Site.resolveClientUrl('Remark/EditRemarks');
    return await DataService.postDataAsync(url,params).catch(Site.handleAxiosError).then(response => response);
};

export const ActionCreators = {
    resetState,
    getRemarks,
    editRemarks
};