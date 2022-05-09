import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isHost: true,
        settingType:[{id: 55001, value: "test", displayOrder: 0, isChild: false, isActive: true, 
                      childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]}],
        gridParams: { settingName: '' },
        mainSettings: [{ 
            displayOrder: 0,
            parentID: 0,
            settingId: 68001,
            settingName: "test",
            settingSource: null,
            settingValue: "te",
            childSettings: [
                {id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}
            ]
        }, 
        { 
            displayOrder: 0,
            parentID: 0,
            settingId: 68001,
            settingName: "test",
            settingSource: null,
            settingValue: "te",
            childSettings: [
                {id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}
            ]
        }
        ],
        setEditStatusPopup: jest.fn(),
        setOpenEdiPopup: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange

            // Act
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(5);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                settingType:[],
                gridParams: { settingName: '' },
                mainSettings: []
            };
            const expectedBody = [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={5}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>];
            const container = shallow(<DataGrid {...props} />).instance();
            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleEditStatus', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleEditStatus(1, 'test', true);

            // Assert
            expect(initProps.setEditStatusPopup).toHaveBeenCalledWith({show: true, settingId: 1, settingValue:'test', isActive: true});
        });
    });

    describe('handleOpenEdit', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {preventDefault: jest.fn()};
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleOpenEdit(event, {id: 1});
            // Assert
            expect(initProps.setOpenEdiPopup).toHaveBeenCalledWith({show: true, data: {id: 1}});
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {
                settingType : null
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });

        it('onClick edit call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.handleOpenEdit = jest.fn();
            const item = initProps.settingType[0];
            // Act
            const dataGrid = shallow(container.renderRow(item, 1, true));
            dataGrid.find('i').at(0).simulate('click');
            // Assert
            expect(container.handleOpenEdit).toHaveBeenCalled();
        });

        it('onClick edit call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.handleEditStatus = jest.fn();
            const item = initProps.settingType[0];
            // Act
            const dataGrid = shallow(container.renderRow(item, 1, true));
            dataGrid.find('input').at(0).simulate('change');
            // Assert
            expect(container.handleEditStatus).toHaveBeenCalled();
        });
    });
});