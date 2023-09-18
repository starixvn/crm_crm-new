import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setGridParams,
    setGridData
} from './remarkClassificationSlice';

const getAllSettings = async () => {
    const url = Site.resolveClientUrl('RemarkClassification/GetAllSettings');
    return await DataService.getDataAsync(url).then(response => response.data).catch(Site.handleAxiosError);
};

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RemarkClassification/GetRemarkClassification');
    DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    setGridParams,
    setGridData,
    getAllSettings,
    getGridData
};