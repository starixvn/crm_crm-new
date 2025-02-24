import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export class Filter extends Component {
    static propTypes = {
        getActionTypes: PropTypes.func
    };

    static defaultProps = {
        getActionTypes: function () {
            // nothing
        }
    };
    constructor(props) {
        super(props);
        this.currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        fromDate.setDate(fromDate.getDate() - 1);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;
        this.state = {
            headlineDA: '',
            editBy: '',
            fromDate: fromDate,
            toDate: currentDate,
            actionTypeIds: '',
            actionTypeOptions: []
        };
    }

    componentDidMount() {
        this.props.getActionTypes().then(data => {
            this.handleActionTypes(data);
        });
    }

    handleActionTypes = actionType =>{
        const actionTypeId = [];
        const actionTypeOptions = actionType.map(item =>{
            actionTypeId.push(item.actionTypeID);
            return {
                id: item.actionTypeID,
                name: item.actionTypeName,
                checked: true
            };
        });
        const actionTypeIds = actionTypeId.join(',');
        this.setState({actionTypeOptions, actionTypeIds});
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 1);
        this.maxToDate = (maxDate < currentTime) ? maxDate : currentTime;
        this.minToDate = fromDate;
        this.setState({
            toDate: maxDate < currentTime ? maxDate : currentTime,
            fromDate: fromDate
        });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { headlineDA, fromDate, toDate, editBy, actionTypeIds } = this.state;
        if(actionTypeIds === ''){
            toast.error(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('ActionType')));
            return;
        }
        const params = {
            userName: headlineDA !== '' ? headlineDA : null,
            editBy: editBy !== '' ? editBy : null,
            actionTypeIds: actionTypeIds,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getHeadlineDAReport(params);
    };

    render() {
        const { headlineDA, fromDate, toDate, editBy, actionTypeOptions } = this.state;

        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="headlineDA">{LangHelper.getResource('HeadlineDA')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            className="shadow-none" autoComplete="off"
                            value={headlineDA}
                            name="headlineDA" id="headlineDA"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                maxDate={new Date(this.maxFromDate)}
                                minDate={new Date('1/1/2011')}
                                selected={fromDate} useShortMonthInDropdown
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                maxDate={new Date(this.maxToDate)}
                                minDate={new Date(this.minToDate)} useShortMonthInDropdown
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                selected={toDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className='form-group-actionType'>
                        <Form.Label>{LangHelper.getResource('ActionType')}</Form.Label>
                        <MultipleSelect
                            dataSource={actionTypeOptions} hasSearchBox
                            keyField='id' valueField='name' isAllTextShown
                            statusField='checked'
                            onChange={(currentItem, selectedItemsKey) => this.setState({actionTypeIds: selectedItemsKey})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="editBy">{LangHelper.getResource('EditBy')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={editBy}
                            name="editBy" id="editBy"
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '70px'}} className="submit">
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
    const { gridParams, actionType } = state;
    return { gridParams, actionType };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);