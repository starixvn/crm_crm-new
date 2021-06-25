import { createSlice } from '@reduxjs/toolkit';

const addGuessFeedbackSlice = createSlice({
    name: 'addGuessFeedback',
    initialState: {
        settings: {
           extensionList: [],
           countryList: [],
           provinceList: [],
           communicationToolList: [],
           languageList: [],
           mainCategoryList: [],
           subCategoryList: [],
           productList: [],
           subProductList: [],
           bettypeList: [],
           siteList: [],
           responseList: [],
           statusList: [],
           titleList: [],
           roleList: [],
           licenseeType: [],
           productNA: '',
           subProductNA: '',
           bettypeNA: '',
           extensionNA: ''
        },
        numberOfFeedbackSubjectTemplate: null,
        feedbackSubjectTemplateByPagingIndex: [],
        addFeedbackResult: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setNumberOfFeedbackSubjectTemplate: (state, action) => {
            state.numberOfFeedbackSubjectTemplate = action.payload;
        },
        setFeedbackSubjectTemplateByPagingIndex: (state, action) => {
            state = {...state.feedbackSubjectTemplateByPagingIndex,  ...action.payload};
        },
        setAddFeedback: (state, action) => {
            state.addFeedbackResult = action.payload;
        }
    }
});

const { actions, reducer } = addGuessFeedbackSlice;

export const {
    setAllSettings,
    setNumberOfFeedbackSubjectTemplate,
    setFeedbackSubjectTemplateByPagingIndex,
    setAddFeedback
} = actions;

export default reducer;