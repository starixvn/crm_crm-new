import dynamicReport, {
    setDynamicReports,
    setAllSettings,
    setGridParams,
    setViewCommunicationDialog,
    setViewChartDialog
} from '../dynamicReportSlice';

describe('dynamicReportSlice reducer', () => {
    it('should handle initial state', () => {
        expect(dynamicReport(undefined, {})).toEqual({
            dynamicReports: null,
            allSettings: null,
            gridParams: {},
            viewCommunicationDialog: { show: false },
            viewChartDialog: { show: false, chartInfo: {} }
        });
    });

    it('should handle setDynamicReport', () => {
        expect(
            dynamicReport({}, {
                type: setDynamicReports.type,
                payload: { feedbackId: 720, userName:"test" }
            })
        ).toEqual({
            dynamicReports: { feedbackId: 720, userName:"test" }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            dynamicReport({}, {
                type: setAllSettings.type,
                payload: { extension: [{ id: 1, value: 'test'}] }
            })
        ).toEqual({
            allSettings: { extension: [{ id: 1, value: 'test'}] }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            dynamicReport({}, {
                type: setGridParams.type,
                payload: { feedbackId: 720, userName:"test" }
            })
        ).toEqual({
            gridParams: { feedbackId: 720, userName:"test" }
        });
    });

    it('should handle setViewCommunicationDialog', () => {
        expect(
            dynamicReport({}, {
                type: setViewCommunicationDialog.type,
                payload: { show: true, feedbackId: 1 }
            })
        ).toEqual({
            viewCommunicationDialog: { show: true, feedbackId: 1 }
        });
    });

    it('should handle setViewChartDialog', () => {
        expect(
            dynamicReport({}, {
                type: setViewChartDialog.type,
                payload: { show: true, chartInfo: {} }
            })
        ).toEqual({
            viewChartDialog: { show: true, chartInfo: {} }
        });
    });
});