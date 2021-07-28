import React from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';
import configureMockStore from 'redux-mock-store';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        const mockStore = configureMockStore();
        const initialState = {
            gridParamsCommunication: {},
            gridDataCommunication: {}
        };
        const store = mockStore(initialState);
        const wrapper = shallow(<DataGridWrapper store={store} />);

        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.gridParamsCommunication).toEqual(initialState.gridParamsCommunication);
            expect(wrapper.props().children.props.gridDataCommunication).toEqual(initialState.gridDataCommunication);
        });
    });

    it('render null when gridDataCommunication empty', () => {
        // Arrange
        const props = {
            gridParamsCommunication: {},
            gridDataCommunication: null
        };

        // Action
        const dataGrid = shallow(<DataGrid {...props} />);

        // Assert
        expect(dataGrid).toBeNull;
    });

    describe('default elements', () => {
        it('renders table title correctly', () => {
            // Arrange
            const props = {
                gridParamsCommunication: {},
                gridDataCommunication: {
                    data: []
                }
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find('div').html()).toEqual('<div class="table-title">DefaultCommunicationSetting</div>');
        });

        it('table props should be mapped correctly', () => {
            // Arrange
            const props = {
                gridParamsCommunication: {
                    pageIndex: 1,
                    pageSize: 50
                },
                gridDataCommunication: {
                    totalItems: 1,
                    data: []
                }
            };
            const pagingOption = {
                PageIndex: props.gridParamsCommunication.pageIndex,
                PageSize: props.gridParamsCommunication.pageSize,
                TotalItem: props.gridDataCommunication.totalItems,
                PageList: [50, 100, 200, 500]
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find(Table).length).toBe(1);
            expect(dataGrid.find(Table).props().minWidth).toBe(960);
            expect(dataGrid.find(Table).props().autoWidth).toBeTrue;
            expect(dataGrid.find(Table).props().isPaging).toBeTrue;
            expect(dataGrid.find(Table).props().pageOption).toEqual(pagingOption);
            expect(dataGrid.find(Table).props().containerPadding).toBe(0);
            expect(dataGrid.find(Table).props().adjustedHeight).toBe(10);
        });
    });

    describe('methods', () => {
        describe('onPagingCommunication', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                    gridDataCommunication: {
                        totalItems: 1,
                        data: []
                    },
                    setGridParamsCommunication: jest.fn(),
                    getGridCommunicationSetting: jest.fn()
                };
                const expectedGridParams = { pageIndex: 1, pageSize: 100 };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.onPagingCommunication(expectedGridParams.pageIndex, expectedGridParams.pageSize);

                // Assert
                expect(props.setGridParamsCommunication).toHaveBeenCalledWith(expectedGridParams);
                expect(props.getGridCommunicationSetting).toHaveBeenCalledWith(expectedGridParams);
            });
        });

        describe('buildHeaderCommunication', () => {
            it('should render expected header when isHost = false', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.buildHeaderCommunication(false));

                // Assert
                expect(header.find(HeaderCell).length).toBe(6);
            });

            it('should render expected header when isHost = true', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.buildHeaderCommunication(true));

                // Assert
                expect(header.find(HeaderCell).length).toBe(7);
            });
        });

        describe('buildBodyCommunication', () => {
            it('should render no data when gridDataCommunication is empty', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                    gridDataCommunication: {
                        totalItems: 1,
                        data: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const actual = container.buildBodyCommunication(true);

                // Assert
                expect(actual).toEqual([<Row key={`body${1}`} className='no-data'><Cell className='text-center' colSpan='7'>ThereIsNoData</Cell></Row>]);
            });

            it('should render expected rows when gridDataCommunication has data', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                    gridDataCommunication: {
                        totalItems: 1,
                        data: [{
                            defaultCommId: 1,
                            username: 'asd'
                        }]
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderRowCommunication = jest.fn(() => <div />);

                // Act
                const actual = container.buildBodyCommunication(true);

                // Assert
                expect(actual).toEqual([<div />]);
            });
        });

        describe('handleEdit', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                    gridDataCommunication: {
                        totalItems: 1,
                        data: []
                    },
                    getCommunicationById: jest.fn((params, callback) => callback()),
                    setEditCommunicationPopup: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleEdit(1);

                // Assert
                expect(props.getCommunicationById).toHaveBeenCalledWith(1, expect.any(Function));
            });
        });

        describe('handleDelete', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    gridParamsCommunication: { pageSize: 100, pageIndex: 1 },
                    gridDataCommunication: {
                        totalItems: 1,
                        data: []
                    },
                    setDeleteCommunicationPopup: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleDelete(1, 1);

                // Assert
                expect(props.setDeleteCommunicationPopup).toHaveBeenCalledWith({ show: true, id: 1, index: 1 });
            });
        });

        describe('renderCategoryColumn', () => {
            it('return OverlayTrigger', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();
                container.renderTooltipCategory = jest.fn(() => <div />);

                // Act
                const actual = container.renderCategoryColumn(1, 'a,b,c,e,f,d,a,d,f,d,q,d,d,a,b,c,a,c,1,2,3');

                // Assert
                expect(actual).toEqual(<OverlayTrigger
                    placement="auto"
                    overlay={<div />}
                                       >
                    <span>
                        a, b, c, e, f, d, a, d, f, d, q, d, d, a, b...
                     </span>
                </OverlayTrigger>);
            });

            it('return expected data', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const actual = container.renderCategoryColumn(1, 'a,b,c');
                // container.decodeCatagory = jest.fn(() => 'a,b,c');
                // Assert
                expect(actual).toEqual(<div>a, b, c</div>);
            });

            it('should return null', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const actual = shallow(container.renderCategoryColumn(1, ''));
                // container.decodeHtml = jest.fn(() => []);
                // Assert
                expect(actual.html()).toEqual('<div></div>');
            });
        });

        describe('decodeCatagory', () => {
            it('return expected value', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const actual = container.decodeCatagory('a &amp; b');

                // Assert
                expect(actual).toEqual('a & b');
            });
        });

        describe('renderTooltipCategory', () => {
            it('return component expected', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const actual = container.renderTooltipCategory(1, 'a,b,c');

                // Assert
                expect(actual).toEqual(<Tooltip className="tooltipCatagory" id={`tooltip${1}`}>
                    {'a,b,c'}
                </Tooltip>);
            });
        });

        describe('renderRowCommunication', () => {
            const item = {
                defaultCommId: 1,
                username: 'asd'
            };
            const container = shallow(<DataGrid />).instance();
            it('should render expected row when isHost = false', () => {
                // Act
                const row = shallow(container.renderRowCommunication(item, 1, false));

                // Assert
                expect(row.find(Cell).length).toBe(6);
            });

            it('should render expected row when isHost = true', () => {
                // Act
                const row = shallow(container.renderRowCommunication(item, 1, true));

                // Assert
                expect(row.find(Cell).length).toBe(7);
            });

            it('should call handleEdit when click on edit icon', () => {
                // Arrange
                container.handleEdit = jest.fn();
                const row = shallow(container.renderRowCommunication(item, 1, true));

                // Act
                row.find(Cell).at(6).find('span').at(0).props().onClick();

                // Assert
                expect(container.handleEdit).toHaveBeenCalledWith(1);
            });

            it('should call handleDelete when click on delete icon', () => {
                // Arrange
                container.startIndex = 1;
                container.handleDelete = jest.fn();
                const row = shallow(container.renderRowCommunication(item, 1, true));

                // Act
                row.find(Cell).at(6).find('span').at(1).props().onClick();

                // Assert
                expect(container.handleDelete).toHaveBeenCalledWith(1, 2);
            });
        });
    });
});