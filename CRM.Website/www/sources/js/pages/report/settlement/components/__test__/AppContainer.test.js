import React from 'react';
import { AppContainer } from '../AppContainer';
import { shallow } from 'enzyme';
import Chart from '../Chart';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('render AppContainer', () => {
        // Act
        const wrapper = shallow(<AppContainer />);

        // Assert
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('Chart popup', () => {
        it('render popup', () => {
            // Arrange
            const props = {
                contentChartPopup: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});