import { createSlice } from '@reduxjs/toolkit';
import { AUTO_REFRESH_TIMES } from '@jsroot/common/constants';
const initialState = {
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    createAnnouncementResult: null,
    languages: null,
    notificationTemplates: null,
    settings: null,
    newAnnouncementPopup: { show: false },
    contentPopup: { show: false },
    viewDetailPopup: { show: false },
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
        setNotificationTemplates: (state, action) => {
            state.notificationTemplates = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setOpenNewAnnouncementPopup: (state, action) => {
            state.newAnnouncementPopup = action.payload;
        },
        setContentPopup: (state, action) => {
            state.contentPopup = action.payload;
        },
        setViewDetailPopup: (state, action) => {
            state.viewDetailPopup = action.payload;
        },
        setAutoRefresh: (state, action) => {
            state.autoRefresh = action.payload;
        },
        setIsRefresh: (state, action) => {
            state.autoRefresh = action.payload;
        }
    }
});

const { actions, reducer } = announcementSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setCreateAnnouncement,
    setNotificationTemplates,
    setSelectedTemplate,
    setLanguages,
    setSettings,
    setOpenNewAnnouncementPopup,
    setContentPopup,
    setViewDetailPopup,
    setAutoRefresh,
    setIsRefresh
} = actions;

export default reducer;