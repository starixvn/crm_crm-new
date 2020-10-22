import React from 'react';
import Cell from '../Cell';

describe('Cell', () => {
    it('should render expected Cell', () => {
        // Arrange
        const props = {
            children: 'children'
        };

        const expected = <td {...props}>{props.children}</td>;

        // Action
        const cell = Cell(props);

        // Assert
        expect(cell).toEqual(expected);
    });
});