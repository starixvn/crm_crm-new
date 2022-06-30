import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: {
        year: new Date().getFullYear(),
        pageIndex: 1,
        pageSize: 12
    },
    gridData: null,
    contentChartPopup: { show: false }
};
const settlementReportSlice = createSlice({
    name: 'settlementReport',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setChartPopup: (state, action) => {
            state.contentChartPopup = action.payload;
        }
    }
});

const { actions, reducer } = settlementReportSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setChartPopup
} = actions;

export default reducer;