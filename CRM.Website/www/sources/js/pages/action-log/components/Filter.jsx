import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const currentClientTime = document.getElementById('currentClientTime').value;
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(currentClientTime)));
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

    handleChangeToDate = date => {
        this.setState({ toDate: date, maxFromDate: date });
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleChangeFromDate = date => {
        this.setState({ fromDate: date, minToDate: date });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { handler, fromDate, toDate } = this.state;
        const params = {
            actionId: 0,
            customerId: this.props.id,
            handler: handler,
            fromDate: DateTimeService.toLongDateTimeFormat(DateTimeService.toServerDateTime(fromDate)),
            toDate: DateTimeService.toLongDateTimeFormat(DateTimeService.toServerDateTime(toDate)),
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setGridParams(params);
        this.props.getActivityLog(params);
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    render() {
        const { allLogActions } = this.props;
        if (!allLogActions) {
            return null;
        }
        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label className='col-form-label col-auto'>{LangHelper.getResource('Handler')}</Form.Label>
                        <Form.Control as="input" size="sm" value={this.state.handler} className="shadow-none"
                            name="handler" id="handler" autoComplete="off" onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='col-form-label col-auto'>
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                maxDate={this.state.maxFromDate}
                                minDate={this.state.minFromDate}
                                selected={this.state.fromDate}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='col-form-label col-auto'>
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                maxDate={this.state.maxToDate}
                                minDate={this.state.minToDate}
                                selected={this.state.toDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='col-form-label col-auto'>{LangHelper.getResource('Action')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none"
                            name="actionLogId"
                            onChange={this.handleChange}
                        >
                            <option value="0">All</option>
                            {
                                allLogActions.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <div className="form-group-button mb-3">
                        <Button type="submit" variant="primary" size="sm">{LangHelper.getResource('Submit')}</Button>
                    </div>
                </Form.Row>
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
