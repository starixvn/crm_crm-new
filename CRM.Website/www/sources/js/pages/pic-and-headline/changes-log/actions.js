import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType
} from './changesLogSlice';

const getHeadlineDAReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ChangesLog/GetHeadlineDAReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setHeadlineDA(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getPicReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ChangesLog/GetPicReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setPicReport(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getActionTypes = () => async () => {
    const url = Site.resolveClientUrl('ChangesLog/GetActionTypes');
    return DataService.getDataAsync(url).then(response => response.data).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    resetState,
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType,
    getHeadlineDAReport,
    getPicReport,
    getActionTypes
};