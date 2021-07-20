import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        gridParams: { top: 10 },
        viewRelatedCustomerDialog: { show: false },
        editFeedbackDialog: { show: false },
        editNoOfInquiryDialog: { show: false }
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
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        }
    }
});

const { actions, reducer } = latestFeedbackSlice;

export const {
    setGridParams,
    setLatestFeedback,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog
} = actions;

export default reducer;