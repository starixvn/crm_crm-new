import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';

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
});