import { createSlice } from '@reduxjs/toolkit';

const settingLogSlice = createSlice({
    name: 'settingLog',
    initialState: {
        actionLogs: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        gridDataSettingLogs: null
    },
    reducers: {
        setActionLog: (state, action) => {
            state.actionLogs = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridSettingLogs: (state, action) => {
            state.gridDataSettingLogs = action.payload;
        }
    }
});

const { actions, reducer } = settingLogSlice;

export const {
    setActionLog,
    setGridParams,
    setGridSettingLogs
} = actions;

export default reducer;