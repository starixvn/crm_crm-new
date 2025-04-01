import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { isHavePermissionOnSite } from '@jsroot/common/shareScripts';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { statusOptions } from '../common.functions';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const fromDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(yesterday)));
        const toDate = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));

        this.state = {
            filter: {
                fromDate,
                toDate,
                statuses: [],
                username: ''
            }
        }
        this.maxDate = toDate;
    }

    componentDidMount() {
        this.setState({
            filter: {...this.state.filter, statuses: statusOptions.map(x=> x.name).join(',')}
        });
    }

    handleChange = (name, value) => {
        this.setState(prevState => ({  
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }));
    };

    handleDateChange = dates => {
        const [start, end] = dates;
        this.handleChange('fromDate', start);
        this.handleChange('toDate', end);
    };

    getParams = () => {
        const { fromDate, toDate, statuses, username } = this.state.filter;
        return {
            fromDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(fromDate)),
            toDate: DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(toDate)),
            statuses: statuses.split(',').length === statusOptions.length ? null : statuses,
            username,
            pageIndex: this.props.gridParams.pageIndex,
            pageSize: this.props.gridParams.pageSize
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.filter.statuses) {
            toast.error(LangHelper.getResource('PleaseChooseReviewStatus'));
            return;
        }
        if (isHavePermissionOnSite()) {
            const params = this.getParams();
            this.props.setGridParams(params);
            this.props.getGridData(params);
        }
    };

    render() {
        return (
            <Form className='form-filter-v2' onSubmit={e => this.handleSubmit(e)}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="created-date">{LangHelper.getResource('CreatedDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container form-control-wrapper'>
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                selected={this.state.filter.fromDate}
                                onChangeDate={dates => this.handleDateChange(dates)}
                                startDate={this.state.filter.fromDate}
                                endDate={this.state.filter.toDate}
                                maxDate={this.maxDate}
                                maxDateRange={Number.MAX_SAFE_INTEGER}
                                selectsRange
                                isRangeDate
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="status">{LangHelper.getResource('ReviewStatus')}</Form.Label>
                        <div className='form-control-wrapper status-match-date'>
                            <MultipleSelect
                                dataSource={statusOptions}
                                keyField='id'
                                valueField='name'
                                maxDisplayItemCount={2}
                                isAllTextShown
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChange('statuses', selectedItemsKey);
                                }}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Username')}</Form.Label>
                        <Form.Control as='input' type='text' size='sm' className='shadow-none content' name='content'
                            value={this.state.filter.username}
                            autoComplete='off'
                            onChange={e => this.handleChange('username', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className='btn-submit-notification'>
                            <Button variant='primary' size='sm' type='submit'>
                                {LangHelper.getResource('Submit')}
                            </Button>
                        </div>
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams  } = state;
    return { gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);