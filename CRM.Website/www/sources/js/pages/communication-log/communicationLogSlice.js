import { createSlice } from '@reduxjs/toolkit';

const communicationLogSlice = createSlice({
    name: 'communicationLog',
    initialState: {
        gridData: null,
        statusEdit: null,
        statusFilter: null,
        gridParams: { pageIndex: 1, pageSize: 100 },
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        logFeedback: null,
        feedbackSubjectTemplates: [],
        duplicateFeedbackId: 0,
        createCommunicationDialog: { show: false },
        allSettings: null
        balanceUpday: null
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        },
        setStatusForEdit: (state, action) => {
            state.statusEdit = action.payload;
        },
        setStatusForFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        },
        setEditCommunicationDialog: (state, action) => {
            state.editCommunicationDialog = action.payload;
        },
        setLogByFeedbackId: (state, action) => {
            state.logFeedback = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        },
        setDuplicateFeedback: (state, action) => {
            state.duplicateFeedbackId = action.payload;
        },
        setCreateCommunicationDialog: (state, action) => {
            state.createCommunicationDialog = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setBalanceUpday: (state, action) => {
            state.balanceUpday = action.payload;
        }
    }
});

const { actions, reducer } = communicationLogSlice;

export const {
    setLogsByCustomerId,
    setStatusForEdit,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setLogByFeedbackId,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setCreateCommunicationDialog,
    setAllSettings
    setBalanceUpday
} = actions;

export default reducer;
