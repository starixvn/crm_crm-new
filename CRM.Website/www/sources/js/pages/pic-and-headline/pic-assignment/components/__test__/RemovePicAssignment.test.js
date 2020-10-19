import RemovePicAssignmentWrapper, { RemovePicAssignment } from '../RemovePicAssignment';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import functions from '../../common.functions';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('RemovePicAssignment', () => {
    LangHelper.getResource = jest.fn(value => value);

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            removeOptions: {},
            gridParams: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<RemovePicAssignmentWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.removeOptions).toEqual(
                initialState.removeOptions
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
        });
    });

    it('has correct default state', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: []
            },
            gridParams: {}
        };

        // Action
        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

        // Assert
        expect(removePicAssignment.instance().state).toEqual({
            picIds: [],
            picNames: [],
            checkedAllList: [],
            matrix: [],
            isShowConfirmRemovePopup: false,
            dataList: []
        });
    });

    it('componentDidMount should call pushPics', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: [
                    {
                        isRemoved: true,
                        picList: [ 'value' ]
                    },
                    {
                        isRemoved: true,
                        picList: []
                    }
                ]
            },
            gridParams: {}
        };

        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
        removePicAssignment.instance().pushPics = jest.fn();
        
        // Action
        removePicAssignment.instance().componentDidMount();

        // Assert
        expect(removePicAssignment.instance().pushPics).toHaveBeenCalled();
    });

    describe('pushPics', () => {
        it('should add params correctly', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };
    
            const pic = {
                picId: 1,
                picName: 'name',
            };
    
            const item = {
                picList: [
                    pic
                ]
            };
    
            const picIds = [];
            const picNames = [];
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
    
            // Action
            removePicAssignment.instance().pushPics(item, picNames, picIds);
    
            // Assert
            expect(picIds).toEqual([pic.picId]);
            expect(picNames).toEqual([pic.picName]);
        });
        
        it('should params not change', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };
    
            const pic = {
                picId: 1,
                picName: 'name',
            };
    
            const item = {
                picList: [
                    pic
                ]
            };
    
            const picIds = [];
            const picNames = [pic.picName];
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
    
            // Action
            removePicAssignment.instance().pushPics(item, picNames, picIds);
    
            // Assert
            expect(picIds).toEqual([]);
            expect(picNames).toEqual([pic.picName]);
        });
    });

    describe('buildHeader', () => {
        it('should return correct first Header Row', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const cells = [
                {
                    key: 'TextNo',
                    rowSpan: 2,
                    colWidth: 50,
                    value: 'TextNo'
                },
                {
                    key: 'GroupHeadline',
                    rowSpan: 2,
                    colWidth: 120,
                    value: 'GroupHeadline'
                },
                {
                    key: 'DirectAccount',
                    rowSpan: 2,
                    colWidth: 120,
                    value: 'DirectAccount'
                }
            ];

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.instance().buildHeader();
            const row = shallow(result[0]);

            // Assert
            for(let index = 0; index < cells.length; index++) {
                expect(row.find(HeaderCell).at(index).props().rowSpan).toEqual(cells[index].rowSpan);
                expect(row.find(HeaderCell).at(index).props().colWidth).toEqual(cells[index].colWidth);
                expect(row.find(HeaderCell).at(index).html()).toContain(cells[index].value);
            }
        });

        it('should return correct second Header Row', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                picNames: [ 'name' ],
                checkedAllList: [ true ]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().buildHeader();
            const row = shallow(result[1]);

            // Assert
            expect(row.find(HeaderCell).props().rowSpan).toEqual(1);
            expect(row.find(HeaderCell).props().colWidth).toEqual(80);
            expect(row.find('input').props().type).toBe('checkbox');
            expect(row.find('input').props().checked).toEqual(state.checkedAllList[0]);
        });

        it('should return correct second Header Row containing input onChange', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                picNames: [ 'name' ],
                checkedAllList: [ true ]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
            removePicAssignment.instance().handleChangeCheckAll = jest.fn();
            const result = removePicAssignment.instance().buildHeader();
            const input = shallow(result[1]).find('input');

            // Action
            input.simulate('change');

            // Assert
            expect(removePicAssignment.instance().handleChangeCheckAll).toHaveBeenCalledWith(0);
        });
    });

    describe('buildBody', () => {
        it('should return body having merge headline row when not empty data', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: [
                        {
                            isRemoved: true,
                            headlineID: 1,
                            picList: []
                        }
                    ]
                },
                gridParams: {}
            };

            const expectedRow = <Row></Row>;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().renderRow = jest.fn(() => expectedRow);

            // Action
            const result = removePicAssignment.instance().buildBody();

            // Assert
            expect(result).toEqual([expectedRow]);
        });
        
        it('should return body having merge headline and normal row when not empty data', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: [
                        {
                            isRemoved: true,
                            headlineID: 1,
                            picList: []
                        },
                        {
                            isRemoved: true,
                            headlineID: 1,
                            picList: []
                        }
                    ]
                },
                gridParams: {}
            };

            const expectedRow = <Row></Row>;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().renderRow = jest.fn(() => expectedRow);

            // Action
            const result = removePicAssignment.instance().buildBody();

            // Assert
            expect(result).toEqual([expectedRow, expectedRow]);
        });
        
        it('should return body having nodata row when not empty data', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = { picNames: [] };
            const expected = [<Row key={`body${1}`} className='no-data'><Cell colSpan={3}>ThereIsNoData</Cell></Row>];
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().buildBody();

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('renderRow', () => {
        it('should return expected row when mergeHeadline true', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const name = 'name';
            const index = 0;
            const row = {
                picList: [
                    {
                        picName: name
                    }
                ]
            };

            const cell = <Cell></Cell>;
            const state = { picNames: [ name ] };
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().renderCell = jest.fn(() => cell);
            removePicAssignment.instance().setState(state);

            // Action
            const result = shallow(removePicAssignment.instance().renderRow(index, row, true));

            // Assert
            expect(result.find(Cell).length).toBe(4);
        });
        
        it('should return expected row when mergeHeadline false', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const name = 'name';
            const index = 0;
            const row = {
                picList: []
            };

            const cell = <Cell></Cell>;
            const state = { picNames: [ name ] };
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().renderCell = jest.fn(() => cell);
            removePicAssignment.instance().setState(state);

            // Action
            const result = shallow(removePicAssignment.instance().renderRow(index, row, false));

            // Assert
            expect(result.find(Cell).length).toBe(3);
        });
    });

    describe('renderCell', () => {
        it('should return expected cell when having merge headline and index equal 1', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const index = 1;
            const mergeHeadline = 2;
            const cell = { value: 'value' };
            const expected = <Cell key={index} rowSpan={mergeHeadline}>{cell.value}</Cell>;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.instance().renderCell(cell, index, mergeHeadline);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when cell value is object type', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ]
            };

            const cell = {
                value: {
                    rowNumber: 0,
                    colNumber: 0
                }
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = shallow(removePicAssignment.instance().renderCell(cell, 2));

            // Assert
            expect(result.props().className).toBe('text-center');
            expect(result.find('input').props().type).toBe('checkbox');
            expect(result.find('input').props().className).toBe('cursor-pointer');
            expect(result.find('input').props().checked).toEqual(state.matrix[cell.value.rowNumber][cell.value.colNumber]);
        });

        it('should return expected having input onChange when cell value is object type', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ]
            };

            const cell = {
                value: {
                    rowNumber: 0,
                    colNumber: 0
                }
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
            removePicAssignment.instance().handleChange = jest.fn();
            const result = shallow(removePicAssignment.instance().renderCell(cell, 2));

            // Action
            result.find('input').simulate('change');

            // Assert
            expect(removePicAssignment.instance().handleChange).toHaveBeenCalledWith(cell.value.rowNumber, cell.value.colNumber);
        });

        it('should return expected when index equal 0', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const cell = { value: 1 };
            const expected = <Cell key={0} className='text-center'>{cell.value}</Cell>;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.instance().renderCell(cell, 0);

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when null cell', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const index = 5;
            const cell = { value: '' };
            const expected = <Cell key={index} className='null-cell-color'>{cell.value}</Cell>;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.instance().renderCell(cell, index);

            // Assert
            expect(result).toEqual(expected);
        });
    });

    it('handleChange should change state correctly', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: []
            },
            gridParams: {}
        };

        const state = {
            matrix: [
                [true]
            ],
            checkedAllList: [true]
        };

        const colNumber = 0;
        const rowNumber = 0;
        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
        removePicAssignment.instance().isCheckedAll = jest.fn(() => false);
        removePicAssignment.instance().setState(state);

        // Action
        removePicAssignment.instance().handleChange(rowNumber, colNumber);

        // Assert
        expect(removePicAssignment.instance().state.matrix).toEqual([
            [false]
        ]);
        expect(removePicAssignment.instance().state.checkedAllList).toEqual([false]);
    });

    describe('handleChangeCheckAll', () => {
        it('should change state correctly when not having null cell', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ],
                checkedAllList: [true]
            };

            const colNumber = 0;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
    
            // Action
            removePicAssignment.instance().handleChangeCheckAll(colNumber);

            // Assert
            expect(removePicAssignment.instance().state.matrix).toEqual([
                [false]
            ]);
            expect(removePicAssignment.instance().state.checkedAllList).toEqual([false]);
        });

        it('should change state correctly when having null cell', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true],
                    [null]
                ],
                checkedAllList: [true]
            };

            const colNumber = 0;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
    
            // Action
            removePicAssignment.instance().handleChangeCheckAll(colNumber);

            // Assert
            expect(removePicAssignment.instance().state.matrix).toEqual([
                [false],
                [null]
            ]);
            expect(removePicAssignment.instance().state.checkedAllList).toEqual([false]);
        });
    });

    describe('isCheckedAll', () => {
        it('should return false', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [false]
                ]
            };

            const colNumber = 0;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
    
            // Action
            const result = removePicAssignment.instance().isCheckedAll(colNumber);

            // Assert
            expect(result).toBeFalse;
        });

        it('should return true', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ]
            };

            const colNumber = 0;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);
    
            // Action
            const result = removePicAssignment.instance().isCheckedAll(colNumber);

            // Assert
            expect(result).toBeTrue;
        });
    });

    it('toggleConfirmRemovePopup change state correctly', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: []
            },
            gridParams: {}
        };

        const state = {
            isShowConfirmRemovePopup: true
        };

        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
        removePicAssignment.instance().setState(state);

        // Action
        removePicAssignment.instance().toggleConfirmRemovePopup();

        // Assert
        expect(removePicAssignment.instance().state.isShowConfirmRemovePopup).toBeFalse;
    });

    it('handleSubmitRemoveAssignment should run correctly', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: []
            },
            gridParams: {},
            onClose: jest.fn()
        };

        const name = 'name';
        const state = {
            matrix: [
                [true]
            ],
            dataList: [
                {
                    headlineID: 1,
                    custId: 1
                }
            ],
            picIds: [1],
            picNames: [ name ]
        };

        const expected = [
            {
                headlineId: state.dataList[0].headlineID,
                custId: state.dataList[0].custId,
                picId: state.picIds[0]
            }
        ];
        
        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
        removePicAssignment.instance().toggleConfirmRemovePopup = jest.fn();
        removePicAssignment.instance().refreshGrid = jest.fn();
        removePicAssignment.instance().isChecked = jest.fn(() => true);
        functions.removePicAssignment = jest.fn();
        removePicAssignment.instance().setState(state);

        // Action
        removePicAssignment.instance().handleSubmitRemoveAssignment();

        // Assert
        expect(removePicAssignment.instance().toggleConfirmRemovePopup).toHaveBeenCalled();
        expect(props.onClose).toHaveBeenCalled();
        expect(functions.removePicAssignment).toHaveBeenCalledWith(expected, name, removePicAssignment.instance().refreshGrid);
    });

    it('refreshGrid should run correctly', () => {
        // Arrange
        const props = {
            removeOptions: {
                dataList: []
            },
            gridParams: {},
            getGridData: jest.fn((params, callback) => callback()),
            setRemoveOptions: jest.fn()
        };

        const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
        functions.handleNewRemoveOptions = jest.fn();

        // Action
        removePicAssignment.instance().refreshGrid();

        // Assert
        expect(props.getGridData).toHaveBeenCalledWith(props.gridParams, expect.any(Function));
    });

    describe('isChecked', () => {
        it('should return true', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().isChecked(0);

            // Assert
            expect(result).toBeTrue;
        });
        
        it('should return false', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [false]
                ]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().isChecked(0);

            // Assert
            expect(result).toBeFalse;
        });
    });

    describe('isNotHadChecked', () => {
        it('should return true', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [false]
                ]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().isNotHadChecked(0);

            // Assert
            expect(result).toBeTrue;
        });
        
        it('should return false', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                matrix: [
                    [true]
                ],
                picIds: [1]
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.instance().isNotHadChecked(0);

            // Assert
            expect(result).toBeFalse;
        });
    });

    describe('render', () => {
        it('should have Modal', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.find(Modal);

            // Assert
            expect(result.props().show).toBeTrue;
            expect(result.props().backdrop).toBe('static');
            expect(result.props().keyboard).toBeFalse;
            expect(result.props().size).toBe('lg');
            expect(result.props().centered).toBeTrue;
            expect(result.props().dialogAs).toEqual(DraggableModalDialog);
        });

        it('should have Modal onHide', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {},
                onClose: jest.fn()
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            const result = removePicAssignment.find(Modal);

            // Action
            result.simulate('hide');

            // Assert
            expect(props.onClose).toHaveBeenCalled();
        });
        
        it('should have Modal Header', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.find(Modal.Header);

            // Assert
            expect(result.props().closeButton).toBeTrue;
            expect(result.find(Modal.Title).props().as).toBe('div');
            expect(result.find(Modal.Title).html()).toContain('RemovePICAssignment');
        });
        
        it('should have Modal Body', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const header = 'header';
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);

            // Action
            const result = removePicAssignment.find(Modal.Body);

            // Assert
            expect(result.props().className).toBe('remove-pic-body');
            expect(result.find(Table).props().maxWidth).toEqual(772);
            expect(result.find(Table).props().bodyHeight).toEqual(500);
            expect(result.find(Table).props().autoWidth).toBeFalse;
            expect(result.find(Table).props().autoHeight).toBeFalse;
            expect(result.find(Table).props().containerPadding).toEqual(0);
            expect(result.find(Table).props().shouldResetScrollPosition).toBeFalse;
        });
        
        it('should have Modal Footer', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const disabled = true;
            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().isNotHadChecked = jest.fn(() => disabled);

            // Action
            const result = removePicAssignment.find(Modal.Footer);

            // Assert
            expect(result.find(Button).at(0).props().variant).toBe('primary');
            expect(result.find(Button).at(0).props().size).toBe('sm');
            expect(result.find(Button).at(0).props().disabled).toEqual(disabled);
            expect(result.find(Button).at(0).html()).toContain('Remove');
            expect(result.find(Button).at(1).props().variant).toBe('primary');
            expect(result.find(Button).at(1).props().size).toBe('sm');
            expect(result.find(Button).at(1).html()).toContain('Close');
        });
        
        it('should have Modal Footer having first Button onClick', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().toggleConfirmRemovePopup = jest.fn();
            const result = removePicAssignment.find(Modal.Footer);

            // Action
            result.find(Button).at(0).simulate('click');

            // Assert
            expect(removePicAssignment.instance().toggleConfirmRemovePopup).toHaveBeenCalled();
        });
        
        it('should have Modal Footer having second Button onClick', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {},
                onClose: jest.fn()
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            const result = removePicAssignment.find(Modal.Footer);

            // Action
            result.find(Button).at(1).simulate('click');

            // Assert
            expect(props.onClose).toHaveBeenCalled();
        });
        
        it('should have ConfirmPopup', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmRemovePopup: true
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().setState(state);

            // Action
            const result = removePicAssignment.find(ConfirmPopup);

            // Assert
            expect(result.props().title).toBe('Confirmation');
            expect(result.props().content).toBe('ConfirmRemoveDirectAccounts');
        });
        
        it('should have ConfirmPopup onSubmit', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmRemovePopup: true
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().handleSubmitRemoveAssignment = jest.fn();
            removePicAssignment.instance().setState(state);
            const result = removePicAssignment.find(ConfirmPopup);

            // Action
            result.simulate('submit');

            // Assert
            expect(removePicAssignment.instance().handleSubmitRemoveAssignment).toHaveBeenCalled();
        });
        
        it('should have ConfirmPopup onClose', () => {
            // Arrange
            const props = {
                removeOptions: {
                    dataList: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmRemovePopup: true
            };

            const removePicAssignment = shallow(<RemovePicAssignment {...props} />);
            removePicAssignment.instance().toggleConfirmRemovePopup = jest.fn();
            removePicAssignment.instance().setState(state);
            const result = removePicAssignment.find(ConfirmPopup);

            // Action
            result.simulate('close');

            // Assert
            expect(removePicAssignment.instance().toggleConfirmRemovePopup).toHaveBeenCalled();
        });
    });
});