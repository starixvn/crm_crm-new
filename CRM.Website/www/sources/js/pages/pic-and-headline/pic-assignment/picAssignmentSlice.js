import { createSlice } from '@reduxjs/toolkit';
import { DefaultPageSize } from '@jsroot/common/constants';

const initialState = {
    gridParams: {
        pageIndex: 1,
        pageSize: DefaultPageSize
    },
    picAssignmentGridData: {},
    setting: {},
    removeOptions: {
        isCheckedAll: false,
        isDisabledRemove: true,
        isHadAll: false,
        shouldResetScrollPosition: true,
        dataList: []
    },
    removePicAssignmentPopup: {
        show: false
    },
    assignPicPopup: {
        show:false
    },
    assignPicResult: {
        show: false
    },
    assignPicFilter: {
        headline: null,
        pics: [],
        directAccount: [],
        isSelectedAll: false
    },
    validateAssignPicResult: {},
    confirmAssignedDirectAccountPopup: {
        show: false
    },
    defaultPicPopup: {
        show: false
    }
};
const picAssignmentSlice = createSlice({
    name: 'picAssignment',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.picAssignmentGridData = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setRemoveOptions: (state, action) => {
            state.removeOptions = action.payload;
        },
        setRemovePicAssignmentPopup: (state, action) => {
            state.removePicAssignmentPopup = action.payload;
        },
        setAssignPicPopup: (state, action) => {
            state.assignPicPopup = action.payload;
        },
        setAssignPicResult: (state, action) => {
            state.assignPicResult = action.payload;
        },
        setAssignPicFilter: (state, action) => {
            state.assignPicFilter = action.payload;
        },
        setValidateAssignPicResult: (state, action) => {
            state.validateAssignPicResult = action.payload;
        },
        setConfirmAssignedDirectAccountPopup: (state, action) => {
            state.confirmAssignedDirectAccountPopup = action.payload;
        },
        setDefaultPicPopup: (state, action) => {
            state.defaultPicPopup = action.payload;
        }
    }
});

const { actions, reducer } = picAssignmentSlice;

export const {
    resetState,
    setGridParams,
    setGridData,
    setSettings,
    setRemoveOptions,
    setRemovePicAssignmentPopup,
    setAssignPicPopup,
    setAssignPicResult,
    setAssignPicFilter,
    setValidateAssignPicResult,
    setConfirmAssignedDirectAccountPopup,
    setDefaultPicPopup
} = actions;

export default reducer;