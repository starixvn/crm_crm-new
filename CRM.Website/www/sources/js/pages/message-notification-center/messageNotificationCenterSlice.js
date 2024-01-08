import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: { pageIndex: 1, pageSize: 100 },
};

const messageNotificationCenterSlice = createSlice({
    name: 'messageNotificationCenter',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        }
    }
});

const { actions, reducer } = messageNotificationCenterSlice;

export const {
    setGridParams
} = actions;

export default reducer;