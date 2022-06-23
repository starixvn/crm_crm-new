import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mainSettings: null,
    parents: null,
    settingType: null,
    licensees: null,
    licenseesMapping: null,
    licenseesManager: [],
    gridParams: {
        settingName: ''
    },
    editStatusPopup: {show: false},
    insertNewSettingPopup: {show: false, settingName: ''},
    licenseeMappingPopup: {show: false},
    insertNewSettingResult: null,
    editPopup: {show: false, data: null},
    editNewSettingResult: null,
    confirmCancelPopup: {show: false, setting: '', settingId: 0}
};

const settingManagementSlice = createSlice({
    name: 'settingManagement',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
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
        setLicenseeManager: (state, action) => {
            state.licenseesManager = action.payload;
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
        },
        setConfirmCancelPopup: (state, action) => {
            state.confirmCancelPopup = action.payload;
        }
    }
});

const { actions, reducer } = settingManagementSlice;

export const {
    resetState,
    setMainSettings,
    setParentSettings,
    setSettingTypes,
    setLicensees,
    setLicenseeMapping,
    setLicenseeManager,
    setGridParams,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenLicenseeMappingPopup,
    setInsertNewSettingResult,
    setOpenEdiPopup,
    setEditNewSettingResult,
    setConfirmCancelPopup
} = actions;

export default reducer;