import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        serviceNames:["AmendmentNotiFB", "AutoFB", "AutoVoidFB", "ChatBot - AbnormalBets", "ChatBot - ArchivedAccounts"],
        settingNames:[{0 : "ConfigUAT"}],
        getSettingNames: jest.fn(),
        getConfigSettings: jest.fn(),
        setGridParams: jest.fn()
    };

    describe('handleSubmit', () => {
        it('should call exactly function',() => {
            // Arrange
            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleSubmit();

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalled();
            expect(initProps.getConfigSettings).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('should set exact state',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: { value: 'value', name: 'serviceName' }
            };

            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleChange(event);

            // Assert
            expect(container.state.serviceName).toEqual('value');
        });
    });
    

    describe('handleChangeEnvr', () => {
        it('should call exact function',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: { value: 'PRO', name: 'envr' }
            };

            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleChange = jest.fn();
            container.handleChangeEnvr(event);

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
            expect(initProps.getSettingNames).toHaveBeenCalled();
        });
    });

    describe('handleChangeServiceName', () => {
        it('should call exact function',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: { value: 'configUAT', name: 'serviceName' }
            };

            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleChange = jest.fn();
            container.handleChangeServiceName(event);

            // Assert
            expect(container.handleChange).toHaveBeenCalledWith(event);
            expect(initProps.getSettingNames).toHaveBeenCalled();
            expect(container.state.settingName).toEqual('All');
        });
    });
});