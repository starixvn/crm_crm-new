import React from 'react';
import AppContainerWrapper, { AppContainer } from '../AppContainer';
import CreateForm from "../CreateForm";
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        // Act
       // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: []
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<AppContainerWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(
                initialState.settings
            );
        });
    });

    describe('render', () => {
        it('has regular components', () => {
            // Arrange
            const props = { isHost: false };

            // Act
           const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container.find(CreateForm).length).toBe(1);
            expect(container.find(CreateForm).props().isHost).toBe(props.isHost);
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