import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        customerRemarks: null,
        redemptions: null,
        editRedemptionDialog: { show: false },
        communicationLogs: null,
        noOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        createCommunicationDialog: { show: false },
        customerInfoVerify: null,
        editCustomerVerifyDialog: { show: false }
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
        setCommunicationLogs: (state, action) => {
            state.communicationLogs = action.payload;
        },
        setNoOfInquiryDialog: (state, action) => {
            state.noOfInquiryDialog = action.payload;
        },
        setEditCommunicationDialog: (state, action) => {
            state.editCommunicationDialog = action.payload;
        },
        setCreateCommunicationDialog: (state, action) => {
            state.createCommunicationDialog = action.payload;
        },
        setCustomerInfoVerify: (state, action) => {
            state.customerInfoVerify = action.payload;
        },
        setEditCustomerVerifyDialog: (state, action) => {
            state.editCustomerVerifyDialog = action.payload;
        }
    }
});

const { actions, reducer } = dashboardSlice;

export const {
    setCustomerRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    setCustomerInfoVerify,
    setEditCustomerVerifyDialog
} = actions;

export default reducer;