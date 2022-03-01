import changesLog, {
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType
} from '../changesLogSlice';

describe('changesLogSlice reducer', () => {
    it('should handle initial state', () => {
        expect(changesLog(undefined, {})).toEqual({
            gridParams: {
                userName: null,
                editBy: null,
                actionTypeIds: '',
                fromDate: null,
                toDate: null,
                pageIndex: 1,
                pageSize: 100
            },
            gridParamsPic: {
                picName: null,
                editBy: null,
                fromDate: null,
                toDate: null,
                pageIndex: 1,
                pageSize: 100
            },
            headlineDA: null,
            picReport: null,
            actionType: null
        });
    });

    it('should handle setGridParams', () => {
        expect(
            changesLog({}, {
                type: setGridParams.type,
                payload: {
                    data: [ { fromDate: 'Nov 18, 2021 04:48:01 AM', toDate: 'Nov 19, 2021 04:48:01 AM', username: 'sa' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            gridParams: {
                data: [ { fromDate: 'Nov 18, 2021 04:48:01 AM', toDate: 'Nov 19, 2021 04:48:01 AM', username: 'sa' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setGridParamsPic', () => {
        expect(
            changesLog({}, {
                type: setGridParamsPic.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParamsPic: { pageIndex: 1, pageSize: 100 }
        });
    });


    it('should handle setHeadlineDA', () => {
        expect(
            changesLog({}, {
                type: setHeadlineDA.type,
                payload: {
                    data: [ { username: 'sa', editBy: 'sa' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            headlineDA: {
                data: [ { username: 'sa', editBy: 'sa' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setPicReport', () => {
        expect(
            changesLog({}, {
                type: setPicReport.type,
                payload: {
                    data: [ { logId: 1, username: 'sa', editBy: 'sa', action: 'Insert new PIC' } ],
                    totalItems: 18
                }
            })
        ).toEqual({
            picReport: {
                data: [ { logId: 1, username: 'sa', editBy: 'sa', action: 'Insert new PIC' } ],
                totalItems: 18
            }
        });
    });

    it('should handle setActionType', () => {
        expect(
            changesLog({}, {
                type: setActionType.type,
                payload: {
                    data: [ { id: 1, name: 'pic assignment' } ]
                }
            })
        ).toEqual({
            actionType: {
                data: [ { id: 1, name: 'pic assignment' } ]
            }
        });
    });
});