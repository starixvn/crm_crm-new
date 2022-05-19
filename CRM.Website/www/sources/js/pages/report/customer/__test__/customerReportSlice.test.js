import customerReport, {
    setCustomerReport,
    setAllSettings,
    setGridParams
} from '../customerReportSlice';

describe('customerReportSlice reducer', () => {
    it('should handle initial state', () => {
        expect(customerReport(undefined, {})).toEqual({
            customerReport: null,
            allSettings: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 100,
            }
        });
    });

    it('should handle setCustomerReport', () => {
        expect(
            customerReport({}, {
                type: setCustomerReport.type,
                payload: { customerList: [{ headline: 'test' }], totalCustomer: 543 }
            })
        ).toEqual({
            customerReport: { customerList: [{ headline: 'test' }], totalCustomer: 543 }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            customerReport({}, {
                type: setAllSettings.type,
                payload: { languageIds: [{ id: 1, value: 'test' }] }
            })
        ).toEqual({
            allSettings: { languageIds: [{ id: 1, value: 'test' }] }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            customerReport({}, {
                type: setGridParams.type,
                payload: { feedbackId: 720, userName: "test" }
            })
        ).toEqual({
            gridParams: { feedbackId: 720, userName: "test" }
        });
    });
});