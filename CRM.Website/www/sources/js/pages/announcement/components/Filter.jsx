import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentClientTime = window.currentClientTime;
        this.statuses = ['All', 'Planned', 'Cancelled', 'Completed', 'In-Progress'];
        const currentDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(this.currentClientTime)));
        const fromDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(this.currentClientTime)));
        fromDate.setDate(fromDate.getDate() - 7);
        this.maxFromDate = currentDate;
        this.maxToDate = currentDate;
        this.minToDate = fromDate;
        this.state = {
            announcementId: null,
            fromDate: fromDate,
            toDate: currentDate,
            title: '',
            status: this.statuses.join(',')
        };
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(this.currentClientTime)));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = (maxDate < currentTime) ? maxDate : currentTime;
        this.setState({
            fromDate: fromDate,
            toDate: maxDate < currentTime ? maxDate : currentTime
        });
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

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { announcementId, title, fromDate, toDate, status } = this.state;
        const params = {
            announcementId: announcementId,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            title: title,
            status: status,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleOpenNewAnnouncement = () =>{
        this.props.setIsRefresh(false);
        this.props.setOpenNewAnnouncementPopup({show: true});
    }

    render() {
        const {announcementId, fromDate, toDate, title, status} = this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="announcementId">{LangHelper.getResource('AnnouncementId')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={announcementId}
                            name="announcementId" id="announcementId"
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="title" className='width-sm'>{LangHelper.getResource('Title')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            value={title}
                            name="title" id="title"
                            className="shadow-none" autoComplete="off"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
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
                    <Form.Group>
                        <Form.Label className='width-sm'>{LangHelper.getResource('ToDate')}</Form.Label>
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
                    <Form.Group>
                        <Form.Label className='width-sm' htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="status" id="status"
                            className="shadow-none"
                            value={status}
                            onChange={this.handleChange}
                        >
                            {
                                this.statuses.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Button variant="primary" size="sm" className='mr-3' onClick={this.handleSubmit}>
                            {LangHelper.getResource('Submit')}
                        </Button>
                        {
                            this.props.isHost &&
                            <Button variant="primary" size="sm" onClick={this.handleOpenNewAnnouncement}>
                                {LangHelper.getResource('NewAnnouncement')}
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
    const { gridParams } = state;
    return { gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);