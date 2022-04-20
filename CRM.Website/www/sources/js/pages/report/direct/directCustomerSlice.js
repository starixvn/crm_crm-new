import { createSlice } from '@reduxjs/toolkit';

const directReportSlice = createSlice({
    name: 'directReport',
    initialState: {
        gridParams: {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            pageIndex: 1,
            pageSize: 100
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

const { actions, reducer } = directReportSlice;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;
