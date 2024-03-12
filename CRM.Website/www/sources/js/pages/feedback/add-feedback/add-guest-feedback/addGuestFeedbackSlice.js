import { createSlice } from '@reduxjs/toolkit';
const initialState ={
    settings: null,
    balanceUpday: null,
    addFeedbackResult: null,
    feedbackSubjectTemplates: [],
    settingCommunicationTool: null,
    confirmCreateGuestDialog: { show: false }
};
const addGuestFeedbackSlice = createSlice({
    name: 'addGuestFeedback',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setBalanceUpday: (state, action) => {
            state.balanceUpday = action.payload;
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
    resetState,
    setAllSettings,
    setBalanceUpday,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setDuplicateFeedbackResult,
    setConfirmCreateGuestDialog,
    setSettingCommunicationTool
} = actions;

export default reducer;