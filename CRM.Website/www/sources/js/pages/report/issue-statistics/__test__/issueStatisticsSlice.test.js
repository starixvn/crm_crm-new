import issueStatistics, {
    setGridParams,
    setAllSettings,
    setGridData,
    setChartData
} from '../issueStatisticsSlice';

describe('issueStatistics reducer', () => {
    it('should handle initial state', () => {
        expect(issueStatistics(undefined, {})).toEqual({
            settings: null,
            gridParams: {
                pageIndex: 1,
                pageSize: 7
            },
            gridData: null,
            chart: { show: false, data: null}
        });
    });

    it('should handle setGridParams', () => {
        expect(
            issueStatistics({}, {
                type: setGridParams.type,
                payload: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
            })
        ).toEqual({
            gridParams: { userName:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            issueStatistics({}, {
                type: setAllSettings.type,
                payload: { mainCategories: {id: 1, name: 'mainCategory'} }
            })
        ).toEqual({
            settings:  { mainCategories: {id: 1, name: 'mainCategory'} }
        });
    });

    it('should handle setGridData', () => {
        expect(
            issueStatistics({}, {
                type: setGridData.type,
                payload: { }
            })
        ).toEqual({
            gridData: {}
        });
    });

    it('should handle setChartData', () => {
        expect(
            issueStatistics({}, {
                type: setChartData.type,
                payload: { show: false, data: {id: 1, name: 'test'} }
            })
        ).toEqual({
            chart: { show: false , data: {id: 1, name: 'test'} }
        });
    });
});