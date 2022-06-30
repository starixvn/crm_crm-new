import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

import {
    resetState,
    setGridParams,
    setGridData
} from './directCustomerSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('DirectReport/GetDirectReport');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};

const exportExcel = params => async () => {
    const url = Site.resolveClientUrl('DirectReport/ExportDirectReport');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    resetState,
    setGridParams,
    setGridData,
    getGridData,
    exportExcel
};