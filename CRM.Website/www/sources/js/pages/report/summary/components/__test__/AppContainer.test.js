import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly when gridData null', () => {
            // Arrange
            const props = {
                allSettingData: {
                    categories: [],
                    siteTypes: [],
                    yearRange: []
                },
                gridData: null,
                contentChartPopup: { show: false },
                getAllSetting: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});