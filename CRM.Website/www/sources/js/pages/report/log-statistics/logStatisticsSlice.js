import { createSlice } from '@reduxjs/toolkit';

const logStatisticsSlice = createSlice({
    name: 'logStatistics',
    initialState: {
        settings: null,
        gridParams: null,
        gridParamDetails: {
            pageIndex: 1,
            pageSize: 100
        },
        mainReports: null,
        reportDetails: null,
        details: { show: false, title: ''},
        chart: { show: false,title: '', data: null}
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setMainReport: (state, action) => {
            state.mainReports = action.payload;
        },
        setGridParamDetails: (state, action) => {
            state.gridParamDetails = action.payload;
        },
        setReportDetails: (state, action) => {
            state.reportDetails = action.payload;
        },
        setDetailsDataGrid: (state, action) => {
            state.details = action.payload;
        },
        setChartData: (state, action) => {
            state.chart = action.payload;
        }
    }
});

const { actions, reducer } = logStatisticsSlice;

export const {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setMainReport,
    setReportDetails,
    setDetailsDataGrid,
    setChartData
} = actions;

export default reducer;