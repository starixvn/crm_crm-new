import settingManagement, {
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
} from '../settingManagementSlice';

describe('settingManagementSlice reducer', () => {
    it('should handle initial state', () => {
        expect(settingManagement(undefined, {})).toEqual({
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
        });
    });

    it('should handle setMainSettings', () => {
        expect(
            settingManagement({}, {
                type: setMainSettings.type,
                payload: [{
                    childSettings: [{id: 0, name: null, settingId: 68005, settingName: "111111111", settingValue: "TestRuby1"}],
                    displayOrder: 0,
                    id: 0,
                    isActive: false,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 0,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: null,
                    subCategoryId: 0
                }]
            })
        ).toEqual({
            mainSettings: [{
                childSettings: [{id: 0, name: null, settingId: 68005, settingName: "111111111", settingValue: "TestRuby1"}],
                    displayOrder: 0,
                    id: 0,
                    isActive: false,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 0,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: null,
                    subCategoryId: 0
            }]
        });
    });

    it('should handle setParentSettings', () => {
        expect(
            settingManagement({}, {
                type: setParentSettings.type,
                payload: [{
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 68005,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "TestRuby1",
                    subCategoryId: 0
                }]
            })
        ).toEqual({
            parents: [{
                childSettings: [],
                displayOrder: 0,
                id: 0,
                isActive: true,
                isChild: false,
                mainCategoryID: 0,
                name: null,
                parentID: 0,
                settingId: 68005,
                settingName: "111111111",
                settingSource: null,
                settingValue: "TestRuby1",
                subCategoryId: 0
            }]
        });
    });

    it('should handle setSettingTypes', () => {
        expect(
            settingManagement({}, {
                type: setSettingTypes.type,
                payload: [{
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 68005,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "TestRuby1",
                    subCategoryId: 0
                }]
            })
        ).toEqual({
            settingType: [{ 
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 68005,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "TestRuby1",
                    subCategoryId: 0
            }]
        });
    });

    it('should handle setLicensees', () => {
        expect(
            settingManagement({}, {
                type: setLicensees.type,
                payload: [{
                    0: "108bet",
                    1: "108betTest",
                    2: "109betTest",
                    3: "11bet",
                    4: "12B",
                    5: "12Bet",
                    6: "12BetHelen",
                    7: "12BetWinA"
                }]
            })
        ).toEqual({
            licensees: [{ 
                    0: "108bet",
                    1: "108betTest",
                    2: "109betTest",
                    3: "11bet",
                    4: "12B",
                    5: "12Bet",
                    6: "12BetHelen",
                    7: "12BetWinA"
            }]
        });
    });

    it('should handle setLicenseeMapping', () => {
        expect(
            settingManagement({}, {
                type: setLicenseeMapping.type,
                payload: [{
                    licenseeManager: null,
                    setting: "0sServices",
                    settingId: 6727,
                    settingSource: ""
                }]
            })
        ).toEqual({
            licenseesMapping: [{
                licenseeManager: null,
                setting: "0sServices",
                settingId: 6727,
                settingSource: ""
            }]
        });
    });

    it('should handle setLicenseeManager', () => {
        expect(
            settingManagement({}, {
                type: setLicenseeManager.type,
                payload: [{
                    custId: -5969,
                    username: "111test"
                }]
            })
        ).toEqual({
            licenseesManager: [{
                custId: -5969,
                username: "111test"
            }]
        });
    });

    it('should handle setGridParams', () => {
        expect(
            settingManagement({}, {
                type: setGridParams.type,
                payload: {
                    settingName: '',
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParams: {
                settingName: '',
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setEditStatusPopup', () => {
        expect(
            settingManagement({}, {
                type: setEditStatusPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            editStatusPopup: {
                show: true
            }
        });
    });

    it('should handle setOpenInsertNewSettingPopup', () => {
        expect(
            settingManagement({}, {
                type: setOpenInsertNewSettingPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            insertNewSettingPopup: {
                show: true
            }
        });
    });

    it('should handle setOpenLicenseeMappingPopup', () => {
        expect(
            settingManagement({}, {
                type: setOpenLicenseeMappingPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            licenseeMappingPopup: {
                show: true
            }
        });
    });

    it('should handle setInsertNewSettingResult', () => {
        expect(
            settingManagement({}, {
                type: setInsertNewSettingResult.type,
                payload: {
                    isSuccessful: true,
                    message: ''
                }
            })
        ).toEqual({
            insertNewSettingResult: {
                isSuccessful: true,
                message: ''
            }
        });
    });

    it('should handle setOpenEdiPopup', () => {
        expect(
            settingManagement({}, {
                type: setOpenEdiPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            editPopup: {
                show: true
            }
        });
    });

    it('should handle setEditNewSettingResult', () => {
        expect(
            settingManagement({}, {
                type: setEditNewSettingResult.type,
                payload: {
                    isSuccessful: true,
                    message: ''
                }
            })
        ).toEqual({
            editNewSettingResult: {
                isSuccessful: true,
                message: ''
            }
        });
    });

    it('should handle setConfirmCancelPopup', () => {
        expect(
            settingManagement({}, {
                type: setConfirmCancelPopup.type,
                payload: {
                    show: true
                }
            })
        ).toEqual({
            confirmCancelPopup: {
                show: true
            }
        });
    });
});