import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';

describe('Filter', () => {
    beforeAll(() => {
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        document.body.appendChild(hasReadSitePermission);
    });

    afterAll(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
        jest.clearAllMocks();
    });

    describe('getParams ', () => {
        it('should return exact param', () => {
            // Arrange
            const container = shallow(<Filter />);

            //Act
            const actual = container.instance().getParams(20);
            // Assert
            expect(actual).toEqual({top: 20});
        });
    });

    describe('renderOptions ', () => {
        it('return expected result', () => {
            // Arrange
            const item = {
                id: 1, name: 'test'
            };
            const expected = <option key="0" value={item}>{item}</option>;

            //Act
            const container = shallow(<Filter />);
            const actual = container.instance().renderOptions(item, "0");

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});

