import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const fromDate = new Date(DateTimeService.firstDayOfMonth(date));

        this.state = {
            fromDate: fromDate,
            minFromDate: '',
            maxFromDate: currentDate,
            toDate: currentDate,
            minToDate: fromDate,
            maxToDate: currentDate,
            handler: ''
        };
    }

    componentDidMount() {
        this.props.getAllLogAction({ actionType: 1 });
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
        const { handler, fromDate, toDate } = this.state;
        const params = {
            actionId: 0,
            customerId: 1754,
            handler: handler,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate)
        };
        this.props.getActivityLog(params);
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    render() {
        const { allLogActions } = this.props;
        if (!allLogActions) {
            return null;
        }
        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <Row className="align-items-center">
                    <Col sm="auto">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className='col-auto col-form-label'>{LangHelper.getResource('Handler')}</Form.Label>
                            <Col sm="8">
                                <Form.Control as="input" size="sm" value={this.state.handler}
                                    name="handler" id="handler" className="shadow-none" autoComplete="off" onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="auto">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="4" className='col-auto col-form-label'>{LangHelper.getResource('FromDate')}</Form.Label>
                            <Col sm="8">
                                <div className="react-datepicker-wrapper-container">
                                    <DatePicker
                                        maxDate={this.state.maxFromDate}
                                        minDate={this.state.minFromDate}
                                        selected={this.state.fromDate}
                                        onChange={value => this.handleChangeFromDate(value)}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="auto">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('ToDate')}</Form.Label>
                            <Col sm="8">
                                <div className="react-datepicker-wrapper-container">
                                    <DatePicker
                                        maxDate={this.state.maxToDate}
                                        minDate={this.state.minToDate}
                                        selected={this.state.toDate}
                                        onChange={value => this.handleChangeToDate(value)}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="auto">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Action')}</Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" size="sm" className="shadow-none" name="statusId"
                                    onChange={this.handleChange}
                                >
                                    <option value="0">All</option>
                                    {
                                        allLogActions.map((value,key) => this.renderOptions(value.name,value.id,key))
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="auto">
                        <Form.Group as={Row} className="mb-3">
                            <Button type="submit" variant="primary" size="sm">{LangHelper.getResource('Submit')}</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allLogActions } = state;
    return { allLogActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
