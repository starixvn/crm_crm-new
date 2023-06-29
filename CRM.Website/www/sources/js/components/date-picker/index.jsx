import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CustomInput from './CustomInput';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import CustomTimeInput from './CustomTimeInput';
import {RANGE_DATE_OPTION} from './constants';
import { toast } from 'react-toastify';

export default class DatePickerField extends React.Component {
    static defaultProps = {
        isInvalid: false,
        isDisabledTime: false,
        isRangeDate: false,
        maxDateRange: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected,
            startDate: Date.now(),
            endDate: Date.now(),
            shouldCloseOnSelect: false,
            calendarHeight: 0
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

    handleClickRangeDate = item =>{
        this.ref.current.setOpen(false);
        const dates = [item.fromDate, item.toDate]
        this.props.onChangeDate(dates);
    }

    onChange = dates =>{
        const maxDateRange = this.props.maxDateRange;
        const [start, end] = dates;
        const diffDate = DateTimeService.toDiffDays(end, start);
        this.props.onChangeDate(dates);
        if(maxDateRange > 0 && diffDate >= maxDateRange){
            toast.error("error max date");
            this.ref.current.setOpen(true);
        }else{
            this.props.onChangeDate(dates);
            this.setState({startDate: start, endDate: end});
        }

        // if(start && end){
        //     this.ref.current.setOpen(false);
        // }
    }

    render() {
        const { className, selected, isInvalid, isDisabledTime, isRangeDate, ...rest } = this.props;
        const { startDate, endDate   } = this.state;
        const dateTimeNow = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const diffDate = DateTimeService.toDiffDays(endDate, startDate) + 1;
        const diffDateText = !diffDate ? null : `(${diffDate} days)`;
        return (
            <div className={isRangeDate ? 'range-date-picker' : ''}>
                
                <DatePicker
                    ref={this.ref}
                    className={`datetime-picker ${className}`}
                    dateFormat={this.props.showTimeInput ? 'MMM dd, yyyy hh:mm aa' : 'MMM dd, yyyy'}
                    customInput={<CustomInput isInvalid={isInvalid} />}
                    selected={this.state.selected}
                    onChange= {this.onChange}
                    shouldCloseOnSelect={this.state.shouldCloseOnSelect}
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
                        isRangeDate &&
                        <Fragment>
                            <div className='form-range-date'>
                                {
                                    RANGE_DATE_OPTION.map((item, index) =>{
                                        return (
                                            <div index={index} className='item-range-date' onClick={() => this.handleClickRangeDate(item)}>{item.label}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className='display-selected d-flex'>
                                <div style={{paddingTop: '3px'}}>Selected: </div>
                                <div className='date-range-selected'>
                                    {DateTimeService.toShortDateFormatDash(startDate)} - {!endDate ? '...' : DateTimeService.toShortDateFormatDash(endDate)} {diffDateText}
                                </div>
                                <Button variant='primary' id='btn-apply' size='sm' type='submit' disabled={!startDate || !endDate}>Apply</Button>
                            </div>
                        </Fragment>
                        
                    }
                    {
                        this.props.showTimeInput &&
                        <div>
                            <div className="btn-now" type='button' onClick={this.handleTimeNow}>{LangHelper.getResource('Now')}</div>
                            <div className="btn-close" type='button' onClick={() => this.handleClickDone()}>{LangHelper.getResource('Done')}</div>
                        </div>
                    }
                </DatePicker >
            </div>
        );
    }
}