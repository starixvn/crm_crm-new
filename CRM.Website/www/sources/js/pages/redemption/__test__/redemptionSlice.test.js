import redemption, {
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setGridParams,
    setEditRedemptionDialog,
    setSettings,
    setCreateRedemptionDialog
} from '../redemptionSlice';

describe('redemptionSlice reducer', () => {
    it('should handle initial state', () => {
        expect(redemption(undefined, {})).toEqual({
            redemptionLogs: null,
            allStatus: null,
            redemptionLog: null,
            gridParams: null,
            editRedemptionDialog: { show: false },
            settings: null,
            createRedemptionDialog: { show: false }
        });
    });

    it('should handle setLogsByCustomerId', () => {
        expect(
            redemption({}, {
                type: setLogsByCustomerId.type,
                payload: { id: 1, subject: 'test', status: 'KIV' }
            })
        ).toEqual({
            redemptionLogs: { id: 1, subject: 'test', status: 'KIV' }
        });
    });

    it('should handle setAllStatus', () => {
        expect(
            redemption({}, {
                type: setAllStatus.type,
                payload: { status: ['KIV', 'Open', 'Delete'] }
            })
        ).toEqual({
            allStatus: { status: ['KIV', 'Open', 'Delete'] }
        });
    });

    it('should handle setLogById', () => {
        expect(
            redemption({}, {
                type: setLogById.type,
                payload: { id: 1, subject: 'test', status: 'KIV' }
            })
        ).toEqual({
            redemptionLog: { id: 1, subject: 'test', status: 'KIV' }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            redemption({}, {
                type: setGridParams.type,
                payload: { id: 1 }
            })
        ).toEqual({
            gridParams: { id: 1 }
        });
    });

    it('should handle setEditRedemptionDialog', () => {
        expect(
            redemption({}, {
                type: setEditRedemptionDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            editRedemptionDialog: { show: true }
        });
    });

    it('should handle setSettings', () => {
        expect(
            redemption({}, {
                type: setSettings.type,
                payload: { status: ['KIV', 'Open', 'Delete'] }
            })
        ).toEqual({
            settings: { status: ['KIV', 'Open', 'Delete'] }
        });
    });

    it('should handle setCreateRedemptionDialog', () => {
        expect(
            redemption({}, {
                type: setCreateRedemptionDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            createRedemptionDialog: { show: true }
        });
    });
});