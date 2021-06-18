import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';


export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerNameSearch: '',

        };
    }
    render() {
        const { isHost } = this.props;
        return (
            <div>
                <Form className="form-filter" >
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className="col-md-9">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group className="col-md-3">
                            <Form.Control type="checkbox" size="sm" className="checkbox-cell-style margin-top-10"
                                    onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                                />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
            
        );
    }
    
}


export default Filter;