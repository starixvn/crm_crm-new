import React from 'react';
import { shallow } from 'enzyme';
import CustomTimeInput from '../CustomTimeInput';

describe('CustomTimeInput', () => {
    const onChangeMock = jest.fn();
    const date = new Date(2022, 2, 1, 14, 30);
    const dateTimeNow = new Date(2022, 2, 1, 14, 0);
    const isDisabledTime = true;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CustomTimeInput date={date} dateTimeNow={dateTimeNow} isDisabledTime={isDisabledTime} onChange={onChangeMock} />);
    });

    it('should render without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render the hour and minute options correctly', () => {
        const hourSelect = wrapper.find('#hour');
        const minuteSelect = wrapper.find('#minute');

        expect(hourSelect.children().length).toBe(25);
        expect(minuteSelect.children().length).toBe(61);
    });

    it('should call the onChange function correctly when the hour or minute is changed', () => {
        const hourSelect = wrapper.find('#hour');
        const minuteSelect = wrapper.find('#minute');

        hourSelect.simulate('change', { target: { value: '15' } });
        expect(onChangeMock).toHaveBeenCalledWith('15:30');

        minuteSelect.simulate('change', { target: { value: '45' } });
        expect(onChangeMock).toHaveBeenCalledWith('14:45');
    });

    it('should disable the hour and minute options correctly if isDisabledTime prop is true', () => {
        const hourSelect = wrapper.find('#hour');
        const minuteSelect = wrapper.find('#minute');

        expect(hourSelect.childAt(13).prop('disabled')).toBe(true);
        expect(hourSelect.childAt(14).prop('disabled')).toBe(false);

        expect(minuteSelect.childAt(29).prop('disabled')).toBe(false);
        expect(minuteSelect.childAt(30).prop('disabled')).toBe(false);
    });
});
