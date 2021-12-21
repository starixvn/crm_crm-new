import { createSlice } from '@reduxjs/toolkit';

const settingLogSlice = createSlice({
    name: 'settingLog',
    initialState: {
        settings: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

const { actions, reducer } = settingLogSlice;

export const {
    setAllSettings
} = actions;

export default reducer;