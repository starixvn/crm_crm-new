import { createSlice } from '@reduxjs/toolkit';

const manageFeedbackSlice = createSlice({
    name: 'manageFeedback',
    initialState: {
        settings: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        gridDataFeedbacks: null,
        editFeedbackDialog: { show: false },
        editNoOfInquiryDialog: { show: false },
        editMultipleLogStatusDialog: { show: false },
        editMultipleLogDialog: { show: false },
        viewRelatedCustomerDialog: { show: false }
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridFeedbacks: (state, action) => {
            state.gridDataFeedbacks = action.payload;
        },
        setEditFeedbackDialog: (state, action) => {
            state.editFeedbackDialog = action.payload;
        },
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        },
        setEditMultipleLogStatusDialog: (state, action) => {
            state.editMultipleLogStatusDialog = action.payload;
        },
        setEditMultipleLogDialog: (state, action) => {
            state.editMultipleLogDialog = action.payload;
        },
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
        }
    }
});

const { actions, reducer } = manageFeedbackSlice;

export const {
    setAllSettings,
    setGridParams,
    setGridFeedbacks,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog,
    setEditMultipleLogStatusDialog,
    setEditMultipleLogDialog,
    setViewRelatedCustomerDialog
} = actions;

export default reducer;