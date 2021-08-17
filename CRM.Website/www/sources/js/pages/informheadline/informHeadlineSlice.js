import { createSlice } from '@reduxjs/toolkit';

const informHeadlineSlice = createSlice({
    name: 'informHeadline',
    initialState: {
        gridData: null,
        titleDetail: null,
        contactInformSettings: null,
        contactInforms: null,
        showEditContactInform: {show: false},
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        allSettings: null,
        searchInforms: null,
        showEditSearchInform: {show: false},
        resultUpdateContactInforms: null,
        resultUpdateSearchInforms: null,
        removedAccountLogs: null,
        removedAccountLogDetails: null,
        showRemovedLogs: {show: false},
        showRemovedLogDetails: {show: false},
        gridParamRemovedLogs: {
            pageIndex: 1,
            pageSize: 100
        },
        gridRemovedLogDetails: {
            pageIndex: 1,
            pageSize: 100
        }
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
        setShowEditContactInform: (state, action) => {
            state.showEditContactInform = action.payload;
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
        setShowEditSearchInform: (state, action) => {
            state.showEditSearchInform = action.payload;
        },
        setUpdateContactInforms: (state, action) => {
            state.resultUpdateContactInforms = action.payload;
        },
        setUpdateSearchInforms: (state, action) => {
            state.resultUpdateSearchInforms = action.payload;
        },
        setRemovedAccountLogs: (state, action) => {
            state.removedAccountLogs = action.payload;
        },
        setRemovedAccountLogDetails: (state, action) => {
            state.removedAccountLogDetails = action.payload;
        },
        setShowRemovedLogs: (state, action) => {
            state.showRemovedLogs = action.payload;
        },
        setShowRemovedLogDetails: (state, action) => {
            state.showRemovedLogDetails = action.payload;
        },
        setGridParamRemovedLogs: (state, action) => {
            state.gridParamRemovedLogs = action.payload;
        },
        setGridParamRemovedLogDetails: (state, action) => {
            state.gridParamRemovedLogDetails = action.payload;
        }
    }
});

const { actions, reducer } = informHeadlineSlice;

export const {
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setShowEditContactInform,
    setGridParams,
    setAllSettings,
    setSearchInforms,
    setShowEditSearchInform,
    setUpdateContactInforms,
    setUpdateSearchInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setShowRemovedLogs,
    setShowRemovedLogDetails,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails
} = actions;

export default reducer;