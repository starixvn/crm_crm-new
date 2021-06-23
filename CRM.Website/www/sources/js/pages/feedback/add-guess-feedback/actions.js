import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setAllSettings
} from './addGuessFeedbackSlice';

const getAllSettings = () => async dispatch => {
    const url = Site.resolveClientUrl('AddGuessFeedback/AllSetting');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    });
};

export const ActionCreators = {
    setAllSettings,
    getAllSettings
};