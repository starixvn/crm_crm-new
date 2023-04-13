import addCustomerFeedback, {
    setAllSettings,
    setBalanceUpday,
    setCustomerDetail,
    setFeedbackSubjectTemplates,
    setAddFeedback,
    setConfirmCreateGuestDialog,
    resetState
} from '../addCustomerFeedbackSlice';

describe('addCustomerFeedback reducer', () => {
    it('should handle initial state', () => {
        expect(addCustomerFeedback(undefined, {})).toEqual({
            settings: null,
            balanceUpday: null,
            customerDetail: null,
            addFeedbackResult: null,
            feedbackSubjectTemplates: [],
            confirmCreateGuestDialog: { show: false }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            addCustomerFeedback({}, {
                type: setAllSettings.type,
                payload: {
                    bettypeNA: {},
                    bettypes: [],
                    communicationTools: [],
                    countries: [],
                    extensionNA: {},
                    extensions: [],
                    languages: [],
                    licenseeType: [],
                    mainCategories: [],
                    productNA: {},
                    products: [],
                    provinces: [],
                    responses: [],
                    roles: null,
                    sites: [],
                    status: [],
                    subCategories: [],
                    subProductNA: {},
                    subProducts: [],
                    titles: []
                }
            })
        ).toEqual({
            settings: {
                bettypeNA: {},
                bettypes: [],
                communicationTools: [],
                countries: [],
                extensionNA: {},
                extensions: [],
                languages: [],
                licenseeType: [],
                mainCategories: [],
                productNA: {},
                products: [],
                provinces: [],
                responses: [],
                roles: null,
                sites: [],
                status: [],
                subCategories: [],
                subProductNA: {},
                subProducts: [],
                titles: []
            }
        });
    });

    it('should handle setFeedbackSubjectTemplates', () => {
        expect(
            addCustomerFeedback({}, {
                type: setFeedbackSubjectTemplates.type,
                payload: [{
                    templateID : 1,
                    subject : 'subject',
                    isActive : true
                }]
            })
        ).toEqual({
            feedbackSubjectTemplates: [{
                templateID : 1,
                    subject : 'subject',
                    isActive : true
            }]
        });
    });

    it('should handle setBalanceUpday', () => {
        expect(
            addCustomerFeedback({}, {
                type: setBalanceUpday.type,
                payload: {
                    test: new Date('2021-01-01')
                }
            })
        ).toEqual({
            balanceUpday: {
                test: new Date('2021-01-01')
            }
        });
    });

    it('should handle setAddFeedback', () => {
        expect(
            addCustomerFeedback({}, {
                type: setAddFeedback.type,
                payload: {
                    isSuccessful: true, message: ''
                }
            })
        ).toEqual({
            addFeedbackResult: { isSuccessful: true, message: ''}
        });
    });

    it('should handle setConfirmCreateGuestDialog', () => {
        expect(
            addCustomerFeedback({}, {
                type: setConfirmCreateGuestDialog.type,
                payload: {
                    show: true, 
                    message : ''
                }
            })
        ).toEqual({
            confirmCreateGuestDialog: {
                show: true, 
                    message : ''
            }
        });
    });

    it('should handle setCustomerDetail', () => {
        expect(
            addCustomerFeedback({}, {
                type: setCustomerDetail.type,
                payload: {
                    id: 1, 
                    custName : 'test'
                }
            })
        ).toEqual({
            customerDetail: {
                id: 1, 
                custName : 'test'
            }
        });
    });

    it('should handle resetState', () => {
        expect(
            addCustomerFeedback({}, {
                type: resetState.type
            })
        ).toEqual({
            settings: null,
            balanceUpday: null,
            customerDetail: null,
            addFeedbackResult: null,
            feedbackSubjectTemplates: [],
            confirmCreateGuestDialog: { show: false }
        });
    });
});