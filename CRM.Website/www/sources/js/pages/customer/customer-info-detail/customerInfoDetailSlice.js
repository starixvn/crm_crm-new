import { createSlice } from '@reduxjs/toolkit';

const customerInfoDetailSlice = createSlice({
    name: 'customerInfoDetail',
    initialState: {
        gridData: null,
        allSettings: null,
        editCustomerInfoDetailResult: '',
        editCustomerInfoDetailDialog: {show: false}
    },
    reducers: {
        setCustomerInfoDetail: (state, action) => {
            state.gridData = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setEditCustomerInfoDetail: (state, action) => {
            state.editCustomerInfoDetailResult = action.payload;
        },
        setEditCustomerInfoDetailDialog : (state, action) => {
            state.editCustomerInfoDetailDialog = action.payload;
        }
    }
});

const { actions, reducer } = customerInfoDetailSlice;

export const {
    setCustomerInfoDetail,
    setAllSettings,
    setEditCustomerInfoDetail,
    setEditCustomerInfoDetailDialog
} = actions;

export default reducer;