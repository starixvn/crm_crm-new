import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setSettings
} from './createMultipleLogSlice';

const getSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('MultipleLogs/GetSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    }).then(() => Site.unblockUI());
};

export const ActionCreators = {
    getSettings
};