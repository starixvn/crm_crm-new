import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: {
        year: new Date().getFullYear()
    },
    gridData: null
};
const wagerReportSlice = createSlice({
    name: 'wagerReport',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
    setGridData,
    resetState
} = actions;

export default reducer;