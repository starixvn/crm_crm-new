import React from 'react';
import { AppContainer } from '../AppContainer';
import CreateForm from "../../../CreateForm";
import { shallow } from 'enzyme';

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
            expect(container).toMatchSnapshot();
            expect(container.find(CreateForm).length).toBe(1);
        });

        it('return null if props setting is null', () => {
            // Arrange
            const props = {
                settings : null
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(CreateForm).length).toBe(0);
        });
    });
});