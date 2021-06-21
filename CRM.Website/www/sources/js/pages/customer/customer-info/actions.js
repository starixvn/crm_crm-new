import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';


import {
    setGridParams,
    setCustomerInfo
} from './customerInfoSlide';

const getCustomerInfo = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfoSubject');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerInfo(response.data));
    }).then(() => Site.unblockUI());
}


export const ActionCreators = {
    setCustomerInfo,
    setGridParams,
    getCustomerInfo
};