import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { toast } from 'react-toastify';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { DateTypeOption, DateType }from '@jsroot/common/constants';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import { isHavePermissionOnSite } from '@jsroot/common/shareScripts';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.currentDate = currentDate;
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.firstDateOfMonth = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDay)));
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minFromDate = new Date(1900, 1, 1);
        this.minToDate = new Date(1900, 1, 1);
        const { customerName, isGuestSearch, isSearchAll } = this.props;
        const isCustomerNotEmpty = customerName !== '';
        this.state = {
            remarkContent: '',
            isSearchAll: isSearchAll,
            userName: customerName,
            isGuestFiler: isCustomerNotEmpty ? isGuestSearch : false,
            isShowHeadline: isCustomerNotEmpty ? true : false,
            relatedToPICs: '',
            fromDate: !isSearchAll ? (isCustomerNotEmpty ? new Date(DateTimeService.firstDayOfYear(currentDate)) : this.firstDateOfMonth) : null,
            toDate: !isSearchAll ? currentDate : null,
            remarkTitleOptions: [],
            remarkTitleIds: '',
            dateTypeSelect: isCustomerNotEmpty ? 7 : 4
        };
    }
    componentDidMount(){
        const remarkTitles = [];
        const remarkTitleOptions = this.props.remarkTitles.map(title =>{
            remarkTitles.push(title.settingId);
            return {
                id: title.settingId,
                value: title.settingValue,
                checked: true
            };
        });
        const remarkTitleIds = remarkTitles.join(',');
        this.setState({remarkTitleOptions, remarkTitleIds},() =>{
            if(this.props.customerName !== ''){
                this.handleSubmit();
            }
        });
    }

    componentDidUpdate() {
        const { gridDataFilter } = this.props;
        if (gridDataFilter?.length > 0 && this.state.isSearchAll) {
            this.setState({
                fromDate: Date.parse(gridDataFilter[0].fromDate),
                toDate: Date.parse(gridDataFilter[0].toDate),
                isSearchAll: false
            });
            this.props.setIsSearchAll(false)
        }
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.handleSubmit();
        }

        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            this.props.setOpenCreatePopup({show: true});
        }
    }

    handleChangeFromDate = fromDate => {
        this.handleChangeSpecificDate();
        this.minToDate = fromDate;
        this.setState({
            fromDate: fromDate
        });
    };

    handleChangeToDate = toDate => {
        this.handleChangeSpecificDate();
        this.maxFromDate = toDate;
        let fromDate = this.state.fromDate;
        if(fromDate > toDate){
            fromDate = toDate;
        }
        this.setState({ toDate, fromDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleChangeDateType = evt => {
        const value = parseInt(evt.target.value, 10);
        const date = this.currentDate;
        let fromDate = this.currentDate;
        let toDate = this.currentDate;
        switch(value){
            case DateType.Yesterday:
                fromDate = new Date(DateTimeService.yesterday(date));
                toDate = new Date(DateTimeService.yesterday(date));
                break;
            case DateType.ThisWeek:
                fromDate = new Date(DateTimeService.firstDayOfWeek(date));
                break;
            case DateType.LastWeek:
                fromDate = new Date(DateTimeService.firstDayOfLastWeek(date));
                toDate = new Date(DateTimeService.LastDayOfLastWeek(date));
                break;
            case DateType.ThisMonth:
                fromDate = this.firstDateOfMonth;
                break;
            case DateType.LastMonth:
                fromDate = new Date(DateTimeService.firstDayOfLastMonth(date));
                toDate = new Date(DateTimeService.lastDayOfLastMonth(date));
                break;
            case DateType.ThisYear:
                fromDate = new Date(DateTimeService.firstDayOfYear(date));
                break;
            case DateType.SpecificDates:
                fromDate = new Date(DateTimeService.firstDayOfYear(date));
                break;
            default:
                break;
        }
        this.setState({
            fromDate: fromDate,
            toDate: toDate,
            dateTypeSelect : evt.target.value
        });
    };

    handleChangeSpecificDate = () =>{
        this.setState({dateTypeSelect: 7});
    };

    handleChangeCheckbox = evt => {
        const name = evt.target.name;
        this.setState(prevState =>{
            return{
                 ...prevState,
                [name] : !prevState[name]
            };
         });
    };

    handleChangeDropdown = (name, selectedItemsKey) => {
        this.setState({
            ...this.state,
            [name]: selectedItemsKey
        });
    };

    handleSubmit = () => {
        const { fromDate, toDate, remarkTitleIds } = this.state;
        if (remarkTitleIds === '') {
            toast.error(LangHelper.getResource('PleaseChooseRemarkTitle'));
            return;
        }

        if (fromDate > toDate) {
            toast.error(LangHelper.getResource('InvalidDateRange'));
            return;
        }

        if (!isHavePermissionOnSite()) {
            return;
        }

        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.setShowHistory({show: false});
        this.props.getNewRemarks(params);
    };

    handleOpenAdd = () =>{
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.setOpenCreatePopup({show: true});
    };

    getParams = () =>{
        const { remarkContent,userName, isGuestFiler, isShowHeadline, relatedToPICs, fromDate, toDate, remarkTitleIds } = this.state;
        const params = {
            username: userName,
            fromDate: fromDate ? DateTimeService.toShortDateFormat(fromDate) : fromDate,
            toDate: toDate ? DateTimeService.toShortDateFormat(toDate) : toDate,
            remark: remarkContent,
            remarkTitle: remarkTitleIds,
            isGuest: isGuestFiler,
            relatedPICs: relatedToPICs,
            showHeadline: isShowHeadline,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
        return params;
    };

    render() {
        const {remarkTitles, customerName, isHost} = this.props;
        if(remarkTitles === null || !remarkTitles){
            return null;
        }
        const { remarkContent, userName, isGuestFiler, isShowHeadline, relatedToPICs, fromDate, toDate, dateTypeSelect, remarkTitleOptions } = this.state;
        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: '440px'}}>
                        <Form.Label htmlFor="remarkContent">
                            {LangHelper.getResource('RemarkContent')}
                        </Form.Label>
                        <Form.Control size="sm" type="text"
                            name="remarkContent" id="remarkContent"
                            value={remarkContent}
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '440px'}}>
                        <Form.Label htmlFor="action">{LangHelper.getResource('RemarkTitle')}</Form.Label>
                        <div className='form-control-wrapper' >
                            <MultipleSelect
                                valueField='value'
                                dataSource={remarkTitleOptions}
                                keyField='id'
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChangeDropdown('remarkTitleIds', selectedItemsKey);
                                }}
                                isAllTextShown
                                maxDisplayItemCount={1}
                                hasSearchBox
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: '340px'}}>
                        <Form.Label htmlFor="userName">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Form.Control size="sm" type="text"
                            name="userName" id="userName"
                            disabled={customerName !== ''}
                            value={userName}
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '60px', 'padding-top': '26px'}} controlId="formBasicCheckboxGuest">
                        <Form.Check type="checkbox" label={LangHelper.getResource('Guest')}
                            id='isGuestFiler' name='isGuestFiler'
                            disabled={customerName !== ''}
                            checked={isGuestFiler}
                            onChange={this.handleChangeCheckbox}
                        />
                    </Form.Group>
                    <Form.Group className='related-pic'>
                        <Form.Label htmlFor="relatedToPICs">
                            {LangHelper.getResource('RelatedToPICs')}
                        </Form.Label>
                        <Form.Control size="sm" type="text"
                            name="relatedToPICs" id="relatedToPICs"
                            value={relatedToPICs}
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '175px', 'padding-top': '26px'}} controlId="formBasicCheckboxHeadline">
                        <Form.Check type="checkbox" label={LangHelper.getResource('ShowHeadlineRemarks')}
                            id='isShowHeadline' name='isShowHeadline'
                            checked={isShowHeadline}
                            onChange={this.handleChangeCheckbox}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className="form-group-date">
                            <Form.Label htmlFor="fromDate">
                                {LangHelper.getResource('FromDate')}
                            </Form.Label>
                            <div className='react-datepicker-wrapper-container'>
                                <DatePicker
                                    peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                    maxDate={new Date(this.maxFromDate)} useShortMonthInDropdown
                                    selected={fromDate}
                                    onChange={value => this.handleChangeFromDate(value)
                                    }
                                />
                            </div>
                    </Form.Group>
                    <Form.Group className="form-group-date">
                        <Form.Label>
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                minDate={new Date(this.minToDate)} useShortMonthInDropdown
                                selected={toDate}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{visibility: 'hidden'}}>{LangHelper.getResource('Time')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="dateTypeSelect" id="dateTypeSelect"
                            value={dateTypeSelect}
                            onChange={this.handleChangeDateType}
                        >
                            {
                                DateTypeOption.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" className='btn-submit mr-4' onClick={this.handleSubmit}>
                            <UnderlineButton.searchButton />
                        </Button>
                        {
                            isHost &&
                            <Button variant="primary" size="sm" onClick={this.handleOpenAdd}>
                                <UnderlineButton.insertButton />
                            </Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarkTitles, gridParams, gridDataFilter, isSearchAll } = state;
    return { remarkTitles, gridParams, gridDataFilter, isSearchAll };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);