import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { ActionCreators } from '../actions';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const firstDayOfWeek = moment(this.currentDate).startOf('week');
        const firstDayOfWeekFormat = new Date(DateTimeService.toShortDateTimeFormat(new Date(firstDayOfWeek)));
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.state = {
            fromDate: firstDayOfWeekFormat,
            toDate: this.currentDate,
            productOptions: [],
            mainCategoryOptions: [],
            communicationToolOptions: []
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.settings);
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 3);
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

    handleSettingOptions = settings =>{
        const { products, mainCategories, communicationTools} = settings;
        const productIdFilters = [];
        const mainCategoryIdFilters = [];
        const communicationIdFilters = [];
        const productOptions = products.map(item =>{
            productIdFilters.push(item.id);
            return {
                id: item.id,
                value: item.value,
                checked: true
            };
        });

        const mainCategoryOptions = mainCategories.map(item =>{
            mainCategoryIdFilters.push(item.mainCategoryID);
            return {
                id: item.mainCategoryID,
                value: item.name,
                checked: true
            };
        });

        const communicationToolOptions = communicationTools.map(item =>{
            communicationIdFilters.push(item.id);
            return {
                id: item.id,
                value: item.name,
                checked: true
            };
        });
        const productIdFiltersJoin = productIdFilters.join(',');
        const mainCategoryIdFiltersJoin = mainCategoryIdFilters.join(',');
        const communicationIdFiltersJoin = communicationIdFilters.join(',');

        this.setState({
            productOptions, mainCategoryOptions, communicationToolOptions,
            productIds: productIdFiltersJoin,
            mainCategoryIds: mainCategoryIdFiltersJoin,
            communicationIds: communicationIdFiltersJoin
        });
    }
    
    handleSubmit = () => {
        const { fromDate, toDate, productId, mainCategoryId, communicationId} = this.state;
        const params = {
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate), 
            productId: productId,
            mainCategoryId: mainCategoryId,
            communicationId: communicationId
        };

        this.props.setGridParams(params);
        this.props.getMainReport(params);
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
    }) => {
        const { fromDate, toDate, productOptions, mainCategoryOptions, communicationToolOptions } = this.state;
        return (
            <Form noValidate onSubmit={handleSubmit}>
            <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Row bsPrefix='form-row'>
                <Form.Group className='form-width'>
                    <Form.Label htmlFor="productIds">{LangHelper.getResource('Product')}</Form.Label>
                    <div className='form-control-wrapper'>
                        <MultipleSelect
                            valueField='value'
                            dataSource={productOptions}
                            keyField='id'
                            isInvalid={touched.productIds && errors.productIds}
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('productIds', selectedItemsKey);
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
                        <Form.Label htmlFor="mainCategoryIds">{LangHelper.getResource('MainCategory')}</Form.Label>
                        <div className='form-control-wrapper mainCategory-width'>
                            <MultipleSelect
                                valueField='value'
                                isInvalid={touched.mainCategoryIds && errors.mainCategoryIds}
                                dataSource={mainCategoryOptions}
                                keyField='id'
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('mainCategoryIds', selectedItemsKey);
                                }}
                                hasSearchBox
                                isNAOption
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='label-width' htmlFor="communicationId">{LangHelper.getResource('CommunicationType')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                valueField='value'
                                dataSource={communicationToolOptions}
                                keyField='id'
                                isInvalid={touched.communicationIds && errors.communicationIds}
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('communicationIds', selectedItemsKey);
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
    
    initValues = () =>{
        const initialValues = {
            productIds: '',
            mainCategoryIds: '',
            communicationIds: ''
        };
        return initialValues;
    }

    validateFormik = values =>{
        const errors = {};
        if (values.productIds === '') {
            errors.productIds = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Product'));
        }

        if (values.mainCategoryIds === '') {
            errors.mainCategoryIds = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory'));
        }

        if (values.communicationIds === '') {
            errors.communicationIds = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory'));
        }
    }
    
    render() {
        return (
            <Formik
                initialValues={this.initValues}
                validate={values => this.validateFormik(values)}
                onSubmit={this.handleSubmit}
            >
                {this.renderForm}
            </Formik>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Filter);