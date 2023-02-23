import React from 'react';
import { shallow } from 'enzyme';
import { ActionAnnouncement } from '../ActionAnnouncement';
import toJson from 'enzyme-to-json';

describe('ActionAnnouncement', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            // Act
            const container = shallow(<ActionAnnouncement />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const props = {
                settings: null
            };

            // Act
            const container = shallow(<ActionAnnouncement {...props}/>);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});
