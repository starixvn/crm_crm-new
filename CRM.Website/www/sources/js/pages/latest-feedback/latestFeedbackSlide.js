import { createSlice } from '@reduxjs/toolkit';

const latestFeedbackSlice = createSlice({
    name: 'latestFeedback',
    initialState: {
        gridData: null,
        tops: [],
        gridParams: { top: 10 },
        editLatestFeedbackPopup: { show: false },
        editLatestFeedbackResult: '',
        editQuickUpdateFeedbackPopup: { show: false },
        editQuickUpdateFeedbackesult: '',
        updateFeedbackPopup: { show: false },
        updateFeedbackResult: '',
        selectedFeedback: null,
        settings: {
            CommunicationToolList: []
        },
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
        setEditQuickUpdateFeedbackPopup: (state, action) => {
            state.editQuickUpdateFeedbackPopup = action.payload;
        },
        setEditQuickUpdateFeedbackResult: (state, action) => {
            state.editQuickUpdateFeedbackResult = action.payload;
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
    setEditQuickUpdateFeedbackPopup,
    setEditQuickUpdateFeedbackResult,
    setUpdateFeedbackPopup,
    setUpdateFeedbackResult,
    setSelectedFeedback,
    setAllSettings
} = actions;

export default reducer;