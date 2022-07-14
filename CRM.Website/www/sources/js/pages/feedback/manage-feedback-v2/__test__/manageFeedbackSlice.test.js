import deletedFeedback, {
    setAllSettings,
    setGridParams,
    setGridFeedbacks,
    setEditFeedbackDialog,
    setEditNoOfInquiryDialog,
    setEditMultipleLogStatusDialog,
    setEditMultipleLogDialog
} from '../manageFeedbackSlice';

describe('manageFeedbackSlice reducer', () => {
    it('should handle initial state', () => {
        expect(deletedFeedback(undefined, {})).toEqual({
            settings: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            gridDataFeedbacks: null,
            editFeedbackDialog: { show: false },
            editNoOfInquiryDialog: { show: false },
            editMultipleLogStatusDialog: { show: false },
            editMultipleLogDialog: { show: false },
            viewRelatedCustomerDialog: { show: false }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            deletedFeedback({}, {
                type: setAllSettings.type,
                payload: { 
                    customerTypes: [],
                    responses: [],
                    mainCategories: [],
                    subCategories: [],
                    communications: [],
                    statuses: []
                }
            })
        ).toEqual({
            settings: { 
                customerTypes: [],
                responses: [],
                mainCategories: [],
                subCategories: [],
                communications: [],
                statuses: []
            }
        });
    });


    it('should handle setGridFeedbacks', () => {
        expect(
            deletedFeedback({}, {
                type: setGridFeedbacks.type,
                payload: { data:[{feedbackId: '1', Username: 'test'}] }
            })
        ).toEqual({
            gridDataFeedbacks: { data:[{feedbackId: '1', Username: 'test'}] }
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

    it('should handle setGridFeedbacks', () => {
        expect(
            deletedFeedback({}, {
                type: setGridFeedbacks.type,
                payload: { data:[{feedbackId: '1', Username: 'test'}] }
            })
        ).toEqual({
            gridDataFeedbacks: { data:[{feedbackId: '1', Username: 'test'}] }
        });
    });

    it('should handle setEditFeedbackDialog', () => {
        expect(
            deletedFeedback({}, {
                type: setEditFeedbackDialog.type,
                payload: { show: false, feedbackId: 1 }
            })
        ).toEqual({
            editFeedbackDialog: { show: false, feedbackId: 1 }
        });
    });

    it('should handle setEditNoOfInquiryDialog', () => {
        expect(
            deletedFeedback({}, {
                type: setEditNoOfInquiryDialog.type,
                payload: { show: false, feedbackId: 1 }
            })
        ).toEqual({
            editNoOfInquiryDialog: { show: false ,feedbackId: 1 }
        });
    });

    it('should handle setEditMultipleLogStatusDialog', () => {
        expect(
            deletedFeedback({}, {
                type: setEditMultipleLogStatusDialog.type,
                payload: { show: false, feedbackId: '1,2,3' }
            })
        ).toEqual({
            editMultipleLogStatusDialog: { show: false ,feedbackId: '1,2,3' }
        });
    });

    it('should handle setEditMultipleLogDialog', () => {
        expect(
            deletedFeedback({}, {
                type: setEditMultipleLogDialog.type,
                payload: { show: false, feedbackArr: [1,2,3] }
            })
        ).toEqual({
            editMultipleLogDialog: { show: false, feedbackArr: [1,2,3] }
        });
    });
    
});