import { createSlice } from '@reduxjs/toolkit';

const picManagementSlice = createSlice({
    name: 'ChangesLog',
    initialState: {
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
        actionType: null,
        logActions: null
    },
    reducers: {
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
        },
        setLogAction: (state, action) => {
            state.logActions = action.payload;
        }
    }
});

const { actions, reducer } = picManagementSlice;

export const {
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType,
    setLogAction
} = actions;

export default reducer;