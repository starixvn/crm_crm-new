import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import { isHavePermissionOnSite } from '@jsroot/common/shareScripts';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        fromDate.setDate(fromDate.getDate() - 1);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;
        this.state = {
            runningNumber: '',
            fromDate: fromDate,
            toDate: currentDate,
            username: !this.props.currentCustomer ? '' : this.props.currentCustomer.username,
            handler: '',
            mainCategoryId: 0,
            subCategoryId: 0,
            communicationId: 0,
            reviewer: '',
            statusId: 0,
            responseId: 0,
            isReviewed: '',
            isGuest: !this.props.currentCustomer ? -1 : this.isCheckGuest()
        };
    }

    isCheckGuest() {
        if (this.props.currentCustomer.isGuest) {
            return 1;
        }
        return 0;
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-manage-fb');
            btn.click();
        }
    }

    handleChangeFromDate = fromDate => {
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);
        this.minToDate = fromDate;
        this.maxToDate = (maxDate < this.currentClientTime) ? maxDate : this.currentClientTime;
        const toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
        this.setState({
            fromDate: fromDate,
            toDate: this.maxToDate < toDate ? this.maxToDate : toDate
        });
    };

    handleChangeToDate = toDate => {
        this.setState({ toDate });
    };

    handleChange = evt => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.type === 'select-one' ? parseInt(evt.target.value, 10) : evt.target.value
        });
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = e => {
        e.preventDefault();

        const { mainCategoryId, runningNumber, fromDate, toDate, username, handler, subCategoryId, communicationId,
            reviewer, statusId, responseId, isReviewed, isGuest } = this.state;
        const params = {
            feedbackId: !parseInt(runningNumber, 10) ? null : parseInt(runningNumber, 10),
            userName: username,
            isGuest: isGuest === -1 ? null : isGuest,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
            subCategoryId: subCategoryId === 0 || mainCategoryId === 0 ? '' : subCategoryId,
            communicationId: communicationId === 0 ? '' : communicationId,
            statusId: statusId === 0 ? '' : statusId,
            responseId: responseId === 0 ? '' : responseId,
            isReviewed: isReviewed,
            handledBy: handler,
            reviewer: reviewer,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getGridFeedbacks(params);
    };

    filterCategories = (mainCategories, subCategories) => {
        const mainCategoriesArr = [];
        mainCategories.map(value => {
            const subCategoriesFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
            subCategoriesFilter.unshift({ name: 'All', subCategoryId: 0 });
            mainCategoriesArr.push({
                mainCategoryID: value.mainCategoryID,
                name: value.name,
                subCate: subCategoriesFilter
            });
        });
        mainCategoriesArr.unshift({ mainCategoryID: 0, name: 'All', subCate: [{ name: 'All', subCategoryId: 0 }] });
        return mainCategoriesArr;
    };

    filterSubCategories = (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10));

    render() {
        const { settings } = this.props;
        if (settings === null || this.initialValues === null) {
            return null;
        }

        const reviews = [
            { settingValue: 'All', settingId: '' },
            { settingValue: 'Reviewed', settingId: 1 },
            { settingValue: 'Not Reviewed', settingId: 0 }
        ];

        const { mainCategoryId, runningNumber, fromDate, toDate, username, handler, subCategoryId, communicationId,
            reviewer, statusId, responseId, isReviewed, isGuest } = this.state;
        const { customerTypes, responses, mainCategories, subCategories, communications, statuses } = this.props.settings;
        const responsesOptions = [{ id: 0, value: 'All' }, ...responses];
        const statusesOptions = [{ statusId: 0, name: 'All' }, ...statuses];
        const statuesFilterDelete = statusesOptions.filter(x => x.name !== 'Deleted');
        const communicationOptions = [{ id: 0, name: 'All' }, ...communications];
        const mainCategoryOptions = this.filterCategories(mainCategories, subCategories);
        const subCategoryOptions = this.filterSubCategories(mainCategoryOptions, mainCategoryId);

        return (
            <Form className='form-filter' onSubmit={this.handleSubmit} action="javascript:void(0)">
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="runningNumber">{LangHelper.getResource('RunningNumber')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={runningNumber}
                            name="runningNumber" id="runningNumber"
                            className="shadow-none" autoComplete="on"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='sm-width'>
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                useShortMonthInDropdown
                                showYearDropdown
                                selected={fromDate}
                                maxDate={new Date(this.maxFromDate)}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className='lg-width'>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                dropdownMode="select"
                                selected={toDate}
                                showMonthDropdown
                                useShortMonthInDropdown
                                showYearDropdown
                                minDate={new Date(this.minToDate)}
                                maxDate={new Date(this.maxToDate)}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="username">{LangHelper.getResource('Username')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            disabled={this.props.currentCustomer}
                            value={username}
                            name="username" id="username"
                            className="shadow-none username-width" autoComplete="on"
                            onChange={this.handleChange}
                        />
                        <Form.Control as="select" size="sm"
                            disabled={this.props.currentCustomer}
                            name="isGuest" id="isGuest"
                            className="shadow-none response-width"
                            value={isGuest}
                            onChange={this.handleChange}
                        >
                            {
                                customerTypes.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='sm-width'>
                        <Form.Label htmlFor="isReviewed">{LangHelper.getResource('IsReviewed')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="isReviewed" id="isReviewed"
                            className='select-options'
                            value={isReviewed}
                            onChange={this.handleChange}
                        >
                            {
                                reviews.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='lg-width'>
                        <Form.Label htmlFor="responseId">{LangHelper.getResource('CustomerResponse')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="responseId" id="responseId"
                            value={responseId}
                            onChange={this.handleChange}
                        >
                            {
                                responsesOptions.map((value, key) => this.renderOptions(value.value, value.id, key))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="mainCategoryId">{LangHelper.getResource('MainCategory')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="mainCategoryId" id="mainCategoryId"
                            value={mainCategoryId}
                            onChange={this.handleChange}
                        >
                            {
                                mainCategoryOptions.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='subCategory-width'>
                        <Form.Label htmlFor="subCategoryId">{LangHelper.getResource('SubCategory')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="subCategoryId"
                            value={subCategoryId}
                            onChange={this.handleChange}
                        >
                            {
                                subCategoryOptions[0].subCate.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="communicationId">{LangHelper.getResource('Communication')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="communicationId" id="communicationId"
                            className='select-options-sm mr-2'
                            value={communicationId}
                            onChange={this.handleChange}
                        >
                            {
                                communicationOptions.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                        <Form.Label className="label-status" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="statusId" id="statusId"
                            className='select-options-sm'
                            value={statusId}
                            onChange={this.handleChange}
                        >
                            {
                                statuesFilterDelete.map((value, key) => this.renderOptions(value.name, value.statusId, key))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='sm-width'>
                        <Form.Label htmlFor="handler">{LangHelper.getResource('Handler')}</Form.Label>
                        <Form.Control type="text" size="sm" value={handler}
                            id="handler"
                            name="handler"
                            autoComplete="on"
                            className="shadow-none select-options"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='lg-width'>
                        <Form.Label htmlFor="reviewer">{LangHelper.getResource('Reviewer')}</Form.Label>
                        <Form.Control type="text" size="sm" value={reviewer}
                            name="reviewer" autoComplete="on"
                            className="shadow-none select-options"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '65px'}}>
                        <Button id='btn-submit-manage-fb' variant="primary" size="sm" type="submit" onClick={this.handleSubmit}>
                            <UnderlineButton.submitButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, gridParams } = state;
    return { settings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);