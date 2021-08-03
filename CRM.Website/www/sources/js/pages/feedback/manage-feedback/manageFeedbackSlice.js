import { createSlice } from '@reduxjs/toolkit';

const manageFeedbackSlice = createSlice({
    name: 'manageFeedback',
    initialState: {
        settings: null,
        gridParams: null,
        gridDataFeedbacks: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridFeedbacks: (state, action) => {
            state.gridDataFeedbacks = action.payload;
        }
    }
});

const { actions, reducer } = manageFeedbackSlice;

export const {
    setAllSettings,
    setGridParams,
    setGridFeedbacks
} = actions;

export default reducer;