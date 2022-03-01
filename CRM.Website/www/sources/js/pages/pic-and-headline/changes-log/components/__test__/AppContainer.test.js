import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from '../AppContainer';
import DataGrid from '../DataGrid';
import Filter from '../Filter';
import PicFilter from '../PicFilter';
import PicDataGrid from '../PicDataGrid';

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
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
        });

        it('should render correctly with tab 2', () => {
            //Arrange
            const props = {tab: 2};

            // Act
            const container = shallow(<AppContainer {...props}/>);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(PicFilter).length).toBe(1);
            expect(container.find(PicDataGrid).length).toBe(1);
        });
    });
});