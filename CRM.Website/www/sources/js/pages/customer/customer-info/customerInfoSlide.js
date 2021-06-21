import { createSlice } from '@reduxjs/toolkit';

const customerInfoSlide = createSlice({
    name: 'customerInfo',
    initialState: {
        gridData: null,
        gridParam: {
            Username: null,
            IsGuest: false,
        }
    },
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setCustomerInfo: (state, action) => {
            state.gridData = action.payload;
        }
    }

});

const { actions, reducer } = customerInfoSlide;

export const {
    setGridParams,
    setCustomerInfo
} = actions;

export default reducer;