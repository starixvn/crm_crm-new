import { createSlice } from '@reduxjs/toolkit';

const newRemarkSlice = createSlice({
    name: 'newRemark',
    initialState: {
        remarkTitle: null,
        gridParams: { pageIndex: 1, pageSize: 100 },
        gridData: null
    },
    reducers: {
        setRemarkTitle: (state, action) => {
            state.remarkTitle = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setRemarks: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = newRemarkSlice;

export const {
    setRemarkTitle,
    setGridParams,
    setRemarks
} = actions;

export default reducer;