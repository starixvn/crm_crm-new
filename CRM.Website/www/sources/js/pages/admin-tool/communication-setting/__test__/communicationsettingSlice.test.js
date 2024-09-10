import communicationSetting, {
    resetState,
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
} from '../communicationsettingSlice.js';

describe('communicationSetting reducer', () => {
    it('should handle initial state', () => {
        expect(communicationSetting(undefined, {})).toEqual({
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
        });
    });

    it('should handle reset state', () => {
        expect(
            communicationSetting({}, {
                type: resetState.type
            })
        ).toEqual({
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
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            communicationSetting({}, {
                type: setAllSettings.type,
                payload: {
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            })
        ).toEqual({
            settings: {
                mainCategories: { 'mainCategoryID': 1 },
                subCategories: { 'subCategoryId': 1 },
                communicationTools: { 'id': 1 }
            }
        });
    });

    it('should handle setGridParamsCommunication', () => {
        expect(
            communicationSetting({}, {
                type: setGridParamsCommunication.type,
                payload: [{
                    username: 'asd',
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    isDisableCategorySubCategory: false,
                    pageIndex: 1,
                    pageSize: 100
                }]
            })
        ).toEqual({
            gridParamsCommunication: [{
                username: 'asd',
                mainCategories: { 'mainCategoryID': 1 },
                subCategories: { 'subCategoryId': 1 },
                isDisableCategorySubCategory: false,
                pageIndex: 1,
                pageSize: 100
            }]
        });
    });

    it('should handle setGridCommunicationSetting', () => {
        expect(
            communicationSetting({}, {
                type: setGridCommunicationSetting.type,
                payload: {
                    totalItems: 0, data: []
                }
            })
        ).toEqual({
            gridDataCommunication: { totalItems: 0, data: [] }
        });
    });

    it('should handle setSelectCommunicationId', () => {
        expect(
            communicationSetting({}, {
                type: setSelectCommunicationId.type,
                payload: {
                    username: 'asd',
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            })
        ).toEqual({
            selectCommunication: {
                username: 'asd',
                mainCategories: { 'mainCategoryID': 1 },
                subCategories: { 'subCategoryId': 1 },
                communicationTools: { 'id': 1 }
            }
        });
    });

    it('should handle setCreateCommunicationPopup', () => {
        expect(
            communicationSetting({}, {
                type: setCreateCommunicationPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            createCommunicationPopup: { show: false }
        });
    });

    it('should handle setCreateCommunicationResult', () => {
        expect(
            communicationSetting({}, {
                type: setCreateCommunicationResult.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            createCommunicationResult: { isSuccessful: false, message: '' }
        });
    });

    it('should handle setEditCommunicationPopup', () => {
        expect(
            communicationSetting({}, {
                type: setEditCommunicationPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            editCommunicationPopup: { show: false }
        });
    });

    it('should handle setEditCommunicationResult', () => {
        expect(
            communicationSetting({}, {
                type: setEditCommunicationResult.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            editCommunicationResult: { isSuccessful: false, message: '' }
        });
    });

    it('should handle setDeleteCommunicationPopup', () => {
        expect(
            communicationSetting({}, {
                type: setDeleteCommunicationPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            deleteCommunicationPopup: { show: false }
        });
    });

    it('should handle setDeleteCommunicationResult', () => {
        expect(
            communicationSetting({}, {
                type: setDeleteCommunicationResult.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            deleteCommunicationResult: { isSuccessful: false, message: '' }
        });
    });
});