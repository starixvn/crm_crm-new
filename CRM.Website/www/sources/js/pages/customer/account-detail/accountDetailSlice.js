import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    customerInfo: null,
    headlinePicRoles: null,
    accountingPicRoles: null,
    settingCommunicationTool: null,
    allSettings: null,
    editCustomerInfoDetailResult: '',
    errors: null,
    headlineCompanyService: null,
    headlineStaffsAndAuthority: null,
    settingStaffAndAuthority: null,
    settingPicRole: null
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
        setSettingCommunicationTool: (state, action) => {
            state.settingCommunicationTool = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        setHeadlineCompanyService: (state, action) => {
            state.headlineCompanyService = action.payload;
        },
        setHeadlineStaffsAndAuthority: (state, action) => {
            state.headlineStaffsAndAuthority = action.payload;
        },
        setSettingStaffAndAuthority: (state, action) => {
            state.settingStaffAndAuthority = action.payload;
        },
        setSettingPicRole: (state, action) => {
            state.settingPicRole = action.payload;
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
    setSettingCommunicationTool,
    setErrors,
    setHeadlineCompanyService,
    setHeadlineStaffsAndAuthority,
    setSettingStaffAndAuthority,
    setSettingPicRole
} = actions;

export default reducer;