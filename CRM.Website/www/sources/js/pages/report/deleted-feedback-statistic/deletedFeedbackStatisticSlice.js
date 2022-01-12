import { createSlice } from '@reduxjs/toolkit';

const deletedFeedbackStatisticSlice = createSlice({
    name: 'deletedFeedbackStatistic',
    initialState: {
        gridParams: null,
        gridData: null,
        editFeedbackDialog: { show: false },
        viewRelatedCustomerDialog: { show: false }
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setEditFeedbackDialog: (state, action) => {
            state.editFeedbackDialog = action.payload;
        },
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
        }
    }
});

const { actions, reducer } = deletedFeedbackStatisticSlice;

export const {
    setGridParams,
    setGridData,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog
} = actions;

export default reducer;