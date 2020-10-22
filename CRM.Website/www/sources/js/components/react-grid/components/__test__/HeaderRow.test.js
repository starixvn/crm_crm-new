import React from 'react';
import HeaderRow from '../HeaderRow';
import { render, shallow } from 'enzyme';

describe('HeaderRow', () => {
    it('should have correct snapshot', () => {
        // Action
        const headerRow = shallow(<HeaderRow />);

        // Assert
        expect(headerRow).toMatchSnapshot();
    });

    it('_renderChildren should return expected', () => {
        // Arrange
        const props = {
            onSort: jest.fn(),
            children: <div></div>,
            sortBy: 'somthing',
            sortOrder: 'asc'
        };
        
        const expected = React.Children.map(props.children, child => child && React.cloneElement(child, { onSort: props.onSort, sortOrder: props.sortBy === child.props.sortBy ? props.sortOrder : null }));
        const headerRow = shallow(<HeaderRow {...props} />);

        // Action
        const result = headerRow.instance()._renderChildren();

        // Assert
        expect(result).toEqual(expected);
    });

    it('render should return expected', () => {
        // Arrange
        const children = 'children';
        const expected = <tr>{children}</tr>;
        const headerRow = shallow(<HeaderRow />);
        headerRow.instance()._renderChildren = jest.fn(() => children);

        // Action
        const result = headerRow.instance().render();

        // Assert
        expect(result).toEqual(expected);
    });
});