import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        tops: [],
        gridParams: { top: 10 },
        editLatestFeedbackPopup: { show: false },
        editLatestFeedbackResult: '',
        editNoInquiriesPopup: { show: false },
        editNoInquiriesResult: '',
        updateFeedbackPopup: { show: false },
        updateFeedbackResult: '',
        selectedFeedback: null,
        settings: {
            CommunicationToolList: []
        },
        feedback: null
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
        setEditLatestFeedbackPopup: (state, action) => {
            state.editLatestFeedbackPopup = action.payload;
        },
        setEditLatestFeedbackResult: (state, action) => {
            state.editLatestFeedbackResult = action.payload;
        },
        setEditNoInquiriesPopup: (state, action) => {
            state.editNoInquiriesPopup = action.payload;
        },
        setEditNoInquiriesResult: (state, action) => {
            state.editNoInquiriesResult = action.payload;
        },
        setUpdateFeedbackPopup: (state, action) => {
            state.updateFeedbackPopup = action.payload;
        },
        setUpdateFeedbackResult: (state, action) => {
            state.updateFeedbackResult = action.payload;
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
    setEditLatestFeedbackPopup,
    setEditLatestFeedbackResult,
    setTops,
    setEditNoInquiriesPopup,
    setEditNoInquiriesResult,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    setSelectedFeedback,
    setAllSettings,
    setFeedback
} = actions;

export default reducer;