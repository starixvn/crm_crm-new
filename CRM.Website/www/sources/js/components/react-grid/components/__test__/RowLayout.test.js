import React from 'react';
import RowLayout from '../RowLayout';
import { shallow } from 'enzyme';

describe('RowLayout', () => {
    it('should have correct snapshot', () => {
        // Arrange
        const props = {
            columnLayout: []
        };

        // Action
        const rowLayout = shallow(<RowLayout {...props} />);

        // Assert
        expect(rowLayout).toMatchSnapshot();
    });

    describe('_getRowLayout', () => {
        it('should return expected row layout when with is number', () => {
            // Arrange
            const width = 10;
            const props = {
                columnLayout: [ width ]
            };
    
            const rowLayout = shallow(<RowLayout {...props} />);
    
            // Action
            const result = rowLayout.instance()._getRowLayout();
    
            // Assert
            expect(result).toEqual([<td key='cellLayout0' style={{ width: `${width}px` }}></td>]);
        });
        
        it('should return expected row layout when with is string', () => {
            // Arrange
            const width = '10px';
            const props = {
                columnLayout: [ width ]
            };
    
            const rowLayout = shallow(<RowLayout {...props} />);
    
            // Action
            const result = rowLayout.instance()._getRowLayout();
    
            // Assert
            expect(result).toEqual([<td key='cellLayout0' style={{ width: width }}></td>]);
        });
    });

    it('render should run correctly', () => {
        // Arrange
        const props = {
            columnLayout: []
        };

        const _getRowLayout = jest.fn();
        const rowLayout = shallow(<RowLayout {...props} />);
        rowLayout.instance()._getRowLayout = _getRowLayout;

        // Action
        const result = shallow(rowLayout.instance().render());

        // Assert
        expect(result.props().className).toBe('first-row');
        expect(_getRowLayout).toHaveBeenCalled();
    });
});