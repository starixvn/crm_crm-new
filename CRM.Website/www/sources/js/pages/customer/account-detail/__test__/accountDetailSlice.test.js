import customerInfoDetail, {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setHeadlinePicRoles,
    setAccountingPicRoles,
    setSettingCommunicationTool,
    setErrors,
    setHeadlineCompanyService,
    setHeadlineStaffsAndAuthority,
    setSettingStaffAndAuthority,
    setSettingPicRole,
    setActiveTab,
    setShowConfirmUnSaved,
    setShowAccountInfo,
    setShowAccountantPIC
} from '../accountDetailSlice';

describe('customerInfoDetail reducer', () => {
    it('show handle reset state', () => {
        expect(customerInfoDetail({}, {
            type: resetState.type,
            payload: { data: {} }
        })).toEqual({
            activeTab: {
                currentTab: null,
                nextTab: null
            },
            customerInfo: null,
            headlinePicRoles: null,
            accountingPicRoles: null,
            settingCommunicationTool: null,
            allSettings: null,
            editCustomerInfoDetailResult: '',
            errors: null,
            headlineCompanyService: null,
            headlineStaffsAndAuthority: null,
            settingStaffAndAuthority: null,
            settingPicRole: null,
            showConfirmUnSaved: false,
            isShowAccountInfo: true,
            isShowAccountantPIC: true
        });
    });
    
    it('show handle initial state', () => {
        expect(customerInfoDetail(undefined, {})).toEqual({
            activeTab: {
                currentTab: null,
                nextTab: null
            },
            customerInfo: null,
            headlinePicRoles: null,
            accountingPicRoles: null,
            settingCommunicationTool: null,
            allSettings: null,
            editCustomerInfoDetailResult: '',
            errors: null,
            headlineCompanyService: null,
            headlineStaffsAndAuthority: null,
            settingStaffAndAuthority: null,
            settingPicRole: null,
            showConfirmUnSaved: false,
            isShowAccountInfo: true,
            isShowAccountantPIC: true
        });
    });
    
    it('should handle setCustomerById', () => {
        expect(
            customerInfoDetail({}, {
                type: setCustomerById.type,
                payload: { data: {} }
            })
        ).toEqual({
            customerInfo: { data: {} }
        });
    });
    
    it('should handle setAllSettings', () => {
        expect(
            customerInfoDetail({}, {
                type: setAllSettings.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            allSettings: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });
    
    it('should handle setEditCustomerInfoDetail', () => {
        expect(
            customerInfoDetail({}, {
                type: setEditCustomerInfoDetail.type,
                payload: { isSuccessful: true, message: 'Successfully!' }
            })
        ).toEqual({
            editCustomerInfoDetailResult: { isSuccessful: true, message: 'Successfully!' }
        });
    });

    it('should handle setHeadlinePicRoles', () => {
        expect(
            customerInfoDetail({}, {
                type: setHeadlinePicRoles.type,
                payload: {
                    roles: [{ id: 1, name: 'role' }]
                }
            })
        ).toEqual({
            headlinePicRoles: {
                roles: [{ id: 1, name: 'role' }]
            }
        });
    });

    it('should handle setAccountingPicRoles', () => {
        expect(
            customerInfoDetail({}, {
                type: setAccountingPicRoles.type,
                payload: {
                    roles: [{ id: 1, name: 'role' }]
                }
            })
        ).toEqual({
            accountingPicRoles: {
                roles: [{ id: 1, name: 'role' }]
            }
        });
    });

    it('should handle setSettingCommunicationTool', () => {
        expect(
            customerInfoDetail({}, {
                type: setSettingCommunicationTool.type,
                payload: {
                    communicationTool: [{ communicationId: 1, communicationName: 'zalo' }]
                }
            })
        ).toEqual({
            settingCommunicationTool: {
                communicationTool: [{ communicationId: 1, communicationName: 'zalo' }]
            }
        });
    });

    it('should handle setErrors', () => {
        expect(
            customerInfoDetail({}, {
                type: setErrors.type,
                payload: [{ name: "name is require"}]
            })
        ).toEqual({
            errors: [{ name: "name is require"}]
        });
    });

    it('should handle setHeadlineCompanyService', () => {
        expect(
            customerInfoDetail({}, {
                type: setHeadlineCompanyService.type,
                payload: [{ headlineID: 1, companyServiceName: "test"}]
            })
        ).toEqual({
            headlineCompanyService:  [{ headlineID: 1, companyServiceName: "test"}]
        });
    });

    it('should handle setHeadlineStaffsAndAuthority', () => {
        expect(
            customerInfoDetail({}, {
                type: setHeadlineStaffsAndAuthority.type,
                payload: [{ headlineID: 1, rowID: 1}]
            })
        ).toEqual({
            headlineStaffsAndAuthority:  [{ headlineID: 1, rowID: 1}]
        });
    });

    it('should handle setSettingStaffAndAuthority', () => {
        expect(
            customerInfoDetail({}, {
                type: setSettingStaffAndAuthority.type,
                payload: [{ settingId: 1, settingName: "test"}]
            })
        ).toEqual({
            settingStaffAndAuthority: [{ settingId: 1, settingName: "test"}]
        });
    });

    it('should handle setSettingPicRole', () => {
        expect(
            customerInfoDetail({}, {
                type: setSettingPicRole.type,
                payload: [{ settingId: 1, settingName: "test"}]
            })
        ).toEqual({
            settingPicRole: [{ settingId: 1, settingName: "test"}]
        });
    });

    it('should handle setActiveTab', () => {
        expect(
            customerInfoDetail({}, {
                type: setActiveTab.type,
                payload: {
                    currentTab: "test",
                    nextTab: null
                }
            })
        ).toEqual({
            activeTab: {
                currentTab: "test",
                nextTab: null
            }
        });
    });

    it('should handle setShowConfirmUnSaved', () => {
        expect(
            customerInfoDetail({}, {
                type: setShowConfirmUnSaved.type,
                payload: true
            })
        ).toEqual({
            showConfirmUnSaved: true
        });
    });

    it('should handle setShowAccountInfo', () => {
        expect(
            customerInfoDetail({}, {
                type: setShowAccountInfo.type,
                payload: true
            })
        ).toEqual({
            isShowAccountInfo: true
        });
    });

    it('should handle setShowAccountantPIC', () => {
        expect(
            customerInfoDetail({}, {
                type: setShowAccountantPIC.type,
                payload: true
            })
        ).toEqual({
            isShowAccountantPIC: true
        });
    });
});