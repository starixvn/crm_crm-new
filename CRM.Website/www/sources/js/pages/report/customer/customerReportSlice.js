import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    customerReport: null,
    allSettings: null,
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    }
};
const customerReportSlice = createSlice({
    name: 'customerReport',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
    setGridParams,
    resetState
} = actions;

export default reducer;