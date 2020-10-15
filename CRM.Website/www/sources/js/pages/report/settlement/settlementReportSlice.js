import { createSlice } from '@reduxjs/toolkit';

const settlementReportSlice = createSlice({
    name: 'settlementReport',
    initialState: {
        gridParams: {
            year: new Date().getFullYear(),
            pageIndex: 1,
            pageSize: 12
        },
        gridData: null,
        contentChartPopup: { show: false }
    },
    reducers: {
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
    setGridParams,
    setGridData,
    setChartPopup
} = actions;

export default reducer;