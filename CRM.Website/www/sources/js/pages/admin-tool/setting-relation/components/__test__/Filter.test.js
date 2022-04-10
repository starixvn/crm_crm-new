import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Form } from 'react-bootstrap';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        setGridParams: jest.fn(),
        getSettingTypes: jest.fn(),
        mainSettings: [{
            displayOrder: 0,
            parentID: 0,
            settingId: 68001,
            settingName: "test",
            settingSource: null,
            settingValue: "te",
            childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
        }]
    };

    describe('componentDidMount', () => {
        it('should call exactly function when did mount',() => {
            // Arrange

            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleSubmit = jest.fn();

            container.componentDidMount();
            // Assert
            expect(container.handleSubmit).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function',() => {
            // Arrange
            const state = {
                settingName: 'test'
            };

            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.setState(state);
            container.handleSubmit = jest.fn();

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalled();
            expect(initProps.getSettingTypes).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('onClick call exactly function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);

            //Act
            container.find(Form.Control).simulate('change', {target:{value: 'test'}});

            // Assert
            expect(container.instance().state.settingName).toEqual('test');
        });
    });
});