import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    redemptionLogs: null,
    allStatus: null,
    redemptionLog: null,
    gridParams: null,
    editRedemptionDialog: { show: false },
    settings: null,
    createRedemptionDialog: { show: false }
};
const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
    resetState,
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog,
    setSettings,
    setCreateRedemptionDialog
} = actions;

export default reducer;