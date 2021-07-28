import React from 'react';
import { AppContainer } from '../AppContainer';
import CreateForm from '../CreateForm';
import { shallow } from 'enzyme';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should do as expected', () => {
            // Arrange
            const props = {
                getSettings: jest.fn()
            };

            // Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getSettings).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null when settings are null', () => {
            // Arrange
            const props = {
                getSettings: jest.fn(),
                settings: null
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });

        it('should return null when settings have data', () => {
            // Arrange
            const props = {
                getSettings: jest.fn(),
                settings: { extensions: { id: 1, type: 'tests' } }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toEqual(<CreateForm />);
        });
    });
});