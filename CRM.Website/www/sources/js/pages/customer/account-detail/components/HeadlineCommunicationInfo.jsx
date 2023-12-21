import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Form } from 'react-bootstrap';

export class HeadlineCommunicationInfo extends Component {
    render() {
        const data = [{ id: 1 }, { id: 2 }];
        return (
            <>
            {data.map(item => this.renderInfo(item))}
            </>
        );
    }

    renderInfo = (item) => {
        return (
        <div className='group-item'>
            <Form.Group>
                <Form.Label className="required">
                    {LangHelper.getResource('Name')}
                </Form.Label>
                <Form.Control type="text" name="name" value={null} autoComplete="off"/>
            </Form.Group>
            <Form.Group>
                <Form.Label className="required" >
                    {LangHelper.getResource('Role')}
                </Form.Label>
                <Form.Control type="text" name="role" value={null} autoComplete="off"/>
            </Form.Group>
            <Form.Group>
                <Form.Label >
                    {LangHelper.getResource('Language')}
                </Form.Label>
                <Form.Control type="text" name="language" value={null} autoComplete="off"/>
            </Form.Group><Form.Group>
                <Form.Label>
                    {LangHelper.getResource('Country')}
                </Form.Label>
                <Form.Control type="text" name="country" value={null} autoComplete="off"/>
            </Form.Group>
            <Form.Group>
                <Form.Label >
                    {LangHelper.getResource('Email')}
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                </Form.Label>
                <div className='field-icon'>
                    <Form.Control type="text" name="Email" value={null} autoComplete="off"/>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            </Form.Group>
            <Form.Group>
                <Form.Label >
                    {LangHelper.getResource('Letstalk')}
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                </Form.Label>
                <div className='field-icon'>
                    <Form.Control type="text" name="Letstalk" value={null} autoComplete="off"/>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            </Form.Group><Form.Group>
                <Form.Label>
                    {LangHelper.getResource('Phone')}
                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                </Form.Label>
                <div className='field-icon'>
                    <Form.Control type="text" name="countPhoney" value={null} autoComplete="off"/>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span className="fa plus-icon" >+</span>
                </div>
            </Form.Group>
        </div>
        );
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, editCustomerInfoDetailResult } = state;
    return { allSettings, customerInfo, editCustomerInfoDetailResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineCommunicationInfo);