import { createSlice } from '@reduxjs/toolkit';

const feedbackStatisticSlice = createSlice({
    name: 'logStatistics',
    initialState: {
        gridParams: null,
        gridParamDetails: {
            pageIndex: 1,
            pageSize: 100
        },
        gridData: null,
        details: { show: false, title: ''},
        detailPopup: { show: false, data: null}
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setGridParamDetails: (state, action) => {
            state.gridParamDetails = action.payload;
        },
        setDetailsDataGrid: (state, action) => {
            state.details = action.payload;
        },
        setOpenDetailPopup: (state, action) => {
            state.detailPopup = action.payload;
        }
    }
});

const { actions, reducer } = feedbackStatisticSlice;

export const {
    setGridParams,
    setGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup
} = actions;

export default reducer;