import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import PropTypes from 'prop-types';

export default class DateRangePickerField extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        isDisabledTime: PropTypes.bool,
        isInvalid: PropTypes.bool
    };

    static defaultProps = {
        className: '',
        startDate: new Date(),
        endDate: new Date(),
        isDisabledTime: false,
        isInvalid: false
    };

    constructor(props) {
        super(props);

        this.state = {
        };
        this.ref = React.createRef();
    }
    render() {
        const { className, isInvalid, startDate, endDate, isDisabledTime, ...rest } = this.props;
        return (
            <div className='date-range-picker'>
                <DateRangePicker
                    initialSettings={{ startDate: startDate, endDate }}
                    {...rest}
                >
                    <input type="text" className="form-control" />
                </DateRangePicker>
            </div>
        );
    }
}