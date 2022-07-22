import latestFeedback, {
    resetState,
    setGridParams,
    setLatestFeedback,
    setViewRelatedCustomerDialog,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog
} from '../latestFeedbackSlide';

describe('latestFeedbackSlide reducer', () => {
    it('show handle reset state', () => {
        expect(latestFeedback({}, {
            type: resetState.type,
            payload: { data: {} }
        })).toEqual({
            gridData: null,
            gridParams: { top: 10 },
            viewRelatedCustomerDialog: { show: false },
            editFeedbackDialog: { show: false },
            editNoOfInquiryDialog: { show: false }
        });
    });

    it('should handle initial state', () => {
        expect(latestFeedback(undefined, {})).toEqual({
            gridData: null,
            gridParams: { top: 10 },
            viewRelatedCustomerDialog: { show: false },
            editFeedbackDialog: { show: false },
            editNoOfInquiryDialog: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            latestFeedback({}, {
                type: setGridParams.type,
                payload: { top: 10 }
            })
        ).toEqual({
            gridParams: { 
                top: 10
            }
        });
    });

    it('should handle setLatestFeedback', () => {
        expect(
            latestFeedback({}, {
                type: setLatestFeedback.type,
                payload: { username: 'test' }
            })
        ).toEqual({
            gridData: { 
                username: 'test'
            }
        });
    });

    it('should handle setViewRelatedCustomerDialog', () => {
        expect(
            latestFeedback({}, {
                type: setViewRelatedCustomerDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            viewRelatedCustomerDialog: { 
                show: true
            }
        });
    });

    it('should handle setEditFeedbackDialog', () => {
        expect(
            latestFeedback({}, {
                type: setEditFeedbackDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            editFeedbackDialog: { 
                show: true
            }
        });
    });

    it('should handle setEditNoOfInquiryDialog', () => {
        expect(
            latestFeedback({}, {
                type: setEditNoOfInquiryDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            editNoOfInquiryDialog: { 
                show: true
            }
        });
    });
});