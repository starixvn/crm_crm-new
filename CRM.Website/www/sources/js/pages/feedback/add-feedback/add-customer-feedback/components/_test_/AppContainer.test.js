import React from 'react';
import { AppContainer } from '../AppContainer';
import CreateForm from "../../../CreateForm";
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        window.currentCustomer = {custId: 1};
        it('has regular components', () => {
            // Arrange
            const props = { 
                settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}],
                balanceUpdate: new Date(),
                currentCustomer: {custId: 1, custName: 'customer'}
            };

            // Act            
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(container.find(CreateForm).length).toBe(1);
        });

        it('render component correctly', () => {
            // Arrange
            const props = {
                settings : [1]
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});