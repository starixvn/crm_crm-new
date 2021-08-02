import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const toDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        toDate.setMinutes(toDate.getMinutes() + 1);

        this.state = {
            formData: {
                username: '',
                isGuest: 0,
                fromDate: fromDate,
                toDate: toDate,
                mainCategoryId: 0,
                subCategoryId: 0,
                communicationId: 1005,
                responseId: 10002,
                isReviewed: 0
            }
        }
    }

    handleChangeFromDate = (fromDate, toDate) => {
        this.setState({
            formData: {...this.state.formData, fromDate: fromDate}
        });

        if (moment(fromDate).isAfter(moment(toDate))) {
            toDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(fromDate)));
            toDate.setMinutes(toDate.getMinutes() + 1);

            this.setState({
                formData: {...this.state.formData, toDate: toDate}
            });
        }
    };

    handleChangeToDate = (fromDate, toDate) => {
        this.setState({
            formData: {...this.state.formData, toDate: toDate}
        });

        if (moment(fromDate).isAfter(moment(toDate))) {
            fromDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(toDate)));
            fromDate.setMinutes(fromDate.getMinutes() - 1);

            this.setState({
                formData: {...this.state.formData, fromDate: fromDate}
            });
        }
    };

    handleChangeFormData = (event) => {
        const name = event.target.name;
        this.setState({
            formData: {...this.state.formData,[name]: event.target.type === 'select-one' ? parseInt(event.target.value) : event.target.value}
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {username, isGuest, fromDate, toDate, mainCategoryId, subCategoryId, communicationId, responseId, isReviewed } = this.state.formData;
        const params = {
            username: username,
            isGuest: isGuest === 0 ? null : isGuest === 1 ? false : true,
            fromDate: DateTimeService.toShortDateFormat(DateTimeService.toServerDateTime(fromDate)),
            toDate: DateTimeService.toShortDateFormat(DateTimeService.toServerDateTime(toDate)),
            mainCategoryId: mainCategoryId === 0 ? null : mainCategoryId,
            subCategoryId: subCategoryId === 0 ? null : subCategoryId,
            communicationId: communicationId,
            responseId: responseId,
            isReviewed: isReviewed === 0 ? null : isReviewed === 1 ? true : false,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.getGridParams(params);
        this.props.getDeletedFeedback(params);
    };

    filterMainCategories = data => {
        const mainCategoriesArr = [];
        data.mainCategories.map(value => {
            const filter = data.subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
            filter.unshift({name: 'All', subCategoryId: 0});
            mainCategoriesArr.push({
                mainCategoryID: value.mainCategoryID,
                name: value.name,
                subCate: filter
            });
        });
        mainCategoriesArr.unshift({mainCategoryID: 0, name: 'All', subCate: [{name: 'All', subCategoryId: 0}]});
        return mainCategoriesArr;
    };

    filterSubCategories = (mainCate,values) =>{
        const subCategories = mainCate.find(item => item.mainCategoryID === values.mainCategoryId);
        return subCategories;
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    renderForm = () => {
        const formData = this.state.formData;
        const data = this.props.settings;
        const mainCategories = this.filterMainCategories(data);
        const subCategories = this.filterSubCategories(mainCategories, formData);
        const reviews = [

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <div className="panel-content">
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                onChange={this.handleChangeFormData}
                            />
                        </Col>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isGuest"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    data.customerTypes.map((value,key) => this.renderOptions(value.settingValue,value.settingId,key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('From Date')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper">
                            <DatePicker
                                selected={formData.fromDate}
                                timeInputLabel="Time:"
                                dateFormat="MMM dd, yyyy"
                                onChange={value => this.handleChangeFromDate(value, formData.toDate)}
                            />
                        </Col>

                        <Form.Label column sm="1" md="1">
                            {LangHelper.getResource('To Date')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper">
                            <DatePicker
                                selected={formData.toDate}
                                timeInputLabel="Time:"
                                dateFormat="MMM dd, yyyy"
                                onChange={value => this.handleChangeToDate(formData.fromDate, value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Main Category')}
                        </Form.Label>
                        <Col sm="4" md="4">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="mainCategoryId"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    mainCategories.map((value,key) => this.renderOptions(value.name, value.mainCategoryID, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('SubCategory')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="subCategoryId"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    subCategories.subCate.map((value,key) => this.renderOptions(value.name, value.subCategoryId, key))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Communication')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-title">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="communicationId"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    data.communications.map((value,key) => this.renderOptions(value.name, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-customer-response">
                            {LangHelper.getResource('Customer Response')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-res">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="responseId"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    data.customerResponses.map((value,key) => this.renderOptions(value.value, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label column sm="2" md="2" className="filter-title">
                            {LangHelper.getResource('Is Reviewed')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isReviewed"
                                onChange={this.handleChangeFormData}
                            >
                                {
                                    reviews.map((value,key) => this.renderOptions(value.settingValue, value.settingId, key))
                                }
                            </Form.Control>
                        </Col>

                        <Col sm="2" md="2">
                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </Col>

                    </Form.Group>
                </div>
            </Form>
        );
    };

    render() {
        const { settings } = this.props;
        if (settings === null){
            return null;
        }

        return (
            <>
                {this.renderForm()}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings } = state;
    return { gridParams, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
