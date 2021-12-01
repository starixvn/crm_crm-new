import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        customerRemarks: null
    },
    reducers: {
        setCustomerRemarks: (state, action) => {
            state.customerRemarks = action.payload;
        }
    }
});

const { actions, reducer } = dashboardSlice;

export const {
    setCustomerRemarks
} = actions;

export default reducer;