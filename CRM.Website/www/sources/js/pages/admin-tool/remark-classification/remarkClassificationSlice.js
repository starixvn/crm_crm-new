import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gridParams: {
        categoryIds: '',
        subCategoryIds: '',
        remark: '',
        inactiveSettings: false,
        pageIndex: 1,
        pageSize: 50
    },
    gridData: null
};

const remarkClassificationSlide = createSlice({
    name: 'remarkClassification',
    initialState: initialState,
    reducers: {
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
    }
});

const { actions, reducer } = remarkClassificationSlide;

export const {
    setGridParams,
    setGridData
} = actions;

export default reducer;