import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails,
    setOpenDetails,
    resetState
} from './redemptionStatisticsSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/getAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getRedemptionSummary = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/GetRedemptionSummary');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRedemptionSummary(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const getRedemptionDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/GetRedemptionDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRedemptionDetails(response.data));
    }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
};

const exportExcel = params => async () => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    }).then(() => Site.unblockUI());
};

const exportExcelDetails = params => async () => {
    const url = Site.resolveClientUrl('RedemptionStatistics/ExportExcelDetails');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    resetState,
    getAllSettings,
    setGridParams,
    setGridParamDetails,
    getRedemptionSummary,
    setRedemptionSummary,
    getRedemptionDetails,
    setRedemptionDetails,
    setOpenDetails,
    exportExcel,
    exportExcelDetails
};