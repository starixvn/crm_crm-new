import communicationLog, {
    setLogsByCustomerId,
    setStatusForEdit,
    setStatusForFilter,
    setGridParams,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setLogByFeedbackId,
    setFeedbackSubjectTemplates,
    setCreateCommunicationDialog
} from '../communicationLogSlice';

describe('communicationLog reducer', () => {
    it('show handle initial state', () => {
        expect(communicationLog(undefined, {})).toEqual({
            gridData: null,
            statusEdit: null,
            statusFilter: null,
            gridParams: { pageIndex: 1, pageSize: 100 },
            editNoOfInquiryDialog: { show: false },
            editCommunicationDialog: { show: false },
            logFeedback: null,
            feedbackSubjectTemplates: [],
            createCommunicationDialog: { show: false }
        });
    });

    it('should handle setLogsByCustomerId', () => {
        expect(
            communicationLog({}, {
                type: setLogsByCustomerId.type,
                payload: { data: {} }
            })
        ).toEqual({
            gridData: { data: {} }
        });
    });

    it('should handle setStatusForEdit', () => {
        expect(
            communicationLog({}, {
                type: setStatusForEdit.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            statusEdit: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });

    it('should handle setStatusForFilter', () => {
        expect(
            communicationLog({}, {
                type: setStatusForFilter.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            statusFilter: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            communicationLog({}, {
                type: setGridParams.type,
                payload: { customerId: 1234 }
            })
        ).toEqual({
            gridParams: { customerId: 1234 }
        });
    });

    it('should handle setEditNoOfInquiryDialog', () => {
        expect(
            communicationLog({}, {
                type: setEditNoOfInquiryDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            editNoOfInquiryDialog: { show: false }
        });
    });

    it('should handle setEditCommunicationDialog', () => {
        expect(
            communicationLog({}, {
                type: setEditCommunicationDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            editCommunicationDialog: { show: false }
        });
    });

    it('should handle setLogByFeedbackId', () => {
        expect(
            communicationLog({}, {
                type: setLogByFeedbackId.type,
                payload: { feedback: [] }
            })
        ).toEqual({
            logFeedback: { feedback: [] }
        });
    });

    it('should handle setFeedbackSubjectTemplates', () => {
        expect(
            communicationLog({}, {
                type: setFeedbackSubjectTemplates.type,
                payload: [{val: 'sa'}]
            })
        ).toEqual({
            feedbackSubjectTemplates: [{val: 'sa'}]
        });
    });

    it('should handle setCreateCommunicationDialog', () => {
        expect(
            communicationLog({}, {
                type: setCreateCommunicationDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            createCommunicationDialog: { show: false }
        });
    });
});