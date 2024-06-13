import React from 'react';
import { AppContainer } from '../AppContainer';
import CreateForm from "../../../CreateForm";
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentWillUnmount', () => {
        it('should do reset store', () => {
            const props = {
                resetState: jest.fn(),
                currentCustomer: {custId: 1},
                getSettingPicCommunicationTools: jest.fn()
            };

            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('has regular components', () => {
            // Arrange
            const props = { 
                settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}],
                balanceUpdate: new Date(),
                currentCustomer: {custId: 1, custName: 'customer'},
                getSettingPicCommunicationTools: jest.fn()
            };

            // Act            
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container.find(CreateForm).length).toBe(1);
        });

        it('render component correctly', () => {
            // Arrange
            const props = {
                settings : [1],
                currentCustomer: {custId: 1, custName: 'customer'},
                getSettingPicCommunicationTools: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            //expect(toJson(container)).toMatchSnapshot();
        });

        it('should return null', () => {
            // Arrange
            const props = {
                settings : null,
                currentCustomer: {custId: 1, custName: 'customer'},
                getSettingPicCommunicationTools: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});