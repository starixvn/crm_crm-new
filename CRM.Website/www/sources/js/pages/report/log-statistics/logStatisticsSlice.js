import { createSlice } from '@reduxjs/toolkit';

const logStatisticsSlice = createSlice({
    name: 'logStatistics',
    initialState: {
        settings: null,
        gridParams: null,
        mainReports: null,
        mainReportDetails: null
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
        setMainReportDetails: (state, action) => {
            state.mainReportDetails = action.payload;
        }
    }
});

const { actions, reducer } = logStatisticsSlice;

export const {
    setGridParams,
    setAllSettings,
    setMainReport,
    setMainReportDetails
} = actions;

export default reducer;