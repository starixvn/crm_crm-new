import React from 'react';
import { shallow } from 'enzyme';
import { DataGrid } from '../DataGrid';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        configSettings:[{id: 1, settingName: "ConfigUAT", value: "1", serviceName: "AmendmentNotiFB", dataType: "Boolean"}],
        settingNames:[{0 : "ConfigUAT"}],
        gridParams:{ serviceName: '' },
        setEditPopup: jest.fn(),
        getSettingNames: jest.fn(),
        setGridParams: jest.fn(),
        isHost: true
    };

    describe('componentDidUpdate', () => {
        it('should call exactly function',() => {
            // Arrange
            const prevProps = {configSettings: null};
            const expected = new Map();

            //Act
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.componentDidUpdate(prevProps);

            // Assert
            expect(container.state.checkedItems).toEqual(expected);
        });
    });

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
                ...initProps, configSettings: []
            };
            const expectedBody = [
            <Row key='body' className="no-data" >
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

    describe('handleChangeCheckbox  ', () => {
        it('should setState correctly', () => {
            // Arrange
            const checkedItems = new Map();
            const state = {
                checkedItems: checkedItems
            };
            const expected = {
                checkedItems: checkedItems.set(1, true)
            };
            const container = shallow(<DataGrid />).instance();
            container.setState(state);

            // Act
            container.handleChangeCheckbox({ target: { checked:true , name: '1' } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });
    });

    describe('handleChangeCheckBoxAll   ', () => {
        it('should reset state', () => {
            // Arrange
            const expected = {
                checkedItems:  new Map()
            };
            
            const container = shallow(<DataGrid />).instance();

            // Act
            container.handleChangeCheckBoxAll ({ target: { checked:false } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });

        it('should setState correctly', () => {
            // Arrange
            const checkedItems = new Map();
            const expected = {
                checkedItems: checkedItems.set(1,true)
            };
            
            const container = shallow(<DataGrid {...initProps} />).instance();

            // Act
            container.handleChangeCheckBoxAll({ target: { checked:true } });

            // Assert
            expect(container.state.checkedItems).toEqual(expected.checkedItems);
        });
    });

    describe('handleMultipleEdit', () => {
        it('should call exact function', () => {
            // arrange
            const checkedItems = new Map();
            checkedItems.set(1, true);
            const state = {
                checkedItems: checkedItems
            };
            // Act
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.setState(state);

            container.handleMultipleEdit();

            // Assert
            expect(initProps.setEditPopup).toHaveBeenCalled();
        });
    });

    describe('handleEdit', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            // Act

            container.handleEdit();

            // Assert
            expect(initProps.setEditPopup).toHaveBeenCalled();
        });
    });


    describe('render', () => {
        it('should return empty',() => {
            // Arrange
            const props = {...initProps, configSettings: null};

            //Act
            const container = shallow(<DataGrid {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});