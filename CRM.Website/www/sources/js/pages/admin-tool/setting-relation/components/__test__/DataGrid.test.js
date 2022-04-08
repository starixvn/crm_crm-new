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
        getMainSettingRelation: jest.fn(),
        setOpenUpdatePopup: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange

            // Act
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const header = shallow(container.buildHeader(initProps.gridData));

            // Assert
            expect(header.find(HeaderCell).length).toBe(4);
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
                <Cell className='text-center' colSpan={4}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>];
            const container = shallow(<DataGrid {...props} />).instance();
            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });

        it('cell click call handleToggleRow', () => {
            // Arrange
            const container = mount(<DataGrid {...initProps} />);
            container.instance().handleToggleRow = jest.fn();
            // Act
            container.find(Cell).at(0).simulate('click');
            // Assert
            expect(container.instance().handleToggleRow).toHaveBeenCalled();
        });
    });

    describe('handleToggleRow ', () => {
        it('should setState', () => {
            // Arrange
            const event = {
                stopPropagation: jest.fn()
            };
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleToggleRow(event, 1);

            // Assert
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(container.state.toggleRow).toEqual([1]);
        });
    });

    describe('renderSubSetting ', () => {
        it('should return null', () => {
            // Arrange
            const state = {
                toggleRow: [1]
            };
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.setState(state);
            // Act
            const actual = container.renderSubSetting(1, null);
            // Assert
            expect(actual).toBeNull();
        });
    });

    describe('handleOpenUpdate', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {preventDefault: jest.fn()};
            const container = shallow(<DataGrid {...initProps} />).instance();
            // Act
            container.handleOpenUpdate(event, 1);
            // Assert
            expect(initProps.setOpenUpdatePopup).toHaveBeenCalledWith({show: true, title: 'AddSubSettingTitle 1', parentId: 1});
            expect(initProps.getMainSettingRelation).toHaveBeenCalled();
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
    });
});