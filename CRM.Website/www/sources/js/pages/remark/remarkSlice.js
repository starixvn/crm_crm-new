import { createSlice } from '@reduxjs/toolkit';

const remarkSlice = createSlice({
    name: 'remark',
    initialState: {
        gridData: null
    },
    reducers: {
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = remarkSlice;

export const {
    setRemarks,
    setEditRemarks
} = actions;

export default reducer;