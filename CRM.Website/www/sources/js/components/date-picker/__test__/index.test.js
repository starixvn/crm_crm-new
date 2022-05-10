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
            expect(index.props().className).toBe(`datetime-picker ${props.className}`);
            expect(index.props().dateFormat).toBe('MMM dd, yyyy');
            expect(index.props().timeIntervals).toEqual(30);
            expect(index.props().customInput).toEqual(<CustomInput isInvalid={false}/>);
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