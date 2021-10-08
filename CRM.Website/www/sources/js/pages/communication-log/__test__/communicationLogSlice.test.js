import communicationLog, {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams,
    setGridPages,
    setEditNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCustomerFeedbackById,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setInsertCommunicationDialog,
    setInsertSettings,
    setBalanceUpday
} from '../communicationLogSlice';

describe('communicationLog reducer', () => {
    it('show handle initial state', () => {
        expect(communicationLog(undefined, {})).toEqual({
            gridData: null,
            allStatus: null,
            gridParams: null,
            gridPages: { pageIndex: 1, pageSize: 100 },
            editNoOfInquiryDialog: { show: false },
            editCommunicationDialog: { show: false },
            customerFeedback: null,
            feedbackSubjectTemplates: [],
            duplicateFeedbackId: 0,
            insertCommunicationDialog: { show: false },
            insertSettings: null,
            balanceUpday: null
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

    it('should handle setAllStatus', () => {
        expect(
            communicationLog({}, {
                type: setAllStatus.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            allStatus: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });

    it('should handle setBalanceUpday', () => {
        expect(
            communicationLog({}, {
                type: setBalanceUpday.type,
                payload: {
                    test: new Date('2020-01-01')
                }
            })
        ).toEqual({
            balanceUpday: {
                test: new Date('2020-01-01')
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

    it('should handle setGridPages', () => {
        expect(
            communicationLog({}, {
                type: setGridPages.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridPages: { pageIndex: 1, pageSize: 100 }
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

    it('should handle setCustomerFeedbackById', () => {
        expect(
            communicationLog({}, {
                type: setCustomerFeedbackById.type,
                payload: { feedback: [] }
            })
        ).toEqual({
            customerFeedback: { feedback: [] }
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

    it('should handle setDuplicateFeedback', () => {
        expect(
            communicationLog({}, {
                type: setDuplicateFeedback.type,
                payload: 2000
            })
        ).toEqual({
            duplicateFeedbackId: 2000
        });
    });

    it('should handle setInsertCommunicationDialog', () => {
        expect(
            communicationLog({}, {
                type: setInsertCommunicationDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            insertCommunicationDialog: { show: false }
        });
    });

    it('should handle setInsertSettings', () => {
        expect(
            communicationLog({}, {
                type: setInsertSettings.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            insertSettings: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });
});