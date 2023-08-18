import React, { PureComponent, Fragment } from 'react';
import DatePicker from '@jsroot/components/date-picker/index';
import { Form, Row } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export default class Option extends PureComponent {
    renderSendTime = (values, handleChange, errors, touched) =>{
        const sendOption = ['Send At', 'Send immediately'];
        const dateTimeNow =  new Date(DateTimeService.toClientDateTime(new Date()));
        const isSendAt = values.sendType === 'Send At';
        return(
             <div className="group-item">
                <div className="group-header">{LangHelper.getResource('SendType')}</div>
                <div className="group-content">
                    <div className="radio-btn" onChange={this.onChangeValue}>
                        <input class="custom" type="radio"/>{LangHelper.getResource('SendNow')}
                    </div>
                    <div className='form-option-wrapper'>
                        <div className="radio-btn" onChange={this.onChangeValue}>
                            <input class="custom" type="radio"/>{LangHelper.getResource('SendAt')}
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
                                isDisabledTime
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