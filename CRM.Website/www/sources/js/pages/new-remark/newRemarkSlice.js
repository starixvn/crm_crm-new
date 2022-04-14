import { createSlice } from '@reduxjs/toolkit';

const newRemarkSlice = createSlice({
    name: 'newRemark',
    initialState: {
        remarkTitle: null,
        gridParams: { pageIndex: 1, pageSize: 100, username: '', isGuest: false},
        gridData: null,
        addResult: null,
        popupAdd: { show: false },
        editResult: null,
        popupEdit: { show: false },
        deleteResult: null,
        popupDeleteConfirm: { show: false, id: null },
        validateResult: {
            isSuccessful: false
        },
        inputAddUsername: ''
    },
    reducers: {
        setRemarkTitle: (state, action) => {
            state.remarkTitle = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        },
        setOpenAddPopup: (state, action) => {
            state.popupAdd = action.payload;
        },
        setAddResult: (state, action) => {
            state.addResult = action.payload;
        },
        setOpenEditPopup: (state, action) => {
            state.popupEdit = action.payload;
        },
        setEditResult: (state, action) => {
            state.editResult = action.payload;
        },
        setOpenConfirmDelete: (state, action) => {
            state.popupDeleteConfirm = action.payload;
        },
        setDelete: (state, action) => {
            state.deleteResult = action.payload;
        },
        setValidateResult: (state, action) => {
            state.validateResult = action.payload;
        },
        setInputAddUsername: (state, action) => {
            state.inputAddUsername = action.payload;
        }
    }
});

const { actions, reducer } = newRemarkSlice;

export const {
    setRemarkTitle,
    setGridParams,
    setRemarks,
    setOpenAddPopup,
    setAddResult,
    setOpenEditPopup,
    setEditResult,
    setOpenConfirmDelete,
    setDelete,
    setValidateResult,
    setInputAddUsername
} = actions;

export default reducer;