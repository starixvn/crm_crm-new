import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const firstDateFirstMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() , 1);
        const firstDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDateFirstMonth)));
        const minDate = new Date('1/1/2011');
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.minFromDate = minDate;
        this.minToDate = minDate;
        this.state = {
            groupBy: 1,
            fromDate: firstDateOfMonthFormat,
            toDate: this.currentDate,
            mainCategoryId: 0,
            subCategoryId: 0
        };
    }

    handleChangeFromDate = fromDate => {
        let toDate = this.state.toDate;
        const endDateOfMonth = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
        const endDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(endDateOfMonth)));
        if(endDateOfMonth < this.state.toDate){
            toDate = endDateOfMonthFormat;
        }
        if(this.state.toDate < fromDate){
            toDate = fromDate;
        }
        this.setState({fromDate, toDate});
    };

    handleChangeToDate = toDate => {
        let fromDate = this.state.fromDate;
        const startDateOfMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
        const startDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(startDateOfMonth)));
        if(this.state.fromDate < startDateOfMonth ){
            fromDate = startDateOfMonthFormat;
        }
        if(toDate < this.state.fromDate){
            fromDate = toDate;
        }
        this.setState({fromDate, toDate});
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.type === 'select-one' ? parseInt(evt.target.value, 10) : evt.target.value
        });
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { mainCategoryId, fromDate, toDate, subCategoryId} = this.state;
        if(mainCategoryId === 0){
            toast.error(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory')));
            return;
        }
        if(mainCategoryId !== -1 && subCategoryId === 0){
            toast.error(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')));
            return;
        }
        const params = {
            // feedbackId: runningNumber !== '' ? runningNumber : null,
            // userName: username,
            // isGuest: isGuest === -1 ? null : isGuest,
            // fromDate: DateTimeService.toShortDateFormat(fromDate),
            // toDate: DateTimeService.toShortDateFormat(toDate),
            // mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
            // subCategoryId: subCategoryId === 0 ? '' : subCategoryId,
            // communicationId: communicationId === 0 ? '' : communicationId,
            // statusId: statusId === 0 ? '' : statusId,
            // responseId: responseId === 0 ? '' : responseId,
            // isReviewed: isReviewed,
            // handledBy: handler,
            // reviewer: reviewer,
            pageIndex: 1,
            pageSize: 100
        };

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    getMainCategoryOptions = (mainCategories, subCategories) => {
        const categoriesArr = [];
        const select = LangHelper.getResource('PleaseSelect');
        mainCategories.map(value => {
            const subFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
            subFilter.unshift({ name: 'All', subCategoryId: -1 });
            subFilter.unshift({ name: select, subCategoryId: 0 });
            categoriesArr.push({
                mainCategoryID: value.mainCategoryID,
                name: value.name,
                subCate: subFilter
            });
        });
        categoriesArr.unshift({ mainCategoryID: -1, name: 'All', subCate: [{ name: 'All', subCategoryId: -1 }] });
        categoriesArr.unshift({ mainCategoryID: 0, name: select, subCate: [{ name: select, subCategoryId: 0 }] });
        return categoriesArr;
    };

    getSubCategoryOptions = (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10));

    render() {
        const { mainCategoryId, subCategoryId, fromDate, toDate, groupBy } = this.state;
        const {mainCategories, subCategories } = this.props.settings;
        const mainCategoryOptions = this.getMainCategoryOptions(mainCategories, subCategories);
        const subCategoryOptions = this.getSubCategoryOptions(mainCategoryOptions, mainCategoryId);
        const PeriodType = [
            {id: 1, name: 'Daily'},
            {id: 3, name: 'Monthly'}
        ];

        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="groupBy">{LangHelper.getResource('GroupBy')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="groupBy" id="groupBy"
                            value={groupBy}
                            onChange={this.handleChange}
                        >
                            {
                                PeriodType.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    {
                        groupBy === 1 && 
                        <Form.Group>
                            <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                            <div className='react-datepicker-wrapper-container'>
                                <DatePicker
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    selected={fromDate}
                                    minDate={new Date(this.minFromDate)}
                                    maxDate={new Date(this.maxFromDate)}
                                    onChange={value => this.handleChangeFromDate(value)}
                                />
                            </div>
                        </Form.Group>
                    }
                    {
                        groupBy === 1 && 
                        <Form.Group>
                            <Form.Label htmlFor="fromDate">{LangHelper.getResource('ToDate')}</Form.Label>
                            <div className='react-datepicker-wrapper-container'>
                                <DatePicker
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    selected={fromDate}
                                    minDate={new Date(this.minToDate)}
                                    maxDate={new Date(this.maxToDate)}
                                    onChange={value => this.handleChangeToDate(value)}
                                />
                            </div>
                        </Form.Group>
                    }
                    {
                        groupBy === 3 && 
                        <Form.Group>
                            <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                            <div className='react-datepicker-wrapper-container'>
                                <DatePicker
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showFourColumnMonthYearPicker
                                    selected={fromDate}
                                />
                            </div>
                        </Form.Group>
                    }
                    {
                        groupBy === 3 && 
                        <Form.Group>
                            <Form.Label htmlFor="fromDate">{LangHelper.getResource('ToDate')}</Form.Label>
                            <div className='react-datepicker-wrapper-container'>
                                <DatePicker
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showFourColumnMonthYearPicker
                                    selected={fromDate}
                                />
                            </div>
                        </Form.Group>
                    }
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='form-group-main-category'>
                        <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                        <Form.Control as="select" size="sm" name="mainCategoryId" id="mainCategoryId"
                            value={mainCategoryId} onChange={this.handleChange}
                        >
                            {
                                mainCategoryOptions.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='form-group-sub-category'>
                        <Form.Label htmlFor="subCategoryId">{LangHelper.getResource('SubCategory')}</Form.Label>
                        <Form.Control as="select" size="sm" name="subCategoryId"
                            value={subCategoryId}
                            onChange={this.handleChange}
                        >
                            {
                                subCategoryOptions[0].subCate.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <div>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </div>
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