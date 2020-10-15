import React from 'react';
import { DataGrid } from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import { PAGING_SIZES } from '@jsroot/common/constants';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    function testInvalidGridData(gridData) {
        it('renders null when gridData is invalid', () => {
            // Arrange
            const props = {
                gridData
            };

            // Act
            const container = shallow(<DataGrid {...props} />);

            //Assert
            expect(container).toBeNull;
        });
    }

    testInvalidGridData(null);
    testInvalidGridData({});
    testInvalidGridData({ data: null });

    describe('default elements', () => {
        const props = {
            gridParams: { pageSize: 100, pageIndex: 1 },
            gridData: {
                totalItems: 1,
                data: []
            }
        };

        it('Table props should be mapped correctly', () => {
            // Arrange
            const pagingOption = {
                PageIndex: 1,
                PageSize: 100,
                TotalItem: 1,
                PageList: PAGING_SIZES
            };
            const container = shallow(<DataGrid {...props} />);

            // Act
            const table = container.find(Table);

            // Assert
            expect(table.length).toBe(1);
            expect(table.props().width).toBe(920);
            expect(table.props().autoWidth).toBeFalse;
            expect(table.props().isPaging).toBeTrue;
            expect(table.props().pageOption).toEqual(pagingOption);
            expect(table.props().containerPadding).toBe(0);
            expect(table.props().adjustedHeight).toBe(10);
        });
    });

    describe('methods', () => {
        describe('onPaging', () => {
            it('should call exactly function', () => {
                // Arrange
                const props = {
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        totalItems: 1,
                        data: [],
                    },
                    setGridParams: jest.fn(),
                    getFeedBackSubject: jest.fn()
                };
                const expectedGridParams = { pageIndex: 1, pageSize: 100 };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedGridParams);
                expect(props.getFeedBackSubject).toHaveBeenCalledWith(expectedGridParams);
            });

            describe('handleEdit', () => {
                it('should call exactly function', () => {
                    // Arrange
                    const props = {
                        gridParams: { pageSize: 100, pageIndex: 1 },
                        gridData: {
                            totalItems: 1,
                            data: []
                        },
                        setSelectFeedbackSubjectId: jest.fn(),
                        setEditFeedbackSubjectPopup: jest.fn()
                    };
                    const param = {
                        templateId: 1,
                        subject: 'feedback'
                    };
                    const container = shallow(<DataGrid {...props} />).instance();

                    // Act
                    container.handleEdit(1, 'feedback');

                    // Assert
                    expect(props.setSelectFeedbackSubjectId).toHaveBeenCalledWith(param);
                });
            });

            describe('handleEditStatus', () => {
                it('should call exactly functions', () => {
                    // Arrange
                    const props = {
                        gridParams: { pageSize: 100, pageIndex: 1 },
                        gridData: {
                            totalItems: 1,
                            data: []
                        },
                        setEditStatusFeedbackSubjectPopup: jest.fn()
                    };
                    const container = shallow(<DataGrid {...props} />).instance();

                    // Act
                    container.handleEditStatus(1, true);

                    // Assert
                    expect(props.setEditStatusFeedbackSubjectPopup).toHaveBeenCalledWith({ show: true, id: 1, isActive: true });
                });
            });

            describe('buildHeader', () => {
                it('should render expected header when isHost = false', () => {
                    // Arrange
                    const props = {
                        gridParams: { pageSize: 100, pageIndex: 1 },
                        gridData: {
                            totalItems: 1,
                            data: []
                        },
                    };
                    const container = shallow(<DataGrid {...props} />).instance();

                    // Act
                    const header = shallow(container.buildHeader(false));

                    // Assert
                    expect(header.find(HeaderCell).length).toBe(3);
                });
            });

            it('should render expected header when isHost = true', () => {
                // Arrange
                const props = {
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        totalItems: 1,
                        data: []
                    },
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const header = shallow(container.buildHeader(true));

                // Assert
                expect(header.find(HeaderCell).length).toBe(4);
            });

            describe('buildBody', () => {
                it('should render no data when gridData is empty', () => {
                    // Arrange
                    const props = {
                        gridParams: { pageSize: 100, pageIndex: 1 },
                        gridData: {
                            totalItems: 1,
                            data: []
                        }
                    };
                    const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={4}>ThereIsNoData</Cell></Row>];
                    const container = shallow(<DataGrid {...props} />).instance();

                    // Act
                    const actual = container.buildBody(true);

                    // Assert
                    expect(actual).toEqual(expectedBody);
                });

                it('should render expected rows when gridData has data', () => {
                    // Arrange
                    const props = {
                        gridParams: { pageSize: 100, pageIndex: 1 },
                        gridData: {
                            totalItems: 1,
                            data: [{ templateID: 1, subject: 'feedback', isActive: true }]
                        }
                    };
                    const container = shallow(<DataGrid {...props} />).instance();
                    container.renderRow = jest.fn(() => <div />);

                    // Act
                    const actual = container.buildBody();

                    // Assert
                    expect(actual).toEqual([<div />]);
                });
            });

            describe('renderRow', () => {
                const item = {
                    templateID: 1,
                    subject: 'feedback',
                    isActive: true
                };
                const container = shallow(<DataGrid />).instance();
                it('should render expected row when isHost = false', () => {
                    // Act

                    const row = shallow(container.renderRow(item, 1, false));

                    //Assert
                    expect(row.find(Cell).length).toBe(3);
                });

                it('should render expected row when isHost = true', () => {
                    // Act

                    const row = shallow(container.renderRow(item, 1, true));

                    //Assert
                    expect(row.find(Cell).length).toBe(4);
                });

                it('should call handleEdit when click on edit icon', () => {
                    // Arrange
                    container.handleEdit = jest.fn();
                    const row = shallow(container.renderRow(item, 1, true));

                    // Act
                    row.find(Cell).at(2).find('span').at(0).props().onClick();

                    // Assert
                    expect(container.handleEdit).toHaveBeenCalledWith(1, 'feedback');
                });

                it('should call handleEditStatus when click on checkbox', () => {
                    // Arrange
                    container.handleEditStatus = jest.fn();
                    const row = shallow(container.renderRow(item, 1, true));

                    // Act
                    row.find(Cell).at(3).find('input').at(0).props().onChange();

                    // Assert
                    expect(container.handleEditStatus).toHaveBeenCalledWith(1, true);
                });
            });
        });
    });
});