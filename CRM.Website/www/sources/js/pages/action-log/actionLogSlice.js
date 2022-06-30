import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    allLogActions: null,
    activityLogs: null,
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    }
};
const actionLogSlice = createSlice({
    name: 'actionLog',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
    resetState,
    setAllLogAction,
    setActivityLog,
    setGridParams
} = actions;

export default reducer;