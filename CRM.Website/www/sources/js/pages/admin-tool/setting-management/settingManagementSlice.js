import { createSlice } from '@reduxjs/toolkit';

const settingManagementSlice = createSlice({
    name: 'settingManagement',
    initialState: {
        mainSettings: null,
        parents: null,
        settingType: null,
        licensees: null,
        licenseesMapping: null,
        gridParams: {
            settingName: ''
        },
        editStatusPopup: {show: false},
        insertNewSettingPopup: {show: false, settingName: ''},
        licenseeMappingPopup: {show: false},
        insertNewSettingResult: null,
        editPopup: {show: false, data: null},
        editNewSettingResult: null
    },
    reducers: {
        setMainSettings: (state, action) => {
            state.mainSettings = action.payload;
        },
        setParentSettings: (state, action) => {
            state.parents = action.payload;
        },
        setSettingTypes: (state, action) => {
            state.settingType = action.payload;
        },
        setLicensees: (state, action) => {
            state.licensees = action.payload;
        },
        setLicenseeMapping: (state, action) => {
            state.licenseesMapping = action.payload;
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
        setOpenLicenseeMappingPopup: (state, action) => {
            state.licenseeMappingPopup = action.payload;
        },
        setInsertNewSettingResult: (state, action) => {
            state.insertNewSettingResult = action.payload;
        },
        setOpenEdiPopup: (state, action) => {
            state.editPopup = action.payload;
        },
        setEditNewSettingResult: (state, action) => {
            state.editNewSettingResult = action.payload;
        }
    }
});

const { actions, reducer } = settingManagementSlice;

export const {
    setMainSettings,
    setParentSettings,
    setSettingTypes,
    setLicensees,
    setLicenseeMapping,
    setGridParams,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenLicenseeMappingPopup,
    setInsertNewSettingResult,
    setOpenEdiPopup,
    setEditNewSettingResult
} = actions;

export default reducer;