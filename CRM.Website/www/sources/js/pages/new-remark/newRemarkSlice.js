import { createSlice } from '@reduxjs/toolkit';

const newRemarkSlice = createSlice({
    name: 'newRemark',
    initialState: {
        remarkSetting: null,
        gridData: null
    },
    reducers: {
        setRemarkSetting: (state, action) => {
            state.remarkSetting = action.payload;
        },
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = newRemarkSlice;

export const {
    setRemarks,
    setRemarkSetting
} = actions;

export default reducer;