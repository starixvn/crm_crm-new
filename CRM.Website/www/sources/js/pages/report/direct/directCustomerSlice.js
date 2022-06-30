import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: {
        headline: null,
        username: null,
        excludeIgnoredAcc: true,
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null
};
const directReportSlice = createSlice({
    name: 'directReport',
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

const { actions, reducer } = directReportSlice;

export const {
    resetState,
    setGridParams,
    setGridData
} = actions;

export default reducer;
