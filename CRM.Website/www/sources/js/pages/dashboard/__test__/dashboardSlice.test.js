import dashboard, {
    resetState,
    setLastFiveRemark,
    setLastFiveSpecialRemarks,
    setRedemptionLogs,
    setEditRedemptionDialog,
    setCommunicationLogs,
    setNoOfInquiryDialog,
    setEditCommunicationDialog,
    setCreateCommunicationDialog,
    setCustomerInfoVerify,
    setEditCustomerVerifyDialog
} from '../dashboardSlice';

describe('dashboardSlice reducer', () => {
    it('show handle reset state', () => {
        expect(dashboard({}, {
            type: resetState.type,
            payload: { data: {} }
        })).toEqual({
            customerRemarks: null,
            redemptions: null,
            editRedemptionDialog: { show: false },
            communicationLogs: null,
            lastFiveRemarks: null,
            noOfInquiryDialog: { show: false },
            editCommunicationDialog: { show: false },
            createCommunicationDialog: { show: false },
            customerInfoVerify: null,
            editCustomerVerifyDialog: { show: false }
        });
    });

    it('should handle initial state', () => {
        expect(dashboard(undefined, {})).toEqual({
            customerRemarks: null,
            redemptions: null,
            editRedemptionDialog: { show: false },
            communicationLogs: null,
            lastFiveRemarks: null,
            noOfInquiryDialog: { show: false },
            editCommunicationDialog: { show: false },
            createCommunicationDialog: { show: false },
            customerInfoVerify: null,
            editCustomerVerifyDialog: { show: false }
        });
    });

    it('should handle setLastFiveSpecialRemarks', () => {
        expect(
            dashboard({}, {
                type: setLastFiveSpecialRemarks.type,
                payload: ['<div>test</div>']
            })
        ).toEqual({
            customerRemarks: ['<div>test</div>']
        });
    });

    it('should handle setRedemptionLogs', () => {
        expect(
            dashboard({}, {
                type: setRedemptionLogs.type,
                payload: { id: 1, subject: 'test'}
            })
        ).toEqual({
            redemptions: { id: 1, subject: 'test'}
        });
    });

    it('should handle setEditRedemptionDialog', () => {
        expect(
            dashboard({}, {
                type: setEditRedemptionDialog.type,
                payload: { show: true, id: 1 }
            })
        ).toEqual({
            editRedemptionDialog: { show: true, id: 1 }
        });
    });

    it('should handle setCommunicationLogs', () => {
        expect(
            dashboard({}, {
                type: setCommunicationLogs.type,
                payload: {
                    data: [{ feedbackId: 123, setting: [{ settingId: 3000, subSettingId: 4000 }]}],
                    mainCategories: [{ settingId: 3000, settingName: 'MainCategory' }]
                }
            })
        ).toEqual({
            communicationLogs: {
                data: [{ feedbackId: 123, setting: [{ settingId: 3000, subSettingId: 4000 }]}],
                mainCategories: [{ settingId: 3000, settingName: 'MainCategory' }]
            }
        });
    });

    it('should handle setNoOfInquiryDialog', () => {
        expect(
            dashboard({}, {
                type: setNoOfInquiryDialog.type,
                payload: { show: true, id: 1 }
            })
        ).toEqual({
            noOfInquiryDialog: { show: true, id: 1 }
        });
    });

    it('should handle setEditCommunicationDialog', () => {
        expect(
            dashboard({}, {
                type: setEditCommunicationDialog.type,
                payload: { show: true, id: 1 }
            })
        ).toEqual({
            editCommunicationDialog: { show: true, id: 1 }
        });
    });

    it('should handle setCreateCommunicationDialog', () => {
        expect(
            dashboard({}, {
                type: setCreateCommunicationDialog.type,
                payload: { show: true, id: 1 }
            })
        ).toEqual({
            createCommunicationDialog: { show: true, id: 1 }
        });
    });

    it('should handle setCustomerInfoVerify', () => {
        expect(
            dashboard({}, {
                type: setCustomerInfoVerify.type,
                payload: { email: '---', passport: '---', isVerifyEmail: true }
            })
        ).toEqual({
            customerInfoVerify: { email: '---', passport: '---', isVerifyEmail: true }
        });
    });

    it('should handle setEditCustomerVerifyDialog', () => {
        expect(
            dashboard({}, {
                type: setEditCustomerVerifyDialog.type,
                payload: { show: true, id: 1 }
            })
        ).toEqual({
            editCustomerVerifyDialog: { show: true, id: 1 }
        });
    });

    it('should handle setLastFiveRemark', () => {
        expect(
            dashboard({}, {
                type: setLastFiveRemark.type,
                payload: { acknowledger: null,
                    acknowledgerID: 0,
                    approver: null,
                    approverID: 0,
                    createdDate: "2022-05-17T15:00:05.81",
                    creator: null,
                    creatorID: 0,
                    custID: 9670720,
                    ext: 0,
                    extStation: null,
                    handler: null,
                    handlerID: 0}
            })
        ).toEqual({
            lastFiveRemarks: { acknowledger: null,
                acknowledgerID: 0,
                approver: null,
                approverID: 0,
                createdDate: "2022-05-17T15:00:05.81",
                creator: null,
                creatorID: 0,
                custID: 9670720,
                ext: 0,
                extStation: null,
                handler: null,
                handlerID: 0 }
        });
    });
});