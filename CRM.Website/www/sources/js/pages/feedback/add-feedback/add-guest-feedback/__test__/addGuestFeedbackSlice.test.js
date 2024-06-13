import addGuestFeedback, {
    resetState,
    setAllSettings,
    setFeedbackSubjectTemplates,
    setBalanceUpday,
    setAddFeedback,
    setConfirmCreateGuestDialog,
    setSettingCommunicationTool
} from '../addGuestFeedbackSlice';

describe('addGuestFeedback reducer', () => {
    it('should handle initial state', () => {
        expect(addGuestFeedback(undefined, {})).toEqual({
            settings: null,
            addFeedbackResult: null,
            balanceUpday: null,
            feedbackSubjectTemplates: [],
            settingCommunicationTool: null,
            confirmCreateGuestDialog: { show: false }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            addGuestFeedback({}, {
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
            addGuestFeedback({}, {
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
            addGuestFeedback({}, {
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
            addGuestFeedback({}, {
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
            addGuestFeedback({}, {
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

    it('should handle setSettingCommunicationTool', () => {
        expect(
            addGuestFeedback({}, {
                type: setSettingCommunicationTool.type,
                payload: {
                    settingId: 1
                }
            })
        ).toEqual({
            settingCommunicationTool : {
                settingId: 1
            }
        });
    });

    it('should handle resetState', () => {
        expect(
            addGuestFeedback({}, {
                type: resetState.type                
            })
        ).toEqual({
            settings: null,
            balanceUpday: null,
            addFeedbackResult: null,
            feedbackSubjectTemplates: [],
            settingCommunicationTool: null,
            confirmCreateGuestDialog: { show: false }
        });
    });
});