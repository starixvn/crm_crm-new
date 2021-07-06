import { createSlice } from '@reduxjs/toolkit';

const createMultipleLogSlice = createSlice({
    name: 'createMultipleLogs',
    initialState: {
        settings: {
            extensions: [],
            communicationTools: [],
            provinces: [],
            statuses: [],
            roles: [],
            responses: [],
            languages: [],
            countries: [],
            products: [],
            subProducts: [],
            bettypes: [],
            mainCategories: [],
            subCategories: [],
            productNA: null,
            subProductNA: null,
            bettypeNA: null,
            extensionNA: null
        }
    },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

const { actions, reducer } = createMultipleLogSlice;

export const {
    setSettings
} = actions;

export default reducer;