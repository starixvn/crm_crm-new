import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setSettings
} from './createMultipleLogSlice';

const getSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('MultipleLogs/GetSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setSettings(response.data));
    });
};

export const ActionCreators = {
    getSettings
};