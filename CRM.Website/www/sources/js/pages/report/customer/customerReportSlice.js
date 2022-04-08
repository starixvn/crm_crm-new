import { createSlice } from "@reduxjs/toolkit";

const customerReportSlice = createSlice({
    name: 'customerReport',
    initialState: {
        customerReport: null
    },
    reducers: {
        setCustomerReport: (state, action) => {
            state.customerReport = action.payload;
        }
    }
});

const { actions, reducer } = customerReportSlice;

export const {
    setCustomerReport
} = actions;

export default reducer;