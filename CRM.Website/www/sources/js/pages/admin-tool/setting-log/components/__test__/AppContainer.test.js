import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import Filter from '../Filter';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Act
            const container = shallow(<AppContainer />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
        });
    });
});