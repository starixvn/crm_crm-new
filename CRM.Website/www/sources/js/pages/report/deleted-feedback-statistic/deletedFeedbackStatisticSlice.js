import { createSlice } from '@reduxjs/toolkit';

const deletedFeedbackStatisticSlice = createSlice({
    name: 'deletedFeedbackStatistic',
    initialState: {
        gridParams: null,
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

const { actions, reducer } = deletedFeedbackStatisticSlice;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;