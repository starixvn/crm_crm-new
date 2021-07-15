import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        gridParams: { top: 10 },
        viewRelatedCustomerDialog: { show: false },
        editFeedbackDialog: { show: false },
        editFeedbackResult: null,
        editNoOfInquiryDialog: { show: false },
        settings: {
            CommunicationToolList: []
        },
        feedback: null
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setLatestFeedback: (state, action) => {
            state.gridData = action.payload;
        },
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
        },
        setEditFeedbackDialog: (state, action) => {
            state.editFeedbackDialog = action.payload;
        },
        setEditFeedbackResult: (state, action) => {
            state.editFeedbackResult = action.payload;
        },
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setFeedback: (state, action) => {
            state.feedback = action.payload;
        }
    }
});

const { actions, reducer } = latestFeedbackSlice;

export const {
    setGridParams,
    setLatestFeedback,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditFeedbackResult,
    setEditNoOfInquiryDialog,
    setAllSettings,
    setFeedback
} = actions;

export default reducer;