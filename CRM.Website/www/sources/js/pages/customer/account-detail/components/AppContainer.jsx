import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import HeadlineStaffsAndAuthority from './HeadlineStaffsAndAuthority';
import HeadlineCommunicationInfo from './HeadlineCommunicationInfo';
import CompanyService from './CompanyService';
import { Button, Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';

export class AppContainer extends Component {
    render() {
        return (
            <>
                {
                    this.renderAccountInfo()
                }
                {
                    this.renderAccountPIC()
                }
                <div className='headline-info'>
                    <div className='tab-title'>
                        <HeadlineCommunicationInfo />
                        <HeadlineStaffsAndAuthority />
                        <CompanyService />
                    </div>
                    <div className='tab-content'></div>
                </div>
            </>
        );
    }

    renderAccountInfo = () => {

        return(
            <Form className='group-account'>
                <div className='group-title'>
                    Account Info
                </div>
                <div className='group-content'>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('FirstName')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('LastName')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Birthday')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                                    <DatePicker
                                        maxDate={new Date()}
                                        selected={new Date()}
                                    />
                                </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('PassportNo')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('RefCode')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Site')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('SecretCode')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                </div>
                
            </Form>
        );
    }

    renderAccountPIC = () => {

        return(
            <Form className='group-account'>
                <div className='group-title'>
                    Accountant PIC
                </div>
                <div className='group-content'>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('Checker')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Introduced by')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Check type="checkbox"
                        label={LangHelper.getResource('VIP')}
                        defaultChecked
                        name='isVip' id="isVip"
                    />
                    <Form.Check type="checkbox"
                        label={LangHelper.getResource('Ignore')}
                        defaultChecked
                        name='isIgnored' id="isIgnored"
                    />
                </div>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);