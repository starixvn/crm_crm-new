import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    settings: null,
    balanceUpday: null,
    customerDetail: null,
    addFeedbackResult: null,
    feedbackSubjectTemplates: [],
    settingCommunicationTool: null,
    confirmCreateGuestDialog: { show: false }
};
const addGuestFeedbackSlice = createSlice({
    name: 'addCustomerFeedback',
    initialState:  initialState,
    reducers: {
        resetState: () => initialState,
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setBalanceUpday: (state, action) => {
            state.balanceUpday = action.payload;
        },
        setCustomerDetail: (state, action) => {
            state.customerDetail = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        },
        setAddFeedback: (state, action) => {
            state.addFeedbackResult = action.payload;
        },
        setConfirmCreateGuestDialog: (state, action) => {
            state.confirmCreateGuestDialog = action.payload;
        },
        setSettingCommunicationTool: (state, action) => {
            state.settingCommunicationTool = action.payload;
        }
    }
});

const { actions, reducer } = addGuestFeedbackSlice;

export const {
    setAllSettings,
    setBalanceUpday,
    setCustomerDetail,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog,
    setSettingCommunicationTool,
    resetState
} = actions;

export default reducer;