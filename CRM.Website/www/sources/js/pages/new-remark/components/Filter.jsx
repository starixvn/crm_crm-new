import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { DateOption }from '@jsroot/common/constants';

export class Filter extends Component {
    static propTypes = {
        getRemarksTitle: PropTypes.func
    };

    static defaultProps = {
        getRemarksTitle: function () {
            // nothing
        }
    };
    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDateOfMonth = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDay)));
        const fromDate = firstDateOfMonth;
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;
        this.state = {
            remarkContent: '',
            userName: '',
            isGuest: false,
            isShowHeadline: false,
            relatedToPICs: '',
            fromDate: fromDate,
            toDate: currentDate,
            remarkTitle: 0,
            dateSelect: 4
        };
    }
    componentDidMount(){
        this.props.getRemarksTitle();
    }

    handleChangeFromDate = fromDate => {
        this.minToDate = fromDate;
        this.setState({
            fromDate: fromDate
        });
    };

    handleChangeToDate = toDate => {
        this.maxFromDate = toDate;
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
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

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { handler, fromDate, toDate, actionId } = this.state;

        const params = {
            username: handler !== '' ? handler : null,
            actionId: actionId,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getGridSettingLogs(params);
    };

    render() {
        const {remarkSetting} = this.props;
        if(remarkSetting === null || !remarkSetting){
            return null;
        }
       
        const { remarkContent,userName, isGuest, isShowHeadline, relatedToPICs, fromDate, toDate, remarkTitle, dateSelect } = this.state;
        const all = [
            { settingValue: 'All', settingId: 0 }
        ];

        const remarkSettingOptions = [...all, ...remarkSetting];
        

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
                        <Form.Control as="select" size="sm"
                            name="remarkTitle" id="remarkTitle"
                            value={remarkTitle}
                            onChange={this.handleChange}
                        >
                            {
                                remarkSettingOptions.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                            }
                        </Form.Control>
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
                            name="dateSelect" id="dateSelect"
                            value={dateSelect}
                            onChange={this.handleChange}
                        >
                            {
                                DateOption.map((value, key) => this.renderOptions(value.name, value.id, key))
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
    const { remarkSetting } = state;
    return { remarkSetting };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);