import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render Remark correctly', () => {
            //Act
            const container = shallow(<AppContainer />);

            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});