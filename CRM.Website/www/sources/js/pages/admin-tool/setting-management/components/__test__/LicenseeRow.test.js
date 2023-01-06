import React from 'react';
import LicenseeRow  from '../LicenseeRow';
import { Cell, Row } from '@jsroot/components/react-grid/index';
import Select from '@jsroot/components/CustomReactSelect';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        handleCancel: jest.fn(),
        handleSave: jest.fn(),
        isEdit: true,
        isChangeableValue: true,
        debounceHandleLicenseeManagerChange: jest.fn(),
        handleEdit: jest.fn(),
        licenseesManagerOption:[{
            value: 'test',
            label: 'test'
        }],
        handleDelete: jest.fn(),
        licenseesOption:[{
            value: 'test',
            label: 'test'
        }],
        sourceMappingDefault:[{
            value: 'test',
            label: 'test'
        }],
        index: 1,
        item:{
            licenseeManager: null,
            setting: "0sServices",
            settingId: 6727,
            settingSource: ""
        },
        isHost: true
    };

    describe('componentDidUpdate', () => {
        it('should call setState when prevProps settingSource is changed', () => {
            // Arrange
            const prevProps = { item:{settingSource: 'test'} };
            //Act
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            container.componentDidUpdate(prevProps);
            // Assert
            expect(container.state.settingSource).toEqual('');
            expect(container.state.licenseeManager).toEqual(null);
        });

        it('should call setState when prevProps licenseeManager is changed', () => {
            // Arrange
            const prevProps = { item:{licenseeManager: 'test', settingSource:''} };
            //Act
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            container.componentDidUpdate(prevProps);
            // Assert
            expect(container.state.settingSource).toEqual('');
            expect(container.state.licenseeManager).toEqual(null);
        });
    });

    describe('handleChangeSelect', () => {
        it('should call setState if value is not null', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            //Act
            container.handleChangeSelect({value: 'test'}, 'settingSource');
            // Assert
            expect(container.state.settingSource).toEqual('test');
        });

        it('should call setState if value is null', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            //Act
            container.handleChangeSelect(null, 'settingSource');
            // Assert
            expect(container.state.settingSource).toEqual('');
        });
    });

    describe('onCancel', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            //Act
            container.onCancel();
            // Assert
            expect(initProps.handleCancel).toHaveBeenCalled();
        });
    });

    describe('onSave', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />).instance();
            //Act
            container.onSave(1);
            // Assert
            expect(initProps.handleSave).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should call exact function when changed source mapping', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />);
            container.instance().handleChangeSelect = jest.fn();
            //Act
            container.instance().render();
            container.find(Select).at(0).simulate('change');

            // Assert
            expect(container.instance().handleChangeSelect).toHaveBeenCalled();
        });

        it('should call exact function when changed licensee manager', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />);
            container.instance().handleChangeSelect = jest.fn();
            //Act
            container.instance().render();
            container.find(Select).at(1).simulate('change');

            // Assert
            expect(container.instance().handleChangeSelect).toHaveBeenCalled();
        });

        it('should call exact function when save', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />);
            container.instance().onSave = jest.fn();
            //Act
            container.instance().render();
            container.find('span').at(0).simulate('click');

            // Assert
            expect(container.instance().onSave).toHaveBeenCalled();
        });

        it('should call exact function when save', () => {
            // Arrange
            const container = shallow(<LicenseeRow {...initProps} />);
            container.instance().onCancel = jest.fn();
            //Act
            container.instance().render();
            container.find('span').at(1).simulate('click');

            // Assert
            expect(container.instance().onCancel).toHaveBeenCalled();
        });

        it('should call exact function when row is changeable', () => {
            // Arrange
            const props = {
                ...initProps, isChangeableValue: false
            };
            const container = shallow(<LicenseeRow {...props} />);
            //Act
            container.instance().render();
            container.find('span').at(0).simulate('click');

            // Assert
            expect(props.handleEdit).toHaveBeenCalled();
        });

        it('should call exact function when row is changeable', () => {
            // Arrange
            const props = {
                ...initProps, isChangeableValue: false
            };
            const container = shallow(<LicenseeRow {...props} />);
            //Act
            container.instance().render();
            container.find('span').at(1).simulate('click');

            // Assert
            expect(props.handleDelete).toHaveBeenCalled();
        });
    });
});