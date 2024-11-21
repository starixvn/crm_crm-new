import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    static propTypes = {
        getActionLogs: PropTypes.func
    };

    static defaultProps = {
        getActionLogs: function () {
            // nothing
        }
    };
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(currentClientTime));
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

    componentDidMount() {
        this.props.getActionLogs();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-setting-log');
            btn.click();
        }
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

    handleSubmit = e => {
        const { handler, fromDate, toDate, actionId } = this.state;

        const params = {
            username: handler !== '' ? handler : null,
            actionId: actionId,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getGridSettingLogs(params);
    };

    render() {
        if (this.props.actionLogs === null || !this.props.actionLogs) {
            return null;
        }

        const { handler, fromDate, toDate, actionId } = this.state;
        const all = [
            { name: 'All', id: 0 }
        ];

        const actionLogs = [...all, ...this.props.actionLogs];
        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit} action="javascript:void(0)">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="handler">
                            {LangHelper.getResource('Handler')}
                        </Form.Label>
                        <Form.Control size="sm" type="text"
                            name="handler" id="handler"
                            value={handler}
                            className="shadow-none" autoComplete="on"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" useShortMonthInDropdown
                                maxDate={new Date(this.maxFromDate)}
                                selected={fromDate}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" useShortMonthInDropdown
                                minDate={new Date(this.minToDate)}
                                selected={toDate}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="action">{LangHelper.getResource('Action')}</Form.Label>
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
                    <Form.Group className="width-70">
                        <Button id='btn-submit-setting-log' variant="primary" size="sm" type="submit">
                            <UnderlineButton.submitButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { actionLogs, gridParams } = state;
    return { actionLogs, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);