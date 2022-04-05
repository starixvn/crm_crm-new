import redemptionStatistics, {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails,
    setOpenDetails
} from '../redemptionStatisticsSlice';

describe('redemptionStatistics reducer', () => {
    it('should handle initial state', () => {
        expect(redemptionStatistics(undefined, {})).toEqual({
            settings: null,
            gridParams: null,
            gridParamDetails: {
                pageIndex: 1,
                pageSize: 100
            },
            gridData: null,
            gridDataDetails: null,
            detailPopup: { show: false, title: '' }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            redemptionStatistics({}, {
                type: setGridParams.type,
                payload: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
            })
        ).toEqual({
            gridParams: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            redemptionStatistics({}, {
                type: setAllSettings.type,
                payload: { currencies: {id: 2,name: "RM"} }
            })
        ).toEqual({
            settings:  { currencies: {id: 2,name: "RM"} }
        });
    });

    it('should handle setRedemptionSummary', () => {
        expect(
            redemptionStatistics({}, {
                type: setRedemptionSummary.type,
                payload: {
                    data:[{claimTime: "Jan 01, 0001 12:00:00 AM", subject: null, month: 12, year: 2021}],
                    title: "Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022",
                    totals: {RM: 5, US$: 15, EURO: 2}
                }
            })
        ).toEqual({
            gridData: {
                data:[{claimTime: "Jan 01, 0001 12:00:00 AM", subject: null, month: 12, year: 2021}],
                title: "Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022",
                totals: {RM: 5, US$: 15, EURO: 2}
            }
        });
    });

    it('should handle setGridParamDetails', () => {
        expect(
            redemptionStatistics({}, {
                type: setGridParamDetails.type,
                payload: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", doneBy: "sa", status: "KIV" }
            })
        ).toEqual({
            gridParamDetails: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", doneBy: "sa", status: "KIV"}
        });
    });

    it('should handle setRedemptionDetails', () => {
        expect(
            redemptionStatistics({}, {
                type: setRedemptionDetails.type,
                payload: {
                    amount: 2, claimTime: "Oct 04, 2021 12:00:00 AM", currency: "RM",
                    currencyId: 2, doneBy: "sa", status: "Deleted", subject: "test", userName: "881HK"
                }
            })
        ).toEqual({
            gridDataDetails: {
                amount: 2, claimTime: "Oct 04, 2021 12:00:00 AM", currency: "RM",
                currencyId: 2, doneBy: "sa", status: "Deleted", subject: "test", userName: "881HK"
            }
        });
    });

    it('should handle setOpenDetails', () => {
        expect(
            redemptionStatistics({}, {
                type: setOpenDetails.type,
                payload: {
                    show: true, title: 'test' 
                }
            })
        ).toEqual({
            detailPopup: { show: true, title: 'test' }
        });
    });
});