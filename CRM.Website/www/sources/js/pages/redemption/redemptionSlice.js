import { createSlice } from '@reduxjs/toolkit';

const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: {
        gridData: null,
        allStatus: null,
        logDetail: null,
        gridParams: null,
        editRedemptionDialog: { show: false },
        statusForInsert: null,
        insertRedemptionDialog: { show: false }
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        },
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        },
        setLogById: (state, action) => {
            state.logDetail = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setEditRedemptionDialog: (state, action) => {
            state.editRedemptionDialog = action.payload;
        },
        setStatusForInsert: (state, action) => {
            state.statusForInsert = action.payload;
        },
        setInsertRedemptionDialog: (state, action) => {
            state.insertRedemptionDialog = action.payload;
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
    setStatusForInsert,
    setInsertRedemptionDialog
} = actions;

export default reducer;