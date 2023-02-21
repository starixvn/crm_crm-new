import React from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import CustomTimeInput from './CustomTimeInput';

export default class DatePickerField extends React.Component {
    static defaultProps = {
        isInvalid: false,
        isDisabledTime: false
    };

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected
        };
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({ selected: this.props.selected });
        }
    }

    handleTimeNow = () => {
        const dateTimeNow = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.setState({ selected: dateTimeNow });
    };

    handleClickDone = () =>{
        this.ref.current.setOpen(false);
        this.props.onChange(this.state.selected);
    }

    render() {
        const { className, selected, isInvalid, isDisabledTime, ...rest } = this.props;
        const dateTimeNow = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        return (
            <DatePicker
                ref={this.ref}
                className={`datetime-picker ${className}`}
                dateFormat={this.props.showTimeInput ? 'MMM dd, yyyy hh:mm aa' : 'MMM dd, yyyy'}
                customInput={<CustomInput isInvalid={isInvalid} />}
                selected={this.state.selected}
                customTimeInput={
                    <CustomTimeInput 
                        date={this.state.selected} 
                        isDisabledTime={isDisabledTime}
                        dateTimeNow={dateTimeNow}
                    />
                }
                {...rest}
            >
                {
                    this.props.showTimeInput &&
                    <div>
                        <div className="btn-now" type='button' onClick={this.handleTimeNow}>{LangHelper.getResource('Now')}</div>
                        <div className="btn-close" type='button' onClick={() => this.handleClickDone()}>{LangHelper.getResource('Done')}</div>
                    </div>
                }
            </DatePicker >
        );
    }
}