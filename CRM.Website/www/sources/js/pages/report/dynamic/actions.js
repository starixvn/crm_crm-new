import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setDynamicReports,
    setAllSettings,
    setGridParams,
    setViewCommunicationDialog,
    setViewChartDialog,
    resetState,
    setFeedbackSubjectTemplates 
} from './dynamicReportSlice';

const getDynamicReports = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DynamicReport/GetDynamicReports');
    await DataService.postDataAsync(url,params).then(response => {
        dispatch(setDynamicReports(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const getAllSettings = () => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DynamicReport/GetAllSettings');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllSettings(response.data));
    }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('DynamicReport/ExportExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    }).catch(Site.handleAxiosError);
};

export const ActionCreators = {
    getDynamicReports,
    getAllSettings,
    setGridParams,
    setViewCommunicationDialog,
    exportExcel,
    setViewChartDialog,
    resetState,
    getFeedbackSubjectTemplates,
    setFeedbackSubjectTemplates
};