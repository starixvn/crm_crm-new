import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        fromDate.setDate(fromDate.getDate() - 1);
        const toDate = currentDate;
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;

        this.state = {
            username: '',
            isGuest: '',
            fromDate: fromDate,
            toDate: toDate,
            mainCategoryId: 0,
            subCategoryId: 0,
            communicationId: 1005,
            responseId: 10002,
            isReviewed: ''
        };
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = (maxDate < currentTime) ? maxDate : currentTime;
        this.setState({
            fromDate: fromDate,
            toDate: (maxDate < currentTime) ? maxDate : currentTime
        });
    };

    handleChangeToDate = toDate => {  
        this.setState({
            toDate: toDate
        });
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value) : event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, isGuest, fromDate, toDate, mainCategoryId, subCategoryId, communicationId, responseId, isReviewed } = this.state;

        const params = {
            username: username,
            isGuest: isGuest,
            fromDate: DateTimeService.toShortDateFormat(DateTimeService.toServerDateTime(fromDate)),
            toDate: DateTimeService.toShortDateFormat(DateTimeService.toServerDateTime(toDate)),
            mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
            subCategoryId: subCategoryId === 0 ? '' : subCategoryId,
            communicationId: communicationId,
            responseId: responseId,
            isReviewed: isReviewed,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setGridParams(params);
        this.props.getDeletedFeedback(params);
    };

    filterSubCategories = (subCate,mainCateId) =>{
        if(mainCateId === 0){
            const subCategory = [{ name: 'All', subCategoryId: 0 }];
            return subCategory;
        }
        const subCategories = subCate.filter(item => item.mainCategoryID === mainCateId);
        subCategories.unshift({ name: 'All', subCategoryId: 0 });
        return subCategories;
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    renderForm = () => {
        const data = this.props.settings;
        const subCategories = this.filterSubCategories(data.subCategories, this.state.mainCategoryId);
        const reviews = [
            { settingValue: 'All', settingId: '' },
            { settingValue: 'Review', settingId: 1 },
            { settingValue: 'Not Reviewd', settingId: 0 }
        ];
        const customerTypes = [
            { settingValue: 'All', settingId: '' },
            { settingValue: 'Customer', settingId: 0 },
            { settingValue: 'Guest', settingId: 1 }   
        ];

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter">
                <div className="panel-content">
                    <Form.Group as={Row}>
                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-col">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col sm="2" md="2" className="filter-col">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isGuest"
                                onChange={this.handleChange}
                            >
                                {
                                    customerTypes.map((value,key) => this.renderOptions(value.settingValue,value.settingId,key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('FromDate')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper filter-colDate">
                            <DatePicker
                                selected={this.state.fromDate}
                                dateFormat="MMM dd, yyyy"
                                maxDate={new Date(this.maxFromDate)}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </Col>

                        <Form.Label className="filter-toDate col-form-label">
                            {LangHelper.getResource('ToDate')}
                        </Form.Label>
                        <Col sm="2" md="2" className="react-datepicker-wrapper-container form-control-wrapper filter-colDate">
                            <DatePicker
                                selected={this.state.toDate}
                                dateFormat="MMM dd, yyyy"
                                minDate={new Date(this.minToDate)}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('MainCategory')}
                        </Form.Label>
                        <Col sm="4" md="4" className="filter-col">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="mainCategoryId"
                                onChange={this.handleChange}
                            >
                                <option value="0">All</option>
                                {
                                    data.mainCategories.map((value,key) => this.renderOptions(value.name, value.mainCategoryID, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('SubCategory')}
                        </Form.Label>
                        <Col sm="4" md="4" className="filter-col">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="subCategoryId"
                                onChange={this.handleChange}
                            >
                                {
                                    subCategories.map((value,key) => this.renderOptions(value.name, value.subCategoryId, key))
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('Communication')}
                        </Form.Label>
                        <Col sm="1" md="1" className="filter-coll-all">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="communicationId"
                                onChange={this.handleChange}
                            >
                                {
                                    data.communications.map((value,key) => this.renderOptions(value.name, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label className="filter-customer-response col-form-label">
                            {LangHelper.getResource('CustomerResponse')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-res">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="responseId"
                                onChange={this.handleChange}
                            >
                                {
                                    data.customerResponses.map((value,key) => this.renderOptions(value.value, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Form.Label className="filter-title col-form-label">
                            {LangHelper.getResource('Is Reviewed')}
                        </Form.Label>
                        <Col sm="2" md="2" className="filter-col">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="isReviewed"
                                onChange={this.handleChange}
                            >
                                {
                                    reviews.map((value,key) => this.renderOptions(value.settingValue, value.settingId, key))
                                }
                            </Form.Control>
                        </Col>

                        <Col sm="2" md="2" className="filter-col">
                            <button type="submit" className="btn btn-primary btn-sm">{LangHelper.getResource('Submit')}</button>
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
