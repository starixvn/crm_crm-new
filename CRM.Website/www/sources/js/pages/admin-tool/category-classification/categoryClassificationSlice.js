import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        categoryIds: '',
        subCategoryIds: '',
        remark: '',
        inactiveSettings: false,
        pageIndex: 1,
        pageSize: 100
    },
    gridData: null,
    selectCategoryClass: null,
    editCategoryClassResult: null,
    editCategoryClassPopup: { show: false },
    deleteCategoryClassPopup: { show: false },
};

const categoryClassificationSlide = createSlice({
    name: 'categoryClassification',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setCategoryClassId: (state, action) => {
            state.selectCategoryClass = action.payload;
        },
        setEditCategoryClassResult: (state, action) => {
            state.editCategoryClassResult = action.payload;
        },
        setEditCategoryClassPopup: (state, action) => {
            state.editCategoryClassPopup = action.payload;
        },
        setDeleteCategoryClassPopup: (state, action) => {
            state.deleteCategoryClassPopup = action.payload;
        }
    }
});

const { actions, reducer } = categoryClassificationSlide;

export const {
    setGridParams,
    setGridData,
    setCategoryClassId,
    setEditCategoryClassResult,
    setEditCategoryClassPopup,
    setDeleteCategoryClassPopup
} = actions;

export default reducer;