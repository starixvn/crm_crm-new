import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setRemarkSetting,
    setRemarks
} from './newRemarkSlice';


const getRemarksTitle = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('NewRemark/GetRemarkTitles');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setRemarkSetting(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};


const getRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Remark/GetRemarks');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarks(response.data));
    }).then(() => Site.unblockUI());
};

const editRemarks = params => async () => {
    const url = Site.resolveClientUrl('Remark/EditRemarks');
    return await DataService.postDataAsync(url,params).then(response => response);
};

export const ActionCreators = {
    getRemarksTitle,
    setRemarkSetting,
    getRemarks,
    editRemarks
};