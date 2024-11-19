import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export class PicFilter extends Component {
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
            picName: '',
            displayName: '',
            editBy: '',
            fromDate: fromDate,
            toDate: currentDate
        };
    }

    handleChangeFromDate = fromDate => {
        const currentTime = new Date(DateTimeService.toShortDateTimeFormat(this.currentClientTime));
        const maxDate = new Date(fromDate.getTime());
        maxDate.setMonth(fromDate.getMonth() + 1);

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

    handleSubmit = (e) => {
        e.preventDefault();
        const { picName, displayName, fromDate, toDate, editBy } = this.state;
        const params = {
            picName: picName !== '' ? picName : null,
            editBy: editBy !== '' ? editBy : null,
            displayName: displayName !== '' ? displayName : null,
            fromDate: DateTimeService.toShortDateFormat(fromDate),
            toDate: DateTimeService.toShortDateFormat(toDate),
            pageIndex: 1,
            pageSize: this.props.gridParamsPic.pageSize
        };

        this.props.setGridParamsPic(params);
        this.props.getPicReport(params);
    };

    render() {
        const { picName, displayName, fromDate, toDate, editBy } = this.state;

        return (
            <Form className='form-filter-v2 form-filter-pic' onSubmit={this.handleSubmit} action="javascript:void(0)">
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="picName">{LangHelper.getResource('PIC')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            className="shadow-none" autoComplete="off"
                            value={picName}
                            name="picName" id="picName"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="col-auto col-form-label">{LangHelper.getResource('DisplayName')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            name="displayName" id="displayName"
                            value={displayName}
                            onChange={this.handleChange}
                            autoComplete="on"
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label htmlFor="fromDate">{LangHelper.getResource('FromDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                selected={fromDate}
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" useShortMonthInDropdown
                                maxDate={new Date(this.maxFromDate)}
                                minDate={new Date('1/1/2011')}
                                onChange={value => this.handleChangeFromDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('ToDate')}</Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" useShortMonthInDropdown
                                maxDate={new Date(this.maxToDate)}
                                minDate={new Date(this.minToDate)}
                                selected={toDate}
                                onChange={value => this.handleChangeToDate(value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="editBy">{LangHelper.getResource('EditBy')}</Form.Label>
                        <Form.Control size="sm" type="text"
                            name="editBy" id="editBy"
                            className="shadow-none" autoComplete="off"
                            value={editBy}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{width: '70px'}}>
                        <Button size="sm" variant="primary" type="submit" onClick={this.handleSubmit}>
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
    const { gridParamsPic, actionType } = state;
    return { gridParamsPic, actionType };
};

export default connect(mapStateToProps, mapDispatchToProps)(PicFilter);  