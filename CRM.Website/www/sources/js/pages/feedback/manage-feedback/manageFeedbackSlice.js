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
        viewRelatedCustomerDialog: { show: false },
        editFeedbackDialog: { show: false },
        editNoOfInquiryDialog: { show: false },
        editMultipleLogStatusDialog: { show: false },
        editMultipleLogStatuses: null
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
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
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
        setEditMultipleLogStatuses: (state, action) => {
            state.editMultipleLogStatuses = action.payload;
        }
    }
});

const { actions, reducer } = manageFeedbackSlice;

export const {
    setAllSettings,
    setGridParams,
    setGridFeedbacks,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog,
    setEditMultipleLogStatusDialog,
    setEditMultipleLogStatuses
} = actions;

export default reducer;