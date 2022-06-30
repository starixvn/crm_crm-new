import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridData: null,
    statusEdit: null,
    statusFilter: null,
    gridParams: { pageIndex: 1, pageSize: 100 },
    editNoOfInquiryDialog: { show: false },
    editCommunicationDialog: { show: false },
    logFeedback: null,
    feedbackSubjectTemplates: [],
    createCommunicationDialog: { show: false }
};
const communicationLogSlice = createSlice({
    name: 'communicationLog',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
        setCreateCommunicationDialog: (state, action) => {
            state.createCommunicationDialog = action.payload;
        }
    }
});

const { actions, reducer } = communicationLogSlice;

export const {
    resetState,
    setLogsByCustomerId,
    setStatusForEdit,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setLogByFeedbackId,
    setFeedbackSubjectTemplates,
    setCreateCommunicationDialog
} = actions;

export default reducer;
