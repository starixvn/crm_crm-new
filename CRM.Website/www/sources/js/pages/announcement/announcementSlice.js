import { createSlice } from '@reduxjs/toolkit';
import { AUTO_REFRESH_TIMES } from '@jsroot/common/constants';
import DateTimeService from '@jsroot/common/dateTimeService';
import {Statuses} from '@jsroot/common/constants';
const currentDate = new Date();
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 7);
const initialState = {
    gridParams: {
        announcementId: '',
        fromDate: DateTimeService.toShortDateFormat(fromDate.setDate(fromDate.getDate() - 7)),
        toDate: DateTimeService.toShortDateFormat(currentDate),
        title: '',
        status: Statuses.map(x=> x.name).join(','),
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    createAnnouncementResult: null,
    editAnnouncementResult: null,
    announcementTemplate: null,
    settings: null,
    newAnnouncementPopup: { show: false },
    actionAnnouncementPopup: { show: false, announcementId: '', isEdit: false },
    cancelAnnouncementPopup: { show: false, announcementId: ''},
    contentPopup: { show: false },
    autoRefresh: {
        value: AUTO_REFRESH_TIMES[0],
        countDown: AUTO_REFRESH_TIMES[0],
        isSubmit: false
    },
    isRefresh: true
};
const announcementSlice = createSlice({
    name: 'announcement',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setCreateAnnouncement: (state, action) => {
            state.createAnnouncementResult = action.payload;
        },
        setEditAnnouncement: (state, action) => {
            state.editAnnouncementResult = action.payload;
        },
        setAnnouncementTemplate: (state, action) => {
            state.announcementTemplate = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setOpenNewAnnouncementPopup: (state, action) => {
            state.newAnnouncementPopup = action.payload;
        },
        setOpenActionAnnouncementPopup: (state, action) => {
            state.actionAnnouncementPopup = action.payload;
        },
        setOpenCancelAnnouncementPopup: (state, action) => {
            state.cancelAnnouncementPopup = action.payload;
        },
        setContentPopup: (state, action) => {
            state.contentPopup = action.payload;
        },
        setAutoRefresh: (state, action) => {
            state.autoRefresh = action.payload;
        },
        setIsRefresh: (state, action) => {
            state.isRefresh = action.payload;
        }
    }
});

const { actions, reducer } = announcementSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setCreateAnnouncement,
    setEditAnnouncement,
    setAnnouncementTemplate,
    setSelectedTemplate,
    setLanguages,
    setSettings,
    setOpenNewAnnouncementPopup,
    setOpenActionAnnouncementPopup,
    setOpenCancelAnnouncementPopup,
    setContentPopup,
    setViewDetailPopup,
    setAutoRefresh,
    setIsRefresh
} = actions;

export default reducer;