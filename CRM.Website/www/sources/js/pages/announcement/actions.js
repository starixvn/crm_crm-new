import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import {
    resetState,
    setGridParams,
    setGridData,
    setOpenNewAnnouncementPopup
} from './announcementSlice';

const getGridData = params => async dispatch => {
    Site.blockUI();
    const url = Site.resolveClientUrl('Announcement/GetAnnouncement');
    await DataService.postDataAsync(url, params).then(response => {
        dispatch(setGridData(response.data));
    }).then(() => Site.unblockUI());
};


export const ActionCreators = {
    resetState,
    setGridParams,
    setGridData,
    getGridData,
    setOpenNewAnnouncementPopup
};