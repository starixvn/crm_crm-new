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
        }
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

const { actions, reducer } = addGuessFeedbackSlice;

export const {
    setAllSettings
} = actions;

export default reducer;