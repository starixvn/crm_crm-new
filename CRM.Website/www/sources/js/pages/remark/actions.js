import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setRemarks
} from './remarkSlice';

const getRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Remark/GetRemarks');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRemarks(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getRemarks
};