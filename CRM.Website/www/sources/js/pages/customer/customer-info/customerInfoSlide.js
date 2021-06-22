import { createSlice } from '@reduxjs/toolkit';

const customerInfoSlide = createSlice({
    name: 'customerInfo',
    
    initialState: {
        gridData: null,
        gridParams: {
            Username: null,
            IsGuest: false,
        },
        settings: {
            sites: [],
            countries: [],
            languages: []
        },
        editCustomerInfoResult: '',
        editCustomerInfoPopup: { show : false },
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setCustomerInfo: (state, action) => {
            state.gridData = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setEditCustomerInfo: (state, action) => {
            state.editCustomerInfoResult = action.payload;
        },
        setEditCustomerInfoPopup : (state, action) => {
            state.editCustomerInfoPopup = action.payload;
        }
    }

});

const { actions, reducer } = customerInfoSlide;

export const {
    setGridParams,
    setCustomerInfo,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup
} = actions;

export default reducer;