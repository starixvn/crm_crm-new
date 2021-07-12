import { createSlice } from '@reduxjs/toolkit';

const addGuestFeedbackSlice = createSlice({
    name: 'addGuestFeedback',
    initialState: {
        settings: null,
        addFeedbackResult: null,
        feedbackSubjectTemplates: []
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
        }
    }
});

const { actions, reducer } = addGuestFeedbackSlice;

export const {
    setAllSettings,
    setFeedbackSubjectTemplates,
    setAddFeedback
} = actions;

export default reducer;