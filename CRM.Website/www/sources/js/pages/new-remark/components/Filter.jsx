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

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        this.currentDate = currentDate;
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.firstDateOfMonth = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDay)));
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minFromDate = new Date(1900, 1, 1);
        this.minToDate = new Date(1900, 1, 1);
        this.state = {
            remarkContent: '',
            userName: '',
            isGuest: false,
            isShowHeadline: false,
            relatedToPICs: '',
            fromDate: this.firstDateOfMonth,
            toDate: this.firstDateOfMonth,
            remarkTitleOptions: [],
            remarkTitleIds: '',
            dateTypeSelect: 4
        };
    }
    componentDidMount(){
        const remarkTitles = [];
        const remarkTitleOptions = this.props.remarkTitle.map(title =>{
            remarkTitles.push(title.settingId);
            return {
                id: title.settingId,
                value: title.settingValue,
                checked: true
            };
        });
        const remarkTitleIds = remarkTitles.join(',');
        this.setState({remarkTitleOptions, remarkTitleIds});
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
        let date = this.currentDate;
        switch(value){
            case DateType.Yesterday:
                date = new Date(DateTimeService.yesterday(date));
                break;
            case DateType.ThisWeek:
                date = new Date(DateTimeService.firstDayOfWeek(date));
                break;
            case DateType.LastWeek:
                date = new Date(DateTimeService.firstDayOfLastWeek(date));
                break;
            case DateType.ThisMonth:
                date = this.firstDateOfMonth;
                break;
            case DateType.LastMonth:
                date = new Date(DateTimeService.firstDayOfLastMonth(date));
                break;
            case DateType.ThisYear:
                date = new Date(DateTimeService.firstDayOfYear(date));
                break;
            default:
                break;
        }
        this.setState({
            fromDate: date,
            toDate: date,
            dateTypeSelect : evt.target.value
        });
    };

    handleChangeSpecificDate = () =>{
        this.setState({dateTypeSelect: 7});
    }

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
        const { remarkContent,userName, isGuest, isShowHeadline, relatedToPICs, fromDate, toDate, remarkTitleIds, dateTypeSelect } = this.state;
        if (remarkTitleIds === '') {
            toast.error(LangHelper.getResource('PleaseChooseRemarkTitle'));
            return;
        }

        if (isGuest && userName === '') {
            toast.error(LangHelper.getResource('PleaseInputUsername'));
            return;
        }
        const params = {
            username: userName,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            remark: remarkContent,
            remarkTitle: remarkTitleIds,
            isGuest: isGuest,
            relatedPICs: relatedToPICs,
            showHeadline: isShowHeadline,
            datePreset: dateTypeSelect,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        if(isGuest && userName !== ''){
            this.props.validateUsername({username: userName, isGuest: isGuest}).then(response => {
                if(response.isSuccessful){
                    this.props.setGridParams(params);
                    this.props.getNewRemarks(params);
                }
                else{
                    toast.error(response.message);
                    return;
                }
            });
        }else{
            this.props.setGridParams(params);
            this.props.getNewRemarks(params);
        }
    };

    render() {
        const {remarkTitle} = this.props;
        if(remarkTitle === null || !remarkTitle){
            return null;
        }
       
        const { remarkContent, userName, isGuest, isShowHeadline, relatedToPICs, fromDate, toDate, dateTypeSelect, remarkTitleOptions } = this.state;
        
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: 850}}>
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
                    <Form.Group style={{width: 400}}>
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
                                maxDisplayItemCount={0}
                                hasSearchBox
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: 700}}>
                        <Form.Label htmlFor="userName">
                            {LangHelper.getResource('UserName')}
                        </Form.Label>
                        <Form.Control size="sm" type="text"
                            name="userName" id="userName"
                            value={userName}
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: 60}} controlId="formBasicCheckboxGuest">
                        <Form.Check type="checkbox" label={LangHelper.getResource('Guest')}
                            id='isGuest' name='isGuest'
                            checked={isGuest}
                            onChange={this.handleChangeCheckbox}
                        />
                    </Form.Group>
                    <Form.Group style={{width: 300}}>
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
                    <Form.Group style={{width: 200}} controlId="formBasicCheckboxHeadline">
                        <Form.Check type="checkbox" label={LangHelper.getResource('ShowHeadlineRemarks')}
                            id='isShowHeadline' name='isShowHeadline'
                            checked={isShowHeadline}
                            onChange={this.handleChangeCheckbox}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                <Form.Group >
                        <Form.Label htmlFor="fromDate" style={{width: 115}}>
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                maxDate={new Date(this.maxFromDate)}
                                selected={fromDate}
                                onChange={value => this.handleChangeFromDate(value)
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{width: 115}}>
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                minDate={new Date(this.minToDate)}
                                selected={toDate}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group style={{width: 260}}>
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
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Button variant="primary" size="sm" className='mr-4' onClick={this.handleSubmit}>
                            {LangHelper.getResource('Search')}
                        </Button>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            {LangHelper.getResource('Insert')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarkTitle, gridParams } = state;
    return { remarkTitle, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);