import { createSlice } from '@reduxjs/toolkit';

const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: {
        redemptionLogs: null,
        allStatus: null,
        redemptionLog: null,
        gridParams: null,
        editRedemptionDialog: { show: false },
        settings: null,
        createRedemptionDialog: { show: false }
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.redemptionLogs = action.payload;
        },
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        },
        setLogById: (state, action) => {
            state.redemptionLog = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setEditRedemptionDialog: (state, action) => {
            state.editRedemptionDialog = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setCreateRedemptionDialog: (state, action) => {
            state.createRedemptionDialog = action.payload;
        }
    }
});

const { actions, reducer } = redemptionSlice;

export const {
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog,
    setSettings,
    setCreateRedemptionDialog
} = actions;

export default reducer;