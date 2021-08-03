import deletedFeedback, {
    setGridParams,
    setAllSettings,
    setDeletedFeedback,
    setEditFeedbackDialog
} from '../deletedFeedbackSlice';

describe('deletedFeedbackSlice reducer', () => {
    it('should handle initial state', () => {
        expect(deletedFeedback(undefined, {})).toEqual({
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            settings: null,
            gridData: null,
            editFeedbackDialog: { show: false },
            viewRelatedCustomerDialog: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            deletedFeedback({}, {
                type: setGridParams.type,
                payload: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
            })
        ).toEqual({
            gridParams: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            deletedFeedback({}, {
                type: setAllSettings.type,
                payload: { customerType: [{settingValue: 'All'}] }
            })
        ).toEqual({
            settings: { customerType: [{settingValue: 'All'}] }
        });
    });

    it('should handle setDeletedFeedback', () => {
        expect(
            deletedFeedback({}, {
                type: setDeletedFeedback.type,
                payload: { data:[{customerType: [{settingValue: 'All'}]}] }
            })
        ).toEqual({
            gridData: { data:[{customerType: [{settingValue: 'All'}]}] }
        });
    });

    it('should handle setEditFeedbackDialog', () => {
        expect(
            deletedFeedback({}, {
                type: setEditFeedbackDialog.type,
                payload: { show: false ,FeedbackId: 123 }
            })
        ).toEqual({
            editFeedbackDialog: { show: false ,FeedbackId: 123 }
        });
    });
});