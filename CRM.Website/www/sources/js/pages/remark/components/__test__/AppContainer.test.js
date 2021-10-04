import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Remark from '../Remark';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render Remark correctly', () => {
            //Act
            const container = shallow(<AppContainer />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Remark).length).toBe(1);
        });
    });
});