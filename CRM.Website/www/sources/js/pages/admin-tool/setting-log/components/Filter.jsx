import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDateOfMonth = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDay)));
        const fromDate = firstDateOfMonth;
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;
        this.state = {
            handler: '',
            fromDate: fromDate,
            toDate: currentDate,
            actionId: 0
        };
    }

    handleChangeFromDate = fromDate => {
        this.minToDate = fromDate;
        this.setState({
            fromDate: fromDate
        });
    };

    handleChangeToDate = toDate => {
        this.maxFromDate = toDate;
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { handler, fromDate, toDate } = this.state;
        const params = {
            feedbackId: handler !== '' ? handler : null,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: 100
        };

        this.props.setGridParams(params);
        this.props.getGridFeedbacks(params);
    };

    render() {
        const { handler, fromDate, toDate, actionId } = this.state;
        const all = [
            { name: 'All', id: 0 }
        ];
        const actionLogs = [...all, ...this.props.actionLogs];

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
                    <Form.Group>
                        <Form.Label htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="actionId" id="actionId"
                            value={actionId}
                            onChange={this.handleChange}
                        >
                            {
                                actionLogs.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { actionLogs } = state;
    return { actionLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);