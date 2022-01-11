import { createSlice } from '@reduxjs/toolkit';

const communicationSettingSlice = createSlice({
    name: 'communicationsetting',
    initialState: {
        settings: {
            communicationTools: [],
            mainCategories: [],
            subCategories: []
        },
        gridParamsCommunication: {
            username: '',
            categoryIds: '',
            subCategoryIds: '',
            isDisableCategorySubCategory: '',
            pageIndex: 1,
            pageSize: 50
        },
        gridDataCommunication: null,
        selectCommunication: null,
        createCommunicationPopup: { show: false },
        createCommunicationResult: null,
        editCommunicationPopup: { show: false },
        editCommunicationResult: null,
        deleteCommunicationPopup: { show: false },
        deleteCommunicationResult: null
    },
    reducers: {
        setAllSettings: (state, action) => {
            state.settings = action.payload;
        },
        setGridParamsCommunication: (state, action) => {
            state.gridParamsCommunication = action.payload;
        },
        setGridCommunicationSetting: (state, action) => {
            state.gridDataCommunication = action.payload;
        },
        setSelectCommunicationId: (state, action) => {
            state.selectCommunication = action.payload;
        },
        setCreateCommunicationPopup: (state, action) => {
            state.createCommunicationPopup = action.payload;
        },
        setCreateCommunicationResult: (state, action) => {
            state.createCommunicationResult = action.payload;
        },
        setEditCommunicationPopup: (state, action) => {
            state.editCommunicationPopup = action.payload;
        },
        setEditCommunicationResult: (state, action) => {
            state.editCommunicationResult = action.payload;
        },
        setDeleteCommunicationPopup: (state, action) => {
            state.deleteCommunicationPopup = action.payload;
        },
        setDeleteCommunicationResult: (state, action) => {
            state.deleteCommunicationResult = action.payload;
        }
    }
});

const { actions, reducer } = communicationSettingSlice;

export const {
    setAllSettings,
    setGridParamsCommunication,
    setGridCommunicationSetting,
    setSelectCommunicationId,
    setCreateCommunicationPopup,
    setCreateCommunicationResult,
    setEditCommunicationPopup,
    setEditCommunicationResult,
    setDeleteCommunicationPopup,
    setDeleteCommunicationResult
} = actions;

export default reducer;