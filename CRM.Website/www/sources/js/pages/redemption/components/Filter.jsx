import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import DatePicker from '@jsroot/components/date-picker/index';

export class Filter extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const fromDate = new Date(DateTimeService.firstDayOfMonth(date));

        this.state = {
            fromDate: fromDate,
            maxFromDate: currentDate,
            minFromDate: '',
            toDate: currentDate,
            maxToDate: currentDate,
            minToDate: fromDate,
            statusId: 0
        };
    }

    componentDidMount() {
        const { fromDate, toDate } = this.state;
        const params = {
            customerId: 1754,
            fromDate: DateTimeService.toShortDateTimeFormat(fromDate),
            toDate: DateTimeService.toShortDateTimeFormat(toDate),
            statusId: 0
        };
        this.props.getLogsByCustomerId(params);
        this.props.getAllStatus({ isEdit: true });
    }

    handleChangeToDate = toDate => {
        this.setState({ toDate: toDate, maxFromDate: toDate });
    };

    handleChangeFromDate = fromDate => {
        this.setState({ fromDate: fromDate, minToDate: fromDate });
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { statusId, fromDate, toDate } = this.state;
        const params = {
            customerId: 1754,
            fromDate: DateTimeService.toShortDateTimeFormat(DateTimeService.toServerDateTime(fromDate)),
            toDate: DateTimeService.toShortDateTimeFormat(DateTimeService.toServerDateTime(toDate)),
            statusId: statusId
        };
        this.props.getLogsByCustomerId(params);
    };

    render() {
        const { gridData, allStatus } = this.props;
        if (!gridData || !allStatus) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="formDate" className='col-auto col-form-label'>
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                selected={this.state.fromDate}
                                maxDate={this.state.maxFromDate}
                                minDate={this.state.minFromDate}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="toDate" className='col-auto col-form-label'>
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                selected={this.state.toDate}
                                maxDate={this.state.maxToDate}
                                minDate={this.state.minToDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="status" className='col-auto col-form-label'>
                            {LangHelper.getResource('Status')}
                        </Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none"
                            name="statusId" onChange={this.handleChange}
                        >
                            <option value="0">All</option>
                            {
                                allStatus.map((value,key) => <option key={key} value={value.statusId}>{value.name}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <div className="form-group-button">
                        <Button type="submit" variant="primary" size="sm">
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </div>
                </Form.Row>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, allStatus } = state;
    return { gridData, allStatus };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
