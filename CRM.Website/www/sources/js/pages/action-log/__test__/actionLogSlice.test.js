import actionLog, {
    resetState,
    setAllLogAction,
    setActivityLog,
    setGridParams
} from '../actionLogSlice';

describe('actionLogSlice reducer', () => {
    it('should handle reset state', () => {
        expect(
            actionLog({}, {
                type: resetState.type
            })
        ).toEqual({
            allLogActions: null,
            activityLogs: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle initial state', () => {
        expect(actionLog(undefined, {})).toEqual({
            allLogActions: null,
            activityLogs: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setAllLogAction', () => {
        expect(
            actionLog({}, {
                type: setAllLogAction.type,
                payload: { id: 100, name: 'Add the general information for customer' }
            })
        ).toEqual({
            allLogActions: { id: 100, name: 'Add the general information for customer' }
        });
    });

    it('should handle setActivityLog', () => {
        expect(
            actionLog({}, {
                type: setActivityLog.type,
                payload: {
                    data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            activityLogs: {
                data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            actionLog({}, {
                type: setGridParams.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParams: { pageIndex: 1, pageSize: 100 }
        });
    });
});