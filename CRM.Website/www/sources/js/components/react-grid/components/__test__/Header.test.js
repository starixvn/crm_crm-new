import React from 'react';
import HeaderCell from '../HeaderCell';
import { shallow } from 'enzyme';

describe('HeaderCell', () => {
    it('should have correct snapshots', () => {
        // Action
        const headerCell = shallow(<HeaderCell />);

        // Assert
        expect(headerCell).toMatchSnapshot();
    });

    describe('onClick', () => {
        it('should not call onSort when null or empty sortBy', () => {
            // Arrange
            const props = {
                sortBy: '',
                onSort: jest.fn()
            };

            const headerCell = shallow(<HeaderCell {...props} />);

            // Action
            headerCell.instance().onClick();
    
            // Assert
            expect(props.onSort).toHaveBeenCalledTimes(0);
        });

        it('should call onSort when not empty sortBy and not having sortOrder', () => {
            // Arrange
            const props = {
                sortBy: 'sort',
                onSort: jest.fn()
            };

            const headerCell = shallow(<HeaderCell {...props} />);

            // Action
            headerCell.instance().onClick();
    
            // Assert
            expect(props.onSort).toHaveBeenCalledWith(props.sortBy, 'asc');
        });

        it('should call onSort when not empty sortBy and having sortOrder not equal desc', () => {
            // Arrange
            const props = {
                sortBy: 'sort',
                onSort: jest.fn(),
                sortOrder: 'fdsaf'
            };

            const headerCell = shallow(<HeaderCell {...props} />);

            // Action
            headerCell.instance().onClick();
    
            // Assert
            expect(props.onSort).toHaveBeenCalledWith(props.sortBy, 'desc');
        });

        it('should call onSort when not empty sortBy and having sortOrder equal desc', () => {
            // Arrange
            const props = {
                sortBy: 'sort',
                onSort: jest.fn(),
                sortOrder: 'desc'
            };

            const headerCell = shallow(<HeaderCell {...props} />);

            // Action
            headerCell.instance().onClick();
    
            // Assert
            expect(props.onSort).toHaveBeenCalledWith(props.sortBy, 'asc');
        });
    });

    describe('render', () => {
        it('should return default when null or empty sortBy', () => {
            // Arrange
            const props = {
                sortBy: '',
                children: 'children'
            };

            const expected = <th>{props.children}</th>
            const headerCell = shallow(<HeaderCell {...props} />);

            // Action
            const result = headerCell.instance().render();

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when having sortBy and sortOrder asc', () => {
            // Arrange
            const props = {
                sortBy: 'fgdsafdsa',
                sortOrder: 'asc',
                children: 'children'
            };

            const onClick = jest.fn();
            const expected = <th className={'sortable sorting'}
                style={{ position: 'relative', backgroundClip: 'padding-box' }}
                onClick={onClick}
            >
                <div style={{ width: '90%' }}>{props.children}</div>
                <span style={{ float: 'right', position: 'absolute', top: '40%', right: '2px' }}>
                    <div style={{ display: 'block', color: '#111' }} className={'asc'}></div>
                    <div style={{ display: 'block', marginTop: '2px', color: '#777' }} className={'desc'}></div>
                </span>
            </th>;

            const headerCell = shallow(<HeaderCell {...props} />);
            headerCell.instance().onClick = onClick;

            // Action
            const result = headerCell.instance().render();

            // Assert
            expect(result).toEqual(expected);
        });

        it('should return expected when having sortBy and sortOrder desc', () => {
            // Arrange
            const props = {
                sortBy: 'fgdsafdsa',
                sortOrder: 'desc',
                children: 'children'
            };

            const onClick = jest.fn();
            const expected = <th className={'sortable sorting'}
                style={{ position: 'relative', backgroundClip: 'padding-box' }}
                onClick={onClick}
            >
                <div style={{ width: '90%' }}>{props.children}</div>
                <span style={{ float: 'right', position: 'absolute', top: '40%', right: '2px' }}>
                    <div style={{ display: 'block', color: '#777' }} className={'asc'}></div>
                    <div style={{ display: 'block', marginTop: '2px', color: '#111' }} className={'desc'}></div>
                </span>
            </th>;

            const headerCell = shallow(<HeaderCell {...props} />);
            headerCell.instance().onClick = onClick;

            // Action
            const result = headerCell.instance().render();

            // Assert
            expect(result).toEqual(expected);
        });
    });
});