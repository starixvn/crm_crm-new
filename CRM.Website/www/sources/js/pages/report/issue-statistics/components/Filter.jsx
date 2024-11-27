import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import { isHavePermissionOnSite } from '@jsroot/common/shareScripts';


export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(currentClientTime));
        const firstDateFirstMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() , 1);
        const firstDateOfMonthFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDateFirstMonth)));
        const firstMonthOfYear = new Date(DateTimeService.firstMonthOfYear(this.currentDate));
        const minDate = new Date('1/1/2011');
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.minFromDate = minDate;
        this.minToDate = minDate;
        this.minMonthFromDate = minDate;
        this.minMonthToDate = minDate;
        this.maxMonthFromDate = this.currentDate;
        this.maxMonthToDate = this.currentDate;
        this.state = {
            groupBy: 1,
            fromDate: firstDateOfMonthFormat,
            toDate: this.currentDate,
            fromMonthDate: firstMonthOfYear,
            toMonthDate: this.currentDate,
            mainCategoryId: -1,
            subCategoryId: -1
        };
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.handleSubmit();
        }
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

    getToMonthDate = fromMonthDate => fromMonthDate.getFullYear() === new Date().getFullYear() ? this.currentDate : new Date(DateTimeService.endMonthOfYear(fromMonthDate));

    handleChangeMonthFromDate = fromMonthDate  => {
        let toMonthDate = this.state.toMonthDate;
        const fromMonthGetYear = fromMonthDate.getFullYear();
        const toMonthGetYear = toMonthDate.getFullYear();
        if(fromMonthGetYear !== toMonthGetYear){
            toMonthDate = this.getToMonthDate(fromMonthDate);
        }
        this.minMonthToDate = fromMonthDate;
        this.setState({fromMonthDate, toMonthDate});
    };

    handleChangeMonthToDate = toMonthDate => {
        let fromMonthDate = this.state.fromMonthDate;
        const firstMonthOfYear = new Date(DateTimeService.firstMonthOfYear(toMonthDate));
        const fromMonthGetYear = fromMonthDate.getFullYear();
        const toMonthGetYear = toMonthDate.getFullYear();
        if(fromMonthGetYear !== toMonthGetYear){
            fromMonthDate = firstMonthOfYear;
        }
        this.maxMonthFromDate = toMonthDate;
        this.setState({fromMonthDate, toMonthDate});
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: parseInt(evt.target.value, 10)
        });
    };

    handleChangeMainCategory = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: parseInt(evt.target.value, 10),
            subCategoryId: -1
        });
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { mainCategoryId, fromDate, toDate, subCategoryId, groupBy, fromMonthDate, toMonthDate } = this.state;

        if(mainCategoryId === -1){
            toast.error(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory')));
            return;
        }
        if(mainCategoryId !== 0 && subCategoryId === -1){
            toast.error(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')));
            return;
        }
        if (!isHavePermissionOnSite()) return;

        const endDateOfMonth = new Date(toMonthDate.getFullYear(), toMonthDate.getMonth() + 1, 0);
        const endDateOfMonthFormat = DateTimeService.toShortDateFormat(new Date(endDateOfMonth));
        const params = {
            reportType : groupBy,
            fromDate: groupBy === 1 ? DateTimeService.toShortDateFormat(fromDate) : DateTimeService.toShortDateFormat(fromMonthDate),
            toDate: groupBy === 1 ? DateTimeService.toShortDateFormat(toDate) : endDateOfMonthFormat,
            mainCategoryId: mainCategoryId,
            subCategoryId: subCategoryId === -1 ? 0 : subCategoryId,
            isGetFullReport: groupBy !== 1,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    getMainCategoryOptions = (mainCategories, subCategories) => {
        const categoriesArr = [];
        const select = LangHelper.getResource('PleaseSelect');
        mainCategories.map(value => {
            const subFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
            subFilter.unshift({ name: 'All', subCategoryId: 0 });
            subFilter.unshift({ name: select, subCategoryId: -1 });
            categoriesArr.push({
                mainCategoryID: value.mainCategoryID,
                name: value.name,
                subCate: subFilter
            });
        });
        categoriesArr.unshift({ mainCategoryID: 0, name: 'All', subCate: [{ name: 'All', subCategoryId: 0 }] });
        categoriesArr.unshift({ mainCategoryID: -1, name: select, subCate: [{ name: select, subCategoryId: -1 }] });
        return categoriesArr;
    };

    getSubCategoryOptions = (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10));

    render() {
        const { mainCategoryId, subCategoryId, fromDate, toDate, groupBy, fromMonthDate, toMonthDate } = this.state;
        const {mainCategories, subCategories } = this.props.settings;
        const mainCategoryOptions = this.getMainCategoryOptions(mainCategories, subCategories);
        const subCategoryOptions = this.getSubCategoryOptions(mainCategoryOptions, mainCategoryId);
        const PeriodType = [
            {id: 1, name: 'Daily'},
            {id: 3, name: 'Monthly'}
        ];
        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit}>
                {
                    <Fragment>
                        <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
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
                                <Form.Group className="form-group-date-picker">
                                    <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                                    <div className='react-datepicker-wrapper-container'>
                                        <DatePicker
                                            dropdownMode="select"
                                            showMonthDropdown useShortMonthInDropdown
                                            showYearDropdown
                                            peekNextMonth
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
                                <Form.Group className="form-group-date-picker">
                                    <Form.Label htmlFor="fromDate">{LangHelper.getResource('ToDate')}</Form.Label>
                                    <div className='react-datepicker-wrapper-container'>
                                        <DatePicker
                                            dropdownMode="select" useShortMonthInDropdown
                                            showMonthDropdown
                                            showYearDropdown
                                            selected={toDate}
                                            minDate={new Date(this.minToDate)}
                                            maxDate={new Date(this.maxToDate)}
                                            onChange={value => this.handleChangeToDate(value)}
                                        />
                                    </div>
                                </Form.Group>
                            }
                            {
                                groupBy === 3 &&
                                <Form.Group className='form-group-date-picker'>
                                    <Form.Label htmlFor="fromMonth">{LangHelper.getResource('FromMonth')}</Form.Label>
                                    <div className='react-datepicker-wrapper-container month-datepicker'>
                                        <DatePicker
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker useShortMonthInDropdown
                                            selected={fromMonthDate}
                                            minDate={new Date(this.minMonthFromDate)}
                                            maxDate={new Date(this.maxMonthFromDate)}
                                            onChange={value => this.handleChangeMonthFromDate(value)}
                                        />
                                    </div>
                                </Form.Group>
                            }
                            {
                                groupBy === 3 &&
                                <Form.Group className='form-group-date-picker'>
                                    <Form.Label htmlFor="toMonth">{LangHelper.getResource('ToMonth')}</Form.Label>
                                    <div className='react-datepicker-wrapper-container month-datepicker'>
                                        <DatePicker
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker useShortMonthInDropdown
                                            selected={toMonthDate}
                                            minDate={new Date(this.minMonthToDate)}
                                            maxDate={new Date(this.maxMonthToDate)}
                                            onChange={value => this.handleChangeMonthToDate(value)}
                                        />
                                    </div>
                                </Form.Group>
                            }

                            <Form.Group className='form-group-main-category large-width'>
                                <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                                <Form.Control as="select" size="sm" name="mainCategoryId" id="mainCategoryId"
                                    value={mainCategoryId} onChange={this.handleChangeMainCategory}
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
                            <Form.Group>
                                <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                                    <UnderlineButton.submitButton />
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Fragment>
                }
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings } = state;
    return { gridParams, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);