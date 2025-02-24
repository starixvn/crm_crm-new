import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        const fromDate = new Date(DateTimeService.firstDayOfMonth(date));

        this.state = {
            fromDate: fromDate,
            toDate: date,
            maxFromDate: date,
            maxToDate: date,
            minFromDate: '',
            minToDate: fromDate,
            statusId: 0,
            handler: ''
        };
    }

    componentDidMount() {
        const { fromDate, toDate } = this.state;
        const params = {
            customerId: this.props.id,
            pageIndex: 1, pageSize: 100,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            handler: '', statusId: 0,
            toDate: DateTimeService.toShortDateFormat(toDate)
        };
        this.props.getLogsByCustomerId(params);
        this.props.setGridParams(params);
        this.props.getStatusForFilter();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-communication');
            btn.click();
        }

        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            this.props.setCreateCommunicationDialog({ show: true });
        }
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
        this.setState({ fromDate: fromDate, minToDate: fromDate });
    };

    handleSubmit = event => {
        const { statusId, handler, fromDate, toDate } = this.state;
        const { pageSize } = this.props.gridParams;
        const params = {
            customerId: this.props.id,
            pageIndex: 1, pageSize: pageSize,
            statusId: statusId,
            handler: handler,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate)
        };
        this.props.setGridParams(params);
        this.props.getLogsByCustomerId(params);
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    render() {
        const { statusFilter } = this.props;
        if (!statusFilter) {
            return null;
        }

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter-v2" action="javascript:void(0)">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Handler')}</Form.Label>
                        <Form.Control as="input" size="sm" value={this.state.handler}
                            name="handler" id="handler" className="shadow-none" autoComplete="on" onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                maxDate={this.state.maxFromDate}
                                minDate={this.state.minFromDate}
                                selected={this.state.fromDate}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className="react-datepicker-wrapper-container">
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                maxDate={this.state.maxToDate}
                                minDate={this.state.minToDate}
                                selected={this.state.toDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="form-group-status">
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" name="statusId"
                            onChange={this.handleChange}
                        >
                            <option value="0">All</option>
                            {
                                statusFilter.map((value, key) => this.renderOptions(value.name, value.statusId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button id='btn-submit-communication' type="submit" variant="primary" size="sm"><UnderlineButton.submitButton /></Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, statusFilter } = state;
    return { gridParams, statusFilter };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);