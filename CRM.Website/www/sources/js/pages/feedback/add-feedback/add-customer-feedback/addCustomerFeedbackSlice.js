import { createSlice } from '@reduxjs/toolkit';

const addGuestFeedbackSlice = createSlice({
    name: 'addCustomerFeedback',
    initialState: {
        settings: null,
        balanceUpday: null,
        customerDetail: null,
        addFeedbackResult: null,
        feedbackSubjectTemplates: [],
        confirmCreateGuestDialog: { show: false }
    },
    reducers: {
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
    setConfirmCreateGuestDialog
} = actions;

export default reducer;