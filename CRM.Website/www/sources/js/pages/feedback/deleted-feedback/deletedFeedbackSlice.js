import { createSlice } from '@reduxjs/toolkit';

const deletedFeedbackSlice = createSlice({
    name: 'deletedFeedback',
    initialState: {
        gridParams: null,
        settings: null,
        gridData: null
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setDeletedFeedback: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = deletedFeedbackSlice;

export const {
    setGridParams,
    setAllSettings,
    setDeletedFeedback
} = actions;

export default reducer;