import { createSlice } from "@reduxjs/toolkit";

const dynamicReportSlice = createSlice({
    name: 'dynamicReport',
    initialState: {
        dynamicReports: null,
        allSettings: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        viewCommunicationDialog: { show: false },
        viewChartDialog: { show: false, chartInfo: {} }
    },
    reducers: {
        setDynamicReports: (state, action) => {
            state.dynamicReports = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setViewCommunicationDialog: (state, action) => {
            state.viewCommunicationDialog = action.payload;
        },
        setViewChartDialog: (state, action) => {
            state.viewChartDialog = action.payload;
        }
    }
});

const { actions, reducer } = dynamicReportSlice;

export const {
    setDynamicReports,
    setAllSettings,
    setGridParams,
    setViewCommunicationDialog,
    setViewChartDialog
} = actions;

export default reducer;