import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';
import { ReportBy }from '@jsroot/common/constants';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const firstDayOfWeek = moment(this.currentDate).startOf('week');
        const firstDayOfWeekFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDayOfWeek)));
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.state = {
            fromDate: firstDayOfWeekFormat,
            toDate: this.currentDate,
            statusOptions: [],
            currencyOptions: [],
            statusIds: '',
            currencyIds: '',
            reportBy: 1,
            subject: ''
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.settings);
    }

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 3);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
        let toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
        const isOver1Year = DateTimeService.toDiffDays(currentTime, fromDate) > 365;
        if(isOver1Year) {
            toDate = this.maxToDate;
        }
        this.setState({fromDate, toDate});
    };

    handleChangeDropdown = (name, selectedItemsKey) => {
        this.setState({
            ...this.state,
            [name]: selectedItemsKey
        });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleSettingOptions = settings =>{
        const { statuses, currencies} = settings;
        const statusIdFilters = [];
        const currencyIdFilters = [];

        const statusOptions = statuses.map(item =>{
            statusIdFilters.push(item.mainCategoryID);
            return {
                id: item.mainCategoryID,
                value: item.name,
                checked: true
            };
        });

        const currencyOptions = currencies.map(item =>{
            currencyIdFilters.push(item.id);
            return {
                id: item.id,
                value: item.name,
                checked: true
            };
        });
        const statusIdFiltersJoin = statusIdFilters.join(',');
        const currencyIdFiltersJoin = currencyIdFilters.join(',');

        this.setState({
            statusOptions, currencyOptions,
            statusIds: statusIdFiltersJoin,
            currencyIds: currencyIdFiltersJoin
        });
    };
    handleSubmit = () => {
        const { fromDate, toDate, reportBy} = this.state;
        const params = {
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            productId: productIds,
            mainCategoryId: mainCategoryIds,
            communicationId: communicationIds
        };
        this.props.setDetailsDataGrid({show: false});
        this.props.setGridParams(params);
        this.props.getMainReport(params);
    };
    render() {
        const {fromDate, toDate, statusOptions, currencyOptions, reportBy, subject }= this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
            <Form.Row bsPrefix='form-row'>
                <Form.Group >
                    <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                    <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                            maxDate={new Date(this.maxFromDate)}
                            selected={fromDate}
                            onChange={value => this.handleChangeFromDate(value)}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='label-width' >{LangHelper.getResource('ToDate')}</Form.Label>
                    <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            minDate={new Date(this.minToDate)}
                            maxDate={new Date(this.maxToDate)}
                            selected={toDate}
                            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                            onChange={value => this.handleChangeToDate(value)}
                        />
                    </div>
                </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group>
                    <Form.Label htmlFor="statusIds">{LangHelper.getResource('Status')}</Form.Label>
                    <div className='form-control-wrapper dropdown-width'>
                        <MultipleSelect
                            valueField='value'
                            dataSource={statusOptions}
                            keyField='id'
                            maxDisplayItemCount={0}
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeDropdown('statusIds', selectedItemsKey);
                            }}
                            hasSearchBox
                            isNAOption
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="currencyIds">{LangHelper.getResource('Currency')}</Form.Label>
                    <div className='form-control-wrapper dropdown-width'>
                        <MultipleSelect
                            valueField='value'
                            dataSource={currencyOptions}
                            keyField='id'
                            maxDisplayItemCount={0}
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeDropdown('currencyIds', selectedItemsKey);
                            }}
                            hasSearchBox
                            isNAOption
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="reportBy">{LangHelper.getResource('ReportBy')}</Form.Label>
                    <Form.Control as="select" size="sm"
                        name="reportBy" id="reportBy"
                        value={reportBy}
                        onChange={this.handleChange}
                    >
                        {
                            ReportBy.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                        }
                    </Form.Control>
                    </Form.Group>
            </Form.Row>
            <Form.Row bsPrefix='form-row'>
                <Form.Group style={{width: 533}}>
                    <Form.Label htmlFor="subject">{LangHelper.getResource('Subject')}</Form.Label>
                    <Form.Control type="text" size="sm"
                        value={subject}
                        name="subject" id="subject"
                        className="shadow-none subject-width" autoComplete="off"
                        onChange={this.handleChange}
                    />
                 </Form.Group>
                <Form.Group className="submit">
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
    const { settings } = state;
    return { settings };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Filter);