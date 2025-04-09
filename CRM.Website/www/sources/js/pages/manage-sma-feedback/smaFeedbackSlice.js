import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    editSmaFeedbackDialog: { show: false },
    reviewStatusSetting: []
};

const smaFeedbackSlice = createSlice({
    name: 'smaFeedback',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setEditSmaFeedbackDialog: (state, action) => {
            state.editSmaFeedbackDialog = action.payload;
        },
        setReviewStatusSetting: (state, action) => {
            state.reviewStatusSetting = action.payload;
        }
    }
});

const { actions, reducer } = smaFeedbackSlice;

export const {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    setReviewStatusSetting
} = actions;

export default reducer;