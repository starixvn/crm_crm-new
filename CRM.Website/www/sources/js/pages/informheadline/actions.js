import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import{
    setInformHeadline
} from './informHeadlineSlice';

const getInformHeadline = () => async dispatch => {
    const url = Site.resolveClientUrl('InformHeadline/GetInforms');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setInformHeadline(response.data));
    });
};

const ExportInformExcel = params => async () => {
    const url = Site.resolveClientUrl('InformHeadline/ExportInformExcel');
    await DataService.getFileAsync(url, params).then(response => {
        const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
        Site.downloadFile(response.data, fileName);
    });
};

export const ActionCreators = {
    getInformHeadline,
    ExportInformExcel
};