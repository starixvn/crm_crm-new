import { createSlice } from "@reduxjs/toolkit";

const customerReportSlice = createSlice({
    name: 'customerReport',
    initialState: {
        customerReport: null,
        allSettings: null
    },
    reducers: {
        setCustomerReport: (state, action) => {
            state.customerReport = action.payload;
        },
        setAllSettings : (state, action) => {
            state.allSettings = action.payload;
        }
    }
});

const { actions, reducer } = customerReportSlice;

export const {
    setCustomerReport,
    setAllSettings
} = actions;

export default reducer;