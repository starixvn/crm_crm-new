import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        gridParams: { top: 10 },
        viewRelatedCustomerDialog: { show: false },
        editFeedbackDialog: { show: false },
        editFeedbackResult: null,
        editNoInquiriesDialog: { show: false },
        editNoInquiriesResult: null,
        selectedFeedback: null,
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
        setEditFeedbackDialog: (state, action) => {
            state.editFeedbackDialog = action.payload;
        },
        setEditFeedbackResult: (state, action) => {
            state.editFeedbackResult = action.payload;
        },
        setEditNoInquiriesDialog: (state, action) => {
            state.editNoInquiriesDialog = action.payload;
        },
        setEditNoInquiriesResult: (state, action) => {
            state.editNoInquiriesResult = action.payload;
        },
        setSelectedFeedback: (state, action) => {
            state.selectedFeedback = action.payload;
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
    setEditFeedbackDialog,
    setEditFeedbackResult,
    setEditNoInquiriesDialog,
    setEditNoInquiriesResult,
    setSelectedFeedback,
    setAllSettings,
    setFeedback
} = actions;

export default reducer;