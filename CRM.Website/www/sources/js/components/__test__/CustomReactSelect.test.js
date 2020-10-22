import React from 'react';
import CustomReactSelect from '../CustomReactSelect';
import Select from 'react-select';
import { shallow } from 'enzyme';

describe('CustomReactSelect', () => {
    it('should have correct snapshot', () => {
        // Action
        const customReactSelect = shallow(<CustomReactSelect />);

        // Assert
        expect(customReactSelect).toMatchSnapshot();
    });

    describe('render', () => {
        it('should return correct component', () => {
            // Arrange
            const props = {
                components: {},
                styles: {}
            };
    
            // Action
            const customReactSelect = shallow(<CustomReactSelect {...props} />);
    
            // Assert
            expect(customReactSelect.props().className).toBe('react-select-container');
            expect(customReactSelect.props().classNamePrefix).toBe('react-select');
            expect(typeof customReactSelect.props().components.IndicatorSeparator).toBe('function');
            expect(typeof customReactSelect.props().styles.control).toBe('function');
            expect(typeof customReactSelect.props().styles.input).toBe('function');
            expect(typeof customReactSelect.props().styles.multiValue).toBe('function');
        });
        
        it('should return component having props components IndicatorSeparator', () => {
            // Arrange
            const props = {
                components: {},
                styles: {}
            };
    
            const customReactSelect = shallow(<CustomReactSelect {...props} />);
    
            // Action
            const result = customReactSelect.props().components.IndicatorSeparator();
    
            // Assert
            expect(result).toBeNull;
        });
        
        it('should return component having props styles control', () => {
            // Arrange
            const props = {
                components: {},
                styles: {}
            };
    
            const base = { width: 10 };
            const customReactSelect = shallow(<CustomReactSelect {...props} />);
    
            // Action
            const result = customReactSelect.props().styles.control(base);
    
            // Assert
            expect(result).toEqual({
                ...base,
                borderRadius: 0,
                minHeight: 'unset',
                boxShadow: 'none'
            });
        });
        
        it('should return component having props styles input', () => {
            // Arrange
            const props = {
                components: {},
                styles: {}
            };
    
            const base = { width: 10 };
            const customReactSelect = shallow(<CustomReactSelect {...props} />);
    
            // Action
            const result = customReactSelect.props().styles.input(base);
    
            // Assert
            expect(result).toEqual({
                ...base,
                lineHeight: 1
            });
        });
        
        it('should return component having props styles multiValue', () => {
            // Arrange
            const props = {
                components: {},
                styles: {}
            };
    
            const base = { width: 10 };
            const customReactSelect = shallow(<CustomReactSelect {...props} />);
    
            // Action
            const result = customReactSelect.props().styles.multiValue(base);
    
            // Assert
            expect(result).toEqual({
                ...base,
                margin: '0 4px 0 0'
            });
        });
    });
});