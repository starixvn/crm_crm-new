import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { FeedbackSelectionType }from '@jsroot/common/constants';
import { toast } from 'react-toastify';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import { isHavePermissionOnSite } from '@jsroot/common/shareScripts';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(currentClientTime));
        const currentDate = this.currentDate;
        const fromDate = new Date(currentDate);
        const previousWeek = fromDate.setDate(fromDate.getDate() - 7);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.state = {
            fromDuration: {
                day: '', hour: '', minute: '', second: ''
            },
            toDuration: {
                day: '', hour: '', minute: '', second: ''
            },
            fromDate: previousWeek,
            toDate: currentDate,
            selectionType: 1
        };
    }

    handleChangeFromDate = fromDate => {
        const fromDateTime = new Date(fromDate.getTime());
        fromDateTime.setMonth(fromDate.getMonth() + 12);
        fromDateTime.setDate(fromDate.getDate() - 1);
        this.minToDate = fromDate;
        this.maxToDate = (fromDateTime < this.currentDate) ? fromDateTime : this.currentDate;
        this.setState({
            toDate: this.maxToDate,
            fromDate: fromDate
        });
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.handleSubmit();
        }
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: parseInt(evt.target.value, 10)
        });
    };

    handleChangeFromDuration = evt => {
        this.setState({
            fromDuration:  { ...this.state.fromDuration, [evt.target.name]: evt.target.value }
        });
    };

    handleChangeToDuration = evt => {
        this.setState({
            toDuration:  { ...this.state.toDuration, [evt.target.name]: evt.target.value }
        });
    };

    handleSubmit = () => {
        if (!isHavePermissionOnSite()) return;

        const { selectionType, fromDuration, toDuration, fromDate, toDate } = this.state;
        const params = {
            type: selectionType,
            fromDuration: this.getDurationTimeString(fromDuration),
            toDuration: this.getDurationTimeString(toDuration),
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
        if(this.validateDuration(fromDuration, toDuration)){
            this.props.setGridParams(params);
            this.props.getGridData(params);
        }
    };

    getDurationTimeString = duration => {
        const stringDayHour = `${duration.day.length === 0 ? '0' : duration.day}:${duration.hour.length === 0 ? '0' : duration.hour}:`;
        const stringMinuteSecond = `${duration.minute.length === 0 ? '0' : duration.minute}:${duration.second.length === 0 ? '0' : duration.second}`;
        return stringDayHour + stringMinuteSecond;
    };

    validateDuration = (fromDuration, toDuration) =>{
        const timeBegin = Number((fromDuration.day * 86400) + (fromDuration.hour * 3600) + (fromDuration.minute * 60) + (fromDuration.second));
        const timeEnd = Number((toDuration.day * 86400) + (toDuration.hour * 3600) + (toDuration.minute * 60) + toDuration.second);
        const isInValid = (timeBegin > timeEnd && timeBegin !== 0 && timeEnd !== 0);
        if ((timeBegin !== 0 && timeEnd === 0) || isInValid) {
            toast.error(LangHelper.getResource('NotificationSubmitDurationIsWrong'));
            return false;
        }
        return true;
    };

    render() {

        const {fromDate, toDate, selectionType, fromDuration, toDuration } = this.state;

        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='small-width'>
                        <Form.Control as="select" size="sm" className="small-width"
                            name="selectionType" id="selectionType"
                            value={selectionType}
                            onChange={this.handleChange}
                        >
                            {
                                FeedbackSelectionType.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                selected={fromDate} dropdownMode="select"
                                maxDate={new Date(this.maxFromDate)} useShortMonthInDropdown
                                peekNextMonth showYearDropdown showMonthDropdown
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                dropdownMode="select" useShortMonthInDropdown
                                minDate={new Date(fromDate)}
                                maxDate={new Date(this.maxToDate)}
                                showYearDropdown peekNextMonth showMonthDropdown
                                selected={toDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                        <UnderlineButton.submitButton />
                    </Button>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='width-duration'>
                        <Form.Label htmlFor="day">{LangHelper.getResource('FromDuration')}</Form.Label>
                    </Form.Group>
                    <Form.Group className='width-320 duration'>
                        <Form.Control type="number"size="sm"
                            value={fromDuration.day}
                            name="day" id="day"
                            className="shadow-none mr-1" autoComplete="off"
                            onChange={this.handleChangeFromDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Day')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={fromDuration.hour}
                            name="hour" id="hour"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeFromDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Hour')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={fromDuration.minute}
                            name="minute" id="minute"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeFromDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Minute')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={fromDuration.second}
                            name="second" id="second"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeFromDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Second')}</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='width-duration'>
                        <Form.Label htmlFor="day">{LangHelper.getResource('ToDuration')}</Form.Label>
                    </Form.Group>
                    <Form.Group className='width-320 duration'>
                        <Form.Control type="number"size="sm"
                            value={toDuration.day}
                            name="day" id="day"
                            className="shadow-none mr-1" autoComplete="off"
                            onChange={this.handleChangeToDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Day')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={toDuration.hour}
                            name="hour" id="hour"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeToDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Hour')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={toDuration.minute}
                            name="minute" id="minute"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeToDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Minute')}</Form.Label>
                        <Form.Control type="number" size="sm"
                            value={toDuration.second}
                            name="second" id="second"
                            className="shadow-none  mr-1" autoComplete="off"
                            onChange={this.handleChangeToDuration}
                        />
                        <Form.Label>{LangHelper.getResource('Second')}</Form.Label>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { gridParams } = state;
    return { gridParams };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);