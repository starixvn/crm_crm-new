import { createSlice } from '@reduxjs/toolkit';

const communicationLogSlice = createSlice({
    name: 'communicationLog',
    initialState: {
        gridData: null,
        allStatus: null,
        gridParams: null,
        gridPages: { pageIndex: 1, pageSize: 100 },
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        customerFeedback: null,
        feedbackSubjectTemplates: [],
        duplicateFeedbackId: 0,
        insertCommunicationDialog: { show: false },
        insertSettings: null
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        },
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridPages: (state, action) => {
            state.gridPages = action.payload;
        },
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        },
        setEditCommunicationDialog: (state, action) => {
            state.editCommunicationDialog = action.payload;
        },
        setCustomerFeedbackById: (state, action) => {
            state.customerFeedback = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        },
        setDuplicateFeedback: (state, action) => {
            state.duplicateFeedbackId = action.payload;
        },
        setInsertCommunicationDialog: (state, action) => {
            state.insertCommunicationDialog = action.payload;
        },
        setInsertSettings: (state, action) => {
            state.insertSettings = action.payload;
        },
    }
});

const { actions, reducer } = communicationLogSlice;

export const {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams,
    setGridPages,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCustomerFeedbackById,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setInsertCommunicationDialog,
    setInsertSettings
} = actions;

export default reducer;
