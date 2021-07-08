import { createSlice } from '@reduxjs/toolkit';

const addGuestFeedbackSlice = createSlice({
    name: 'addGuestFeedback',
    initialState: {
        settings: null,
        feedbackSubjectTemplate: null,
        addFeedbackResult: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setFeedbackSubjectTemplate: (state, action) => {
            state.feedbackSubjectTemplate = action.payload;
        },
        setAddFeedback: (state, action) => {
            state.addFeedbackResult = action.payload;
        }
    }
});

const { actions, reducer } = addGuestFeedbackSlice;

export const {
    setAllSettings,
    setFeedbackSubjectTemplate,
    setAddFeedback
} = actions;

export default reducer;