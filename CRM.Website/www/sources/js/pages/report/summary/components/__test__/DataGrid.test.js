import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, HeaderRow, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow, mount } from 'enzyme';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
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
        exportExcel: jest.fn(),
        setChartPopup: jest.fn()
    };

    it('should render expected header', () => {
        const expected = <HeaderRow key='group-header'>
            <HeaderCell key="header" className='sticky-header' colWidth={60}>{'Categories'}</HeaderCell>,
            <HeaderCell key={'FEB'} colWidth={12}>{'FEB'}</HeaderCell>,
            <HeaderCell key={'APR'} colWidth={12}>{'APR'}</HeaderCell>,
            <HeaderCell key={'SEP'} colWidth={12}>{'SEP'}</HeaderCell>
        </HeaderRow>;
        const container = shallow(<DataGrid {...props} />).instance();

        // Act
        const header = container.buildHeader();

        // Assert
        expect(header.HeaderCell).toEqual(expected.HeaderCell);
    });

    it('should render null when gridData is null', () => {
        // Arrange
        const propsDataNull = {
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
        const container = shallow(<DataGrid {...props} />).instance();
        const state = {
            shouldResetScrollPosition: true,
            toggleRowReport: [3003],
            isCollapseReport: false
        };
        // Act
        container.setState(state);
        const shouldUpdate = container.shouldComponentUpdate(propsNew, state);
        // Assert
        expect(shouldUpdate).toBe(true);
    });

    it('should call exactly functions when handle export excel', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.handleExportExcel();
        // Assert
        expect(props.exportExcel).toHaveBeenCalledWith({ categories: "3003", siteType: 0, year: 2021 });
    });

    it('click export excel call exact function', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleExportExcel = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonReport());
        row.find('span').last().simulate('click');
        // Assert
        expect(container.handleExportExcel).toHaveBeenCalled();
    });

    it('row click call handleToggleRow', () => {
        // Arrange
        const container = mount(<DataGrid {...props} />);
        container.instance().handleToggleRow = jest.fn();
        // Act
        container.find(Row).at(0).simulate('click');
        // Assert
        expect(container.instance().handleToggleRow).toHaveBeenCalled();
    });

    it('should render footer null when gridData is empty', () => {
        // Arrange
        const propsData = {
            gridData: {
                categorySummaries: [],
                grandTotals: [],
                months: [],
                reportTitle: "Categories Summary Report For Year 2021"
            },
            gridParams: {
                year: 2021,
                categories: '3003',
                siteType: 0
            },
        }
        const container = shallow(<DataGrid {...propsData} />).instance();
        // Act
        const footer = container.renderFooter(propsData.gridData.categorySummaries);
        // Assert
        expect(footer).toEqual(null);
    });

    it('should call exactly functions when handle Show Chart ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.handleShowChart();
        // Assert
        expect(props.setChartPopup).toHaveBeenCalledWith({ show: true });
    });

    it('should call exactly functions when get Max Width ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        const totalWidth = container.getMaxWidth(400);
        // Assert
        expect(totalWidth).toBe(0);
    });

    it('should call exactly functions when toggleRowReport has data  ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.setState({ toggleRowReport: [3005] });
        container.handleToggleRow(3005);
        // Assert
        expect(container.state.categories).toEqual([]);
    });

    it('should call exactly functions when toggleRowReport is empty  ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.setState({ toggleRowReport: [] });
        container.handleToggleRow(3005);
        // Assert
        expect(container.state.categories).toEqual([3005]);
    });

    it('should call exactly functions when handleCollapseExpandReport with isCollapseReport is true ', () => {
        // Arrange
        const state = {
            shouldResetScrollPosition: true,
            toggleRowReport: [3003],
            isCollapseReport: true
        };
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.setState(state);
        container.handleCollapseExpandReport();
        // Assert
        expect(container.state.toggleRowReport).toEqual([]);
    });

    it('should call exactly functions when handleCollapseExpandReport with isCollapseReport is false ', () => {
        // Arrange
        const state = {
            shouldResetScrollPosition: true,
            toggleRowReport: [],
            isCollapseReport: false
        };
        const container = shallow(<DataGrid {...props} />).instance();
        // Act
        container.setState(state);
        container.handleCollapseExpandReport();
        // Assert
        expect(container.state.toggleRowReport).toEqual([3003]);
    });
});