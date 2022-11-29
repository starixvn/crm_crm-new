import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    languages: null,
    notificationTemplates: null,
    newAnnouncementPopup: { show: false }
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
        setNotificationTemplates: (state, action) => {
            state.notificationTemplates = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
        setOpenNewAnnouncementPopup: (state, action) => {
            state.newAnnouncementPopup = action.payload;
        }
    }
});

const { actions, reducer } = announcementSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setNotificationTemplates,
    setLanguages,
    setOpenNewAnnouncementPopup
} = actions;

export default reducer;