import { createSlice } from '@reduxjs/toolkit';

const settingManagementSlice = createSlice({
    name: 'settingManagement',
    initialState: {
        mainSettings: null,
        settingType: null,
        gridParams: {
            settingName: ''
        },
        insertNewSettingPopup: {show: false},
        insertNewValuePopup: {show: false},
        licenseeMappingPopup: {show: false}
    },
    reducers: {
        setMainSettings: (state, action) => {
            state.mainSettings = action.payload;
        },
        setSettingTypes: (state, action) => {
            state.settingType = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setEditStatusPopup: (state, action) => {
            state.editStatusPopup = action.payload;
        },
        setOpenInsertNewSettingPopup: (state, action) => {
            state.insertNewSettingPopup = action.payload;
        },
        setOpenInsertNewValuePopup: (state, action) => {
            state.insertNewValuePopup = action.payload;
        },
        setOpenLicenseeMappingPopup: (state, action) => {
            state.licenseeMappingPopup = action.payload;
        }
    }
});

const { actions, reducer } = settingManagementSlice;

export const {
    setMainSettings,
    setSettingTypes,
    setGridParams,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenInsertNewValuePopup,
    setOpenLicenseeMappingPopup
    // setMainSettingRelation,
    // setUpdateResult,
    // setOpenUpdatePopup
} = actions;

export default reducer;