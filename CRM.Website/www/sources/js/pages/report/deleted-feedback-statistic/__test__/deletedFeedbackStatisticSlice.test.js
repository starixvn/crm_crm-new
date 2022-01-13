import deletedFeedbackStatistic, {
    setGridParams,
    setGridData,
    setEditFeedbackDialog,
    setViewRelatedCustomerDialog
} from '../deletedFeedbackStatisticSlice';

describe('deletedFeedbackStatistic reducer', () => {
    it('should handle initial state', () => {
        expect(deletedFeedbackStatistic(undefined, {})).toEqual({
            gridParams: null,
            gridData: null,
            editFeedbackDialog: { show: false },
            viewRelatedCustomerDialog: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            deletedFeedbackStatistic({}, {
                type: setGridParams.type,
                payload: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
            })
        ).toEqual({
            gridParams: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
        });
    });

    it('should handle setGridData', () => {
        expect(
            deletedFeedbackStatistic({}, {
                type: setGridData.type,
                payload: { }
            })
        ).toEqual({
            gridData: {}
        });
    });

    it('should handle setEditFeedbackDialog', () => {
        expect(
            deletedFeedbackStatistic({}, {
                type: setEditFeedbackDialog.type,
                payload: { show: false ,FeedbackId: 123 }
            })
        ).toEqual({
            editFeedbackDialog: { show: false ,FeedbackId: 123 }
        });
    });
    it('should handle setViewRelatedCustomerDialog', () => {
        expect(
            deletedFeedbackStatistic({}, {
                type: setViewRelatedCustomerDialog.type,
                payload: { show: false}
            })
        ).toEqual({
            viewRelatedCustomerDialog : { show: false}
        });
    });
});