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
        appContainer.setAttribute('id', 'app-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const props = {
        gridParams: {
            communicationId: "1000",
            fromDate: "Apr 24, 2022",
            mainCategoryId: "3000",
            productId: "46000",
            toDate: "Apr 25, 2022"
        },
        mainReports: {
            ibcReport: {
                communicationColumns: [{
                    id: 1000,
                    name: "Phone"
                }],
                excelFileName: "MBC_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                id: 0,
                mainCategories: [{
                    id: 3000,
                    listOfCommunicationCount: [0],
                    listOfCommunicationSumByProduct: [0],
                    name: "General Network/Database Issues",
                    subCategories: [{
                        id: 4000,
                        name: "Agency Site Network Issue"
                    },
                    {
                        id: 4002,
                        name: "Member Site Database/Bug Report"
                    },
                    {
                        id: 4010,
                        name: "Transfer Assistance"
                    },
                    {
                        id: 4029,
                        name: "N/A"
                    },
                    {
                        id: 4031,
                        name: "Internal backend"
                    }],
                }],
                name: "MBC Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                productColumns: [{
                    id: 46000,
                    name: "Sportsbook"
                }]
            },
            licenseeReport: {
                communicationColumns: [{
                    id: 1000,
                    name: "Phone"
                }],
                excelFileName: "Licensee_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                id: 0,
                mainCategories: [{
                    id: 3000,
                    listOfCommunicationCount: [0],
                    listOfCommunicationSumByProduct: [0],
                    name: "General Network/Database Issues",
                    subCategories: [{
                        id: 4000,
                        name: "Agency Site Network Issue"
                    },
                    {
                        id: 4002,
                        name: "Member Site Database/Bug Report"
                    },
                    {
                        id: 4010,
                        name: "Transfer Assistance"
                    },
                    {
                        id: 4029,
                        name: "N/A"
                    },
                    {
                        id: 4031,
                        name: "Internal backend"
                    }],
                }],
                name: "Licensee Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                productColumns: [{
                    id: 46000,
                    name: "Sportsbook"
                }]
            }
        },
        setDetailsDataGrid: jest.fn(),
        setGridParamDetails: jest.fn(),
        getReportDetails: jest.fn(),
        exportExcel: jest.fn(),
        setChartData: jest.fn()
    };

    it('should render expected header', () => {
        // Arrange
        const expected = [
            <HeaderRow onSort={null}>
                <HeaderCell className="sticky-header" colWidth={30} onSort={null} rowSpan={2} sortBy={null} sortOrder={null}>ComplaintsEnquiries</HeaderCell>
                <HeaderCell colSpan={2} onSort={null} sortBy={null} sortOrder={null}>Sportsbook</HeaderCell>
            </HeaderRow>,
            <HeaderRow onSort={null}>
                <HeaderCell colWidth={12} onSort={null} sortBy={null} sortOrder={null}>Phone</HeaderCell>
                <HeaderCell colWidth={12} onSort={null} sortBy={null} sortOrder={null}>Total</HeaderCell>
            </HeaderRow>];
        // Act
        const container = shallow(<DataGrid {...props} />).instance();
        const header = container.buildHeader(props.mainReports.ibcReport);

        // Assert
        expect(header.HeaderRow).toEqual(expected.HeaderRow);
        expect(header.HeaderCell).toEqual(expected.HeaderCell);
    });

    it('should render null when mainReport is null', () => {
        const propsDataNull = {
            gridParams: {
                communicationId: "1000",
                fromDate: "Apr 24, 2022",
                mainCategoryId: "3000",
                productId: "46000",
                toDate: "Apr 25, 2022"
            },
            mainReports: null
        }
        // Act
        const container = shallow(<DataGrid {...propsDataNull} />);
        const render = container.instance().render();
        // Assert
        expect(render).toEqual(null);
    });

    it('should render no data when mainCategories is empty', () => {
        // Arrange
        const propsNullMainReport = {
            gridParams: {
                communicationId: "1000",
                fromDate: "Apr 24, 2022",
                mainCategoryId: "3000",
                productId: "46000",
                toDate: "Apr 25, 2022"
            },
            mainReports: {
                ibcReport: {
                    communicationColumns: [],
                    excelFileName: "MBC_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                    id: 0,
                    mainCategories: [],
                    name: "MBC Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                    productColumns: []
                },
                licenseeReport: {
                    communicationColumns: [],
                    excelFileName: "Licensee_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                    id: 0,
                    mainCategories: [],
                    name: "Licensee Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                    productColumns: []
                }
            }
        };
        // Act
        const container = shallow(<DataGrid {...propsNullMainReport} />);
        const body = container.instance().buildBody(props.mainReports.ibcReport, 'mbc');
        // Assert
    });

    it('updates when changing state or props', () => {
        // Arrange
        const propsNext = {
            gridParams: {
                communicationId: "1000",
                fromDate: "Apr 24, 2022",
                mainCategoryId: "3000",
                productId: "46000",
                toDate: "Apr 25, 2022"
            },
            mainReports: {
                ibcReport: {
                    communicationColumns: [{
                        id: 1000,
                        name: "Phone"
                    }],
                    excelFileName: "MBC_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                    id: 0,
                    mainCategories: [{
                        id: 3000,
                        listOfCommunicationCount: [0],
                        listOfCommunicationSumByProduct: [0],
                        name: "General Network/Database Issues",
                        subCategories: [{
                            id: 4000,
                            name: "Agency Site Network Issue"
                        },
                        {
                            id: 4002,
                            name: "Member Site Database/Bug Report"
                        },
                        {
                            id: 4020,
                            name: "Transfer Assistance"
                        },
                        {
                            id: 4039,
                            name: "N/A"
                        },
                        {
                            id: 4031,
                            name: "Internal backend"
                        }],
                    }],
                    name: "MBC Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                    productColumns: [{
                        id: 46000,
                        name: "Sportsbook"
                    }]
                },
                licenseeReport: {
                    communicationColumns: [{
                        id: 1000,
                        name: "Phone"
                    }],
                    excelFileName: "Licensee_Daily_Log_Statistics_Apr_24_2022_Apr_25_2022",
                    id: 0,
                    mainCategories: [{
                        id: 3000,
                        listOfCommunicationCount: [0],
                        listOfCommunicationSumByProduct: [0],
                        name: "General Network/Database Issues",
                        subCategories: [{
                            id: 4000,
                            name: "Agency Site Network Issue"
                        },
                        {
                            id: 4002,
                            name: "Member Site Database/Bug Report"
                        },
                        {
                            id: 4010,
                            name: "Transfer Assistance"
                        },
                        {
                            id: 4029,
                            name: "N/A"
                        },
                        {
                            id: 4031,
                            name: "Internal backend"
                        }],
                    }],
                    name: "Licensee Daily Log Statistics | Apr 24, 2022 - Apr 25, 2022",
                    productColumns: [{
                        id: 46000,
                        name: "Sportsbook"
                    }]
                }
            }
        };
        const state = {
            shouldResetScrollPosition: true,
            toggleRowDaily: [3000],
            toggleRowLicensee: [3000],
            isCollapseDaily: false,
            isCollapseLicensee: false,
            widthTotalColumns: 0
        };
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().setState(state);
        const shouldUpdate = container.instance().shouldComponentUpdate(propsNext, state);
        // Assert
        expect(shouldUpdate).toBe(true);
    });

    it('row click call handleToggleRow when not have toggleName', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.setState({ toggleRowDaily : [] });
        container.instance().handleToggleRow(3000, 'mbc');
        // Assert
        expect(container.instance().state.toggleName).toEqual([3000]);
    });

    it('row click call handleToggleRow when have toggleName', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().setState({ toggleRowDaily : [3000] })
        container.instance().handleToggleRow(3000, 'mbc');
        // Assert
        expect(container.instance().state.toggleName).toEqual([]);
    });

    it('should work exactly function getTitle MBC Daily Customer', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        const title = container.instance().getTitle('mbc');
        // Assert
        expect(title).toEqual("MBC Daily Customer Complaints/Enquiries From Apr 24, 2022-Apr 25, 2022");
    });

    it('should work exactly function getTitle ', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        const title = container.instance().getTitle('licensee');
        // Assert
        expect(title).toEqual("Licensee Daily Customer Complaints/Enquiries From Apr 24, 2022-Apr 25, 2022");
    });

    it('should work exactly function handleShowDetails  ', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().handleShowDetails ('licensee');
        // Assert
        expect(props.setDetailsDataGrid).toHaveBeenCalled();
        expect(props.setGridParamDetails).toHaveBeenCalled();
        expect(props.getReportDetails).toHaveBeenCalled();
    });

    it('should work exactly function handleExportExcel', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().handleExportExcel('licensee');
        // Assert
        expect(props.exportExcel).toHaveBeenCalled();
    });
    
    it('should work exactly function handleViewChart', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().handleViewChart('licensee');
        // Assert
        expect(props.setChartData).toHaveBeenCalled();
    });

    it('should work exactly function handleCollapseExpandLicensee when isCollapseLicensee is true ', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().setState({isCollapseLicensee: true});
        container.instance().handleCollapseExpandLicensee ();
        // Assert
        expect(container.instance().state.toggleRowLicensee).toEqual([]);
    });

    it('should work exactly function handleCollapseExpandLicensee when isCollapseLicensee is false ', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().setState({isCollapseLicensee: false});
        container.instance().handleCollapseExpandLicensee ();
        // Assert
        expect(container.instance().state.toggleRowLicensee).toEqual([3000]);
    });

    it('should work exactly function handleCollapseExpandDaily  when isCollapseDaily is true ', () => {
        // Arrange       
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().setState({isCollapseDaily: true});
        container.instance().handleCollapseExpandDaily();
        // Assert
        expect(container.instance().state.toggleRowDaily).toEqual([]);
    });

    it('should work exactly function handleCollapseExpandDaily  when isCollapseDaily is false ', () => {
        // Arrange       
        const container = shallow(<DataGrid {...props} />);
        // Act
        container.instance().setState({isCollapseDaily: false});
        container.instance().handleCollapseExpandDaily();
        // Assert
        expect(container.instance().state.toggleRowDaily).toEqual([3000]);
    });

    it('click view chart call exact function in renderCustomButtonLicensee ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleViewChart = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonLicensee());
        row.find('span').at(0).simulate('click');
        // Assert
        expect(container.handleViewChart).toHaveBeenCalled();
    });

    it('click show detail call exact function in renderCustomButtonLicensee ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleShowDetails = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonLicensee());
        row.find('span').at(1).simulate('click');
        // Assert
        expect(container.handleShowDetails).toHaveBeenCalled();
    });

    it('click export excel call exact function in renderCustomButtonLicensee ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleExportExcel = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonLicensee());
        row.find('span').at(3).simulate('click');
        // Assert
        expect(container.handleExportExcel).toHaveBeenCalled();
    });

    it('click view chart call exact function in renderCustomButtonDailyLog ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleViewChart = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonDailyLog());
        row.find('span').at(0).simulate('click');
        // Assert
        expect(container.handleViewChart).toHaveBeenCalled();
    });

    it('click show detail call exact function in renderCustomButtonDailyLog ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleShowDetails = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonDailyLog());
        row.find('span').at(1).simulate('click');
        // Assert
        expect(container.handleShowDetails).toHaveBeenCalled();
    });

    it('click export excel call exact function in renderCustomButtonDailyLog ', () => {
        // Arrange
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleExportExcel = jest.fn();
        // Act
        const row = shallow(container.renderCustomButtonDailyLog());
        row.find('span').at(3).simulate('click');
        // Assert
        expect(container.handleExportExcel).toHaveBeenCalled();
    });
});