import React from 'react';
import DataGrid from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    it('render null when data is empty', () => {
        // Arrange
        const props = {
            gridData: null,
            isHost: true
        };

        // Action
        const dataGrid = shallow(<DataGrid {...props} />);

        // Assert
        expect(dataGrid).toBeNull;
    });
    

    describe('methods', () => {
        describe('onPaging', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParams: jest.fn(),
                    getGridData: jest.fn()
                };
                const expectedGridParams = { pageIndex: 1, pageSize: 100 };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedGridParams);
                expect(props.getGridData).toHaveBeenCalledWith(expectedGridParams);
            });
        });

        describe('handleDelete', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    setDeletePopup: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleDelete(1);

                // Assert
                expect(props.setDeletePopup).toHaveBeenCalledWith(1);
            });
        });

        describe('toggleExpandPanels', () => {
            it('should call exact function when grid has data', () => {
                // Arrange
                const props = {
                    gridData: {
                        data: [{content_ch:"", content_cs: "", content_en:"49 - paging test", content_th:"", content_vn: ''}]
                    },
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    }
                };
                const prevState = {
                    expandPanels : false
                  };
                const container = shallow(<DataGrid {...props} />).instance();
                container.setState(prevState);
                // Act
                container.toggleExpandPanels(1);

                // Assert
                expect(container.state.expandPanels).toBeTrue;
            });
        });

        describe('buildHeader', () => {
            it('should render expected header when isHost = false', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.buildHeader(false));

                // Assert
                expect(header.find(HeaderCell).length).toBe(6);
            });

            it('should render expected header when isHost = true', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.buildHeader(true));

                // Assert
                expect(header.find(HeaderCell).length).toBe(7);
            });
        describe('buildBody', () => {
            it('should render no data when gridData is empty', () => {
                // Arrange
                const props = {
                    gridData: {
                        totalItems: 0,
                        data: []
                    },
                    isHost: true,
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                const actual = container.buildBody(true);
    
                // Assert
                expect(actual).toEqual([<Row key='body-table' className="no-data"><Cell colSpan={8}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>]);
            });
    
            it('should render expected rows when gridData has data', () => {
                // Arrange
                const props = {
                    gridData: {
                        totalItems: 1,
                        data: [{content_ch:"", content_cs: "", content_en:"49 - paging test", content_th:"", content_vn: ''}]
                    },
                    isHost: true,
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderRow = jest.fn(() => <div />);
    
                // Act
                const actual = container.buildBody(true);
    
                // Assert
                expect(actual).toEqual([<div />]);
                });
            });
        });
    });
});