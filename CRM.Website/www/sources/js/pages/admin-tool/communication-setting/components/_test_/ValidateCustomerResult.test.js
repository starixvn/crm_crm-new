import React from 'react';
import ValidateCustomerResult from '../ValidateCustomerResult';
import { Form, Col } from 'react-bootstrap';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ValidateCustomerResult', () => {
    const wrapper = shallow(<ValidateCustomerResult />);

    it('component render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('render null when listOfCustomers empty', () => {
        // Arrange
        const props = {
            listOfCustomers: []
        };

        // Action
        const validate = shallow(<ValidateCustomerResult {...props} />);

        // Assert
        expect(validate).toBeNull;
    });

    it('renderClassNameCustomer return expected data', () => {
        // Arrange
        const props = {
            listOfCustomers: [{ id: test.id, name: test.name }]
        };

        // Action
        const validate = shallow(<ValidateCustomerResult {...props} />).instance();
        const result = validate.renderClassNameCustomer(1);

        // Assert
        expect(result).toEqual('unauthorized');
    });

    const testCases = [
        { custId: 1, val: 'a', expected: 'customer' },
        { custId: -1, val: 'b', expected: 'guest' },
        { custId: 0, val: 'c', expected: 'invalid' }
    ];
    testCases.forEach(test => {
        it(`'renders customerShow correctly with id: ${test.custId}'`, () => {
            // Arrange
            const props = {
                listOfCustomers: [{ custId: test.custId, val: test.val }]
            };

            // Action
            const validate = shallow(<ValidateCustomerResult {...props} />);

            // Assert
            expect(validate.find(Form.Group).find(Col).find('div').at(0).html()).toEqual("<div class=\"pl-2 mr-5 customerShow\">Customer</div>");
            expect(validate.find(Form.Group).find(Col).find('div').at(1).html()).toEqual("<div class=\"pl-2 mr-5 guestShow\">Guest</div>");
            expect(validate.find(Form.Group).find(Col).find('div').at(2).html()).toEqual("<div class=\"pl-2 mr-5 invalidShow\">Invalid</div>");

            expect(validate.find(Form.Group).at(1).find(Col).find('div').find('div').at(1).find('div').at(2).html()).toEqual(
                `<div class=\"customer-name\">${props.listOfCustomers[0].val}</div>`
            );
        });
    }),

        it('simulating onClick', () => {
            // Arrange
            const props = {
                listOfCustomers: [{ id: 1, name: 'asd' }],
                onClick: jest.fn()
            };
            const validate = shallow(<ValidateCustomerResult {...props} />);

            // Action
            validate.find('div.fa-times').simulate('click');

            // Assert
            expect(props.onClick).toHaveBeenCalled();
        });
});