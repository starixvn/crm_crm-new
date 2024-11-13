import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import { filterCategories, filterSubCategories } from '@jsroot/common/shareScripts';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
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
            communicationId: 0,
            responseId: 0,
            isReviewed: ''
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.settings !== this.props.settings) {
            this.setState({
                communicationId: '',
                responseId: ''
            });
        }
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-deleted-fb');
            btn.click();
        }
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
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
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleSubmit = event => {
        const { username, isGuest, fromDate, toDate, mainCategoryId, subCategoryId, communicationId, responseId, isReviewed } = this.state;

        const params = {
            username: username,
            isGuest: isGuest,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
            subCategoryId: subCategoryId === 0 || mainCategoryId === 0 ? '' : subCategoryId,
            communicationId: communicationId,
            responseId: responseId,
            isReviewed: isReviewed,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
        this.props.setGridParams(params);
        this.props.getDeletedFeedback(params);
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    renderForm = () => {
        const { mainCategoryId, subCategoryId } = this.state;
        const data = this.props.settings;
        const reviews = [
            { settingValue: 'All', settingId: '' },
            { settingValue: 'Reviewed', settingId: 1 },
            { settingValue: 'Not Reviewed', settingId: 0 }
        ];
        const customerTypes = [
            { settingValue: 'All', settingId: '' },
            { settingValue: 'Customer', settingId: 0 },
            { settingValue: 'Guest', settingId: 1 }
        ];
        const customerResponses = [{ id: '', value: 'All' }, ...data.customerResponses];
        const communications = [{ id: '', name: 'All' }, ...data.communications];
        const mainCategoryOptions = filterCategories(data.mainCategories, data.subCategories);
        const subCategoryOptions = filterSubCategories(mainCategoryOptions, mainCategoryId, subCategoryId, this.setState.bind(this));

        return (
            <Form onSubmit={this.handleSubmit} className="form-filter-v2" action="javascript:void(0)">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className='large-width'>
                            <Form.Label className="col-form-label-username">
                                {LangHelper.getResource('Username')}
                            </Form.Label>
                            <div className='form-username'>
                                <Form.Control type="text" size="sm" className="shadow-none username-width"
                                    autoComplete="on"
                                    name="username"
                                    onChange={this.handleChange}
                                />
                                <Form.Control as="select" size="sm" className="shadow-none cusType-width"
                                    name="isGuest"
                                    onChange={this.handleChange}
                                >
                                {
                                    customerTypes.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                                }
                            </Form.Control>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                {LangHelper.getResource('FromDate')}
                            </Form.Label>
                            <div className="react-datepicker-wrapper-container">
                                <DatePicker
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    useShortMonthInDropdown
                                    selected={this.state.fromDate}
                                    dateFormat="MMM dd, yyyy"
                                    maxDate={new Date(this.maxFromDate)}
                                    onChange={value => this.handleChangeFromDate(value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                {LangHelper.getResource('ToDate')}
                            </Form.Label>
                            <div className="react-datepicker-wrapper-container">
                                <DatePicker
                                    selected={this.state.toDate}
                                    dateFormat="MMM dd, yyyy"
                                    minDate={new Date(this.minToDate)}
                                    maxDate={new Date(this.maxToDate)}
                                    showMonthDropdown
                                    dropdownMode="select"
                                    useShortMonthInDropdown
                                    showYearDropdown
                                    onChange={value => this.handleChangeToDate(value)}
                                />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className='large-width'>
                            <Form.Label>
                                {LangHelper.getResource('MainCategory')}
                            </Form.Label>
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="mainCategoryId"
                                onChange={this.handleChange}
                            >
                                {
                                    mainCategoryOptions.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group style={{width: '440px'}}>
                            <Form.Label>
                            {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="subCategoryId"
                                value={this.state.subCategoryId}
                                onChange={this.handleChange}
                            >
                                {
                                    subCategoryOptions.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row bsPrefix='form-row'>
                        <div className='form-com-cus large-width'>
                            <Form.Group className='communication-width'>
                                <Form.Label>
                                    {LangHelper.getResource('Communication')}
                                </Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="communicationId"
                                    onChange={this.handleChange}
                                >
                                    {
                                        communications.map((value, key) => this.renderOptions(value.name, value.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='customer-width'>
                                <Form.Label>
                                    {LangHelper.getResource('CustomerResponse')}
                                </Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="responseId"
                                    onChange={this.handleChange}
                                >
                                    {
                                        customerResponses.map((value, key) => this.renderOptions(value.value, value.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>
                                {LangHelper.getResource('Is Reviewed')}
                            </Form.Label>
                            <Form.Control as="select" size="sm" className="shadow-none dropdown-Reviewed"
                                name="isReviewed"
                                onChange={this.handleChange}
                            >
                                {
                                    reviews.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <button type="submit" id='btn-submit-deleted-fb' className="btn btn-primary btn-sm"><UnderlineButton.submitButton /></button>
                        </Form.Group >
                    </Form.Row>
            </Form>
        );
    };

    render() {
        const { settings } = this.props;
        if (settings === null) {
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