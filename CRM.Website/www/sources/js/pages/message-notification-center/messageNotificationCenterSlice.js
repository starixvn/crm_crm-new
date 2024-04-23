import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        isOstUser: true,
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    editAdmNotificationResult: null
};

const messageNotificationCenterSlice = createSlice({
    name: 'messageNotificationCenter',
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
        }
    }
});

const { actions, reducer } = messageNotificationCenterSlice;

export const {
    setGridParams,
    setGridData,
    setEditAdmNotification
} = actions;

export default reducer;