import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Row} from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

export default class ActionNotification extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = () => {

    };

    renderSites = (item, index) => (
        <div key={index} className='child-item'>
            <span>{item.name}: </span>
            <span>{item.data}</span>
        </div>
    );

    render() {
        const totalCredit = [
            { name: '789y', data: 'y789, y889' },
            { name: 'IBC', data: '776666B, IBCIndo' },
            { name: 'MBC', data: '2222223, 22222278, 7333333' },
        ];
        const totalLicensee = [
            { name: 'Normal sites', data: 'lic1, lic2, lic3, lic4' }
        ];
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <div className="action-notification">
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className='info-notice'>
                            <Form.Label>{LangHelper.getResource('NotificationID_MsgID')}</Form.Label>
                            <div>1000</div>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className='info-notice'>
                            <Form.Label>{LangHelper.getResource('Status')}</Form.Label>
                            <div>New</div>
                        </Form.Group>
                    </Form.Row>
                    <div className="group-item">
                        <div className="group-header">{LangHelper.getResource('EventInfo')}</div>
                        <div className="group-content">
                            <div className="content-item">
                                <Form.Group as={Row}>
                                    <Form.Label className='text-bold' htmlFor="eventDate">
                                        {LangHelper.getResource('EventDateGMT4')}
                                    </Form.Label>
                                    <div>Dec 12, 2024</div>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label className='text-bold' htmlFor="eventName">
                                        {LangHelper.getResource('EventName')}
                                    </Form.Label>
                                    <div>Team A -vs- Team B</div>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="group-item">
                        <div className="group-header">{LangHelper.getResource('Sites')}</div>
                        <div className="group-content">
                            <div className="content">
                                <div className='content-parent'>
                                    <span className='text-bold'>
                                        {LangHelper.getResource('CreditTotalTickets')}
                                    </span>
                                    <span className='link-ticket'>500</span>
                                </div>
                                <div className='content-child'>
                                    {
                                        totalCredit.map((item, key) => this.renderSites(item, key))
                                    }
                                </div>
                                <div className='content-parent'>
                                    <span className='text-bold'>
                                        {LangHelper.getResource('LicenseeTotalTickets')}
                                    </span>
                                    <span className='link-ticket'>400</span>
                                </div>
                                <div className='content-child'>
                                    {
                                        totalLicensee.map((item, key) => this.renderSites(item, key))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
};