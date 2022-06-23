import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    actionLogs: null,
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    gridDataSettingLogs: null
};

const settingLogSlice = createSlice({
    name: 'settingLog',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
    resetState,
    setActionLog,
    setGridParams,
    setGridSettingLogs
} = actions;

export default reducer;