import React from 'react';
import CustomInput from '../CustomInput'
import { Form } from 'react-bootstrap';
import { shallow } from 'enzyme';

describe('CustomInput', () => {
    it('should have correct snapshots', () => {
        // Action
        const customInput = shallow(<CustomInput />);

        // Assert
        expect(customInput).toMatchSnapshot();
    });

    it('render should return correct component', () => {
        // Arrange
        const props = {
            disabled: true,
            onClick: jest.fn(),
            value: 'value'
        };

        // Action
        const customInput = shallow(<CustomInput {...props} />);

        // Assert
        expect(customInput.find(Form.Control).props().as).toBe('input');
        expect(customInput.find(Form.Control).props().readOnly).toBeTrue;
        expect(customInput.find(Form.Control).props().disabled).toEqual(props.disabled);
        expect(customInput.find(Form.Control).props().onClick).toEqual(props.onClick);
        expect(customInput.find(Form.Control).props().value).toEqual(props.value);
        expect(customInput.find('i').props().className).toBe('date-picker-icon fa fa-calendar');
        expect(customInput.find('i').props().onClick).toEqual(props.onClick);
    });
});