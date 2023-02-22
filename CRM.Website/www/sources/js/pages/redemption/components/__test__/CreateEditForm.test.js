import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { CreateEditForm } from '../CreateEditForm';
import DatePicker from '@jsroot/components/date-picker/index';
import CkEditor from '@jsroot/components/ckeditor/index';

describe('CreateEditForm', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        const props = {
            values: {},
            errors: {},
            touched: {},
            handleChange: jest.fn(),
            setFieldValue: jest.fn(),
            isSubmitting: jest.fn(),
            statuses: {
                statuses: [{ statusId: 1, name: 'KIV' }],
                currencies: [{ id: 1, value: 'UK' }]
            }
        };
    
        it('onChange call exact function', () => {
            // Arrange
            const container = shallow(<CreateEditForm {...props} />).instance();
            const formRender = shallow(container.render());

            // Act
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');
            formRender.find(Form.Control).at(2).simulate('change');
            formRender.find(Form.Control).at(3).simulate('change');
            formRender.find(Form.Control).at(4).simulate('change');

            // Assert
            expect(props.handleChange).toHaveBeenCalled();
        });

        it('change claimTime call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<CreateEditForm {...props} />).instance();
            const formRender = shallow(container.render());

            // Act
            formRender.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(props.setFieldValue).toHaveBeenCalled();
        });

        it('change ckeditor call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<CreateEditForm {...props} />).instance();
            const formRender = shallow(container.render());

            // Act
            formRender.find(CkEditor).at(0).simulate('change', value);

            // Assert
            expect(props.setFieldValue).toHaveBeenCalled();
        });
    });
});