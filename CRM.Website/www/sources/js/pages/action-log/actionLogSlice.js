import { createSlice } from '@reduxjs/toolkit';

const actionLogSlice = createSlice({
    name: 'actionLog',
    initialState: {
        allLogActions: null,
        activityLogs: null
    },
    reducers: {
        setAllLogAction: (state, action) => {
            state.allLogActions = action.payload;
        },
        setActivityLog: (state, action) => {
            state.activityLogs = action.payload;
        }
    }
});

const { actions, reducer } = actionLogSlice;

export const {
    setAllLogAction,
    setActivityLog
} = actions;

export default reducer;