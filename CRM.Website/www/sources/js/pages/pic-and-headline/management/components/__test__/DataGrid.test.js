import React from 'react';
import { DataGrid } from '../DataGrid';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
        jest.useFakeTimers();
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

    function testInvalidGridData(gridData) {
        it('renders null when gridData is invalid', () => {
            // Arrange
            const props = {
                gridData
            };

            // Act
            const container = shallow(<DataGrid {...props} />);

            // Assert
            expect(container).toBeNull;
        });
    }

    testInvalidGridData(null);
    testInvalidGridData({});
    testInvalidGridData({ data: null });

    describe('default elements', () => {
        const props = {
            setting: {
                communicationTools: []
            },
            gridParams: { pageSize: 100, pageIndex: 1 },
            gridData: {
                total: 1,
                dataList: []
            }
        };

        it('renders table title correctly', () => {
            // Act
            const container = shallow(<DataGrid {...props} />);

            // Assert
            expect(LangHelper.getResource).toHaveBeenCalledWith('PICManagement');
            expect(container.find('div').html())
                .toEqual('<div class="table-title d-flex justify-content-between align-items-center"><span>PICManagement</span></div>');
        });

        it('Table props should be mapped correctly', () => {
            // Arrange
            const pagingOption = {
                PageIndex: 1,
                PageSize: 100,
                TotalItem: 1,
                PageList: PAGING_SIZES
            };
            const container = shallow(<DataGrid {...props} />);
            container.instance().buildHeader = jest.fn();

            // Act
            const table = container.find(Table);

            // Assert
            expect(table.length).toBe(1);
            expect(table.props().minWidth).toBe(720);
            expect(table.props().autoWidth).toBeTrue;
            expect(table.props().isPaging).toBeTrue;
            expect(table.props().pageOption).toEqual(pagingOption);
            expect(table.props().containerPadding).toBe(0);
            expect(table.props().adjustedHeight).toBe(10);
            expect(table.props().shouldResetScrollPosition).toBeTrue;
        });

        it('render icon export file excel when has data', () => {
            // Arrange
            const propsHasData = {
                ...props,
                gridData: {
                    total: 1,
                    dataList: [{ picId: 1, languages: [] }]
                }
            };
            const container = shallow(<DataGrid {...propsHasData} />);

            // Act
            const icon = container.find('.fa-file-excel-o');

            // Assert
            expect(icon.length).toBe(1);
        });
    });

    describe('methods', () => {
        describe('onPaging', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
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

        describe('handleExportExcel', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    },
                    exportExcel: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleExportExcel();

                // Assert
                expect(props.exportExcel).toHaveBeenCalledWith(props.gridParams);
            });
        });

        describe('handleEdit', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    },
                    setSelectedPic: jest.fn(),
                    setEditPicPopup: jest.fn()
                };
                const item = { picId: 1 };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleEdit(item);

                // Assert
                expect(props.setSelectedPic).toHaveBeenCalledWith(item);
                expect(props.setEditPicPopup).toHaveBeenCalledWith({ show: true });
            });
        });

        describe('handleActiveStatus', () => {
            it('should call setConfirmPopup when isHost true', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    isHost: true,
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    },
                    setConfirmPopup: jest.fn()
                };
                const item = { username: 'a', picId: 1, checked: true };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleActiveStatus(item.username, item.picId, item.checked);

                // Assert
                expect(props.setConfirmPopup).toHaveBeenCalledWith({ show: true, ...item });
            });

            it('should not call setConfirmPopup when isHost false', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    isHost: false,
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    },
                    setConfirmPopup: jest.fn()
                };
                const item = { username: 'a', picId: 1, checked: true };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.handleActiveStatus(item.username, item.picId, item.checked);

                // Assert
                expect(props.setConfirmPopup).toHaveBeenCalledTimes(0);
            });
        });

        describe('renderHeaderCommunicationTools', () => {
            it('should return expected value', () => {
                // Arrange
                const communicationTools = [
                    { settingId: 1, settingValue: 'phone' },
                    { settingId: 2, settingValue: 'email' }
                ];
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const result = shallow(<div>
                    {container.renderHeaderCommunicationTools(communicationTools)}
                </div>).find(HeaderCell);

                // Assert
                expect(result.length).toBe(2);
                expect(result.at(0).html()).toEqual(`<th>${communicationTools[0].settingValue}</th>`);
                expect(result.at(1).html()).toEqual(`<th>${communicationTools[1].settingValue}</th>`);
            });
        });

        describe('renderBodyCommunicationTools', () => {
            it('should return expected value', () => {
                // Arrange
                const communicationTools = [
                    { settingId: 1, value: '111' }
                ];
                const props = {
                    setting: {
                        communicationTools: [
                            { settingId: 1, settingValue: 'phone' },
                            { settingId: 2, settingValue: 'email' }
                        ]
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const result = shallow(<div>
                    {container.renderBodyCommunicationTools(communicationTools)}
                </div>).find(Cell);

                // Assert
                expect(result.length).toBe(2);
                expect(result.at(0).html()).toEqual(`<td>${communicationTools[0].value}</td>`);
                expect(result.at(1).html()).toEqual(`<td></td>`);
            });
        });

        describe('buildHeader', () => {
            it('should render expected header when isHost = false', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: [
                            { settingId: 1, settingValue: 'phone' }
                        ]
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderHeaderCommunicationTools = jest.fn();

                // Act
                const header = shallow(<div>{container.buildHeader(false)}</div>);

                // Assert
                expect(header.find(HeaderCell).length).toBe(9);
                expect(header.find(HeaderRow).length).toBe(2);
                expect(container.renderHeaderCommunicationTools).toHaveBeenCalledWith(props.setting.communicationTools);
            });

            it('should render expected header when isHost = true', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: [
                            { settingId: 1, settingValue: 'phone' }
                        ]
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderHeaderCommunicationTools = jest.fn();

                // Act
                const header = shallow(<div>{container.buildHeader(true)}</div>);

                // Assert
                expect(header.find(HeaderCell).length).toBe(10);
                expect(header.find(HeaderRow).length).toBe(2);
                expect(container.renderHeaderCommunicationTools).toHaveBeenCalledWith(props.setting.communicationTools);
            });
        });

        describe('buildBody', () => {
            it('should render no data when gridData is empty and isHost true', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const actual = container.buildBody(true);

                // Assert
                expect(actual).toEqual([
                    <Row key={`body${1}`} className="no-data">
                        <Cell className='text-center' colSpan={props.setting.communicationTools.length + 9}>ThereIsNoData</Cell>
                    </Row>
                ]);
            });

            it('should render no data when gridData is empty and isHost false', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 1,
                        dataList: []
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                const actual = container.buildBody(false);

                // Assert
                expect(actual).toEqual([
                    <Row key={`body${1}`} className="no-data">
                        <Cell className='text-center' colSpan={props.setting.communicationTools.length + 8}>ThereIsNoData</Cell>
                    </Row>
                ]);
            });

            it('should render expected rows when gridData has data', () => {
                // Arrange
                const props = {
                    setting: {
                        communicationTools: []
                    },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    gridData: {
                        total: 2,
                        dataList: [
                            { picId: 1, languages: [] }
                        ]
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderRow = jest.fn(() => <div />);
                container.renderBodyCommunicationTools = jest.fn();

                // Act
                const actual = container.buildBody(true);

                // Assert
                expect(actual).toEqual([<div />]);
            });
        });

        describe('renderRow', () => {
            const item = {
                picId: 1, username: 'name',
                roleName: 'role', languages: [{ settingValue: 'vn' }],
                countryName: 'Vietnam', groupHeadline: 'group',
                remark: 'remark', communicationTools: []
            };
            const props = {
                setting: {
                    communicationTools: []
                },
                gridParams: { pageSize: 100, pageIndex: 1 },
                gridData: {
                    total: 2,
                    dataList: []
                }
            };


            it('should render expected row when isHost = false', () => {
                // Arrange
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderBodyCommunicationTools = jest.fn();

                // Act
                const row = shallow(container.renderRow(item, 1, false));

                // Assert
                expect(row.find(Cell).length).toBe(8);
                expect(container.renderBodyCommunicationTools).toHaveBeenCalledWith(item.communicationTools);
                expect(row.find('.checkbox-cell-style').props().disabled).toBeTrue;
            });

            it('should render expected row when isHost = true', () => {
                // Arrange
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderBodyCommunicationTools = jest.fn();

                // Act
                const row = shallow(container.renderRow(item, 1, true));

                // Assert
                expect(row.find(Cell).length).toBe(9);
                expect(container.renderBodyCommunicationTools).toHaveBeenCalledWith(item.communicationTools);
                expect(row.find('.checkbox-cell-style').props().disabled).toBeFalse;
            });

            it('should call handleEdit when click on edit icon', () => {
                // Arrange
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderBodyCommunicationTools = jest.fn();
                container.handleEdit = jest.fn();
                const row = shallow(container.renderRow(item, 1, true));

                // Act
                row.find(Cell).at(7).find('.icon-edit').props().onClick();

                // Assert
                expect(container.handleEdit).toHaveBeenCalledWith(item);
            });

            it('should call handleActiveStatus when change value on checkbox with isHost is true', () => {
                // Arrange
                const event = { target: { checked: true } };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderBodyCommunicationTools = jest.fn();
                container.handleActiveStatus = jest.fn();
                const row = shallow(container.renderRow(item, 1, true));

                // Act
                row.find(Cell).at(8).find('.checkbox-cell-style').props().onChange(event);

                // Assert
                expect(container.handleActiveStatus).toHaveBeenCalledWith(item.username, item.picId, event.target.checked);
            });
        });
    });

});