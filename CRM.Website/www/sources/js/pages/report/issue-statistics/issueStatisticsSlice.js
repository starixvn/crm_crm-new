import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    settings: null,
    gridParams: {
        pageIndex: 1,
        pageSize: 7
    },
    gridData: null,
    chart: { show: false, data: null}
};
const issueStatisticsSlice = createSlice({
    name: 'issueStatistics',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setChartData: (state, action) => {
            state.chart = action.payload;
        }
    }
});

const { actions, reducer } = issueStatisticsSlice;

export const {
    setGridParams,
    setAllSettings,
    setGridData,
    setChartData,
    resetState
} = actions;

export default reducer;