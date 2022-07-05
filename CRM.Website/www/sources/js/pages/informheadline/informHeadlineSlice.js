import { createSlice } from '@reduxjs/toolkit';

const informHeadlineSlice = createSlice({
    name: 'informHeadline',
    initialState: {
        informs: null,
        titleDetail: null,
        contactInforms: null,
        editContactInformDialog: {show: false},
        allSettings: null,
        dataEditInforms: null,
        editInformDialog: {show: false},
        resultEditContactInforms: null,
        resultEditInforms: null,
        removedAccountLogs: null,
        removedAccountLogDetails: null,
        removedLogDialog: {show: false},
        removedLogDetailDialog: {show: false},
        newInforms: null,
        newInformDialog: {show: false},
        resultInsertInforms: null,
        editedInforms: [],
        filterData: { values: {}, errors: {} },
        gridParams: { pageIndex: 1, pageSize: 100 },
        gridParamRemovedLogs: { pageIndex: 1, pageSize: 100 },
        gridRemovedLogDetails: { pageIndex: 1, pageSize: 100 }
    },
    reducers: {
        setInforms: (state, action) => {
            state.informs = action.payload;
        },
        setTitleDetail: (state, action) => {
            state.titleDetail = action.payload;
        },
        setContactInforms: (state, action) => {
            state.contactInforms = action.payload;
        },
        setEditContactInformDialog: (state, action) => {
            state.editContactInformDialog = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setEditInforms: (state, action) => {
            state.dataEditInforms = action.payload
        },
        setEditInformDialog: (state, action) => {
            state.editInformDialog = action.payload;
        },
        setResultEditContactInforms: (state, action) => {
            state.resultEditContactInforms = action.payload;
        },
        setResultEditInforms: (state, action) => {
            state.resultEditInforms = action.payload;
        },
        setRemovedAccountLogs: (state, action) => {
            state.removedAccountLogs = action.payload;
        },
        setRemovedAccountLogDetails: (state, action) => {
            state.removedAccountLogDetails = action.payload;
        },
        setRemovedLogDialog: (state, action) => {
            state.removedLogDialog = action.payload;
        },
        setRemovedLogDetailDialog: (state, action) => {
            state.removedLogDetailDialog = action.payload;
        },
        setGridParamRemovedLogs: (state, action) => {
            state.gridParamRemovedLogs = action.payload;
        },
        setGridParamRemovedLogDetails: (state, action) => {
            state.gridParamRemovedLogDetails = action.payload;
        },
        setNewInforms: (state, action) => {
            state.newInforms = action.payload
        },
        setNewInformDialog: (state, action) => {
            state.newInformDialog = action.payload;
        },
        setResultInsertInforms: (state, action) => {
            state.resultInsertInforms = action.payload;
        },
        setEditedInforms: (state, action) => {
            state.editedInforms = action.payload;
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        }
    }
});

const { actions, reducer } = informHeadlineSlice;

export const {
    setInforms,
    setTitleDetail,
    setContactInforms,
    setEditContactInformDialog,
    setGridParams,
    setAllSettings,
    setEditInforms,
    setEditInformDialog,
    setResultEditContactInforms,
    setResultEditInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setRemovedLogDialog,
    setRemovedLogDetailDialog,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    setNewInforms,
    setNewInformDialog,
    setResultInsertInforms,
    setEditedInforms,
    setFilterData
} = actions;

export default reducer;