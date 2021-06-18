import React, { Component } from 'react';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption } from '../common.functions';


export class DataGrid extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        const initialValues = {
            subject: ''
        };
        const { isHost } = this.props;
        const arrLanguage = [{id:1, name: "English"}, {id: 2, name: "Japan"}, {id:3, name: "China"}];
        return (
            <Form className="form-filter" >
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                            {LangHelper.getResource('CustomerSite')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerCountry')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerFirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerLastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerLanguage')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <div>{LangHelper.getResource('CommunicationTool')}</div>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerMobile')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerEmail')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerSkype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC4')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Col md="3"></Col>
                    <Col md="9">
                        <Button className="mr-4" variant="primary" size="sm"
                                onClick={this.handleSubmit}
                            >
                                {LangHelper.getResource('Submit')}
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
        );
    }
}


export default DataGrid;
