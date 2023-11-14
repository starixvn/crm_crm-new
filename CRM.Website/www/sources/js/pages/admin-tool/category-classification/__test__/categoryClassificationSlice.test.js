import categoryClassification, {
    setGridParams,
    setGridData,
    setCategoryClassId,
    setEditCategoryClassResult,
    setEditCategoryClassPopup,
    setDeleteCategoryClassPopup
} from '../categoryClassificationSlice';

describe('categoryClassification reducer', () => {
    it('should handle initial state', () => {
        expect(categoryClassification(undefined, {})).toEqual({
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
        });
    });

    it('should handle setGridParams', () => {
        expect(
            categoryClassification({}, {
                type: setGridParams.type,
                payload: {
                    categoryIds: '1',
                    subCategoryIds: '1',
                    remark: '2',
                    inactiveSettings: false,
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParams: {
                categoryIds: '1',
                subCategoryIds: '1',
                remark: '2',
                inactiveSettings: false,
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            categoryClassification({}, {
                type: setGridData.type,
                payload: {
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            })
        ).toEqual({
            gridData: {
                mainCategories: { 'mainCategoryID': 1 },
                subCategories: { 'subCategoryId': 1 },
                communicationTools: { 'id': 1 }
            }
        });
    });

    it('should handle setCategoryClassId', () => {
        expect(
            categoryClassification({}, {
                type: setCategoryClassId.type,
                payload: {
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            })
        ).toEqual({
            selectCategoryClass: {
                mainCategories: { 'mainCategoryID': 1 },
                subCategories: { 'subCategoryId': 1 },
                communicationTools: { 'id': 1 }
            }
        });
    });

    it('should handle setEditCategoryClassResult', () => {
        expect(
            categoryClassification({}, {
                type: setEditCategoryClassResult.type,
                payload: {
                    isSuccessful: true,
                    message: ''
                }
            })
        ).toEqual({
            editCategoryClassResult: {
                isSuccessful: true,
                message: ''
            }
        });
    });

    it('should handle setEditCategoryClassPopup', () => {
        expect(
            categoryClassification({}, {
                type: setEditCategoryClassPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            editCategoryClassPopup: {
                show: true
            }
        });
    });

    it('should handle setDeleteCategoryClassPopup', () => {
        expect(
            categoryClassification({}, {
                type: setDeleteCategoryClassPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            deleteCategoryClassPopup: {
                show: true
            }
        });
    });
});