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
        feedbackSubjectTemplates: []
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
        }
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
    setFeedbackSubjectTemplates
} = actions;

export default reducer;
