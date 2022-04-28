import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly when gridData null', () => {
        // Arrange
        const props = {
            gridData: null
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(0);
    });

    it('should render correctly when gridData undefined', () => {
        // Arrange
        const props = {
            gridData: undefined
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(0);
    });

    it('should render correctly when gridData has data', () => {
        // Arrange
        const props = {
            gridData: {
                GrandTotal: {
                    Month: "test",
                    Total: 65,
                    Wagers: [{Id: 0, Name: "test", Amount: 10}, {Id: 0, Name: "test", Amount: 10}]
                },
                ReportTitle: "test",
                WagerByMonths: [{Month: "test", Wagers: [{Id: 0, Name: "test", Amount: 1}, {Id: 0, Name: "test", Amount: 1}]}]
            }
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(1);
    });
});