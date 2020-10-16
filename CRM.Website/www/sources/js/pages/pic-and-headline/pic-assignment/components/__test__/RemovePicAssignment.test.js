import RemovePicAssignmentWrapper, { RemovePicAssignment } from '../RemovePicAssignment';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
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
});