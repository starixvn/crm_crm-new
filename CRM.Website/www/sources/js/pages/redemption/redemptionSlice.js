import { createSlice } from '@reduxjs/toolkit';

const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: {
        gridData: null,
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = redemptionSlice;

export const {
    setLogsByCustomerId
} = actions;

export default reducer;