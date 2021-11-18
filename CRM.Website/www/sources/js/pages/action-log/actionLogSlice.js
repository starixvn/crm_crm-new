import { createSlice } from '@reduxjs/toolkit';

const actionLogSlice = createSlice({
    name: 'actionLog',
    initialState: {
        allLogActions: null,
        activityLogs: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        }
    },
    reducers: {
        setAllLogAction: (state, action) => {
            state.allLogActions = action.payload;
        },
        setActivityLog: (state, action) => {
            state.activityLogs = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        }
    }
});

const { actions, reducer } = actionLogSlice;

export const {
    setAllLogAction,
    setActivityLog,
    setGridParams
} = actions;

export default reducer;