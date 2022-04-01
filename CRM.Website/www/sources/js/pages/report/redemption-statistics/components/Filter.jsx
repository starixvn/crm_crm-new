import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { ReportBy }from '@jsroot/common/constants';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const currentDate = this.currentDate;
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.state = {
            fromDate: currentDate,
            toDate: currentDate,
            statusOptions: [],
            currencyOptions: [],
            statusIds: '',
            currencyIds: '',
            reportBy: 1,
            subject: '',
            showFilter: true
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.settings);
    }

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChangeFromDate = fromDate => {
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);
        this.minToDate = fromDate;
        this.maxToDate = maxDate < this.currentDate ? maxDate : this.currentDate;
        const toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
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
            statusIdFilters.push(item.statusId);
            return {
                id: item.statusId,
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

    handleToggleFilter = value => {
        this.setState({ showFilter: value });
        window.dispatchEvent(new Event('resize'));
    };


    handleSubmit = () => {
        const { fromDate, toDate, reportBy, statusIds, currencyIds, subject} = this.state;
        const params = {
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            subject: subject,
            currencyId: currencyIds,
            statusId: statusIds,
            reportBy: reportBy
        };
        this.props.setOpenDetails({show: false});
        this.props.setGridParams(params);
        this.props.getRedemptionSummary(params);
    };
    render() {
        const {fromDate, toDate, statusOptions, currencyOptions, reportBy, subject, showFilter }= this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                {
                    showFilter &&
                    <Fragment>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group >
                                <Form.Label htmlFor='fromDate'>{LangHelper.getResource('FromDate')}</Form.Label>
                                <div className='react-datepicker-wrapper-container'>
                                    <DatePicker
                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode='select'
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
                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode='select'
                                        onChange={value => this.handleChangeToDate(value)}
                                    />
                                </div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor='statusIds'>{LangHelper.getResource('Status')}</Form.Label>
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
                                <Form.Label htmlFor='currencyIds'>{LangHelper.getResource('Currency')}</Form.Label>
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
                                <Form.Label htmlFor='reportBy'>{LangHelper.getResource('ReportBy')}</Form.Label>
                                <Form.Control as='select' size='sm'
                                    name='reportBy' id='reportBy'
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
                                <Form.Label htmlFor='subject'>{LangHelper.getResource('Subject')}</Form.Label>
                                <Form.Control type='text' size='sm'
                                    value={subject}
                                    name='subject' id='subject'
                                    className='shadow-none subject-width' autoComplete='off'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='submit'>
                                <Button variant='primary' size='sm' onClick={this.handleSubmit}>
                                    {LangHelper.getResource('Submit')}
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Fragment>
                }
                <div className='text-center filter-collapse'>
                    {
                        showFilter
                            ? <span className='fa-sm fa fa-caret-up' onClick={() => this.handleToggleFilter(false)} />
                            : <span className='fa-sm fa fa-caret-down' onClick={() => this.handleToggleFilter(true)} />
                    }
                </div>
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