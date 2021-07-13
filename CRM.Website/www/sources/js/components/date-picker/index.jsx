import React from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export default class DatePickerField extends React.Component {
    static defaultProps = {
        isInvalid: false
    };

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
        this.setState({ selected: new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date()))) });
    }

    render() {
        const { className, selected, isInvalid, ...rest } = this.props;

        return (
            <DatePicker
                className={`datetime-picker ${className}`}
                dateFormat={this.props.showTimeInput ? 'MMM dd, yyyy hh:mm aa' : 'MMM dd, yyyy'}
                customInput={<CustomInput isInvalid={isInvalid} />}
                selected={this.state.selected}
                {...rest}
            >
                {
                    this.props.showTimeInput &&
                    <div className="react-datepicker__input-time-container btn-now" type='button' onClick={this.handleTimeNow}>{LangHelper.getResource('Now')}</div>
                }
            </DatePicker >
        );
    }
}