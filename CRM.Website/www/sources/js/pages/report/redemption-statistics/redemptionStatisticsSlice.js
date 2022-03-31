import { createSlice } from '@reduxjs/toolkit';

const redemptionStatisticsSlice = createSlice({
    name: 'redemptionStatistics',
    initialState: {
        settings: null,
        gridParams: null,
        gridParamDetails: {
            pageIndex: 1,
            pageSize: 100
        },
        redemptionSummary: null,
        redemptionDetails: null,
        details: { show: false, title: ''}
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setRedemptionSummary: (state, action) => {
            state.redemptionSummary = action.payload;
        },
        setGridParamDetails: (state, action) => {
            state.gridParamDetails = action.payload;
        },
        setRedemptionDetails: (state, action) => {
            state.redemptionDetails = action.payload;
        },
        setDetailsDataGrid: (state, action) => {
            state.details = action.payload;
        }
    }
});

const { actions, reducer } = redemptionStatisticsSlice;

export const {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails
} = actions;

export default reducer;