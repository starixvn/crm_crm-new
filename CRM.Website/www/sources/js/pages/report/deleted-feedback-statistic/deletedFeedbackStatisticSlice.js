import { createSlice } from '@reduxjs/toolkit';

const deletedFeedbackStatisticSlice = createSlice({
    name: 'deletedFeedbackStatistic',
    initialState: {
        gridData: null
    },
    reducers: {
        setGridData: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = deletedFeedbackStatisticSlice;

export const {
    setGridData
} = actions;

export default reducer;