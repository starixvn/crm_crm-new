import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = moment();
        const firstDayOfWeek = this.currentDate.startOf('week');
        const firstDayOfWeekFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDayOfWeek)));
        const fromDate =  firstDayOfWeekFormat.setDate(firstDayOfWeekFormat.getDate() - 1);
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.state = {
            fromDate: fromDate,
            toDate: firstDayOfWeekFormat,
            productOptions: [],
            mainCategoryOptions: [],
            communicationToolOptions: [],
            productId: 0,
            mainCategoryId: 0
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.settings);
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
        const toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
        this.setState({fromDate, toDate});
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        });
    };

    handleChangeDropdown = (name, selectedItemsKey) =>{
        this.setState({
            ...this.state,
            [name]: selectedItemsKey
        });
    }

    handleSettingOptions = settings =>{
        const { products, mainCategories, communicationTools} = settings;
        const productOptions = products.map(item =>{
            return {
                id: item.id,
                value: item.value,
                checked: true
            };
        });

        const mainCategoryOptions = mainCategories.map(item =>{
            return {
                id: item.mainCategoryID,
                value: item.name,
                checked: true
            };
        });

        const communicationToolOptions = communicationTools.map(item =>{
            return {
                id: item.id,
                value: item.name,
                checked: true
            };
        });

        this.setState({
            productOptions, mainCategoryOptions, communicationToolOptions
        });
    }
    
    handleSubmit = () => {
        const { fromDate, toDate} = this.state;
        const params = {
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate)
        };

        this.props.setGridParams(params);
    };

    render() {
       
        const { productId, fromDate, toDate, productOptions, mainCategoryOptions, communicationToolOptions } = this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                <Form.Group className='form-width'>
                    <Form.Label htmlFor="productId">{LangHelper.getResource('Product')}</Form.Label>
                    <div className='form-control-wrapper'>
                        <MultipleSelect
                            valueField='value'
                            dataSource={productOptions}
                            keyField='id'
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeDropdown('productId', selectedItemsKey);
                            }}
                            hasSearchBox
                            isNAOption
                        />
                    </div>
                </Form.Group>
                <Form.Group >
                    <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                    <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            maxDate={new Date(this.maxFromDate)}
                            selected={fromDate}
                            onChange={value => this.handleChangeFromDate(value)}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='label-width' >{LangHelper.getResource('ToDate')}</Form.Label>
                    <div className='react-datepicker-wrapper-container'>
                        <DatePicker
                            maxDate={new Date(this.maxToDate)}
                            minDate={new Date(this.minToDate)}
                            selected={toDate}
                            onChange={value => this.handleChangeToDate(value)}
                        />
                    </div>
                </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='form-width'>
                        <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                        <div className='form-control-wrapper mainCategory-width'>
                            <MultipleSelect
                                valueField='value'
                                dataSource={mainCategoryOptions}
                                keyField='id'
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChangeDropdown('mainCategoryId', selectedItemsKey);
                                }}
                                hasSearchBox
                                isNAOption
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='label-width' htmlFor="communicationTypeId">{LangHelper.getResource('CommunicationType')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                valueField='value'
                                dataSource={communicationToolOptions}
                                keyField='id'
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChangeDropdown('communicationTypeId', selectedItemsKey);
                                }}
                                hasSearchBox
                                isNAOption
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="submit">
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
    const { settings } = state;
    return { settings };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Filter);