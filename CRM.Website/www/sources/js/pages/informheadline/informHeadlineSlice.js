import { createSlice } from '@reduxjs/toolkit';

const informHeadlineSlice = createSlice({
    name: 'informHeadline',
    initialState: {
        gridData: null,
        titleDetail: null,
        contactInformSettings: null,
        contactInforms: null,
        editInformHeadline: {show: false},
        updateContentInforms: null,
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
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
        setEditInformHeadline: (state, action) => {
            state.editInformHeadline = action.payload;
        },
        setUpdateContentInforms: (state, action) => {
            state.updateContentInforms = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
    }
});

const { actions, reducer } = informHeadlineSlice;

export const {
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setEditInformHeadline,
    setUpdateContentInforms,
    setGridParams
} = actions;

export default reducer;