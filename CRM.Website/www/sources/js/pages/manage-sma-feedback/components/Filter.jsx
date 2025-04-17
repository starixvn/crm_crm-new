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

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(currentClientTime));
        const firstDateFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1);
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDateFirstMonth)));

        this.state = {
            filter: {
                fromDate,
                toDate: currentDate,
                reviewStatus: [],
                username: '',
                isTestOnly: false
            }
        }
        this.maxDate = currentDate;
        this.reviewStatusSettings = [];
    }

    componentDidMount = () => {
        this.props.getReviewStatusSetting().then(response => {
            this.setState({
                filter: {...this.state.filter, reviewStatus: this.formatReviewStatus(response).map(x=> x.id).join(',')}
            });
            this.props.setReviewStatusSetting(this.formatReviewStatus(response));
            this.reviewStatusSettings = response;
        });
    }

    formatReviewStatus = reviewStatusSetting => {
        const setting = [];
        reviewStatusSetting.forEach(x=> {
            setting.push({
                id: x.id,
                name: x.value,
                checked: true
            });
        });
        return setting;
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
        const { fromDate, toDate, reviewStatus, username, isTestOnly } = this.state.filter;
        return {
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            listReviewStatusIDs: reviewStatus.split(',').length === this.props.reviewStatusSetting.length ? null : reviewStatus,
            username,
            testOnly: isTestOnly,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize,
            reviewStatusSettings: this.reviewStatusSettings
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.filter.reviewStatus) {
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
        const { reviewStatusSetting } = this.props;
        if (!reviewStatusSetting) {
            return null;
        }
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
                                maxDateRange={365}
                                selectsRange
                                isRangeDate
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="status">{LangHelper.getResource('ReviewStatus')}</Form.Label>
                        <div className='form-control-wrapper status-match-date'>
                            <MultipleSelect
                                dataSource={reviewStatusSetting}
                                keyField='id'
                                valueField='name'
                                maxDisplayItemCount={2}
                                isAllTextShown
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChange('reviewStatus', selectedItemsKey);
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
                        <Form.Check className='is-test-only' type="checkbox" label={LangHelper.getResource('FilterByTestData')}
                            htmlFor="is-test-only" checked={this.state.filter.isTestOnly}
                            value={this.state.filter.isTestOnly}
                            onChange={e => this.handleChange('isTestOnly', e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className='btn-submit'>
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
    const { gridParams, reviewStatusSetting } = state;
    return { gridParams, reviewStatusSetting };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);