import React from 'react';
import MultipleSelectLabel from '../MultipleSelectLabel';
import { shallow } from 'enzyme';

describe('MultipleSelectLabel', () => {
    it('should have correct snapshots', () => {
        // Arrange
        const props = {
            selectedItems: [],
            textOptions: {}
        };

        // Action
        const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);

        // Assert
        expect(multipleSelectLabel).toMatchSnapshot();
    });

    describe('selectedItemsString', () => {
        it('should return All when isAllTextShown true and dataSourceSize equal to selectedItems length', () => {
            // Arrange
            const props = {
                isAllTextShown: true,
                dataSourceSize: 0,
                selectedItems: [],
                textOptions: {
                    Texts: 'Texts'
                }
            }
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual(props.textOptions.Texts);
        });
        
        it('should return SelectedItemCount when selectedItemCount greater than maxDisplayItemCount', () => {
            // Arrange
            const props = {
                maxDisplayItemCount: 0,
                selectedItems: [
                    {
                        value: 'value'
                    }
                ],
                textOptions: {
                    SelectedItemCount: '# items'
                }
            }
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual('1 items');
        });
        
        it('should return selected value when selectedItemCount not less than 1', () => {
            // Arrange
            const props = {
                maxDisplayItemCount: 10,
                selectedItems: [
                    {
                        value: 'value'
                    },
                    {
                        value: 'value1'
                    }
                ],
                textOptions: {}
            }
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual('value, value1');
        });
        
        it('should return no data value when dataSourceSize equal 0', () => {
            // Arrange
            const props = {
                maxDisplayItemCount: 10,
                selectedItems: [],
                textOptions: {
                    NoData: 'NoData'
                },
                dataSourceSize: 0
            }
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual(props.textOptions.NoData);
        });
        
        it('should return SelectOptions when not having selectedItem', () => {
            // Arrange
            const props = {
                selectedItems: [],
                textOptions: {
                    SelectOptions: 'SelectOptions'
                },
                dataSourceSize: 10
            }
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual(props.textOptions.SelectOptions);
        });
    });

    it('render should return correct components', () => {
        // Arrange
        const props = {
            selectedItems: [],
            onToggle: jest.fn(),
            textOptions: {
                SelectOptions: 'SelectOptions'
            },
            dataSourceSize: 10
        }

        // Action
        const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);

        // Assert
        expect(multipleSelectLabel.find('button').props().type).toBe('button');
        expect(multipleSelectLabel.find('button').props().className).toBe('multiple-select-default multiple-select-label');
        expect(multipleSelectLabel.find('button').props().onClick).toEqual(props.onToggle);
        expect(multipleSelectLabel.find('span').props().className).toBe('text-display');
        expect(multipleSelectLabel.find('span').html()).toContain(props.textOptions.SelectOptions);
        expect(multipleSelectLabel.find('b').html()).toBe('<b class="caret"></b>');
    });
});
