import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        gridParams: null,
        selectLatestFeedback: null,
        editLatestFeedbackPopup: { show:false },
        editLatestFeedbackResult: ''
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setLatestFeedBack: (state, action) => {
            state.gridData = action.payload;
        },
        setSelectLatestFeedbackId: (state, action) => {
            state.selectLatestFeedback = action.payload;
        },
        setEditLatestFeedbackPopup: (state, action) => {
            state.editLatestFeedbackPopup = action.payload;
        },
        setEditLatestFeedbackResult: (state, action) => {
            state.editLatestFeedbackResult = action.payload;
        }
    }
});

const { actions, reducer } = latestFeedbackSlice;

export const {
    setGridParams,
    setLatestFeedBack,
    setSelectLatestFeedbackId,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult
} = actions;

export default reducer;