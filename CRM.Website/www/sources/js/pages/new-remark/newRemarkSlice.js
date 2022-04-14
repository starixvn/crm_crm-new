import { createSlice } from '@reduxjs/toolkit';

const newRemarkSlice = createSlice({
    name: 'newRemark',
    initialState: {
        remarkTitle: null,
        gridParams: { pageIndex: 1, pageSize: 100 },
        gridData: null,
        deleteResult: null,
        popupDeleteConfirm: { show: false, id: null }
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
        handleOpenConfirmDelete: (state, action) => {
            state.popupDeleteConfirm = action.payload;
        },
        setDelete: (state, action) => {
            state.deleteResult = action.payload;
        }
    }
});

const { actions, reducer } = newRemarkSlice;

export const {
    setRemarkTitle,
    setGridParams,
    setRemarks,
    handleOpenConfirmDelete,
    setDelete
} = actions;

export default reducer;