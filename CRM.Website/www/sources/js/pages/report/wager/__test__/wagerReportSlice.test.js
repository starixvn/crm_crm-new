import wagerReport, {
    setGridParams,
    setGridData
} from '../wagerReportSlice';

describe('WagerReport reducer', () => {
    it('should handle initial state', () => {
        expect(wagerReport(undefined, {})).toEqual({
            gridParams: {
                year: new Date().getFullYear()
            },
            gridData: null
        });
    });

    it('should handle setGridParams', () => {
        expect(
            wagerReport({}, {
                type: setGridParams.type,
                payload: {
                   year: new Date().getFullYear()

                }
            })
        ).toEqual({
            gridParams: {
                year: new Date().getFullYear()

            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            wagerReport({}, {
                type: setGridData.type,
                payload: {
                    GrandTotal: {
                        Month: "test",
                        Total: 65,
                        Wagers: [{Id: 0, Name: "test", Amount: 10}, {Id: 0, Name: "test", Amount: 10}]
                    },
                    ReportTitle: "test",
                    WagerByMonths: [{Month: "test", Wagers: [{Id: 0, Name: "test", Amount: 1}, {Id: 0, Name: "test", Amount: 1}]}]
                }
            })
        ).toEqual({
            gridData: {
                GrandTotal: {
                    Month: "test",
                    Total: 65,
                    Wagers: [{Id: 0, Name: "test", Amount: 10}, {Id: 0, Name: "test", Amount: 10}]
                },
                ReportTitle: "test",
                WagerByMonths: [{Month: "test", Wagers: [{Id: 0, Name: "test", Amount: 1}, {Id: 0, Name: "test", Amount: 1}]}]
            }
        });
    });
});
