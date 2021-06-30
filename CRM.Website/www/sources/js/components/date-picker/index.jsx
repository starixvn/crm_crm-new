import React from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';

export default class DatePickerField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({ selected: this.props.selected });
        }
    }

    handleTimeNow = () => {
        this.setState({ selected: new Date() });
    }

    render() {
        const { className, selected, ...rest } = this.props;

        return (
            <DatePicker
                className={`form-control form-control-sm datetime-picker ${className}`}
                dateFormat={this.props.showTimeInput ? 'MMM dd, yyyy hh:mm aa' : 'MMM dd, yyyy'}
                customInput={<CustomInput />}
                selected={this.state.selected}
                {...rest}
            >
                {
                    this.props.showTimeInput &&
                        <div className="react-datepicker__input-time-container btnNow" type='button' onClick={this.handleTimeNow}>Now</div>
                }
            </DatePicker >
        );
    }
}