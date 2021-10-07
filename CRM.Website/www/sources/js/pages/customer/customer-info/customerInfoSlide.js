import { createSlice } from '@reduxjs/toolkit';

const customerInfoSlide = createSlice({
    name: 'customerInfo',
    initialState: {
        customerInfo: null,
        customerSuggestions: [],
        gridParams: {
            username: null,
            isGuest: false
        },
        settings: {
            sites: [],
            countries: [],
            languages: [],
            sitesLicenseeInactive: []
        },
        editCustomerInfoResult: null,
        editCustomerInfoPopup: { show: false },
        emptyCustomerInfoPopup: { show: false }
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setCustomerInfo: (state, action) => {
            state.customerInfo = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setEditCustomerInfo: (state, action) => {
            state.editCustomerInfoResult = action.payload;
        },
        setEditCustomerInfoPopup: (state, action) => {
            state.editCustomerInfoPopup = action.payload;
        },
        setEmptyCustomerInfoPopup: (state, action) => {
            state.emptyCustomerInfoPopup = action.payload;
        },
        setCustomerSuggestions: (state, action) => {
            state.customerSuggestions = action.payload;
        }
    }
});

const { actions, reducer } = customerInfoSlide;

export const {
    setGridParams,
    setCustomerInfo,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup,
    setEmptyCustomerInfoPopup,
    setCustomerSuggestions
} = actions;

export default reducer;