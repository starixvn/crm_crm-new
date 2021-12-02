import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        customerRemarks: null,
        redemptions: null,
        editRedemptionDialog: { show: false },
        redemption: null,
        status: null,
    },
    reducers: {
        setCustomerRemarks: (state, action) => {
            state.customerRemarks = action.payload;
        },
        setRedemptionLogs: (state, action) => {
            state.redemptions = action.payload;
        },
        setEditRedemptionDialog: (state, action) => {
            state.editRedemptionDialog = action.payload;
        },
        setRedemptionById: (state, action) => {
            state.redemption = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

const { actions, reducer } = dashboardSlice;

export const {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setRedemptionById,
    setStatus
} = actions;

export default reducer;