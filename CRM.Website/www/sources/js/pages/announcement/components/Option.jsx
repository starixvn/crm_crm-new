import React, { PureComponent, Fragment } from 'react';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import { Col, Form, Row } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export default class Option extends PureComponent {
    renderOption = (values, handleChange) =>{
        const {headlineGroups, siteOptions, currencyOptions} = this.props.stateValue;
        const {handleOptionChange} = this.props;
        const headlineTypeList = [{id: 2, name: 'All'}, ...this.props.settings.headlineTypeList];
        return(
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2">{LangHelper.getResource('Site')}</Form.Label>
                <Col sm="10" md="10">
                    <div className='form-option-wrapper'>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                isDisable={headlineGroups.length > 0}
                                dataSource={siteOptions}
                                keyField='id'
                                hasSearchBox
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                isPlacementTop
                                onChange={
                                    (currentItem, selectedItemsKey) => handleOptionChange('site', selectedItemsKey)
                                }
                            />
                        </div>
                        <Form.Label column sm="2" md="2">{LangHelper.getResource('Currency')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={currencyOptions}
                                isDisable={headlineGroups.length > 0}
                                keyField='id'
                                valueField='name'
                                hasSearchBox
                                statusField='checked'
                                isPlacementTop
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => handleOptionChange('currency', selectedItemsKey)
                                }
                            />
                        </div>
                        <Form.Label column sm="2" md="2">{LangHelper.getResource('HeadlineType')}</Form.Label>
                        <Form.Control as='select' size='sm' className='form-control-wrapper'
                            name='headlineType' value={values.headlineType} disabled={headlineGroups.length > 0}
                            onChange={handleChange}
                        >
                            {
                                headlineTypeList.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                            }
                        </Form.Control>
                    </div>
                </Col>
            </Form.Group>
        );
    }

    renderSendTime = (values, handleChange, errors, touched) =>{
        const sendOption = ['Send At', 'Send immediately'];
        const dateTimeNow =  new Date(DateTimeService.toClientDateTime(new Date()));
        const isSendAt = values.sendType === 'Send At';
        return(
             <div className="group-item">
                <div className="group-header">{LangHelper.getResource('SendTime')}</div>
                <Form.Group as={Row}>
                    <div className='form-option-wrapper'>
                        <Form.Control as='select' size='sm' className='form-control-wrapper'
                            name="sendType" id="sendType"
                            value={values.sendType}
                            isInvalid={touched.sendType && errors.sendType}
                            onChange={handleChange}
                        >
                            <option value=''>{LangHelper.getResource('PleaseSelect')}</option>
                            {
                                sendOption.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control>
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
                </Form.Group>
            </div>
        );
    }

    render() {
        const {values, handleChange, errors, touched} = this.props;
        return (
            <Fragment>
                {
                    this.renderOption(values, handleChange)
                }
                {
                    this.renderSendTime(values, handleChange, errors, touched)
                }
            </Fragment>
        );
    }
}