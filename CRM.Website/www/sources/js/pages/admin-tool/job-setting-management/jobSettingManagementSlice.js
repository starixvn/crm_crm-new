import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    serviceNames: null,
    settingNames: null,
    configSettings: null,
    gridParams: {
        envr: 'UAT'
    },
    editPopup: {
        show: false,
        data: null,
        isEditMultiple: false
    },
    editJobSettingResult: null
};
const jobSettingManagementSlice = createSlice({
    name: 'jobSettingManagement',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setServiceNameSetting: (state, action) => {
            state.serviceNames = action.payload;
        },
        setSettingNames: (state, action) => {
            state.settingNames = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setConfigSettings: (state, action) => {
            state.configSettings = action.payload;
        },
        setEditPopup: (state, action) => {
            state.editPopup = action.payload;
        },
        setEditJobSetting: (state, action) => {
            state.editJobSettingResult = action.payload;
        }
    }
});

const { actions, reducer } = jobSettingManagementSlice;

export const {
    setServiceNameSetting,
    setSettingNames,
    setGridParams,
    setConfigSettings,
    setEditPopup,
    setEditJobSetting,
    resetState
} = actions;

export default reducer;