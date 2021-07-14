import { createSlice } from '@reduxjs/toolkit';

const addGuestFeedbackSlice = createSlice({
    name: 'addGuestFeedback',
    initialState: {
        settings: null,
        addFeedbackResult: null,
        feedbackSubjectTemplates: [],
        confirmCreateGuestDialog: { show: false }
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        },
        setAddFeedback: (state, action) => {
            state.addFeedbackResult = action.payload;
        },
        setConfirmCreateGuestDialog: (state, action) => {
            state.confirmCreateGuestDialog = action.payload;
        }
    }
});

const { actions, reducer } = addGuestFeedbackSlice;

export const {
    setAllSettings,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog
} = actions;

export default reducer;