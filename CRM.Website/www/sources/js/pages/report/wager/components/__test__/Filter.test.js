import React from 'react';
import { Button, Form, Span } from 'react-bootstrap';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import { fn } from 'moment';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('render filter component', () => {
        // Arrange
        const props = {
            gridParams: {
                year: new Date().getFullYear()
            },
        };

        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });
    
    it('should work exactly submitHandler function', () => {
        // Arrange
        const props = {
            gridParams: {
                year: new Date().getFullYear()
            },
            setGridParams: jest.fn(),
            getGridData: jest.fn()
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.instance().submitHandler();
        // Assert
        expect(props.setGridParams).toHaveBeenCalled();
        expect(props.getGridData).toHaveBeenCalled();
    });

    it('should call setState with new year when change selected year ', () => {
        const props = {
            gridParams: {
                year: new Date().getFullYear()
            }
        };
        const event = {
            target: { value: 2020 }
        };
        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Control).first().simulate('change', event);

        // Assert
        expect(container.instance().state.year).toEqual(2020);
    });
});