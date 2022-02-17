import React from 'react';
import CustomerInfo from '../CustomerInfo';
import { Col, Form, Row, Collapse } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
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
        collapse:{
            customerInfo: true
        },
        values: {},
        fieldInput: {
            username: '',
            titleId: '',
            firstName:'',
            lastName: '',
            passport: '',
            refCode1: '',
            refCode2: '',
            licenseeTypeId: '',
            countryCode1: '',
            areaCode1: '',
            phoneNumber1: '',
            countryCode2: '',
            areaCode2: '',
            phoneNumber2: '',
            countryCode3: '',
            areaCode3: '',
            phoneNumber3: '',
            faxCountryCode: '',
            faxAreaCode: '',
            faxNumber: '',
            mobileCountryCode: '',
            mobileAreaCode: '',
            mobilePhoneNumber: '',
            name1: '',
            phone1: '',
            name2: '',
            phone2: '',
            name3: '',
            phone3: '',
            name4: '',
            phone4: '',
            skype: '',
            email: '',
            telegram: '',
            weChat: '',
            whatsApp: '',
            line: '',
            letstalk: '',
            qq: '',
            zalo: ''
        },
        settings: {
            titles: [{id: 1, value: 'titles'}],
            licenseeTypes: [{id: 1, name: 'licenseeTypes'}],
            statuses: [{statusId: 1, name: 'statuses'}],
            responses: [{id: 1, value: 'responses'}]
        },
        handleChangeInput: jest.fn(),
        setFieldValue: jest.fn(),
        onCollapseExpand: jest.fn()
    };


    describe('Render', () => {
        it('render exactly form', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(Form.Control)).toHaveLength(39);
        });

        it('onClick call exactly function', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);
            // Action
            customerInfo.find(Form.Group).at(0).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('customerInfo');
        });

        it('handleChange title correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);
            // Action
            customerInfo.find(Form.Control).at(0).simulate('change');
            // Assert
            expect(props.handleChangeInput).toHaveBeenCalled();
        });

        it('setFieldValue birthday correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('birthday', 'value');
        });

        it('render SelectWithSearch correctly', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(SelectWithSearch).length).toBe(1);
        });

        it('handle change checkbox correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(Form.Check).simulate('change', {target: {checked: true}});

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isOverwrite', true);
        });
    });
});