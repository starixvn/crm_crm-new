import React from 'react';
import Index from '../index';
import DatePicker from 'react-datepicker';
import CustomInput from '../CustomInput';
import { shallow } from 'enzyme';

describe('index', () => {
    it('should have correct snapshots', () => {
        // Action
        const index = shallow(<Index />);

        // Assert
        expect(index).toMatchSnapshot();
    });

    describe('render', () => {
        it('should return DatePicker', () => {
            // Arrange
            const props = {
                className: 'className',
                showTimeSelect: true
            };

            // Action
            const index = shallow(<Index {...props} />);

            // Assert
            expect(index.props().className).toBe(`form-control form-control-sm datetime-picker ${props.className}`);
            expect(index.props().dateFormat).toBe('MMM dd, yyyy hh:mm aa');
            expect(index.props().timeFormat).toBe('hh:mm aa');
            expect(index.props().timeIntervals).toEqual(5);
            expect(index.props().customInput).toEqual(<CustomInput />);
        });
        
        it('should return DatePicker with showTimeSelect false', () => {
            // Arrange
            const props = {
                showTimeSelect: false
            };

            // Action
            const index = shallow(<Index {...props} />);

            // Assert
            expect(index.props().dateFormat).toBe('MMM dd, yyyy');
        });
    });
});