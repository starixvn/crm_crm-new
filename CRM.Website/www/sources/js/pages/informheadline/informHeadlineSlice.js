import { createSlice } from '@reduxjs/toolkit';

const informHeadlineSlice = createSlice({
    name: 'informHeadline',
    initialState: {
        gridData: null,
        titleDetail: null,
        contactInformSettings: null,
        contactInforms: null,
        editContactInform: {show: false},
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        allSettings: null,
        searchInforms: null,
        editSearchInform: {show: false},
        resultUpdateContactInforms: null,
        resultUpdateSearchInforms: null
    },
    reducers: {
        setInforms: (state, action) => {
            state.gridData = action.payload;
        },
        setTitleDetail: (state, action) => {
            state.titleDetail = action.payload;
        },
        setContactInformSettings: (state, action) => {
            state.contactInformSettings = action.payload;
        },
        setContactInforms: (state, action) => {
            state.contactInforms = action.payload;
        },
        setEditContactInform: (state, action) => {
            state.editContactInform = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setSearchInforms: (state, action) => {
            state.searchInforms = action.payload
        },
        setEditSearchInform: (state, action) => {
            state.editSearchInform = action.payload;
        },
        setUpdateContactInforms: (state, action) => {
            state.resultUpdateContactInforms = action.payload;
        },
        setUpdateSearchInforms: (state, action) => {
            state.resultUpdateSearchInforms = action.payload;
        }
    }
});

const { actions, reducer } = informHeadlineSlice;

export const {
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setEditContactInform,
    setGridParams,
    setAllSettings,
    setSearchInforms,
    setEditSearchInform,
    setUpdateContactInforms,
    setUpdateSearchInforms
} = actions;

export default reducer;