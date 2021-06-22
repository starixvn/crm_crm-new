import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        tops: [],
        gridParams: { top: 10 },
        selectLatestFeedback: null,
        editLatestFeedbackPopup: { show: false },
        editLatestFeedbackResult: '',
        editQuickUpdateFeedbackPopup: { show: false },
        editQuickUpdateFeedbackesult: ''
    },
    reducers: {
        setTops: (state, action) => {
            state.tops = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setLatestFeedback: (state, action) => {
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
        },
        setEditQuickUpdateFeedbackPopup: (state, action) => {
            state.editQuickUpdateFeedbackPopup = action.payload;
        },
        setEditQuickUpdateFeedbackResult: (state, action) => {
            state.editQuickUpdateFeedbackResult = action.payload;
        }
    }
});

const { actions, reducer } = latestFeedbackSlice;

export const {
    setGridParams,
    setLatestFeedback,
    setSelectLatestFeedbackId,
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    setTops,
    setEditQuickUpdateFeedbackPopup,
    setEditQuickUpdateFeedbackResult
} = actions;

export default reducer;