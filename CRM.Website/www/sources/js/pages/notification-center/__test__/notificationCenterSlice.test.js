import notificationCenter, {
    setGridParams,
    setGridData,
    setEditAdmNotification,
    setAutoRefresh,
    setIsRefresh
} from '../notificationCenterSlice';
import { REFRESH_CENTER_TIMES } from '@jsroot/common/constants';

describe('notificationCenter reducer', () => {
    it('show handle initial state', () => {
        expect(notificationCenter(undefined, {})).toEqual({
            gridParams: {
                isOstUser: true,
                pageIndex: 1,
                pageSize: 100
            },
            gridData: null,
            editAdmNotificationResult: null,
            autoRefresh: {
                value: REFRESH_CENTER_TIMES[0],
                countDown: REFRESH_CENTER_TIMES[0],
                isSubmit: false
            },
            isRefresh: true
        });
    });

    it('should handle setGridParams', () => {
        expect(
            notificationCenter({}, {
                type: setGridParams.type,
                payload: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
            })
        ).toEqual({
            gridParams: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
        });
    });

    it('should handle setGridData', () => {
        expect(
            notificationCenter({}, {
                type: setGridData.type,
                payload: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
            })
        ).toEqual({
            gridData: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
        });
    });

    it('should handle setEditAdmNotification', () => {
        expect(
            notificationCenter({}, {
                type: setEditAdmNotification.type,
                payload: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
            })
        ).toEqual({
            editAdmNotificationResult: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
        });
    });

    it('should handle setAutoRefresh', () => {
        expect(
            notificationCenter({}, {
                type: setAutoRefresh.type,
                payload: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
            })
        ).toEqual({
            autoRefresh: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
        });
    });

    it('should handle setIsRefresh', () => {
        expect(
            notificationCenter({}, {
                type: setIsRefresh.type,
                payload: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
            })
        ).toEqual({
            isRefresh: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]
        });
    });
});