import React from 'react';
import { shallow, mount } from 'enzyme';
import EditReasonPopup from '../EditReasonPopup';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

jest.mock('@jsroot/common/dataService');
jest.mock('@jsroot/common/site');

describe('EditReasonPopup', () => {
    const props = {
        reasonId: 1,
        notificationId: 123,
        onClose: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const wrapper = shallow(<EditReasonPopup {...props} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should fetch reason options on mount', async () => {
        const reasonOptions = [{ id: 1, name: 'Reason 1' }, { id: 2, name: 'Reason 2' }];
        DataService.getDataAsync.mockResolvedValue({ data: reasonOptions });

        const wrapper = shallow(<EditReasonPopup {...props} />);
        await wrapper.instance().componentDidMount();

        expect(DataService.getDataAsync).toHaveBeenCalledWith('NotificationCenter/GetReasonSettingOptions');
        expect(wrapper.state('reasonOptions')).toEqual(reasonOptions);
    });

    it('should handle reason change', () => {
        const wrapper = shallow(<EditReasonPopup {...props} />);
        const event = { target: { value: '2' } };
        wrapper.instance().handleChangeReason(event);

        expect(wrapper.state('selectedReason')).toBe('2');
    });

    it('should validate form correctly', () => {
        const wrapper = shallow(<EditReasonPopup {...props} />);
        const values = { reasonSettingId: '' };
        const errors = wrapper.instance().validateFormik(values);

        expect(errors.reasonSettingId).toBe('Please select reason');
    });

    it('should handle form submission', async () => {
        const response = { data: { isSuccessful: true } };
        DataService.postDataAsync.mockResolvedValue(response);

        const wrapper = shallow(<EditReasonPopup {...props} />);
        const values = { reasonSettingId: '2' };
        await wrapper.instance().handleSubmit(values);

        expect(DataService.postDataAsync).toHaveBeenCalledWith('NotificationCenter/EditResultAdmNotificationReason', {
            notificationId: props.notificationId,
            reasonSettingId: 2
        });
        expect(wrapper.state('editResult')).toEqual(response.data);
        expect(props.onClose).toHaveBeenCalledWith(true);
    });

    it('should render form correctly', () => {
        const wrapper = shallow(<EditReasonPopup {...props} />);
        wrapper.setState({ reasonOptions: [{ id: 1, name: 'Reason 1' }, { id: 2, name: 'Reason 2' }] });

        const formikProps = {
            values: { reasonSettingId: '1' },
            errors: {},
            touched: {},
            handleSubmit: jest.fn()
        };

        const form = shallow(wrapper.instance().renderForm(formikProps));
        expect(form.find(Form.Control).length).toBe(1);
        expect(form.find(Button).length).toBe(2);
    });

    it('should close modal on cancel button click', () => {
        const wrapper = shallow(<EditReasonPopup {...props} />);
        wrapper.find(Modal).prop('onHide')();

        expect(props.onClose).toHaveBeenCalledWith(false);
    });
});