import { createSlice } from '@reduxjs/toolkit';

const informHeadlineSlice = createSlice({
    name: 'informHeadline',
    initialState: {
        gridData: null
    },
    reducers: {
        setInformHeadline: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = informHeadlineSlice;

export const {
    setInformHeadline
} = actions;

export default reducer;