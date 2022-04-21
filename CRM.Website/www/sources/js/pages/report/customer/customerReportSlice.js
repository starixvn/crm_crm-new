import { createSlice } from "@reduxjs/toolkit";

const customerReportSlice = createSlice({
    name: 'customerReport',
    initialState: {
        customerReport: null,
        allSettings: null,
        gridParams: {}
    },
    reducers: {
        setCustomerReport: (state, action) => {
            state.customerReport = action.payload;
        },
        setAllSettings : (state, action) => {
            state.allSettings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        }
    }
});

const { actions, reducer } = customerReportSlice;

export const {
    setCustomerReport,
    setAllSettings,
    setGridParams
} = actions;

export default reducer;