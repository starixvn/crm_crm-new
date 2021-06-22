import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';


import {
    setGridParams,
    setCustomerInfo,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup
} from './customerInfoSlide';

const getCustomerInfo = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CustomerInfo/GetCustomerInfoSubject');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setCustomerInfo(response.data));
    }).then(() => Site.unblockUI());
}

const getSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('CustomerInfo/GetSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    });
};

const editCustomerInfo = data => async dispatch => {
    const url = Site.resolveClientUrl('CustomerInfo/EditCustomerInfo');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setEditCustomerInfo(response.data));
    });
};


export const ActionCreators = {
    setCustomerInfo,
    setGridParams,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup,
    getCustomerInfo,
    getSettings,
    editCustomerInfo
};