import LangHelper from '@jsroot/common/langHelper';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
export default class Filter extends Component {
    render() {
        return (
            <Form className="form-filter">
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        {
                            this.props.isHost &&
                            <Button variant="primary" size="sm" onClick={() => this.props.handleOpenCreatePopup()}>
                                {LangHelper.getResource('AddSMAPersonalMessage')}
                            </Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}
