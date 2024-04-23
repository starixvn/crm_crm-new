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

    describe('handleSelectedItem', () => {
        it('should return exactly', () => {
            // Arrange
            const props = {
                isAllTextShown: true,
                dataSourceSize: 0,
                selectedItems: [],
                textOptions: {
                    Texts: 'Texts'
                }
            };
            const selectedItems = [
                {
                    value: '2221',
                    subItem: []
                },
                {
                    value: '2222',
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            ];
            
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const actual = multipleSelectLabel.instance().handleSelectedItem(selectedItems);

            // Assert
            expect(actual).toEqual(['2221', '2223']);
        });
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
            };
    
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
                        value: 'value',
                        subItem: [{ key: 1, value: '2223', checked: true }]
                    }
                ],
                textOptions: {
                    SelectedItemCount: '# items'
                }
            };
    
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
                        value: 'value',
                        subItem: [{ key: 1, value: '2223', checked: true }]

                    },
                    {
                        value: 'value1',
                        subItem: [{ key: 2, value: '2224', checked: true }]

                    }
                ],
                textOptions: {}
            };
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual('2223, 2224');
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
            };
    
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
            };
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual(props.textOptions.SelectOptions);
        });

        it('should return NA when not having selectedItem and isNAOption is true', () => {
            // Arrange
            const props = {
                selectedItems: [],
                textOptions: {
                    NA: 'NA'
                },
                dataSourceSize: 10,
                isNAOption: true
            };
    
            const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);
    
            // Action
            const result = multipleSelectLabel.instance().selectedItemsString;

            // Assert
            expect(result).toEqual(props.textOptions.NA);
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
        };

        // Action
        const multipleSelectLabel = shallow(<MultipleSelectLabel {...props} />);

        // Assert
        expect(multipleSelectLabel.find('button').props().type).toBe('button');
        expect(multipleSelectLabel.find('button').props().className).toBe('multiple-select-default multiple-select-label');
        expect(multipleSelectLabel.find('button').props().onClick).toEqual(props.onToggle);
    });
});
