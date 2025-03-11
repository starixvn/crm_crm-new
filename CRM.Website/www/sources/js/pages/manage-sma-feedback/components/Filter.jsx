import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { isHavePermissionOnSite, isHaveLicenseePermissionOnSite } from '@jsroot/common/shareScripts';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                fromDate: null,
                toDate: null,
                statuses: [],
                username: ''
            }
        }

        this.statusOptions = [
            {id: 'New', name: 'New', checked: true},
            {id: 'Sent', name: 'Sent', checked: true},
            {id: 'Failed', name: 'Failed', checked: true},
            {id: 'Cancelled', name: 'Cancelled', checked: true},
            {id: 'Draft', name: 'Draft', checked: true},
            {id: 'Sending', name: 'Sending', checked: true},
        ];
    }

    componentDidMount() {
        this.setState({
            filter: {...this.state.filter, statuses: this.statusOptions.map(x=> x.name).join(',')}
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

    handleSubmit = event => {
        event.preventDefault();
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
                                dataSource={this.statusOptions}
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