import React from 'react';
import { CustomerInfo } from '../CustomerInfo';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { shallow } from 'enzyme';

describe('CustomerInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    const props = {
        settings: {
            titles: [{id: 1, value: 'titles'}],
            licenseeTypes: [{id: 1, name: 'licenseeTypes'}],
            statuses: [{statusId: 1, name: 'statuses'}],
            responses: [{id: 1, value: 'responses'}]
            },
        values:{},
        handleChange: jest.fn(),
        setFieldValue: jest.fn(),
        maxDate: new Date(),
        renderOptions: jest.fn(()=> '<div></div>')
    };

    describe('renderIdentityInformation', () => {
        it('render correctly form', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(Form.Control)).toHaveLength(37);
        });

        it('setFieldValue birthday correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalled();
        });
    });
});