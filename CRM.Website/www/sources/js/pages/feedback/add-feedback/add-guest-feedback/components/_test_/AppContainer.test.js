import React from 'react';
import { AppContainer } from '../AppContainer';
import CreateForm from "../../../CreateForm";
import { shallow } from 'enzyme';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentWillUnmount', () => {
        it('should do reset store', () => {
            const props = {
                resetState: jest.fn(),
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
                balanceUpday: new Date(),
                getSettingPicCommunicationTools: jest.fn()
            };
            // Act
           const container = shallow(<AppContainer {...props}/>);

            // Assert
            expect(container.find(CreateForm).length).toBe(1);
        });

        it('should return null', () => {
            // Arrange
            const props = {
                settings : null,
                getSettingPicCommunicationTools: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});