import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    gridParams: {
        isOstUser: true,
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    redirectActionParams: null
};

const messageNotificationCenterSlice = createSlice({
    name: 'messageNotificationCenter',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        }
    }
});

const { actions, reducer } = messageNotificationCenterSlice;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;