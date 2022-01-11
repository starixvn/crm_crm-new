import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const currentDate = this.currentDate;
        const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1 , 1);
        const firstDateFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);
        const firstDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDayLastMonth)));
        const toDate =  firstDateFirstMonth.setDate(firstDateFirstMonth.getDate() - 1);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = null;
        this.state = {
            handler: '',
            fromDate: firstDateOfMonthFormat,
            toDate: toDate,
            actionId: 0
        };
    }

    handleChangeFromDate = fromDate => {
        var maxToDateFromDate = new Date(fromDate.setMonth(new Date(fromDate.getMonth() + 12)));
        maxToDateFromDate.setDate(new Date(fromDate.getDate() - 1));
        this.maxToDate = maxToDateFromDate > this.currentDate ? maxToDateFromDate : this.currentDate;
        this.minToDate = fromDate;
        this.setState({
            fromDate: fromDate
        });
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = () => {
        const { handler, fromDate, toDate } = this.state;
        const params = {
            handler: handler !== '' ? handler : null,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate)
        };

        this.props.getDeletedFeedbackStatistic(params);
    };

    render() {

        const { handler, fromDate, toDate } = this.state;

        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={handler}
                            name="handler" id="handler"
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                selected={fromDate}
                                maxDate={new Date(this.maxFromDate)}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                selected={toDate}
                                minDate={new Date(this.minToDate)}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="width-60">
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}


export default Filter;