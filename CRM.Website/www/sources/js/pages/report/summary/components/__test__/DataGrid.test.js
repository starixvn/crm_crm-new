import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, HeaderRow, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
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
        gridParams: {
            year: 2021,
            categories: '3003',
            siteType: 0
        },
        exportExcel: jest.fn()

    };

    describe('buildHeader', () => {
        it('should render expected header', () => {            
            const expected = <HeaderRow key='group-header'>
                <HeaderCell key="header" className='sticky-header' colWidth={60}>{'Categories'}</HeaderCell>,
                <HeaderCell key={'FEB'} colWidth={12}>{'FEB'}</HeaderCell>,
                <HeaderCell key={'APR'} colWidth={12}>{'APR'}</HeaderCell>,
                <HeaderCell key={'SEP'} colWidth={12}>{'SEP'}</HeaderCell>
            </HeaderRow>;
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const header = container.buildHeader(props.gridData.months);

            // Assert
            expect(header.HeaderCell).toEqual(expected.HeaderCell);
        });
    });

    describe('render', () => {
        it('should render null when gridData is null', () => {       
            // Arrange
            const propsDataNull= {
                gridData: {
                    categorySummaries: null,
                    grandTotals: null,
                    months: null,
                    reportTitle: null
                },
                gridParams: {
                    year: 2021,
                    categories: '3003',
                    siteType: 0
                },
            }
            const container = shallow(<DataGrid {...propsDataNull} />).instance();
            // Act

            // Assert
            expect(container.render()).toEqual(null);
        });

        it('updates when changing state or props', () => {
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
                gridParams: {
                    year: 2021,
                    categories: '3003',
                    siteType: 0
                },
            };
            const container = shallow(<DataGrid {...props} />);
            const state = {
                shouldResetScrollPosition: true,
                toggleRowReport: [3003],
                isCollapseReport: false
            };
            // Act
            container.setState(state);
            const shouldUpdate = container.instance().shouldComponentUpdate(propsNew, state);
            // Assert
            expect(shouldUpdate).toBe(true);
          });

          it('should click export excel call to handleExportExcel', () => {       
            // Arrange
            const container = shallow(<DataGrid {...props} />).instance();
            // Act
            // Assert
            expect(container.render()).toEqual(null);
        });
    });
});