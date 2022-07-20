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
        it('has regular components', () => {
            // Arrange
            const props = { 
                settings: [{settingType: 'Category',settingId: 0, subSettingId : 0}],
                balanceUpday: new Date()
            };
            // Act
           const container = shallow(<AppContainer {...props}/>);

            // Assert
            expect(container.find(CreateForm).length).toBe(1);
        });
    });
});