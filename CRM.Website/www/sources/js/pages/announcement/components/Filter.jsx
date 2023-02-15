import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import {Statuses} from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date();
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        this.maxFromDate = this.currentDate;
        this.maxToDate = this.currentDate;
        this.minToDate = fromDate;
        this.state = {
            announcementId: null,
            fromDate: fromDate,
            toDate: this.currentDate,
            title: '',
            status: Statuses.map(x=> x.name).join(',')
        };
    }

    handleChangeFromDate = fromDate => {
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 12);
        maxDate.setDate(fromDate.getDate() - 1);

        this.minToDate = fromDate;
        this.maxToDate = (maxDate < this.currentDate) ? maxDate : this.currentDate;
        this.setState({
            fromDate: fromDate,
            toDate: maxDate < this.currentDate ? maxDate : this.currentDate
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

    handleChangeStatus = (currentItem, selectedItemsKey) =>{
        this.setState({ status: selectedItemsKey });
    }

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    handleSubmit = () => {
        const { announcementId, title, fromDate, toDate, status } = this.state;
        const params = {
            announcementId: announcementId,
            fromDate: DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(fromDate)),
            toDate: DateTimeService.toShortDateTimeFormat(DateTimeService.toClientDateTime(toDate)),
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
        const {announcementId, fromDate, toDate, title} = this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='announcement-num'>
                        <Form.Label htmlFor="announcementId">{LangHelper.getResource('AnnouncementId')}</Form.Label>
                        <Form.Control as='input' type="number" size='sm'
                            value={announcementId}
                            name="announcementId" id="announcementId"
                            className="shadow-none"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="title">{LangHelper.getResource('Title')}</Form.Label>
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
                    <Form.Group>
                        <Form.Label  htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={Statuses}
                                keyField='id'
                                valueField='name'
                                maxDisplayItemCount={2}
                                isAllTextShown
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChangeStatus(currentItem, selectedItemsKey);
                                }}
                            />
                        </div>
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