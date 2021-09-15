import { createSlice } from '@reduxjs/toolkit';

const communicationLogSlice = createSlice({
    name: 'communicationLog',
    initialState: {
        gridData: null,
        allStatus: null,
        gridParams: { pageIndex: 1, pageSize: 100 },
        editNoOfInquiryDialog: { show: false }
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        },
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setEditNoOfInquiryDialog: (state, action) => {
            state.editNoOfInquiryDialog = action.payload;
        }
    }
});

const { actions, reducer } = communicationLogSlice;

export const {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams,
    setEditNoOfInquiryDialog
} = actions;

export default reducer;
