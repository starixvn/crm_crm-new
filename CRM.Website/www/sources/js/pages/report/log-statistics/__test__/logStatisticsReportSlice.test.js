import logStatistics, {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setMainReport,
    setReportDetails,
    setDetailsDataGrid,
    setChartData
} from '../logStatisticsSlice';

describe('logStatistics reducer', () => {
    it('should handle setAllSettings', () => {
        expect(
            logStatistics({}, {
                type: setAllSettings.type,
                payload: {
                    communicationTools: [],
                    mainCategories: [],
                    products: []
                }
            })
        ).toEqual({
            settings: {
                communicationTools: [],
                mainCategories: [],
                products: []
            }
        });
    });

    it('should handle initial state', () => {
        expect(logStatistics(undefined, {})).toEqual({
            settings: null,
            gridParams: null,
            gridParamDetails: {
                pageIndex: 1,
                pageSize: 100
            },
            mainReports: null,
            reportDetails: null,
            details: { show: false, title: '' },
            chart: { show: false, title: '', data: null }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            logStatistics({}, {
                type: setGridParams.type,
                payload: {
                    communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                    fromDate: "Apr 17, 2022",
                    mainCategoryId: "3000,3001,3002,3003,3004,3005,3064,3065",
                    productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                    toDate: "Apr 23, 2022"
                }
            })
        ).toEqual({
            gridParams: {
                communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                fromDate: "Apr 17, 2022",
                mainCategoryId: "3000,3001,3002,3003,3004,3005,3064,3065",
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                toDate: "Apr 23, 2022"
            }
        });
    });

    it('should handle setChartData', () => {
        expect(
            logStatistics({}, {
                type: setChartData.type,
                payload: { show: false, title: '', data: null }
            })
        ).toEqual({
            chart: { show: false, title: '', data: null }
        });
    });

    it('should handle details', () => {
        expect(
            logStatistics({}, {
                type: setDetailsDataGrid.type,
                payload: { show: false, title: '' }
            })
        ).toEqual({
            details: { show: false, title: '' }
        });
    });

    it('should handle mainReports', () => {
        expect(
            logStatistics({}, {
                type: setMainReport.type,
                payload: {
                    ibcReport: [],
                    licenseeReport: []
                }
            })
        ).toEqual({
            mainReports: {
                ibcReport: [],
                licenseeReport: []
            }
        });
    });

    it('should handle setGridParamDetails', () => {
        expect(
            logStatistics({}, {
                type: setGridParamDetails.type,
                payload: {
                    communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                    fromDate: "Apr 17, 2022",
                    mainCategoryId: "3000,3001,3002,3003,3004,3005,3006,3008,3009,3010,3011,3013,3014,3015",
                    pageIndex: 1,
                    pageSize: 100,
                    productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                    siteType: 0,
                    toDate: "Apr 23, 2022"
                }
            })
        ).toEqual({
            gridParamDetails: {
                communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                fromDate: "Apr 17, 2022",
                mainCategoryId: "3000,3001,3002,3003,3004,3005,3006,3008,3009,3010,3011,3013,3014,3015",
                pageIndex: 1,
                pageSize: 100,
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                siteType: 0,
                toDate: "Apr 23, 2022"
            }
        });
    });

    it('should handle setGridParamDetails', () => {
        expect(
            logStatistics({}, {
                type: setReportDetails.type,
                payload: {
                    communicationTools: [],
                    extensions: [],
                    mainCategories: [],
                    products: [],
                    report: [],
                    subProducts: [],
                    totalRows: 2
                }
            })
        ).toEqual({
            reportDetails: {
                communicationTools: [],
                extensions: [],
                mainCategories: [],
                products: [],
                report: [],
                subProducts: [],
                totalRows: 2
            }
        });
    });
});
