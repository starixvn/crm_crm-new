import { createSlice } from '@reduxjs/toolkit';

const createMultipleLogSlice = createSlice({
    name: 'createMultipleLogs',
    initialState: {
        settings: null,
        numberOfFeedbackSubjectTemplate: 0,
        feedbackSubjectTemplates: [],
    },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setNumberOfFeedbackSubjectTemplate: (state, action) => {
            state.numberOfFeedbackSubjectTemplate = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        }
    }
});

const { actions, reducer } = createMultipleLogSlice;

export const {
    setSettings,
    setNumberOfFeedbackSubjectTemplate,
    setFeedbackSubjectTemplates
} = actions;

export default reducer;