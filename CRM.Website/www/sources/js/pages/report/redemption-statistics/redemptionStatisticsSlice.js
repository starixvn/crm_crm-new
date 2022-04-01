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
        gridData: null,
        gridDataDetails: null,
        detailPopup: { show: false }
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setRedemptionSummary: (state, action) => {
            state.gridData = action.payload;
        },
        setGridParamDetails: (state, action) => {
            state.gridParamDetails = action.payload;
        },
        setRedemptionDetails: (state, action) => {
            state.gridDataDetails = action.payload;
        },
        setOpenDetails: (state, action) => {
            state.detailPopup = action.payload;
        }
    }
});

const { actions, reducer } = redemptionStatisticsSlice;

export const {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails,
    setOpenDetails
} = actions;

export default reducer;