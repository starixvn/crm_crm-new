import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(currentClientTime));
        const currentDate = this.currentDate;
        const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const firstDateFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDayLastMonth)));
        const toDate = firstDateFirstMonth.setDate(firstDateFirstMonth.getDate() - 1);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = firstDateOfMonthFormat;
        this.state = {
            handler: '',
            deletedBy: '',
            fromDate: firstDateOfMonthFormat,
            toDate: toDate,
            actionId: 0
        };
    }

    handleChangeFromDate = fromDate => {
        const currentTime = this.currentDate;
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
        let toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
        const isOver1Year = DateTimeService.toDiffDays(currentTime, fromDate) > 365;
        if (isOver1Year) {
            toDate = this.maxToDate;
        }
        this.setState({ fromDate, toDate });
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-deleted-report');
            btn.click();
        }
    }

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { handler, fromDate, toDate, deletedBy } = this.state;
        const params = {
            handler: handler !== '' ? handler : null,
            deletedBy: deletedBy !== '' ? deletedBy : null,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate)
        };

        this.props.setGridParams(params);
        this.props.getDeletedFeedbackStatistic(params);
    };

    render() {
        const { handler, fromDate, toDate, deletedBy } = this.state;

        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit} action="javascript:void(0)">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            className="shadow-none" autoComplete="on"
                            value={handler}
                            name="handler" id="handler"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                maxDate={new Date(this.maxFromDate)} selected={fromDate} useShortMonthInDropdown
                                peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select"
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                minDate={new Date(this.minToDate)}
                                maxDate={new Date(this.maxToDate)}
                                showYearDropdown peekNextMonth showMonthDropdown dropdownMode="select"
                                selected={toDate} useShortMonthInDropdown
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="deletedBy">{LangHelper.getResource('DeletedBy')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={deletedBy}
                            name="deletedBy" id="deletedBy"
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '60px'}}>
                        <Button variant="primary" id='btn-submit-deleted-report' size="sm" type="submit" onClick={this.handleSubmit}>
                            <UnderlineButton.submitButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(Filter);