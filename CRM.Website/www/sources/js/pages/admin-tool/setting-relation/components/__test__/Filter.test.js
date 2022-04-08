import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Button, Form } from 'react-bootstrap';

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
            const props = { ...initProps };

            //Act
            const container = shallow(<Filter {...props} />).instance();
            container.handleSubmit = jest.fn();

            container.componentDidMount();
            // Assert
            expect(container.handleSubmit).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function',() => {
            // Arrange
            const props = { ...initProps };
            const state = {
                settingName: 'test'
            };

            //Act
            const container = shallow(<Filter {...props} />).instance();
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
            const props = { ...initProps };

            //Act
            const container = shallow(<Filter {...props} />);
            container.find(Form.Control).simulate('click', {target:{value: 'test'}});

            // Assert
            expect(container.instance().state.settingName).toEqual('test');
        });
    });
});