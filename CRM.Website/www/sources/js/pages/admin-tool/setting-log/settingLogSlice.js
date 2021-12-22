import { createSlice } from '@reduxjs/toolkit';

const settingLogSlice = createSlice({
    name: 'settingLog',
    initialState: {
        actionLogs: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        gridDataActions: null
    },
    reducers: {
        setActionLog: (state, action) => {
            state.actionLogs = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridActionLogs: (state, action) => {
            state.gridDataActions = action.payload;
        }
    }
});

const { actions, reducer } = settingLogSlice;

export const {
    setActionLog,
    setGridParams,
    setGridActionLogs
} = actions;

export default reducer;