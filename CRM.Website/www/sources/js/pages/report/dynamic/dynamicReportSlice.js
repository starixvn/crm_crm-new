import { createSlice } from "@reduxjs/toolkit";

const dynamicReportSlice = createSlice({
    name: 'dynamicReport',
    initialState: {
        dynamicReports: null,
        allSettings: null,
        gridParams: {},
        viewCommunicationDialog: { show: false }
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
            state.viewCommunicationDialog = action.payload
        }
    }
});

const { actions, reducer } = dynamicReportSlice;

export const {
    setDynamicReports,
    setAllSettings,
    setGridParams,
    setViewCommunicationDialog
} = actions;

export default reducer;