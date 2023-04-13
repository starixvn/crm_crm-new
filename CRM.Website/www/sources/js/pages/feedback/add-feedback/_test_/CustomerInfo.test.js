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
        //JSON.parse = jest.fn();
        // JSON.stringify = jest.fn()
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
            responses: [{id: 1, value: 'responses'}],
            sites: [{}]
            },
        customerInfo:{},
        handleChange: jest.fn(),
        handleChangeValueInfo: jest.fn(),
        renderOptions: jest.fn(()=> '<div></div>')
    };

    describe('render', () => {
        it('render correctly form', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(Form.Control)).toHaveLength(39);
        });

        it('handleChangeValueInfo birthday correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.handleChangeValueInfo).toHaveBeenCalled();
        });

        it('render renderLicenseeType when customer detail is null', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);
            // Action
            customerInfo.find(Form.Check).at(0).simulate('change');
            // Assert
            expect(props.handleChangeValueInfo).toHaveBeenCalledWith('isOverwriteInfo', true);
        });
    });
});