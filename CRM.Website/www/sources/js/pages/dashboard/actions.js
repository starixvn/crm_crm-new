import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import {
    setCustomerRemarks
} from './dashboardSlice';

const getCustomerRemarks = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl(`Dashboard/GetCustomerRemarks`);
    await DataService.getDataAsync(url,params).then(response => {
        dispatch(setCustomerRemarks(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getCustomerRemarks
};