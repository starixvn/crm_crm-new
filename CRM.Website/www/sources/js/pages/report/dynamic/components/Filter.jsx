import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button, Row } from 'react-bootstrap';
import { changeSiteSetting } from '@jsroot/common/shareScripts';
import DatePicker from '@jsroot/components/date-picker/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import AutoComplete from '@jsroot/components/AutoComplete';
import Site from '@jsroot/common/site';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = window.currentClientTime;
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(currentClientTime)));
        const firstDateCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        const toDate = currentDate;
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = firstDateCurrentMonth;
        this.currentDate = currentDate;

        this.state = {
            fromDate: firstDateCurrentMonth,
            toDate: toDate,
            mainCategoryId: 0,
            subCategoryId: 0,
            reportType: 1,
            statusId: 0,
            siteId: 0,
            roleId: 0,
            communicationToolId: 0,
            handler: null,
            productId: 0,
            subProductId: 0,
            responseId: 0,
            extensionId: 0,
            reviewer: null,
            subject: null,
            showFilter: true,
            communicationId: 0
        };
    }

    componentDidMount() {
        this.props.getAllSettings();
    }

    handleUpdateFromDate = fromDate => {
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = (maxDate < this.currentDate) ? maxDate : this.currentDate;
        this.setState({
            fromDate: fromDate,
            toDate: (maxDate < this.currentDate) ? maxDate : this.currentDate
        });
    };

    handleUpdateToDate = toDate => {
        this.setState({
            toDate: toDate
        });
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }

    handleUpdateFromWeek = fromDate => {
        const firstDayOfWeek = fromDate.getDate() - fromDate.getDay();
        fromDate.setDate(firstDayOfWeek);

        let maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        const maxDateEndWeek = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
        maxDateEndWeek.setDate(maxDate.getDate() - maxDate.getDay() + 6);
        maxDate = maxDateEndWeek;

        let currentToDate = new Date();
        if(currentToDate < fromDate){
            currentToDate = fromDate;
        }else if(currentToDate > maxDate){
            currentToDate = maxDate;
        }else{
            currentToDate = new Date(this.state.toDate);
        }

        this.minToDate = fromDate;
        this.maxToDate = maxDate < this.currentDate ? maxDate : this.currentDate;
        this.setState({
            fromDate,
            toDate: currentToDate
        });
    };

    handleUpdateToWeek = toDate => {
        const firstDayOfWeek = toDate.getDate() - toDate.getDay();
        const lastDayOfWeek = firstDayOfWeek + 6;
        toDate.setDate(lastDayOfWeek);
        this.setState({ toDate });
    };

    handleUpdateFromMonth = firstDateMonth => {
        const maxDate = new Date(firstDateMonth.getTime());
        maxDate.setMonth(firstDateMonth.getMonth() + 12);
        maxDate.setDate(firstDateMonth.getDate() - 1);

        const currentToDate = this.state.toDate;

        this.minToDate = firstDateMonth;
        this.maxToDate = (maxDate < this.currentDate) ? maxDate : this.currentDate;
        this.setState({
            fromDate: firstDateMonth,
            toDate: new Date(currentToDate.setFullYear(firstDateMonth.getFullYear()))
        });
    };

    handleUpdateToMonth = lastDateMonth => {
        this.setState({ toDate: new Date(lastDateMonth.getFullYear(), lastDateMonth.getMonth() + 1, 0) });
    };

    handleUpdateFromYear = firstDateYear => {
        this.minToDate = firstDateYear;
        this.maxToDate = firstDateYear;
        this.setState({
            fromDate: firstDateYear,
            toDate: new Date(firstDateYear.getFullYear(), 11, 31)
        });
    };

    handleHighlightDates = datetime => {
        const highlightDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(datetime);
            date.setDate(date.getDate() + i);
            highlightDates[i] = date;
        }
        return highlightDates;
    };

    handleHighlightToDates = datetime => {
        const highlightDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(datetime);
            date.setDate(date.getDate() - i);
            highlightDates[i] = date;
        }
        return highlightDates;
    };

    getWeekYear = dateTime => {
        const date = new Date(dateTime);
        let oneJan = new Date(date.getFullYear(),0,1);
        let numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) - 7;
        let result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
        if(result === 0){
            oneJan = new Date(date.getFullYear()-1,0,1);
            numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) - 7;
            result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
        }
        return result;
      }

    renderFilterDate = () => {
        let resFromDate = {}, resToDate = {};
        let fromDateFormat = '';
        let toDateFormat = '';
        switch (this.state.reportType) {
            case 1:
                fromDateFormat = 'MMM dd, yyyy';
                toDateFormat = 'MMM dd, yyyy';
                resFromDate = {
                    onChange: this.handleUpdateFromDate
                };
                resToDate = {
                    onChange: this.handleUpdateToDate
                };
                break;
            case 2:
                const propsDate = { showWeekNumbers: true };
                fromDateFormat = this.getWeekYear(this.state.fromDate) + ' (MMM dd, yyyy)';
                toDateFormat = this.getWeekYear(this.state.toDate) + ' (MMM dd, yyyy)';
                resFromDate = {
                    ...propsDate,
                    onChange: this.handleUpdateFromWeek,
                    highlightDates: this.handleHighlightDates(this.state.fromDate)
                };
                resToDate = {
                    ...propsDate,
                    onChange: this.handleUpdateToWeek,
                    highlightDates: this.handleHighlightToDates(this.state.toDate)
                };
                break;
            case 3:
                const propsMonth = {
                    showMonthYearPicker: true,
                    showFullMonthYearPicker: true,
                    showTwoColumnMonthYearPicker: true
                };
                fromDateFormat = 'MMM yyyy';
                toDateFormat = 'MMM yyyy';
                resFromDate = {
                    ...propsMonth,
                    onChange: this.handleUpdateFromMonth
                };
                resToDate = {
                    ...propsMonth,
                    onChange: this.handleUpdateToMonth
                };
                break;
            case 4:
                const propsYear = { showYearPicker: true };
                fromDateFormat = 'yyyy';
                toDateFormat = 'yyyy';
                resFromDate = {
                    ...propsYear,
                    onChange: this.handleUpdateFromYear
                };
                resToDate = {
                    ...propsYear
                };
                break;
            default:
                break;
        }

        return (
            <React.Fragment>
                <Form.Group>
                    <Form.Label htmlFor="fromDate" className="col-auto col-form-label">{LangHelper.getResource('FromDate')}</Form.Label>
                    <div className="react-datepicker-wrapper-container form-control-wrapper">
                        <DatePicker
                            dropdownMode="select"
                            showMonthDropdown
                            showYearDropdown useShortMonthInDropdown
                            selected={this.state.fromDate}
                            dateFormat={fromDateFormat}
                            maxDate={new Date(this.maxFromDate)}
                            {...resFromDate}
                        />
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="toDate" className="col-auto col-form-label">{LangHelper.getResource('ToDate')}</Form.Label>
                    <div className="react-datepicker-wrapper-container form-control-wrapper">
                        <DatePicker
                            selected={this.state.toDate}
                            dateFormat={toDateFormat} useShortMonthInDropdown
                            minDate={new Date(this.minToDate)}
                            maxDate={new Date(this.maxToDate)}
                            showMonthDropdown
                            dropdownMode="select"
                            showYearDropdown
                            {...resToDate}
                        />
                    </div>
                </Form.Group>
            </React.Fragment>
        );
    };

    renderItems = (name, value, key) => <option key={key} value={value}>{name}</option>;

    handleChangeReportType = event => {
        const value = parseInt(event.target.value, 10);
        this.setState({ reportType: value });
        const currentClientTime = window.currentClientTime;
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(currentClientTime)));

        switch (value) {
            case 1:
                this.setState({
                    fromDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                    toDate: currentDate
                });
                break;
            case 2:
                const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
                const lastDayOfWeek = firstDayOfWeek + 6;
                this.setState({
                    fromDate: currentDate.setDate(firstDayOfWeek),
                    toDate: currentDate.setDate(lastDayOfWeek)
                });
                break;
            case 3:
                this.setState({
                    fromDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                    toDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
                });
                break;
            case 4:
                this.setState({
                    fromDate: new Date(currentDate.getFullYear(), 0, 1),
                    toDate: currentDate
                });
                break;
            default:
                break;
        }
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleChangeSite = site => {
        this.setState({ siteId: site.id });
    };

    handleChangeSubject = value =>{
        this.setState({ subject: value });
    };

    filterSubCategoryOptions = (subCategories, mainCategoryId) => {
        if (mainCategoryId === 0) {
            return [];
        }
        const subCategoryOptions = subCategories.filter(item => item.mainCategoryID === mainCategoryId);
        return subCategoryOptions;
    };

    filterSubProductOptions = (subProducts, productId) => {
        if (productId === 0) {
            return [];
        }
        const subProductOptions = subProducts.filter(item => item.parentId === productId);
        return subProductOptions;
    };

    handleToggleFilter = () => {
        this.setState(previousState => ({
            showFilter: !previousState.showFilter
        }));
    };

    handleGetFeedbackSubjectTemplates = Site.debounce(searchText => {
        if (searchText.length >= 2) {
            this.props.getFeedbackSubjectTemplates(searchText);
        } else {
            this.props.setFeedbackSubjectTemplates([]);
        }
    });

    handleSubmit = event => {
        event.preventDefault();

        const {
            reportType, fromDate, toDate, productId, subProductId, statusId,
            roleId, mainCategoryId, handler, siteId, responseId, communicationId,
            subCategoryId, reviewer, subject, extensionId
        } = this.state;

        const params = {
            reportType: reportType,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            productId: productId,
            subProductId: productId === 0 ? 0 : subProductId,
            statusId: statusId,
            roleId: roleId,
            mainCategoryId: mainCategoryId,
            handler: handler,
            siteId: siteId,
            responseId: responseId,
            communicationToolId: communicationId,
            extensionId: extensionId,
            subCategoryId: mainCategoryId === 0 ? 0 : subCategoryId,
            reviewer: reviewer,
            subject: subject,
            pageIndex: 0,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.getDynamicReports(params);
        this.props.setGridParams({ ...params, pageIndex: params.pageIndex + 1 });
    };

    render() {
        const { allSettings } = this.props;
        const { showFilter } = this.state;
        if (allSettings === null) {
            return null;
        }
        const subCategoryOptions = this.filterSubCategoryOptions(allSettings.subCategories, this.state.mainCategoryId);
        const subProductOptions = this.filterSubProductOptions(allSettings.subProducts, this.state.productId);
        const siteOptions = JSON.parse(JSON.stringify(allSettings.sites));
        changeSiteSetting(siteOptions, 'childSites', 'childSites');

        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                {
                    showFilter &&
                    <React.Fragment>
                        <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                        <Form.Row className='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="groupBy" className="col-auto col-form-label">{LangHelper.getResource('GroupBy')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="reportType"
                                    onChange={this.handleChangeReportType}
                                >
                                    {
                                        allSettings.periodTypes.map((item, key) => this.renderItems(item.name, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>

                            {this.renderFilterDate()}

                            <Form.Group className="group-tool">
                                <Form.Label htmlFor="status" className="col-auto col-form-label col-label-tool">{LangHelper.getResource('Status')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="statusId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.statuses.map((item, key) => this.renderItems(item.name, item.statusId, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group>
                                <Form.Label htmlFor="response" className="col-auto col-form-label">{LangHelper.getResource('Response')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="responseId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.responses.map((item, key) => this.renderItems(item.value, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="product" className="col-auto col-form-label">{LangHelper.getResource('Product')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="productId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.products.map((item, key) => this.renderItems(item.value, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="sub-product" className="col-auto col-form-label">{LangHelper.getResource('SubProduct')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="subProductId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        subProductOptions.map((item, key) => this.renderItems(item.value, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="group-tool">
                                <Form.Label htmlFor="site" className="col-auto col-form-label col-label-tool">{LangHelper.getResource('Site')}</Form.Label>
                                <div className="form-control-wrapper">
                                    <SelectWithSearch className='basic-single'
                                        maxWidth="140%"
                                        OnChangeValue={this.handleChangeSite}
                                        options={siteOptions}
                                    />
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group>
                                <Form.Label htmlFor="handler" className="col-auto col-form-label">{LangHelper.getResource('Handler')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none"
                                    autoComplete="off"
                                    name="handler"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="reviewer" className="col-auto col-form-label">{LangHelper.getResource('Reviewer')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none"
                                    autoComplete="off"
                                    name="reviewer"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="role" className="col-auto col-form-label">{LangHelper.getResource('Role')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="roleId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.roles.map((item, key) => this.renderItems(item.value, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="group-tool">
                                <Form.Label htmlFor="communicationTool" className="col-auto col-form-label col-label-tool">
                                    {LangHelper.getResource('CommunicationTool')}
                                </Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="communicationId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.communicationTools.map((item, key) => this.renderItems(item.name, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group>
                                <Form.Label htmlFor="extension" className="col-auto col-form-label">{LangHelper.getResource('Extension')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="extensionId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.extensions.map((item, key) => this.renderItems(item.value, item.id, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="main-category" className="col-auto col-form-label">{LangHelper.getResource('MainCategory')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="mainCategoryId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        allSettings.mainCategories.map((item, key) => this.renderItems(item.name, item.mainCategoryID, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="sub-category" className="col-auto col-form-label">{LangHelper.getResource('SubCategory')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="subCategoryId"
                                    onChange={this.handleChange}
                                >
                                    <option value={0}>All</option>
                                    {
                                        subCategoryOptions.map((item, key) => this.renderItems(item.name, item.subCategoryId, key))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="form-group-subject">
                                <Form.Label htmlFor="subject" className="col-auto col-form-label">{LangHelper.getResource('Subject')}</Form.Label>
                                <div style={{width: '100%'}}>
                                    <AutoComplete
                                        value={this.state.subject}
                                        options={this.props.feedbackSubjectTemplates} displayField="subject"
                                        onChange={value => this.handleChangeSubject(value.subject || value)}
                                        onInputChange={this.handleGetFeedbackSubjectTemplates}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" className="btn btn-primary btn-sm"><UnderlineButton.submitButton /></Button>
                            </Form.Group>
                        </Form.Row>
                    </React.Fragment>
                }

                <div className="toggle-filter">
                    <span className={`${showFilter ? 'fa fa-caret-up' : 'fa fa-caret-down'} icon`} onClick={this.handleToggleFilter} />
                </div>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, gridParams, feedbackSubjectTemplates } = state;
    return { allSettings, gridParams, feedbackSubjectTemplates };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);