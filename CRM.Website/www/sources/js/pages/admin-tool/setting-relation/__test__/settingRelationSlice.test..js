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
            settingType: null,
            gridParams: {
                settingName: ''
            },
            gridDataSettingLogs: null,
            mainSettingRelation: [],
            updateResult: null,
            updatePopup: { show: false, title: '', parentId: null }
        });
    });
});