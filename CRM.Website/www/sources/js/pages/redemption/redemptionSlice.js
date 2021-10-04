import { createSlice } from '@reduxjs/toolkit';

const redemptionSlice = createSlice({
    name: 'redemption',
    initialState: {
        gridData: null,
        allStatus: null
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        },
        setAllStatus: (state, action) => {
            state.allStatus = action.payload;
        }
    }
});

const { actions, reducer } = redemptionSlice;

export const {
    setLogsByCustomerId,
    setAllStatus
} = actions;

export default reducer;