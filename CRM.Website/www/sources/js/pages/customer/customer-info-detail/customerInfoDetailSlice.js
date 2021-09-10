import { createSlice } from '@reduxjs/toolkit';

const customerInfoDetailSlice = createSlice({
    name: 'customerInfoDetail',
    initialState: {
        gridData: null,
        allSettings: null,
        editCustomerInfoDetailResult: '',
    },
    reducers: {
        setCustomerInfo: (state, action) => {
            state.gridData = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setEditCustomerInfoDetail: (state, action) => {
            state.editCustomerInfoDetailResult = action.payload;
        }
    }
});

const { actions, reducer } = customerInfoDetailSlice;

export const {
    setCustomerInfo,
    setAllSettings,
    setEditCustomerInfoDetail
} = actions;

export default reducer;