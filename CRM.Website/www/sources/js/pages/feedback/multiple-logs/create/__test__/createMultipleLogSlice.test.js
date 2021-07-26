import createMultipleLog, {
    setSettings,
    setVerifyCustomerResults,
    removeCustomer,
    setRelatedCustomerResults,
    setAddRelatedCustomerDialog,
    setViewRelatedCustomerDialog,
    setFeedbackSubjectTemplates,
    setConfirmCreateMultipleLogsDialog
} from '../createMultipleLogSlice';

describe('createMultipleLog reducer', () => {
    it('should handle initial state', () => {
        expect(createMultipleLog(undefined, {})).toEqual({
            settings: null,
            verifyCustomerResults: [],
            relatedCustomerResults: [],
            feedbackSubjectTemplates: [],
            addRelatedCustomerDialog: { show: false },
            viewRelatedCustomerDialog: { show: false },
            confirmCreateMultipleLogsDialog: { show: false }
        });
    });

    it('should handle setSettings', () => {
        expect(
            createMultipleLog({}, {
                type: setSettings.type,
                payload: { extensions: { id: 1, type: 'tests' } }
            })
        ).toEqual({
            settings: { extensions: { id: 1, type: 'tests' } }
        });
    });

    describe('setVerifyCustomerResults', () => {
        it('do nothing when customer is exist', () => {
            expect(
                createMultipleLog({
                    verifyCustomerResults: [{ custId: 1, username: 'test' }]
                }, {
                    type: setVerifyCustomerResults.type,
                    payload: [{ custId: 1, username: 'test' }]
                })
            ).toEqual({
                verifyCustomerResults: [{ custId: 1, username: 'test' }]
            });
        });

        it('should push customer into list when customer is not exist', () => {
            expect(
                createMultipleLog({
                    verifyCustomerResults: [{ custId: 1, username: 'test' }]
                }, {
                    type: setVerifyCustomerResults.type,
                    payload: [{ custId: 2, username: 'test 1' }]
                })
            ).toEqual({
                verifyCustomerResults: [{ custId: 1, username: 'test' }, { custId: 2, username: 'test 1' }]
            });
        });
    });

    describe('removeCustomer', () => {
        it('should remove all invalid customers when custId = 0', () => {
            expect(
                createMultipleLog({
                    verifyCustomerResults: [
                        { custId: 1, username: 'test' },
                        { custId: 0, username: 'test 1' },
                        { custId: 0, username: 'test 2' }
                    ],
                    relatedCustomerResults: [{ custId: 1, username: 'test' }]
                }, {
                    type: removeCustomer.type,
                    payload: { custId: 0, username: 'test 1' }
                })
            ).toEqual({
                verifyCustomerResults: [{ custId: 1, username: 'test' }],
                relatedCustomerResults: [{ custId: 1, username: 'test' }]
            });
        });

        it('should remove correct customer when custId <> 0', () => {
            expect(
                createMultipleLog({
                    verifyCustomerResults: [{ custId: 1, username: 'test' }, { custId: 2, username: 'test 1' }],
                    relatedCustomerResults: [{ custId: 1, username: 'test' }]
                }, {
                    type: removeCustomer.type,
                    payload: { custId: 1, username: 'test' }
                })
            ).toEqual({
                verifyCustomerResults: [{ custId: 2, username: 'test 1' }],
                relatedCustomerResults: []
            });
        });
    });

    it('should handle setAddRelatedCustomerDialog', () => {
        expect(
            createMultipleLog({}, {
                type: setAddRelatedCustomerDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            addRelatedCustomerDialog: { show: true }
        });
    });

    it('should handle setRelatedCustomerResults', () => {
        expect(
            createMultipleLog({}, {
                type: setRelatedCustomerResults.type,
                payload: [{ custId: 1, username: 'test' }]
            })
        ).toEqual({
            relatedCustomerResults: [{ custId: 1, username: 'test' }]
        });
    });

    it('should handle setViewRelatedCustomerDialog', () => {
        expect(
            createMultipleLog({}, {
                type: setViewRelatedCustomerDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            viewRelatedCustomerDialog: { show: true }
        });
    });

    it('should handle setFeedbackSubjectTemplates', () => {
        expect(
            createMultipleLog({}, {
                type: setFeedbackSubjectTemplates.type,
                payload: [{ subjectId: 1, subject: 'test' }]
            })
        ).toEqual({
            feedbackSubjectTemplates: [{ subjectId: 1, subject: 'test' }]
        });
    });

    it('should handle setConfirmCreateMultipleLogsDialog', () => {
        expect(
            createMultipleLog({}, {
                type: setConfirmCreateMultipleLogsDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            confirmCreateMultipleLogsDialog: { show: true }
        });
    });
});