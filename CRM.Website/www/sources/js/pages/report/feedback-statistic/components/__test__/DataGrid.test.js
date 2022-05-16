import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
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

    const initProps = {
        gridData: {
            feedbackCategories: [{
                id: 3024,
                name: 'Special Notification',
                feedbackSubcategories: [{
                    id: 4352,
                    name: 'Abnormal Account',
                    resolves: [5],
                    total: 5
                }],
                subTotal: {id: 0, name: null, resolves: [5], total: 5}
            }],
            id: 1,
            grandTotals: [5],
            usernames: [{id: 10278938, name: 'starixIT'}],
            title: "Feedback Statistics Report from Mar 22, 2022 to Mar 25, 2022",
            totalItems: 1
        },
        gridParams: { pageIndex: 1, pageSize: 100 },
        setOpenDetailPopup: jest.fn(),
        getDetails: jest.fn(),
        setGridParamDetails: jest.fn(),
        setOpenChartPopup: jest.fn(),
        setGridParams: jest.fn(),
        getGridData: jest.fn(),
        exportExcel: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange

            // Act
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const header = shallow(container.buildHeader(initProps.gridData));

            // Assert
            expect(header.find(HeaderCell).length).toBe(2);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: {
                    usernames: [],
                    feedbackCategories: [],
                    grandTotals: []
                },
                gridParams: { pageIndex: 1, pageSize: 100 }
            };
            const expectedBody = [<Row key='body1' className='no-data' ><Cell className='text-center'>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();
            // Act
            const actual = container.buildBody(props.gridData);

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.renderMainCategoryRows = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody(initProps.gridData);

            // Assert
            expect(actual).toEqual([[<div />]]);
        });

        it('row click call handleToggleRow', () => {
            // Arrange
            const container = mount(<DataGrid {...initProps} />);
            container.instance().handleToggleRow = jest.fn();
            // Act
            container.find(Row).at(0).simulate('click');
            // Assert
            expect(container.instance().handleToggleRow).toHaveBeenCalled();
        });

        it('cell click call handleShowDetails', () => {
            // Arrange
            const container = mount(<DataGrid {...initProps} />);
            container.instance().handleShowDetails = jest.fn();
            // Act
            container.find('.link-click').at(0).simulate('click');
            // Assert
            expect(container.instance().handleShowDetails).toHaveBeenCalled();
        });
    });

    describe('handleToggleRow ', () => {
        it('should setState', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleToggleRow(1);

            // Assert
            expect(container.state.toggleRow).toEqual([1]);
        });
    });

    describe('renderCustomButton', () => {
        it('click view chart call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />);
            container.instance().handleViewChart = jest.fn();
            // Act
            const row = shallow(container.instance().renderCustomButton());
            row.find('span').at(0).simulate('click');
            // Assert
            expect(container.instance().handleViewChart).toHaveBeenCalled();
        });

        it('click view detail call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />);
            container.instance().handleShowDetails = jest.fn();
            // Act
            const row = shallow(container.instance().renderCustomButton());
            row.find('span').at(1).simulate('click');
            // Assert
            expect(container.instance().handleShowDetails).toHaveBeenCalled();
        });

        it('click collapse call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />);
            container.instance().handleCollapseExpand = jest.fn();
            // Act
            const row = shallow(container.instance().renderCustomButton());
            row.find('span').at(2).simulate('click');
            // Assert
            expect(container.instance().handleCollapseExpand).toHaveBeenCalled();
        });

        it('click export excel call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />);
            container.instance().handleExportExcel = jest.fn();
            // Act
            const row = shallow(container.instance().renderCustomButton());
            row.find('span').at(3).simulate('click');
            // Assert
            expect(container.instance().handleExportExcel).toHaveBeenCalled();
        });
    });

    describe('renderSubCategoryRows', () => {
        it('should return null', () => {
            // Arrange
            const state = {
                toggleRow: [1]
            };
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.setState(state);
            // Act
            const actual = container.renderSubCategoryRows(1, null, '');
            // Assert
            expect(actual).toBeNull();
        });
    });

    describe('handleShowDetails ', () => {
        it('should call exact function', () => {
            // Arrange
            const params = {...initProps.gridParams, valueId: 1, mainCategoryId: 1, subCategoryId: 1};
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleShowDetails(1, 1, 1);
            // Assert
            expect(initProps.setOpenDetailPopup).toHaveBeenCalledWith({show: true});
            expect(initProps.getDetails).toHaveBeenCalledWith(params);
            expect(initProps.setGridParamDetails).toHaveBeenCalledWith(params);
        });
    });

    describe('handleExportExcel  ', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleExportExcel();
            // Assert
            expect(initProps.exportExcel).toHaveBeenCalledWith(initProps.gridParams);
        });
    });

    describe('handleViewChart', () => {
        it('should call exact function', () => {
            // Arrange
            const gridData = initProps.gridData;
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleViewChart(gridData);
            // Assert
            expect(initProps.setOpenChartPopup).toHaveBeenCalledWith({show: true, chartInfo: gridData});
        });
    });

    describe('handleCollapseExpand', () => {
        it('should call setState when isCollapse is false', () => {
            // Arrange
            const state = {
                isCollapse: false,
                toggleRow: [2]
            };
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.setState(state);
            // Act
            container.handleCollapseExpand();
            // Assert
            expect(container.state.isCollapse).toBeTruthy();
            expect(container.state.toggleRow).toEqual([2,3024]);
        });

        it('should call setState when isCollapse is true', () => {
            // Arrange
            const state = {
                isCollapse: true,
                toggleRow: [2]
            };
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.setState(state);
            // Act
            container.handleCollapseExpand();
            // Assert
            expect(container.state.isCollapse).toBeFalsy();
            expect(container.state.toggleRow).toEqual([]);
        });
    });
    

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<DataGrid {...initProps} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(initProps.getGridData).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {
                gridData: null
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });
    });
});