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
    const url = Site.resolveClientUrl('ChangesLog/GetHeadlineDAReportAsync');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setHeadlineDA(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getPicReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ChangesLog/GetPicReportAsync');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setPicReport(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getActionTypes = () => async () => {
    const url = Site.resolveClientUrl('ChangesLog/GetActionTypesAsync');
    return await DataService.getDataAsync(url).then(response => response.data);
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