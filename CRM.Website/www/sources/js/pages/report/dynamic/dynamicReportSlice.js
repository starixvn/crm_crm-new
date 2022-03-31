import { createSlice } from "@reduxjs/toolkit";

const dynamicReportSlice = createSlice({
    name: 'dynamicReport',
    initialState: {
        dynamicReport: null,
        allSettings: null
    },
    reducers: {
        setDynamicReport: (state, action) => {
            state.dynamicReport = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        }
    }
});

const { actions, reducer } = dynamicReportSlice;

export const {
    setDynamicReport,
    setAllSettings
} = actions;

export default reducer;