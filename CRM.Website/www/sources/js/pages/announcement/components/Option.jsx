import React, { PureComponent, Fragment, Component } from 'react';
import DatePicker from '@jsroot/components/date-picker/index';
import { Form } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export default class Option extends PureComponent {
    renderSendTime = (values, handleChange, errors, touched) =>{
        const dateTimeNow =  new Date(DateTimeService.toClientDateTime(new Date()));
        const isSendAt = values.sendType === 'Send At';

        return(
             <div className="group-item">
                <div className="group-header required">{LangHelper.getResource('SendType')}</div>
                <div className="group-content send-type ">
                    <div className="radio-btn send-now" onChange={this.onChangeValue}>
                        <input
                            className="custom"
                            type="radio"
                            name="sendType"
                            id="sendType"
                            value={this.props.stateValue.isSendType.isSendNow}
                            checked={this.props.stateValue.isSendType.isSendNow}
                            onChange={event => handleChange('Send immediately')}
                        />
                        <Form.Label htmlFor="yes">{LangHelper.getResource('SendNow')}</Form.Label>
                    </div>
                    <div className='form-option-wrapper'>
                        <div className="radio-btn" onChange={this.onChangeValue}>
                            <input
                                className="custom"
                                type="radio"
                                name="sendType"
                                id="sendType"
                                value={this.props.stateValue.isSendType.isSendAt}
                                checked={this.props.stateValue.isSendType.isSendAt}
                                onChange={event => handleChange('Send At')}
                            />
                            <Form.Label htmlFor="yes">{LangHelper.getResource('SendAt')}</Form.Label>
                        </div>
                        <div className='react-datepicker-wrapper-container form-control-wrapper' style={{marginLeft: 15}}>
                            <DatePicker
                                readOnly={!isSendAt}
                                dropdownMode="select"
                                showMonthDropdown
                                isInvalid={touched.sendDate && errors.sendDate}
                                showYearDropdown
                                timeInputLabel="Time:"
                                showTimeInput
                                useShortMonthInDropdown
                                minDate={dateTimeNow}
                                selected={isSendAt ? values.sendDate : null}
                                onChange={value => this.props.handleDateChange(value)}
                            />
                        </div>
                        <Form.Label column sm="2" md="2">(GMT+8)</Form.Label>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {values, handleChange, errors, touched} = this.props;
        return (
            <Fragment>
                {
                    this.renderSendTime(values, handleChange, errors, touched)
                }
            </Fragment>
        );
    }
}