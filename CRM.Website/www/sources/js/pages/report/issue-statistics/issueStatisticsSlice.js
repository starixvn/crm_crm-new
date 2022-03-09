import { createSlice } from '@reduxjs/toolkit';

const issueStatisticsSlice = createSlice({
    name: 'issueStatistics',
    initialState: {
        settings: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 7
        },
        gridData: null,
        chart: { show: false, title: '', data: null}
    },
    reducers: {
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
    setChartData
} = actions;

export default reducer;