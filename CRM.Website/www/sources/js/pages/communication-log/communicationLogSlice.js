import { createSlice } from '@reduxjs/toolkit';

const communicationLogSlice = createSlice({
    name: 'communicationLog',
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

const { actions, reducer } = communicationLogSlice;

export const {
    setLogsByCustomerId,
    setAllStatus
} = actions;

export default reducer;
