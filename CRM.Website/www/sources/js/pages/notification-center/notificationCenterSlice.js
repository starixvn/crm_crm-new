import { createSlice } from '@reduxjs/toolkit';
import { REFRESH_CENTER_TIMES } from '@jsroot/common/constants';

const initialState = {
    gridParams: {
        isOstUser: true,
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    editAdmNotificationResult: null,
    autoRefresh: {
        value: REFRESH_CENTER_TIMES[0],
        countDown: REFRESH_CENTER_TIMES[0],
        isSubmit: false
    },
    isRefresh: true
};

const notificationCenterSlice = createSlice({
    name: 'notificationCenter',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setEditAdmNotification: (state, action) => {
            state.editAdmNotificationResult = action.payload;
        },
        setAutoRefresh: (state, action) => {
            state.autoRefresh = action.payload;
        },
        setIsRefresh: (state, action) => {
            state.isRefresh = action.payload;
        }
    }
});

const { actions, reducer } = notificationCenterSlice;

export const {
    setGridParams,
    setGridData,
    setEditAdmNotification,
    setAutoRefresh,
    setIsRefresh
} = actions;

export default reducer;