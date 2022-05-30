import React from 'react';
import { Chart } from '../Chart';
import { shallow } from 'enzyme';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
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
        },
        setChartPopup: jest.fn()
    };

    it('render chart component', () => {
        // Arrange       

        // Act
        const container = shallow(<Chart {...props} />);
        const labels = container.instance().getLabels(props.gridData.categorySummaries);
        const data = container.instance().convertDataChart(props.gridData.months, props.gridData.categorySummaries);

        // Assert
        expect(data).toEqual([{"Open Account": 1, "name": "FEB"}, {"Open Account": 1, "name": "APR"}, {"Open Account": 1, "name": "SEP"}]);
        expect(labels).toEqual(["Open Account"]);
    });

    it('render chart component when data has two subcategories', () => {
        // Arrange       
        const propsNew = {
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
                    },
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
        };
        // Act
        const container = shallow(<Chart {...propsNew} />);
        const labels = container.instance().getLabels(props.gridData.categorySummaries);
        const data = container.instance().convertDataChart(props.gridData.months, props.gridData.categorySummaries);

        // Assert
        expect(data).toEqual([{"Open Account": 1, "name": "FEB"}, {"Open Account": 1, "name": "APR"}, {"Open Account": 1, "name": "SEP"}]);
        expect(labels).toEqual(["Open Account"]);
    });

    it('should call exactly functions when onCloseChart', () => {       
        // Arrange
        const container = shallow(<Chart {...props} />).instance();
        // Act
        container.onCloseChart(); 
        // Assert
        expect(props.setChartPopup).toHaveBeenCalledWith({ show: false });
    });
});