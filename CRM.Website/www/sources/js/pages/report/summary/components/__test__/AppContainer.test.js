import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import Chart from '../Chart';


describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly when gridData null', () => {
            // Arrange
            const props = {
                allSettingData: {
                    categories: [],
                    siteTypes: [],
                    yearRange: []
                },
                gridData: null,
                contentChartPopup: { show: false },
                getAllSetting: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(Chart).length).toBe(0);
        });

        it('should render correctly when allSettingData  null', () => {
            // Arrange
            const props = {
                allSettingData: null,
                gridData: null,
                contentChartPopup: { show: false },
                getAllSetting: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(0);
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(Chart).length).toBe(0);
        });

        it('should render correctly when gridData undefined', () => {
            // Arrange
            const props = {
                allSettingData: {
                    categories: [],
                    siteTypes: [],
                    yearRange: []
                },
                gridData: undefined,
                contentChartPopup: { show: false },
                getAllSetting: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(0);
            expect(container.find(Chart).length).toBe(0);
        });

        it('should render correctly when gridData null', () => {
            // Arrange
            const props = {
                allSettingData: {
                    categories: [],
                    siteTypes: [],
                    yearRange: []
                },
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
                contentChartPopup: { show: true },
                getAllSetting: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(Chart).length).toBe(1);
        });
    });
});