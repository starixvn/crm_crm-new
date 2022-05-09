import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Button, Form } from 'react-bootstrap';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const response = {};
    const promise = Promise.resolve(response);

    const initProps = {
        isHost: true,
        setGridParams: jest.fn(),
        gridParams: { settingName: 'test' },
        getSettingTypes: jest.fn(),
        setOpenInsertNewSettingPopup: jest.fn(),
        getLicenseesMapping: jest.fn(() => promise),
        setOpenLicenseeMappingPopup: jest.fn(),
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
            container.handleSubmit();

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalled();
            expect(initProps.getSettingTypes).toHaveBeenCalled();
        });
    });

    describe('handleInsertNewSetting', () => {
        it('should call exactly function',() => {
            // Arrange
            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleInsertNewSetting('test');

            // Assert
            expect(initProps.setOpenInsertNewSettingPopup).toHaveBeenCalledWith({show: true, settingName:'test'});
        });
    });

    describe('handleLicenseeMapping', () => {
        it('should call exactly function', async () => {
            // Arrange
            //Act
            const container = shallow(<Filter {...initProps} />).instance();
            await container.handleLicenseeMapping();

            // Assert
            expect(initProps.getLicenseesMapping).toHaveBeenCalled();
            expect(initProps.setOpenLicenseeMappingPopup).toHaveBeenCalledWith({ show: true});
        });
    });

    describe('render', () => {
        it('onChange call setState', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            const event = {
                preventDefault: jest.fn(),
                target:{value: 'test'}
            };
            //Act
            container.find(Form.Control).simulate('change', event);

            // Assert
            expect(container.instance().state.settingName).toEqual('test');
        });

        it('onClick insert new call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleInsertNewSetting = jest.fn();
            //Act
            container.find(Button).at(1).simulate('click');

            // Assert
            expect(container.instance().handleInsertNewSetting).toHaveBeenCalledWith('');
        });

        it('onClick insert value call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleInsertNewSetting = jest.fn();
            //Act
            container.find(Button).at(2).simulate('click');

            // Assert
            expect(container.instance().handleInsertNewSetting).toHaveBeenCalledWith('test');
        });
    });
});