import summaryReport, {
    setAllSetting,
    setGridParams,
    setGridData,
    setChartPopup
} from '../summaryReportSlice';

describe('summaryReport reducer', () => {
    it('should handle setAllSettings', () => {
        expect(
            summaryReport({}, {
                type: setAllSetting.type,
                payload: {
                    categories: [],
                    siteTypes: [],
                    yearRange: []
                }
            })
        ).toEqual({
            allSettingData: {
                categories: [],
                siteTypes: [],
                yearRange: []
            }
        });
    });

    it('should handle initial state', () => {
        expect(summaryReport(undefined, {})).toEqual({
            allSettingData: null,
            gridParams: {
                year: new Date().getFullYear(),
                categories: '',
                siteType: 0
            },
            gridData: null,
            contentChartPopup: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            summaryReport({}, {
                type: setGridParams.type,
                payload: {
                    year: new Date().getFullYear(),
                    categories: '3003',
                    siteType: 0
                }
            })
        ).toEqual({
            gridParams: {
                year: 2022,
                categories: '3003',
                siteType: 0
            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            summaryReport({}, {
                type: setGridData.type,
                payload: {
                    categorySummaries: [
                        {
                            id: 3003,
                            name: "Open Account",
                            subCategories: [
                                {
                                    id: 4014,
                                    name: "Super/Master/Agent",
                                    subCategories: null,
                                    summaries: [
                                        {
                                            amount: 1,
                                            month: "FEB"
                                        },
                                        {
                                            amount: 1,
                                            month: "APR"
                                        },
                                        {
                                            amount: 1,
                                            month: "SEP"
                                        }
                                    ]
                                }
                            ],
                            summaries: [
                                {
                                    amount: 1,
                                    month: "FEB"
                                },
                                {
                                    amount: 1,
                                    month: "APR"
                                },
                                {
                                    amount: 1,
                                    month: "SEP"
                                }
                            ]
                        }
                    ],
                    grandTotals: [
                        {
                            amount: 1,
                            month: "FEB"
                        },
                        {
                            amount: 1,
                            month: "APR"
                        },
                        {
                            amount: 1,
                            month: "SEP"
                        }
                    ],
                    months: ["FEB", "APR", "SEP"],
                    reportTitle: "Categories Summary Report For Year 2021"
                }
            })
        ).toEqual({
            gridData: {
                categorySummaries: [
                    {
                        id: 3003,
                        name: "Open Account",
                        subCategories: [
                            {
                                id: 4014,
                                name: "Super/Master/Agent",
                                subCategories: null,
                                summaries: [
                                    {
                                        amount: 1,
                                        month: "FEB"
                                    },
                                    {
                                        amount: 1,
                                        month: "APR"
                                    },
                                    {
                                        amount: 1,
                                        month: "SEP"
                                    }
                                ]
                            }
                        ],
                        summaries: [
                            {
                                amount: 1,
                                month: "FEB"
                            },
                            {
                                amount: 1,
                                month: "APR"
                            },
                            {
                                amount: 1,
                                month: "SEP"
                            }
                        ]
                    }
                ],
                grandTotals: [
                    {
                        amount: 1,
                        month: "FEB"
                    },
                    {
                        amount: 1,
                        month: "APR"
                    },
                    {
                        amount: 1,
                        month: "SEP"
                    }
                ],
                months: ["FEB", "APR", "SEP"],
                reportTitle: "Categories Summary Report For Year 2021"
            }
        });
    });

    it('should handle setChartPopup', () => {
        expect(
            summaryReport({}, {
                type: setChartPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            contentChartPopup: { show: false }
        });
    });
});
