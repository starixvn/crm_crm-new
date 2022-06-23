import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        userName: null,
        editBy: null,
        actionTypeIds: '',
        fromDate: null,
        toDate: null,
        pageIndex: 1,
        pageSize: 100
    },
    gridParamsPic: {
        picName: null,
        editBy: null,
        fromDate: null,
        toDate: null,
        pageIndex: 1,
        pageSize: 100
    },
    headlineDA: null,
    picReport: null,
    actionType: null
};

const picManagementSlice = createSlice({
    name: 'ChangesLog',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridParamsPic: (state, action) => {
            state.gridParamsPic = action.payload;
        },
        setHeadlineDA: (state, action) => {
            state.headlineDA = action.payload;
        },
        setPicReport: (state, action) => {
            state.picReport = action.payload;
        },
        setActionType: (state, action) => {
            state.actionType = action.payload;
        }
    }
});

const { actions, reducer } = picManagementSlice;

export const {
    resetState,
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType
} = actions;

export default reducer;