import { createSlice } from '@reduxjs/toolkit';

const communicationLogSlice = createSlice({
    name: 'communicationLog',
    initialState: {
        gridData: null
    },
    reducers: {
        setLogsByCustomerId: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = communicationLogSlice;

export const {
    setLogsByCustomerId
} = actions;

export default reducer;
