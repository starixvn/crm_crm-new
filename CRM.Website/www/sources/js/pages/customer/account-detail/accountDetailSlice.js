import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    customerInfo: null,
    headlinePicRoles: null,
    accountingPicRoles: null,
    communicationTool: null,
    allSettings: null,
    editCustomerInfoDetailResult: '',
    errors: null,
    headlineCompanyService: null,
    headlineStaffsAndAuthority: null
};
const accountDetailSlice = createSlice({
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
        setHeadlinePicRoles: (state, action) => {
            state.headlinePicRoles = action.payload;
        },
        setAccountingPicRoles: (state, action) => {
            state.accountingPicRoles = action.payload;
        },
        setCommunicationTool: (state, action) => {
            state.communicationTool = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        setHeadlineCompanyService: (state, action) => {
            state.headlineCompanyService = action.payload;
        },
        setHeadlineStaffsAndAuthority: (state, action) => {
            state.headlineStaffsAndAuthority = action.payload;
        }
    }
});

const { actions, reducer } = accountDetailSlice;

export const {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setHeadlinePicRoles,
    setAccountingPicRoles,
    setCommunicationTool,
    setErrors,
    setHeadlineCompanyService,
    setHeadlineStaffsAndAuthority
} = actions;

export default reducer;