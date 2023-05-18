import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {RANGE_DATE_SETTING} from './constants';
import DateTimeService from '@jsroot/common/dateTimeService';

export default class DateRangePickerField extends React.Component {
    static propTypes = {
        autoApply: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        setEndDate: PropTypes.func,
        setStartDate: PropTypes.func,
        showDropdowns: PropTypes.bool,
        singleDatePicker: PropTypes.bool
    };

    static defaultProps = {
        autoApply: true,
        className: '',
        startDate: new Date(),
        endDate: new Date(),
        disabled: false,
        showDropdowns: true,
        singleDatePicker: false

    };

    handleCallback = (start, end) => {
        this.props.setStartDate(new Date(start));
        this.props.setEndDate(new Date(end));
    };
    
    render() {
        const { className, disabled, maxDate, minDate, startDate, endDate, autoApply,
            setStartDate, setEndDate, showDropdowns, singleDatePicker, ...rest } = this.props;
        const label = DateTimeService.toShortDateFormat(startDate) + ' - ' + DateTimeService.toShortDateFormat(endDate);
        return (
            <div className='date-range-picker'>
                <DateRangePicker
                    initialSettings={{
                        ranges: RANGE_DATE_SETTING,
                        startDate: startDate, endDate: endDate, singleDatePicker: singleDatePicker,
                        minDate: minDate, maxDate: maxDate, showDropdowns: showDropdowns, autoApply: autoApply
                    }}
                    onCallback={this.handleCallback}
                    {...rest}
                >
                    <div className={`form-date-range ${disabled ?'disabled': ''}`}>
                        <Form.Control as='input' className="shadow-none" disabled={disabled} size="sm" value={label} />
                        <i className='date-range-picker-icon fa fa-calendar' />
                    </div>
                </DateRangePicker>
            </div>
        );
    }
}