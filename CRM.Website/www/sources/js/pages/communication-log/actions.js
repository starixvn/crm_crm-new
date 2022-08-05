import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setLogsByCustomerId,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    setCreateCommunicationDialog,
    resetState
} from './communicationLogSlice';
import { filterGroupCategory } from './common.functions';

const getLogsByCustomerId = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('CommunicationLog/GetLogsByCustomerId');
    await DataService.postDataAsync(url,params).then(response => {
        const {data, mainCategories} = response.data;
        data.map(item => {
            const filterGroup = filterGroupCategory(item.communicationSettings);
            const filterMainCategory = mainCategories.find(element => element.settingId === filterGroup[0]?.mainCategoryId);
            item.groupCategory = filterGroup;
            item.mainCategoryValue = !filterMainCategory ? '' : filterMainCategory.settingValue;
            return item;
        });
        dispatch(setLogsByCustomerId({data, mainCategories}));
    }).then(() => Site.unblockUI());
};

const getStatusForFilter = () => async dispatch => {
    const url = Site.resolveClientUrl(`CommunicationLog/GetAllStatus?isEdit=false`);
    await DataService.getDataAsync(url).then(response => {
        dispatch(setStatusForFilter(response.data));
    });
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
    const url = Site.resolveClientUrl('Common/GetFeedbackSubjectTemplate');
    await DataService.getDataAsync(url, { subject }).then(response => {
        dispatch(setFeedbackSubjectTemplates(response.data));
    });
};

export const ActionCreators = {
    setLogsByCustomerId,
    getLogsByCustomerId,
    getStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    getFeedbackSubjectTemplates,
    setCreateCommunicationDialog,
    resetState
};