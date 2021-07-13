import { createSlice } from '@reduxjs/toolkit';

const createMultipleLogSlice = createSlice({
    name: 'createMultipleLogs',
    initialState: {
        settings: null,
        verifyCustomerResults: [],
        relatedCustomerResults: [],
        feedbackSubjectTemplates: [],
        addRelatedCustomerDialog: { show: false },
        viewRelatedCustomerDialog: { show: false },
        confirmCreateMultipleLogsDialog: { show: false }
    },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setVerifyCustomerResults: (state, action) => {
            const totalItems = action.payload.length;
            for (let i = 0; i < totalItems; i++) {
                const customer = action.payload[i];
                const index = state.verifyCustomerResults.findIndex(item => item.custId === customer.custId && item.username === customer.username);
                if (index < 0) {
                    state.verifyCustomerResults.push(customer);
                }
            }
        },
        removeCustomer: (state, action) => {
            const customer = action.payload;
            if (customer.custId === 0) {
                state.verifyCustomerResults = state.verifyCustomerResults.filter(item => item.custId !== 0);
            } else {
                state.verifyCustomerResults = state.verifyCustomerResults.filter(item => item.custId !== customer.custId);
                state.relatedCustomerResults = state.relatedCustomerResults.filter(item => item.custId !== customer.custId);
            }
        },
        setAddRelatedCustomerDialog: (state, action) => {
            state.addRelatedCustomerDialog = action.payload;
        },
        setRelatedCustomerResults: (state, action) => {
            state.relatedCustomerResults = action.payload;
        },
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
        },
        setFeedbackSubjectTemplates: (state, action) => {
            state.feedbackSubjectTemplates = action.payload;
        },
        setConfirmCreateMultipleLogsDialog: (state, action) => {
            state.confirmCreateMultipleLogsDialog = action.payload;
        }
    }
});

const { actions, reducer } = createMultipleLogSlice;

export const {
    setSettings,
    setVerifyCustomerResults,
    removeCustomer,
    setRelatedCustomerResults,
    setAddRelatedCustomerDialog,
    setViewRelatedCustomerDialog,
    setFeedbackSubjectTemplates,
    setConfirmCreateMultipleLogsDialog
} = actions;

export default reducer;