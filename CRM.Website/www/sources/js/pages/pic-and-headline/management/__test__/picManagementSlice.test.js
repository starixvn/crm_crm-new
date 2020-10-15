import picManagement, {
    setSetting,
    setGridParams,
    setGridData,
    setSelectedPic,
    setCreatePicPopup,
    setCreatePicResult,
    setEditPicPopup,
    setEditPicResult,
    setActiveResult,
    setConfirmPopup
} from '../picManagementSlice';

describe('picManagement reducer', () => {
    it('should handle initial state', () => {
        expect(picManagement(undefined, {})).toEqual({
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
            }
        });
    });

    it('should handle setSetting', () => {
        expect(
            picManagement({}, {
                type: setSetting.type,
                payload: {
                    roleListWithInActive: [{ settingId: 1, settingValue: 'PIC' }],
                    roleList: [{ settingId: 1, settingValue: 'PIC' }],
                    communicationTools: [{ settingId: 1, settingValue: 'Phone' }],
                    languages: [{ settingId: 1, settingValue: 'Vietnamese' }],
                    countries: [{ id: 1, name: 'Vietnam' }]
                }
            })
        ).toEqual({
            setting: {
                roleListWithInActive: [{ settingId: 1, settingValue: 'PIC' }],
                roleList: [{ settingId: 1, settingValue: 'PIC' }],
                communicationTools: [{ settingId: 1, settingValue: 'Phone' }],
                languages: [{ settingId: 1, settingValue: 'Vietnamese' }],
                countries: [{ id: 1, name: 'Vietnam' }]
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            picManagement({}, {
                type: setGridParams.type,
                payload: {
                    username: 'a',
                    headlineName: '',
                    role: 1,
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParams: {
                username: 'a',
                headlineName: '',
                role: 1,
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            picManagement({}, {
                type: setGridData.type,
                payload: { total: 0, dataList: [] }
            })
        ).toEqual({
            gridData: { total: 0, dataList: [] }
        });
    });

    it('should handle setSelectedPic', () => {
        expect(
            picManagement({}, {
                type: setSelectedPic.type,
                payload: { picId: 0, picName: '' }
            })
        ).toEqual({
            selectedPic: { picId: 0, picName: '' }
        });
    });

    it('should handle setCreatePicPopup', () => {
        expect(
            picManagement({}, {
                type: setCreatePicPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            createPicPopup: { show: false }
        });
    });

    it('should handle setCreatePicResult', () => {
        expect(
            picManagement({}, {
                type: setCreatePicResult.type,
                payload: { isSuccessful: true, message: '' }
            })
        ).toEqual({
            createPicResult: { isSuccessful: true, message: '' }
        });
    });

    it('should handle setEditPicPopup', () => {
        expect(
            picManagement({}, {
                type: setEditPicPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            editPicPopup: { show: false }
        });
    });

    it('should handle setEditPicResult', () => {
        expect(
            picManagement({}, {
                type: setEditPicResult.type,
                payload: { isSuccessful: true, message: '' }
            })
        ).toEqual({
            editPicResult: { isSuccessful: true, message: '' }
        });
    });

    it('should handle setActiveResult', () => {
        expect(
            picManagement({}, {
                type: setActiveResult.type,
                payload: { isSuccessful: true, message: '' }
            })
        ).toEqual({
            activeResult: { isSuccessful: true, message: '' }
        });
    });

    it('should handle setConfirmPopup', () => {
        expect(
            picManagement({}, {
                type: setConfirmPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            confirmPopup: { show: false }
        });
    });
});
