import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly with tab 1', () => {
            //Arrange
            const props = {tab: 1};

            // Act
            const container = shallow(<AppContainer {...props}/>);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render correctly with tab 2', () => {
            //Arrange
            const props = {tab: 2};

            // Act
            const container = shallow(<AppContainer {...props}/>);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});