import React from 'react';
import Pager from '../Pager';
import { shallow } from 'enzyme';

describe('Pager', () => {
    it('should have correct snapshot', () => {
        // Action
        const pager = shallow(<Pager />);

        // Assert
        expect(pager).toMatchSnapshot();
    });

    it('should have correct default state', () => {
        // Arrange
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            }
        };

        // Action
        const pager = shallow(<Pager {...props} />);

        // Assert
        expect(pager.instance().state).toEqual({
            inputValue: props.pageOption.PageIndex
        });
    });
});