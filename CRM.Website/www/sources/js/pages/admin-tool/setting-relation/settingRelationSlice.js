import { createSlice } from '@reduxjs/toolkit';

const settingRelationSlice = createSlice({
    name: 'settingRelation',
    initialState: {
        mainSettings: null,
        settingType: null,
        gridParams: {
            settingName: ''
        },
        gridDataSettingLogs: null,
        mainSettingRelation: [],
        updateResult: null,
        updatePopup: { show: false, title: '', parentId: null, parentName: '' }
    },
    reducers: {
        setMainSettings: (state, action) => {
            state.mainSettings = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setSettingTypes: (state, action) => {
            state.settingType = action.payload;
        },
        setMainSettingRelation: (state, action) => {
            state.mainSettingRelation = action.payload;
        },
        setUpdateResult: (state, action) => {
            state.updateResult = action.payload;
        },
        setOpenUpdatePopup: (state, action) => {
            state.updatePopup = action.payload;
        }
    }
});

const { actions, reducer } = settingRelationSlice;

export const {
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setMainSettingRelation,
    setUpdateResult,
    setOpenUpdatePopup
} = actions;

export default reducer;