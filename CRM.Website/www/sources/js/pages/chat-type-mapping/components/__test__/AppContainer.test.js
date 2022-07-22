import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentWillUnmount', () => {
        const props = {
            setGridData: jest.fn(),
            setSettings: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.setGridData).toHaveBeenCalled();
            expect(props.setSettings).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render null', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer />);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });

        it('should render correctly', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer  />);
            container.instance().setState({policy: 2});

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
    
});