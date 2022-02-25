import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType,
    setLogAction
} from './changesLogSlice';

const getHeadlineDAReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ChangesLog/GetHeadlineDAReportAsync');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setHeadlineDA(response.data));
    }).then(() => Site.unblockUI());
};

const getPicReport = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('ChangesLog/GetPicReportAsync');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setPicReport(response.data));
    }).then(() => Site.unblockUI());
};

const getActionTypes = () => async () => {
    const url = Site.resolveClientUrl('ChangesLog/GetActionTypesAsync');
    return await DataService.getDataAsync(url).then(response => response.data);
};

const getLogActions = () => async dispatch => {
    const url = Site.resolveClientUrl('ChangesLog/GetLogActions');
    await DataService.getDataAsync(url).then(response => {
        const parseData = JSON.parse(response.data);
        dispatch(setLogAction(parseData));
    });
};

export const ActionCreators = {
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType,
    setLogAction,
    getHeadlineDAReport,
    getPicReport,
    getActionTypes,
    getLogActions
};