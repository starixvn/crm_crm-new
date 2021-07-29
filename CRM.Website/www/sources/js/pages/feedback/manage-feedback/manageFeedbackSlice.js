import { createSlice } from '@reduxjs/toolkit';

const manageFeedbackSlice = createSlice({
    name: 'manageFeedback',
    initialState: {
        settings: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

const { actions, reducer } = manageFeedbackSlice;

export const {
    setAllSettings
} = actions;

export default reducer;