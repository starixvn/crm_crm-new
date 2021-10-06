import { createSlice } from '@reduxjs/toolkit';

const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: {
        gridData: null,
        allStatus: null,
        logDetail: null,
        gridParams: null,
        editRedemptionDialog: { show: false }
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
        }
    }
});

const { actions, reducer } = redemptionSlice;

export const {
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog
} = actions;

export default reducer;