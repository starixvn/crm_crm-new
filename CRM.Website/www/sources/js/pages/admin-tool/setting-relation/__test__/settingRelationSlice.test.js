import settingLog, {
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setMainSettingRelation,
    setUpdateResult,
    setOpenUpdatePopup
} from '../settingRelationSlice';

describe('settingRelationSlice reducer', () => {
    it('should handle initial state', () => {
        expect(settingLog(undefined, {})).toEqual({
            mainSettings: null,
            mainSettings: null,
            relationConfirmPopup: {
                show: false,
            },
            settingType: null,
            gridParams: {
                settingName: ''
            },
            gridDataSettingLogs: null,
            mainSettingRelation: [],
            updateResult: null,
            updatePopup: { show: false, title: '', parentId: null , parentName: ''}
        });
    });

    it('should handle setSettingTypes', () => {
        expect(
            settingLog({}, {
                type: setSettingTypes.type,
                payload: [{id: 55001, value: "test", displayOrder: 0, isChild: false, isActive: true}]
            })
        ).toEqual({
            settingType: [{id: 55001, value: "test", displayOrder: 0, isChild: false, isActive: true}]
        });
    });

    it('should handle setGridParams', () => {
        expect(
            settingLog({}, {
                type: setGridParams.type,
                payload: { 
                    settingName: 'betType'
                }
            })
        ).toEqual({
            gridParams: {
                settingName: 'betType'
            }
        });
    });

    it('should handle setMainSettingRelation', () => {
        expect(
            settingLog({}, {
                type: setMainSettingRelation.type,
                payload: { 
                    displayOrder: 0,
                    parentID: 0,
                    settingId: 68001,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "te",
                    childSettings: [{id: 0, name: null, settingId: 1002, settingName: "Communication", settingValue: "Zalo"}]
                }
            })
        ).toEqual({
            mainSettingRelation: { 
                displayOrder: 0,
                parentID: 0,
                settingId: 68001,
                settingName: "111111111",
                settingSource: null,
                settingValue: "te",
                childSettings: [{id: 0, name: null, settingId: 1002, settingName: "Communication", settingValue: "Zalo"}]
            }
        });
    });

    it('should handle setMainSettings', () => {
        expect(
            settingLog({}, {
                type: setMainSettings.type,
                payload: { 
                    displayOrder: 0,
                    parentID: 0,
                    settingId: 68001,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "te",
                    childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
                }
            })
        ).toEqual({
            mainSettings: { 
                displayOrder: 0,
                parentID: 0,
                settingId: 68001,
                settingName: "111111111",
                settingSource: null,
                settingValue: "te",
                childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
            }
        });
    });

    it('should handle setUpdateResult', () => {
        expect(
            settingLog({}, {
                type: setUpdateResult.type,
                payload: { 
                    isSuccessful: true
                }
            })
        ).toEqual({
            updateResult: {
                isSuccessful: true
            }
        });
    });

    it('should handle setOpenUpdatePopup', () => {
        expect(
            settingLog({}, {
                type: setOpenUpdatePopup.type,
                payload: { 
                    show: true
                }
            })
        ).toEqual({
            updatePopup: {
                show: true
            }
        });
    });
});