import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Button, Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import {Statuses} from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        const now = new Date(DateTimeService.toShortDateFormat(DateTimeService.toClientDateTime(new Date())));

        this.state = {
            filter: {
                fromDate: now,
                toDate: now
            },
            statusOption: Statuses
        }
    }

    handleDateChange = (dates) => {
    };

    handleChangeFilterControl = e => {
    };

    render() {
        return (
            <Form className='form-filter' onSubmit={e => this.handleSubmit(e)}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: '350px'}}>
                        <Form.Label style={{width: '180px'}} htmlFor="created-date">{LangHelper.getResource('CreatedDateGM8')}</Form.Label>
                        <div className='react-datepicker-wrapper-container form-control-wrapper'>
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                selected={this.state.filter.fromDate}
                                onChangeDate={dates => this.handleDateChange(dates)}
                                startDate={this.state.filter.fromDate}
                                endDate={this.state.filter.toDate}
                                maxDate={this.state.maxDate}
                                maxDateRange={31}
                                selectsRange
                                isRangeDate
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="MatchID">{LangHelper.getResource('Match ID')}</Form.Label>
                        <Form.Control type="text" size="sm"
                            //value={title}
                            name="matchId" id="matchId"
                            className="shadow-none" autoComplete="off"
                            //onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('NotificationID')}</Form.Label>
                        <div className='form-control-wrapper d-flex align-items-center notification-id-container'>
                            <Form.Control
                                className={`shadow-none valid-input notification-id-input`}
                                as='input' type='text' pattern='[0-9]*' size='sm'
                                name='notificationIdLower'
                                placeholder='From'
                                //value={this.state.filter.notificationIdLower}
                                onChange={e => this.handleChangeFilterControl(e)}
                            />
                            <div className='notification-concate text-center'>-</div>
                            <Form.Control
                                className={`shadow-none valid-input notification-id-input`}
                                as='input' type='text' pattern='[0-9]*' size='sm'
                                name='notificationIdUpper'
                                placeholder='To'
                                //value={this.state.filter.notificationIdUpper}
                                onChange={e => this.handleChangeFilterControl(e)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('MessageID')}</Form.Label>
                        <Form.Control as='input' type='text' size='sm' className='shadow-none' name='messageId'
                            //value={this.state.filter.content}
                            autoComplete='off'
                            onChange={e => this.handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Content')}</Form.Label>
                        <Form.Control as='input' type='text' size='sm' className='shadow-none' name='content'
                            //value={this.state.filter.content}
                            autoComplete='off'
                            onChange={e => this.handleChange(e)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: '350px'}}>
                        <Form.Label style={{width: '180px'}} htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                        <div className='form-control-wrapper status-match-date'>
                            <MultipleSelect
                                dataSource={this.state.statusOption}
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
                    <Form.Group>
                        <Form.Label  htmlFor="status">{LangHelper.getResource('Sender')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.statusOption}
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
                    <Form.Group>
                        <div className='btn-submit'>
                            <Button variant='primary' id='btn-submit-notification' size='sm' type='submit'>
                                {LangHelper.getResource('Submit')}
                            </Button>
                        </div>
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }
};