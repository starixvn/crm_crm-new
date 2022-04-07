import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

import{
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails,
    setOpenDetails
} from './redemptionStatisticsSlice';

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/getAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getRedemptionSummary = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/GetRedemptionSummary');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRedemptionSummary(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getRedemptionDetails = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('RedemptionStatistics/GetRedemptionDetails');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setRedemptionDetails(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('RedemptionStatistics/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const exportExcelDetails = params => async () => {
    const url = Site.resolveClientUrl('RedemptionStatistics/ExportExcelDetails');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
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