import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        customerRemarks: null,
        redemptions: null,
        editRedemptionDialog: { show: false },
        redemption: null,
        status: null,
        communicationLogs: null,
        noOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false }
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
        },
        setCommunicationLogs: (state, action) => {
            state.communicationLogs = action.payload;
        },
        setNoOfInquiryDialog: (state, action) => {
            state.noOfInquiryDialog = action.payload;
        },
        setEditCommunicationDialog: (state, action) => {
            state.editCommunicationDialog = action.payload;
        }
    }
});

const { actions, reducer } = dashboardSlice;

export const {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setRedemptionById,
    setStatus,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog
} = actions;

export default reducer;