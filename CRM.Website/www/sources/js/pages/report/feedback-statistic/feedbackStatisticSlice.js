import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: {
        pageIndex: 1,
        pageSize: 100
    },
    gridParamDetails: {
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    ratingGridData: null,
    details: null,
    detailPopup: { show: false},
    chart: { show: false, chartInfo: null},
    viewRelatedCustomerDialog: { show: false }
};
const feedbackStatisticSlice = createSlice({
    name: 'logStatistics',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setRatingGridData: (state, action) => {
            state.ratingGridData = action.payload;
        },
        setGridParamDetails: (state, action) => {
            state.gridParamDetails = action.payload;
        },
        setDetailsDataGrid: (state, action) => {
            state.details = action.payload;
        },
        setOpenDetailPopup: (state, action) => {
            state.detailPopup = action.payload;
        },
        setOpenChartPopup: (state, action) => {
            state.chart = action.payload;
        },
        setViewRelatedCustomerDialog: (state, action) => {
            state.viewRelatedCustomerDialog = action.payload;
        }
    }
});

const { actions, reducer } = feedbackStatisticSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setRatingGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog
} = actions;

export default reducer;