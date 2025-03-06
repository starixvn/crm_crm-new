import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { statusOptionOST, statusOptionCSD, isEitherExitsFromToId, isFromIdOverToId, checkExceedMaxInt } from '../common.functions';
import { isHavePermissionOnSite, isHaveLicenseePermissionOnSite } from '@jsroot/common/shareScripts';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                fromDate: null,
                toDate: null
            }
        }
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

    render() {
        return (
            <div>
                <Form className='form-filter' onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group>
                            <Form.Label htmlFor="created-date">{LangHelper.getResource('CreatedDate')}</Form.Label>
                        </Form.Group>
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
                                disabled={this.isDisabledField()}
                                maxDateRange={Number.MAX_SAFE_INTEGER}
                                selectsRange
                                isRangeDate
                            />
                        </div>
                    </Form.Row>

                </Form>
            </div>
        )
    }
}