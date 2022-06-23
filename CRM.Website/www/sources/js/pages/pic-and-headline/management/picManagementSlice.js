import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    setting: {
        roleListWithInActive: [],
        roleList: [],
        communicationTools: [],
        languages: [],
        countries: []
    },
    gridParams: {
        username: '',
        headlineName: '',
        role: '',
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    selectedPic: null,
    createPicPopup: { show: false },
    createPicResult: null,
    editPicPopup: { show: false },
    editPicResult: null,
    activeResult: null,
    confirmPopup: {
        show: false,
        username: '',
        picId: null,
        checked: false
    },
    validateEditPicResult: ''
};

const picManagementSlice = createSlice({
    name: 'PICManagement',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setSetting: (state, action) => {
            state.setting = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setSelectedPic: (state, action) => {
            state.selectedPic = action.payload;
        },
        setCreatePicPopup: (state, action) => {
            state.createPicPopup = action.payload;
        },
        setCreatePicResult: (state, action) => {
            state.createPicResult = action.payload;
        },
        setEditPicPopup: (state, action) => {
            state.editPicPopup = action.payload;
        },
        setEditPicResult: (state, action) => {
            state.editPicResult = action.payload;
        },
        setActiveResult: (state, action) => {
            state.activeResult = action.payload;
        },
        setConfirmPopup: (state, action) => {
            state.confirmPopup = action.payload;
        },
        setValidateEditPicResult: (state, action) => {
            state.validateEditPicResult = action.payload;
        }
    }
});

const { actions, reducer } = picManagementSlice;

export const {
    resetState,
    setSetting,
    setGridParams,
    setGridData,
    setSelectedPic,
    setCreatePicPopup,
    setCreatePicResult,
    setEditPicPopup,
    setEditPicResult,
    setActiveResult,
    setConfirmPopup,
    setValidateEditPicResult
} = actions;

export default reducer;