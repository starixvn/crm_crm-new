import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridData: null
};
const remarkSlice = createSlice({
    name: 'remark',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = remarkSlice;

export const {
    setRemarks,
    resetState
} = actions;

export default reducer;