import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import DatePicker from '@jsroot/components/date-picker/index';
import WithHotKey from '@jsroot/components/WithHotKey';
import SubmitButtonUnderline from '@jsroot/components/SubmitButtonUnderline';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const currentDate = new Date(DateTimeService.toShortDateFormat(date));
        const fromDate = new Date(DateTimeService.firstDayOfMonth(date));

        this.state = {
            fromDate: fromDate,
            maxFromDate: currentDate,
            minFromDate: '',
            toDate: currentDate,
            maxToDate: '',
            minToDate: fromDate,
            statusId: 0
        };
    }

    componentDidMount() {
        const { fromDate, toDate } = this.state;
        const params = {
            customerId: this.props.id,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            statusId: 0
        };
        this.props.setGridParams(params);
        this.props.getLogsByCustomerId(params);
        this.props.getAllStatus();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            this.handleSubmit(event);
        }

        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            this.props.setCreateRedemptionDialog({ show: true });
        }
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
            customerId: this.props.id,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            statusId: statusId
        };
        this.props.setGridParams(params);
        this.props.getLogsByCustomerId(params);
    };

    render() {
        const { allStatus } = this.props;
        if (!allStatus) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="formDate" className='col-auto col-form-label'>
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown useShortMonthInDropdown
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
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown useShortMonthInDropdown
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
                                allStatus.statuses.map((value, key) => <option key={key} value={value.statusId}>{value.name}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <div className="form-group-button">
                        <Button type="submit" variant="primary" size="sm">
                            {<SubmitButtonUnderline/>}
                        </Button>
                    </div>
                </Form.Row>
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
