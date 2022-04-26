import { createSlice } from '@reduxjs/toolkit';

const newRemarkSlice = createSlice({
    name: 'newRemark',
    initialState: {
        remarkTitles: null,
        allSettings: null,
        gridParams: { pageIndex: 1, pageSize: 100, username: '', isGuest: false},
        gridData: null,
        popupAdd: { show: false },
        editResult: null,
        popupEdit: { show: false, data: null, isViewHistory: false },
        popupDeleteConfirm: { show: false, id: null },
        deleteResult: null,
        createResult: null,
        validateResult: null,
        remarksHistory: null,
        showHistory: {show: false},
        historyGridParams: { pageIndex: 1, pageSize: 100, custId: '', remarkID: ''}
    },
    reducers: {
        setRemarkTitle: (state, action) => {
            state.remarkTitles = action.payload;
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        },
        setOpenCreatePopup: (state, action) => {
            state.popupAdd = action.payload;
        },
        setOpenEditPopup: (state, action) => {
            state.popupEdit = action.payload;
        },
        setOpenConfirmDelete: (state, action) => {
            state.popupDeleteConfirm = action.payload;
        },
        setEditResult: (state, action) => {
            state.editResult = action.payload;
        },
        setCreateResult: (state, action) => {
            state.createResult = action.payload;
        },
        setValidateResult: (state, action) => {
            state.validateResult = action.payload;
        },
        setRemarksHistory: (state, action) => {
            state.remarksHistory = action.payload;
        },
        setShowHistory: (state, action) => {
            state.showHistory = action.payload;
        },
        setHistoryGridParams: (state, action) => {
            state.historyGridParams = action.payload;
        }
    }
});

const { actions, reducer } = newRemarkSlice;

export const {
    setRemarkTitle,
    setAllSettings,
    setGridParams,
    setRemarks,
    setOpenCreatePopup,
    setOpenEditPopup,
    setEditResult,
    setOpenConfirmDelete,
    setCreateResult,
    setValidateResult,
    setRemarksHistory,
    setShowHistory,
    setHistoryGridParams
} = actions;

export default reducer;