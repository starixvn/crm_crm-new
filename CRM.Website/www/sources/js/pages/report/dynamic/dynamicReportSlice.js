import { createSlice } from "@reduxjs/toolkit";

const dynamicReportSlice = createSlice({
    name: 'dynamicReport',
    initialState: {
        dynamicReports: null,
        allSettings: null,
        gridParams: {}
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
        }
    }
});

const { actions, reducer } = dynamicReportSlice;

export const {
    setDynamicReports,
    setAllSettings,
    setGridParams
} = actions;

export default reducer;