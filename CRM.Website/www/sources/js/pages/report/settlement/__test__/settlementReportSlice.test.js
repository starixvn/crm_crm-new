import settlementReport, {
    setGridParams,
    setGridData,
    setChartPopup
} from '../settlementReportSlice';

describe('settlementReport reducer', () => {
    it('should handle initial state', () => {
        expect(settlementReport(undefined, {})).toEqual({
            gridParams: {
                year: new Date().getFullYear(),
                pageIndex: 1,
                pageSize: 12
            },
            gridData: null,
            contentChartPopup: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            settlementReport({}, {
                type: setGridParams.type,
                payload: {
                    year: 2019,
                    pageIndex: 1,
                    pageSize: 12
                }
            })
        ).toEqual({
            gridParams: {
                year: 2019,
                pageIndex: 1,
                pageSize: 12
            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            settlementReport({}, {
                type: setGridData.type,
                payload: {
                    name: "Settlement Issues Report For Year 2019",
                    childReports: [
                        {
                            name: "Oct",
                            childReports: [
                                {
                                    id: 100,
                                    name: "Italy",
                                    numberOfIssues: 2
                                }
                            ]
                        }
                    ],
                    total: {
                        name: "Grand Total",
                        numberOfIssues: 2,
                        childReports: [
                            {
                                id: 100,
                                name: "Italy",
                                numberOfIssues: 2
                            }
                        ]
                    },
                    totalChildReports: 1,
                    chartInfo: {
                        name: "Settlement Issues Report For Year 2019",
                        numberOfIssues: 2,
                        childReports: [
                            {
                                name: "Oct",
                                numberOfIssues: 2,
                                childReports: [
                                    {
                                        name: "Italy",
                                        numberOfIssues: 2
                                    }
                                ]
                            }
                        ]
                    }
                }
            })
        ).toEqual({
            gridData: {
                name: "Settlement Issues Report For Year 2019",
                childReports: [
                    {
                        name: "Oct",
                        childReports: [
                            {
                                id: 100,
                                name: "Italy",
                                numberOfIssues: 2
                            }
                        ]
                    }
                ],
                total: {
                    name: "Grand Total",
                    numberOfIssues: 2,
                    childReports: [
                        {
                            id: 100,
                            name: "Italy",
                            numberOfIssues: 2
                        }
                    ]
                },
                totalChildReports: 1,
                chartInfo: {
                    name: "Settlement Issues Report For Year 2019",
                    numberOfIssues: 2,
                    childReports: [
                        {
                            name: "Oct",
                            numberOfIssues: 2,
                            childReports: [
                                {
                                    name: "Italy",
                                    numberOfIssues: 2
                                }
                            ]
                        }
                    ]
                }
            }
        });
    });

    it('should handle setChartPopup', () => {
        expect(
            settlementReport({}, {
                type: setChartPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            contentChartPopup: { show: false }
        });
    });
});
