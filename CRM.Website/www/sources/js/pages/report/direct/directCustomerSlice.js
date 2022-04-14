import { createSlice } from '@reduxjs/toolkit';

const summaryReportSlice = createSlice({
    name: 'summaryReport',
    initialState: {
        gridParams: {
            headline: null,
            username: null,
            isExcludeIgnoredAccounts: true,
            pageIndex: 1,
            pageSize: 50
        },
        gridData: null
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
    }
});

const { actions, reducer } = summaryReportSlice;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;
