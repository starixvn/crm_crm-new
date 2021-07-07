import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setSettings,
    setVerifyCustomerResults,
    removeCustomer,
    setRelatedCustomerResults,
    setAddRelatedCustomerDialog,
    setViewRelatedCustomerDialog
} from './createMultipleLogSlice';

const getSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MultipleLogs/GetSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    }).then(() => Site.unblockUI());
};

const verifyCustomers = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MultipleLogs/VerifyCustomer');
    return await DataService.postDataAsync(url, params).then(response => response);
};

const verifyRelatedCustomers = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MultipleLogs/VerifyRelatedCustomer');
    return await DataService.postDataAsync(url, params).then(response => response);
};

export const ActionCreators = {
    setVerifyCustomerResults,
    setAddRelatedCustomerDialog,
    setRelatedCustomerResults,
    setViewRelatedCustomerDialog,
    getSettings,
    verifyCustomers,
    verifyRelatedCustomers,
    removeCustomer
};