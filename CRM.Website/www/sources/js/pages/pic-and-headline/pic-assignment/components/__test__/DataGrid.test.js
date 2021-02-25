import React, { Fragment } from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import functions from '../../common.functions';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('DataGrid', () => {
    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {}
        };

        const store = mockStore(initialState);

        // Action
        const wrapper = shallow(<DataGridWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.picAssignmentGridData).toEqual(
                initialState.picAssignmentGridData
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
            expect(wrapper.props().children.props.removeOptions).toEqual(
                initialState.removeOptions
            );
        });
    });

    it('onPaging runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {},
            setGridParams: jest.fn(),
            getGridData: jest.fn((params, callback) => callback())
        };

        const pageIndex = 1;
        const pageSize = 10;
        const dataGrid = shallow(<DataGrid {...props} />);
        const expected = {
            ...props.gridParams,
            pageIndex,
            pageSize
        };

        functions.handleNewRemoveOptions = jest.fn();

        // Action
        dataGrid.instance().onPaging(pageIndex, pageSize);

        // Assert
        expect(props.setGridParams).toHaveBeenCalledWith(expected);
        expect(props.getGridData).toHaveBeenCalledWith(expected, expect.any(Function));
    });

    describe('buildPicManagementHeader', () => {
        it('returns expected component when isHost false', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().buildPicManagementHeader(false));

            // Assert
            expect(result.find(HeaderCell).at(0).props().colWidth).toBe(70);
            expect(result.find(HeaderCell).at(0).html()).toContain('TextNo');
            expect(result.find(HeaderCell).at(1).props().colWidth).toBe(150);
            expect(result.find(HeaderCell).at(1).html()).toContain('GroupHeadline');
            expect(result.find(HeaderCell).at(2).props().colWidth).toBe(100);
            expect(result.find(HeaderCell).at(2).html()).toContain('HeadlineType');
            expect(result.find(HeaderCell).at(3).props().colWidth).toBe(150);
            expect(result.find(HeaderCell).at(3).html()).toContain('DefaultPIC');
            expect(result.find(HeaderCell).at(4).props().colWidth).toBe(150);
            expect(result.find(HeaderCell).at(4).html()).toContain('PIC');
            expect(result.find(HeaderCell).at(5).props().colWidth).toBe(150);
            expect(result.find(HeaderCell).at(5).html()).toContain('DirectAccount');
            expect(result.find(HeaderCell).at(6).props().colWidth).toBe(100);
            expect(result.find(HeaderCell).at(6).html()).toContain('Status');
            expect(result.find(HeaderCell).at(7).props().colWidth).toBe(150);
            expect(result.find(HeaderCell).at(7).html()).toContain('Site');
            expect(result.find(HeaderCell).at(8).props().colWidth).toBe(100);
            expect(result.find(HeaderCell).at(8).html()).toContain('Currency');
            expect(result.find(HeaderCell).at(9).props().colWidth).toBe(100);
            expect(result.find(HeaderCell).at(9).html()).toContain('Position');
        });

        it('returns expected component when isHost true having first input', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().buildPicManagementHeader(true));

            // Assert
            expect(result.find(HeaderCell).at(10).props().colWidth).toBe(85);
            expect(result.find(HeaderCell).at(10).find('input').props().className).toBe('d-block mx-auto');
            expect(result.find(HeaderCell).at(10).find('input').props().type).toBe('button');
            expect(result.find(HeaderCell).at(10).find('input').props().value).toBe('Remove');
            expect(result.find(HeaderCell).at(10).find('input').props().disabled).toEqual(props.removeOptions.isDisabledRemove);
        });

        it('returns expected component when isHost true having first input onClick', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleOpenRemovePopup = jest.fn();
            const result = shallow(dataGrid.instance().buildPicManagementHeader(true));

            // Action
            result.find(HeaderCell).at(10).find('input').simulate('click');

            // Assert
            expect(dataGrid.instance().handleOpenRemovePopup).toHaveBeenCalled();
        });

        it('returns expected component when isHost true having second input', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {
                    isHadAll: true
                }
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().buildPicManagementHeader(true));

            // Assert
            expect(result.find(HeaderCell).at(10).find('input').at(1).props().className).toBe('d-block cursor-pointer mx-auto margin-top-5px');
            expect(result.find(HeaderCell).at(10).find('input').at(1).props().type).toBe('checkbox');
            expect(result.find(HeaderCell).at(10).find('input').at(1).props().checked).toEqual(props.removeOptions.isCheckedAll);
        });

        it('returns expected component when isHost true having second input onChange', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {
                    isHadAll: true
                }
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleChangeRemoveCheckboxAll = jest.fn();
            const result = shallow(dataGrid.instance().buildPicManagementHeader(true));

            // Action
            result.find(HeaderCell).at(10).find('input').at(1).simulate('change');

            // Assert
            expect(dataGrid.instance().handleChangeRemoveCheckboxAll).toHaveBeenCalled();
        });
    });

    describe('buildPicManagementBody', () => {
        it('should change startIndex when run', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: []
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expected = (props.gridParams.pageIndex - 1) * props.gridParams.pageSize + 1;
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            dataGrid.instance().buildPicManagementBody(true);

            // Assert
            expect(dataGrid.instance().startIndex).toEqual(expected);
        });

        it('should return correct body when data not empty and having merge headline only', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: [
                        {
                            headlineID: 1,
                            picForMapping: 'pic for mapping',
                            picList: ['pic'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        }
                    ]
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expectedRow = <div>row</div>;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().renderRow = jest.fn().mockReturnValue(expectedRow);

            // Action
            const result = dataGrid.instance().buildPicManagementBody(true);

            // Assert
            expect(result).toEqual([expectedRow]);
        });

        it('should return correct body when data not empty and having merge pic', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: [
                        {
                            headlineID: 1,
                            picForMapping: 'pic for mapping',
                            picList: ['pic'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        },
                        {
                            headlineID: 1,
                            picForMapping: 'pic for mapping1',
                            picList: ['pic'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        },
                        {
                            headlineID: 1,
                            picForMapping: 'pic for mapping1',
                            picList: ['pic'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        }
                    ]
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expectedRow = <div>row</div>;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().renderRow = jest.fn().mockReturnValue(expectedRow);

            // Action
            const result = dataGrid.instance().buildPicManagementBody(true);

            // Assert
            expect(result).toEqual([expectedRow, expectedRow, expectedRow]);
        });

        it('should return correct body when data not empty and not have merge cell', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: [
                        {
                            headlineID: 1,
                            picForMapping: 'pic for mapping1',
                            picList: ['pic1'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        },
                        {
                            headlineID: 2,
                            picForMapping: 'pic for mapping2',
                            picList: ['pic2'],
                            status: 'Error',
                            directAccount: ['directAccount']
                        }
                    ]
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expectedRow = <div>row</div>;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().renderRow = jest.fn().mockReturnValue(expectedRow);

            // Action
            const result = dataGrid.instance().buildPicManagementBody(true);

            // Assert
            expect(result).toEqual([expectedRow, expectedRow]);
        });

        it('should return correct body when data empty with isHost true', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: []
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expected = [
                <Row key={`body${1}`} className='no-data' >
                    <Cell colSpan={11}>{'ThereIsNoData'}</Cell>
                </Row>
            ];
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = dataGrid.instance().buildPicManagementBody(true);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return correct body when data empty with isHost false', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: []
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {}
            };

            const expected = [
                <Row key={`body${1}`} className='no-data' >
                    <Cell colSpan={10}>{'ThereIsNoData'}</Cell>
                </Row>
            ];
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = dataGrid.instance().buildPicManagementBody(false);

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('renderRow', () => {
        it('should return correct row when isHost false, mergePic not greater than 0 and renderMergeHeadlineCells returning null', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const startIndex = 1;
            const index = 1;
            const item = {
                status: 'Error',
                directAccount: 'directAccount',
                site: 'site',
                currency: 'currency',
                position: 'position'
            };

            const expectedClass = `${item.status.toLowerCase()}-color`;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().startIndex = startIndex;
            dataGrid.instance().renderMergeHeadlineCells = jest.fn(() => null);

            // Action
            const result = shallow(dataGrid.instance().renderRow(index, false, item));

            // Assert
            expect(result.find(Cell).at(0).props().className).toBe('text-center');
            expect(result.find(Cell).at(0).html()).toContain(index + startIndex);
            expect(result.find(Cell).at(1).props().className).toBe(expectedClass);
            expect(result.find(Cell).at(1).html()).toContain(item.directAccount);
            expect(result.find(Cell).at(2).props().className).toBe(expectedClass);
            expect(result.find(Cell).at(2).html()).toContain(item.status);
            expect(result.find(Cell).at(3).props().className).toBe(expectedClass);
            expect(result.find(Cell).at(3).html()).toContain(item.site);
            expect(result.find(Cell).at(4).props().className).toBe(expectedClass);
            expect(result.find(Cell).at(4).html()).toContain(item.currency);
            expect(result.find(Cell).at(5).props().className).toBe(expectedClass);
            expect(result.find(Cell).at(5).html()).toContain(item.position);
        });

        it('should return correct row when isHost true', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const startIndex = 1;
            const index = 1;
            const item = {
                status: 'Error',
                directAccount: 'directAccount',
                site: 'site',
                currency: 'currency',
                position: 'position'
            };

            const expected = 'expected';
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().startIndex = startIndex;
            dataGrid.instance().renderMergeHeadlineCells = jest.fn(() => null);
            dataGrid.instance().renderIsHost = jest.fn(() => <Cell>{expected}</Cell>);

            // Action
            const result = shallow(dataGrid.instance().renderRow(index, true, item));

            // Assert
            expect(result.find(Cell).at(6).html()).toContain(expected);
        });

        it('should return correct row when renderMergeHeadlineCells return Cell', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const startIndex = 1;
            const index = 1;
            const item = {
                status: 'Error',
                directAccount: 'directAccount',
                site: 'site',
                currency: 'currency',
                position: 'position',
                defaultPicList: [
                    {
                        picId: 1,
                        picName: 'name',
                        picRole: 'role'
                    }
                ]
            };

            const expected = 'expected';
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().startIndex = startIndex;
            dataGrid.instance().renderMergeHeadlineCells = jest.fn(() => <Cell>{expected}</Cell>);

            // Action
            const result = shallow(dataGrid.instance().renderRow(index, false, item));

            // Assert
            expect(result.find(Cell).at(1).html()).toContain(expected);
        });

        it('should return correct row when merge pic greater than 0 and not having picList', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const startIndex = 1;
            const index = 1;
            const item = {
                status: 'Error',
                directAccount: 'directAccount',
                site: 'site',
                currency: 'currency',
                position: 'position'
            };

            const picCell = 'picCell';
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().startIndex = startIndex;
            dataGrid.instance().renderMergeHeadlineCells = jest.fn(() => null);

            // Action
            const result = shallow(dataGrid.instance().renderRow(index, false, item, null, 1, picCell));

            // Assert
            expect(result.find(Cell).at(1).props().className).toBe('text-center');
        });

        it('should return correct row when merge pic greater than 0 and having picList', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const startIndex = 1;
            const index = 1;
            const item = {
                status: 'Error',
                directAccount: 'directAccount',
                site: 'site',
                currency: 'currency',
                position: 'position',
                picList: 'picList'
            };

            const picCell = 'picCell';
            const mergePic = 1;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().startIndex = startIndex;
            dataGrid.instance().renderMergeHeadlineCells = jest.fn(() => null);

            // Action
            const result = shallow(dataGrid.instance().renderRow(index, false, item, null, mergePic, picCell));

            // Assert
            expect(result.find(Cell).at(1).props().className).toBeEmpty;
            expect(result.find(Cell).at(1).props().rowSpan).toEqual(mergePic);
            expect(result.find(Cell).at(1).html()).toContain(picCell);
        });
    });

    describe('renderMergeHeadlineCells', () => {
        it('should return expected when merge headline greater than 0 and default pic list empty', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const mergeHeadline = 2;
            const item = {
                headlineName: 'name',
                headlineID: 1
            };

            const defaultPicList = [];
            const expectedDefaultPic = 'expectedDefaultPic';
            const expected = <Fragment>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip>{`GroupHeadline: ${item.headlineName}`}</Tooltip>
                }>
                    <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineName}</Cell>
                </OverlayTrigger>
                <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineType}</Cell>
                <Cell className={'text-center'} rowSpan={mergeHeadline}>{expectedDefaultPic}</Cell>
            </Fragment>;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().renderDefaultPic = jest.fn(() => expectedDefaultPic);

            // Action
            var result = dataGrid.instance().renderMergeHeadlineCells(mergeHeadline, item, defaultPicList);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when merge headline greater than 0 and default pic list not empty', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const mergeHeadline = 2;
            const item = {
                headlineName: 'name',
                headlineID: 1
            };

            const defaultPicList = ['value'];
            const expectedDefaultPic = 'expectedDefaultPic';
            const expected = <Fragment>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip>{`GroupHeadline: ${item.headlineName}`}</Tooltip>
                }>
                    <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineName}</Cell>
                </OverlayTrigger>
                <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineType}</Cell>
                <Cell className={''} rowSpan={mergeHeadline}>{expectedDefaultPic}</Cell>
            </Fragment>;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().renderDefaultPic = jest.fn(() => expectedDefaultPic);

            // Action
            var result = dataGrid.instance().renderMergeHeadlineCells(mergeHeadline, item, defaultPicList);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when merge headline not greater than 0', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const mergeHeadline = 0;
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            var result = dataGrid.instance().renderMergeHeadlineCells(mergeHeadline);

            // Assert
            expect(result).toBeNull;
        });
    });

    describe('renderIsHost', () => {
        it('returns expected', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {
                    dataList: [
                        { isRemoved: true }
                    ]
                }
            };

            const index = 0;
            const item = {
                status: 'Error',
                picList: ['value']
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().renderIsHost(item, index));

            // Assert
            expect(result.props().className).toBe(`${item.status.toLowerCase()}-color text-center`);
            expect(result.find('input').props().type).toBe('checkbox');
            expect(result.find('input').props().className).toBe('cursor-pointer');
            expect(result.find('input').props().checked).toBeTrue;
            expect(result.find('input').props().disabled).toBeFalse;
        });

        it('has input onChange', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const index = 1;
            const item = {
                status: 'Error',
                picList: ['value']
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleChangeRemoveCheckbox = jest.fn();
            const result = shallow(dataGrid.instance().renderIsHost(item, index));

            // Action
            result.find('input').simulate('change');

            // Assert
            expect(dataGrid.instance().handleChangeRemoveCheckbox).toHaveBeenCalledWith(index);
        });
    });

    it('handleOpenAssignPicPopup runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {},
            setAssignPicPopup: jest.fn()
        };

        const headlineId = 1;
        const accountNames = 'name';
        const dataGrid = shallow(<DataGrid {...props} />);

        // Action
        dataGrid.instance().handleOpenAssignPicPopup(headlineId, accountNames);

        // Assert
        expect(props.setAssignPicPopup).toHaveBeenCalledWith({
            show: true,
            data: {
                headlineId,
                accountNames
            }
        });
    });

    describe('renderPic', () => {
        it('should return expected when not have pic and isHost false', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [];
            const expected = <span>-</span>;
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = dataGrid.instance().renderPic(pics, null, null, false);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected span when not have pic and isHost true', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [];
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().renderPic(pics, null, null, true));

            // Assert
            expect(result.props().className).toBe('plus-icon');
            expect(result.html()).toContain('+');
        });

        it('should return expected span onClick when not have pic and isHost true', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [];
            const headlineId = 1;
            const accountNames = 'name';
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleOpenAssignPicPopup = jest.fn();
            const result = shallow(dataGrid.instance().renderPic(pics, headlineId, accountNames, true));

            // Action
            result.simulate('click');

            // Assert
            expect(dataGrid.instance().handleOpenAssignPicPopup).toHaveBeenCalledWith(headlineId, accountNames);
        });

        it('should return expected when have pic', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const item = {
                picId: 1,
                picName: 'name',
                role: 'role'
            };

            const pics = [item];

            const dataGrid = shallow(<DataGrid {...props} />);
            const expected = [<p key={item.picId} className='pic-name'>{`${item.picName} (${item.role})`}</p>];

            // Action
            const result = dataGrid.instance().renderPic(pics, null, null, true);

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('renderDefaultPic', () => {
        it('should return expected div onClick when not empty pics', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [
                {
                    value: 'value',
                    label: 'label'
                }
            ];

            const headline = {};
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleOpenDefaultPicPopup = jest.fn();
            const result = shallow(dataGrid.instance().renderDefaultPic(headline, pics));

            // Action
            result.simulate('click');

            // Assert
            expect(dataGrid.instance().handleOpenDefaultPicPopup).toHaveBeenCalledWith(headline, pics);
        });

        it('should return expected div when not empty pics', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [
                {
                    value: 'value',
                    label: 'label'
                }
            ];

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().renderDefaultPic(null, pics));

            // Assert
            expect(result.props().className).toBe('cursor-pointer link-color');
        });

        it('should return expected span onClick when empty pics', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [];
            const headline = {};
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().handleOpenDefaultPicPopup = jest.fn();
            const result = shallow(dataGrid.instance().renderDefaultPic(headline, pics));

            // Action
            result.simulate('click');

            // Assert
            expect(dataGrid.instance().handleOpenDefaultPicPopup).toHaveBeenCalledWith(headline);
        });

        it('should return expected span when empty pics', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const pics = [];
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = shallow(dataGrid.instance().renderDefaultPic(null, pics));

            // Assert
            expect(result.props().className).toBe('plus-icon');
            expect(result.html()).toContain('+');
        });
    });

    it('handleChangeRemoveCheckboxAll runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {
                isCheckedAll: false,
                isHadAll: true,
                dataList: [
                    {
                        picList: ['value']
                    }
                ]
            },
            setRemoveOptions: jest.fn()
        };

        const checked = !props.removeOptions.isCheckedAll;
        const dataList = props.removeOptions.dataList.map(item => {
            return {
                ...item,
                isRemoved: checked
            };
        });

        const dataGrid = shallow(<DataGrid {...props} />);

        // Action
        dataGrid.instance().handleChangeRemoveCheckboxAll();

        // Assert
        expect(props.setRemoveOptions).toHaveBeenCalledWith({
            isCheckedAll: checked,
            isDisabledRemove: !checked,
            isHadAll: props.removeOptions.isHadAll,
            shouldResetScrollPosition: false,
            dataList
        });
    });

    it('handleChangeRemoveCheckbox runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {
                isCheckedAll: false,
                isHadAll: true,
                dataList: [
                    {
                        picList: ['value'],
                        isRemoved: false
                    },
                    {
                        picList: ['value'],
                        isRemoved: false
                    }
                ]
            },
            setRemoveOptions: jest.fn()
        };

        const index = 0;
        const dataList = props.removeOptions.dataList.map(item => {
            return { ...item };
        });

        dataList[index].isRemoved = true;
        const dataGrid = shallow(<DataGrid {...props} />);

        // Action
        dataGrid.instance().handleChangeRemoveCheckbox(index);

        // Assert
        expect(props.setRemoveOptions).toHaveBeenCalledWith({
            isCheckedAll: false,
            isDisabledRemove: false,
            isHadAll: props.removeOptions.isHadAll,
            shouldResetScrollPosition: false,
            dataList
        });
    });

    it('handleOpenRemovePopup runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {},
            setRemovePicAssignmentPopup: jest.fn()
        };

        const dataGrid = shallow(<DataGrid {...props} />);

        // Action
        dataGrid.instance().handleOpenRemovePopup();

        // Assert
        expect(props.setRemovePicAssignmentPopup).toHaveBeenCalledWith({ show: true });
    });

    it('handleOpenDefaultPicPopup runs correctly', () => {
        // Arrange
        const props = {
            picAssignmentGridData: {},
            gridParams: {},
            removeOptions: {},
            setDefaultPicPopup: jest.fn()
        };

        const headline = {};
        const pics = [];
        const dataGrid = shallow(<DataGrid {...props} />);

        // Action
        dataGrid.instance().handleOpenDefaultPicPopup(headline, pics);

        // Assert
        expect(props.setDefaultPicPopup).toHaveBeenCalledWith({
            show: true,
            headline,
            pics
        });
    });

    describe('render', () => {
        it('should return null when invalid picAssignmentGridData', () => {
            // Arrange
            const props = {
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = dataGrid.instance().render();

            // Assert
            expect(result).toBeNull;
        });

        it('should return null when invalid picAssignmentGridData data', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {},
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            const result = dataGrid.instance().render();

            // Assert
            expect(result).toBeNull;
        });

        it('has regular components', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: [],
                    totalItems: 100
                },
                gridParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                removeOptions: {
                    shouldResetScrollPosition: true
                }
            };

            const pageOptions = {
                PageIndex: props.gridParams.pageIndex,
                PageSize: props.gridParams.pageSize,
                TotalItem: props.picAssignmentGridData.totalItems,
                PageList: PAGING_SIZES
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find('div').at(0).props().className).toBe('table-title d-flex justify-content-between');
            expect(dataGrid.find('div').at(1).html()).toContain('PICAssignment');
            expect(dataGrid.find('div').at(2).html()).toContain('ThereAreUnassignedDirectAccounts');
            expect(dataGrid.find('span').props().className).toBe('fa fa-file-excel-o ml-3 icon-excel');
            expect(dataGrid.find(Table).props().maxWidth).toEqual(1350);
            expect(dataGrid.find(Table).props().autoWidth).toBeTrue;
            expect(dataGrid.find(Table).props().isPaging).toBeTrue;
            expect(dataGrid.find(Table).props().pageOption).toEqual(pageOptions);
            expect(dataGrid.find(Table).props().containerPadding).toEqual(0);
            expect(dataGrid.find(Table).props().shouldResetScrollPosition).toEqual(props.removeOptions.shouldResetScrollPosition);
        });

        it('has span onClick', () => {
            // Arrange
            const props = {
                picAssignmentGridData: {
                    data: []
                },
                gridParams: {},
                removeOptions: {}
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            functions.exportExcel = jest.fn();

            // Action
            dataGrid.find('span').simulate('click');

            // Assert
            expect(functions.exportExcel).toHaveBeenCalledWith(props.gridParams);
        });
    });
});