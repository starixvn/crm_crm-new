import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    customerInfo: null,
    allSettings: null,
    editCustomerInfoDetailResult: '',
    editCustomerInfoDetailDialog: { show: false }
};
const customerInfoDetailSlice = createSlice({
    name: 'customerInfoDetail',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setCustomerById: (state, action) => {
            state.customerInfo = action.payload;
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
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setEditCustomerInfoDetailDialog
} = actions;

export default reducer;