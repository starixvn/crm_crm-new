import { createSlice } from '@reduxjs/toolkit';

const deletedFeedbackSlice = createSlice({
    name: 'deletedFeedback',
    initialState: {
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        settings: null,
        gridData: null,
        editFeedbackDialog: { show: false },
        viewRelatedCustomerDialog: { show: false }
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setDeletedFeedback: (state, action) => {
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

const { actions, reducer } = deletedFeedbackSlice;

export const {
    setGridParams,
    setAllSettings,
    setDeletedFeedback,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog
} = actions;

export default reducer;