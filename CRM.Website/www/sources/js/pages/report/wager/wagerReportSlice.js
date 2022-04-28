import { createSlice } from '@reduxjs/toolkit';

const wagerReportSlice = createSlice({
    name: 'wagerReport',
    initialState: {
        gridParams: {
            year: new Date().getFullYear()
        },
        gridData: null
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = wagerReportSlice;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;