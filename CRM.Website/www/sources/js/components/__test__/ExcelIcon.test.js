import ExcelIcon from '../ExcelIcon'
import React from 'react';
import { shallow } from 'enzyme';

describe('ExcelIcon', () => {
    it('has correct snapshots', () => {
        // Action
        const component = shallow(<ExcelIcon />);

        // Assert
        expect(component).toMatchSnapshot();
    });
})
