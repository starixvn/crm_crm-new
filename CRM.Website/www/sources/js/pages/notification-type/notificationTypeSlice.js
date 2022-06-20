import { createSlice } from '@reduxjs/toolkit';
const initialState  = {
    notificationTypeGridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    createNotificationTypePopup: { show: false },
    createNotificationTypeResult: null,
    editNotificationTypePopup: { show: false },
    editNotificationTypeResult: null,
    deleteNotificationTypePopup: { show: false },
    notificationTypeGridData: null,
    settings: {
        ChatTypes: [],
        RecipientTypes: [],
        Systems: []
    }
};

const notificationTypeSlice = createSlice({
    name: 'notificationType',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setNotificationTypeGridParams: (state, action) => {
            state.notificationTypeGridParams = action.payload;
        },
        setNotificationTypeGridData: (state, action) => {
            state.notificationTypeGridData = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setCreateNotificationTypePopup: (state, action) => {
            state.createNotificationTypePopup = action.payload;
        },
        setCreateNotificationTypeResult: (state, action) => {
            state.createNotificationTypeResult = action.payload;
        },
        setEditNotificationTypePopup: (state, action) => {
            state.editNotificationTypePopup = action.payload;
        },
        setEditNotificationTypeResult: (state, action) => {
            state.editNotificationTypeResult = action.payload;
        },
        setDeleteNotificationTypePopup: (state, action) => {
            state.deleteNotificationTypePopup = action.payload;
        }
    }
});

const { actions, reducer } = notificationTypeSlice;

export const {
    resetState,
    setNotificationTypeGridParams,
    setNotificationTypeGridData,
    setSettings,
    setCreateNotificationTypePopup,
    setCreateNotificationTypeResult,
    setEditNotificationTypePopup,
    setEditNotificationTypeResult,
    setDeleteNotificationTypePopup
} = actions;

export default reducer;