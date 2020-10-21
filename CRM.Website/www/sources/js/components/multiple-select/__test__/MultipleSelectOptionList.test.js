import React from 'react';
import MultipleSelectOptionList from '../MultipleSelectOptionList';
import Option from '../Option';
import { shallow } from 'enzyme';

describe('MultipleSelectOptionList', () => {
    it('should have correct snapshots', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        // Action
        const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

        // Assert
        expect(multipleSelectOptionList).toMatchSnapshot();
    });

    describe('_renderOptionList', () => {
        it('should return no data when dataSource empty', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const expected = <span>No information</span>;
            const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

            // Action
            const result = multipleSelectOptionList.instance()._renderOptionList();

            // Assert
            expect(result).toEqual(expected);
        });
        
        it('should return expected when dataSource not empty', () => {
            // Arrange
            const item = {
                visible: true,
                subData: []
            };

            const props = {
                id: 'id',
                dataSource: [
                    item
                ],
                onChange: jest.fn()
            };

            const expected = [
                <Option
                    id='id-optionItem-0'
                    key='idoptionItem0'
                    itemData={item}
                    onChange={props.onChange}
                />
            ];
            const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

            // Action
            const result = multipleSelectOptionList.instance()._renderOptionList();

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('_calculateMinHeightOptionList', () => {
        it('should return expected when maxLengthOfSubData from 1 to 4', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const maxLengthOfSubData = 1;
            const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

            // Action
            const result = multipleSelectOptionList.instance()._calculateMinHeightOptionList(maxLengthOfSubData);

            // Assert
            expect(result).toEqual(maxLengthOfSubData * 40);
        });
        
        it('should return expected when maxLengthOfSubData greater than 5', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const maxLengthOfSubData = 6;
            const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

            // Action
            const result = multipleSelectOptionList.instance()._calculateMinHeightOptionList(maxLengthOfSubData);

            // Assert
            expect(result).toEqual(150);
        });
        
        it('should return expected when maxLengthOfSubData equal 5 or not greater than 0', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const maxLengthOfSubData = 5;
            const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);

            // Action
            const result = multipleSelectOptionList.instance()._calculateMinHeightOptionList(maxLengthOfSubData);

            // Assert
            expect(result).toEqual(0);
        });
    });

    it('render should return correct components', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const minHeight = 10;
        const _renderOptionList = jest.fn();
        const multipleSelectOptionList = shallow(<MultipleSelectOptionList {...props} />);
        multipleSelectOptionList.instance()._renderOptionList = _renderOptionList;
        multipleSelectOptionList.instance()._calculateMinHeightOptionList = jest.fn(() => minHeight);

        // Action
        const result = shallow(multipleSelectOptionList.instance().render());

        // Assert
        expect(result.props().className).toBe('multiple-select-options');
        expect(result.props().style).toEqual({ minHeight });
        expect(_renderOptionList).toHaveBeenCalled();
    });
});