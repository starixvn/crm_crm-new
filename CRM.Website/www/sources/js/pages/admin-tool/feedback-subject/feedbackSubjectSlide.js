import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridData: null,
    gridParams: {
       Subject: null,
       pageIndex: 1,
       pageSize: 100
    },
    allActiveFeedbackSubject: null,
    selectFeedbackSubject: null,
    createFeedbackSubjectPopup: { show: false },
    createFeedbackSubjectResult: '',
    editStatusFeedbackSubjectPopup: { show: false },
    editFeedbackSubjectPopup: { show:false },
    editFeedbackSubjectResult: ''
};
const feedbackSubjectSlice = createSlice({
    name: 'feedbackSubject',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setFeedBackSubject: (state, action) => {
            state.gridData = action.payload;
        },
        setAllActiveFeedbackSubject: (state, action) => {
            state.allActiveFeedbackSubject = action.payload;
        },
        setSelectFeedbackSubjectId: (state, action) => {
            state.selectFeedbackSubject = action.payload;
        },
        setCreateFeedbackSubjectPopup: (state, action) => {
            state.createFeedbackSubjectPopup = action.payload;
        },
        setCreateFeedbackSubjectResult: (state, action) => {
            state.createFeedbackSubjectResult = action.payload;
        },
        setEditStatusFeedbackSubjectPopup: (state, action) => {
            state.editStatusFeedbackSubjectPopup = action.payload;
        },
        setEditFeedbackSubjectPopup: (state, action) => {
            state.editFeedbackSubjectPopup = action.payload;
        },
        setEditFeedbackSubjectResult: (state, action) => {
            state.editFeedbackSubjectResult = action.payload;
        }
    }
});

const { actions, reducer } = feedbackSubjectSlice;

export const {
    resetState,
    setGridParams,
    setFeedBackSubject,
    setAllActiveFeedbackSubject,
    setSelectFeedbackSubjectId,
    setCreateFeedbackSubjectPopup,
    setCreateFeedbackSubjectResult,
    setEditStatusFeedbackSubjectPopup,
    setEditFeedbackSubjectPopup,
    setEditFeedbackSubjectResult
} = actions;

export default reducer;