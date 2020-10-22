import React from 'react';
import Row from '../Row';

describe('Row', () => {
    it('should return expected row', () => {
        // Arrange
        const props = { children: 'children' };
        const expected = <tr>{props.children}</tr>;

        // Action
        const row = Row(props);

        // Assert
        expect(row).toEqual(expected);
    });
});