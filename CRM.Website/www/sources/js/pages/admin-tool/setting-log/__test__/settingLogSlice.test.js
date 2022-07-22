import settingLog, {
    resetState,
    setActionLog,
    setGridParams,
    setGridSettingLogs
} from '../settingLogSlice';

describe('settingLogSlice reducer', () => {
    it('should handle reset state', () => {
        expect(
            settingLog({}, {
                type: resetState.type
            })
        ).toEqual({
            actionLogs: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            gridDataSettingLogs: null
        });
    });

    it('should handle initial state', () => {
        expect(settingLog(undefined, {})).toEqual({
            actionLogs: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            gridDataSettingLogs: null
        });
    });

    it('should handle setActionLog', () => {
        expect(
            settingLog({}, {
                type: setActionLog.type,
                payload: { id: 100, name: 'Add the general information for customer' }
            })
        ).toEqual({
            actionLogs: { id: 100, name: 'Add the general information for customer' }
        });
    });

    it('should handle setGridSettingLogs', () => {
        expect(
            settingLog({}, {
                type: setGridSettingLogs.type,
                payload: {
                    data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            gridDataSettingLogs: {
                data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            settingLog({}, {
                type: setGridParams.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParams: { pageIndex: 1, pageSize: 100 }
        });
    });


    it('should handle setActionLog', () => {
        expect(
            settingLog({}, {
                type: setActionLog.type,
                payload: {
                    data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            actionLogs: {
                data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            settingLog({}, {
                type: setGridParams.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParams: { pageIndex: 1, pageSize: 100 }
        });
    });
});