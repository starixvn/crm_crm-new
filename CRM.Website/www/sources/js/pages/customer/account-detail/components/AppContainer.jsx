import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import HeadlineStaffsAndAuthority from './HeadlineStaffsAndAuthority';
import HeadlineCommunicationInfo from './HeadlineCommunicationInfo';
import CompanyService from './CompanyService';
import { Button, Col, Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import Site from '@jsroot/common/site';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeTab: 'headlineCommunicationInfo'
        };
      }
    
      handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName });
      };

    render() {
        const { activeTab } = this.state;

        return (
            <>
                {
                    this.renderAccountInfo()
                }
                {
                    this.renderAccountPIC()
                }
                <div className='headline-info'>
                    <div className="tab-title">
                        <div className={`tab-child ${activeTab === 'headlineCommunicationInfo' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('headlineCommunicationInfo')}>
                            Headline Communication info
                        </div>
                        <div className={`tab-child ${activeTab === 'headlineStaffsAndAuthority' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('headlineStaffsAndAuthority')}>
                            Headline Staffs And Authority
                        </div>
                        <div className={`tab-child ${activeTab === 'companyService' ? 'active' : ''}`}
                        onClick={() => this.handleTabClick('companyService')}>
                            Company Service
                        </div>
                    </div>
                    <div className='tab-content'>
                        { 
                            activeTab === 'headlineCommunicationInfo' &&
                            <HeadlineCommunicationInfo/>
                        }
                        {
                            activeTab === 'headlineStaffsAndAuthority' &&
                            <HeadlineStaffsAndAuthority />
                        }
                        {
                            activeTab === 'companyService' &&
                            <CompanyService />
                        }
                        <Button type="submit" variant="primary" size="sm">
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    renderAccountInfo = () => {

        return(
            <Form className='group-account'>
                <div className='group-title'>
                    Account Info
                    <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                </div>
                <div className='group-content'>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Form.Control type="text" name="title" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('FirstName')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('LastName')}
                        </Form.Label>
                        <Form.Control type="text"  name="lastName" value={null} autoComplete="off"/>
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
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('RefCode')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Site')}
                        </Form.Label>
                        <Form.Control type="text"  name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  >
                            {LangHelper.getResource('SecretCode')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="name" >
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" value={null} autoComplete="off"/>
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
                    <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
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