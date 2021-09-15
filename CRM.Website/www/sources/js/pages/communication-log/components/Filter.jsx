import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Col, Form, Row, Button } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {

    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const date = new Date();
        const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);

        this.state = {
            fromDate: fromDate,
            toDate: currentDate,
            maxFromDate: currentDate,
            maxToDate: currentDate,
            minFromDate: '',
            minToDate: fromDate,
            statusId: 0,
            handler: ''
        };
    }

    componentDidMount() {
        const { fromDate, toDate } = this.state;
        this.props.getLogsByCustomerId({
            customerId: 1754,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            handler: '',
            statusId: 0,
            toDate: DateTimeService.toShortDateFormat(toDate)
        });
        this.props.getAllStatus();
    }

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate: toDate, maxFromDate: toDate });
    };

    handleChangeFromDate = fromDate => {
        this.setState({ fromDate: fromDate,minToDate: fromDate });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { fromDate, toDate, statusId, handler } = this.state;
        const params = {
            customerId: 1754,
            fromDate: DateTimeService.toShortDateTimeFormat(fromDate),
            toDate: DateTimeService.toShortDateTimeFormat(toDate),
            statusId: statusId,
            handler: handler
        }
        this.props.getLogsByCustomerId(params);
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    render() {
        const { allStatus } = this.props;
        if (!allStatus) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <Form.Group as={Row}>
                    <Col sm="3" md="3">
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" md="3" htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                            <Col sm="9" md="9">
                                <Form.Control as="input" size="sm" value={this.state.handler}
                                    name="handler" id="handler" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="3" md="3">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                            <Col sm="8" md="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                <DatePicker
                                    selected={this.state.fromDate}
                                    maxDate={this.state.maxFromDate}
                                    minDate={this.state.minFromDate}
                                    onChange={value => this.handleChangeFromDate(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="3" md="3">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="toDate">{LangHelper.getResource('ToDate')}</Form.Label>
                            <Col sm="8" md="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                <DatePicker
                                    selected={this.state.toDate}
                                    maxDate={this.state.maxToDate}
                                    minDate={this.state.minToDate}
                                    onChange={value => this.handleChangeToDate(value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="2" md="2">
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="4" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                            <Col sm="8" md="8" className="react-datepicker-wrapper-container form-control-wrapper">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="statusId"
                                    onChange={this.handleChange}
                                >
                                    <option value="0">All</option>
                                    {
                                        allStatus.map((value,key) => this.renderOptions(value.name,value.statusId,key))
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="1" md="1">
                        <Form.Group as={Row}>
                            <Col sm="12" md="12">
                                <Button type="submit" variant="primary" size="sm">
                                    {LangHelper.getResource('Submit')}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allStatus } = state;
    return { allStatus };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
