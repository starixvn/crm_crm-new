import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    lastFiveSpecialRemarks: null,
    redemptions: null,
    editRedemptionDialog: { show: false },
    communicationLogs: null,
    noOfInquiryDialog: { show: false },
    editCommunicationDialog: { show: false },
    createCommunicationDialog: { show: false },
    customerInfoVerify: null,
    editCustomerVerifyDialog: { show: false },
    lastRemark: null
};
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setLastFiveSpecialRemarks: (state, action) => {
            state.lastFiveSpecialRemarks = action.payload;
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
        },
        setLastRemark: (state, action) => {
            state.lastRemark = action.payload;
        }
    }
});

const { actions, reducer } = dashboardSlice;

export const {
    setLastFiveSpecialRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    setCustomerInfoVerify,
    setEditCustomerVerifyDialog,
    setLastRemark,
    resetState
} = actions;

export default reducer;