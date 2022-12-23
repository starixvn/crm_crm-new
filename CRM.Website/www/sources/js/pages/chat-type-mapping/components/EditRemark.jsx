import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

export class EditRemark extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editResult: null,
            isSubmitting: false
        };
    }

    renderForm = ({
        values,
        handleChange,
        handleSubmit
    }) => {
        const editResult = this.state.editResult;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    {
                        editResult &&
                        <ResponseMessage isSuccessful={editResult.isSuccessful}
                            message={editResult.message || LangHelper.getResource('UpdateRemarkSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" htmlFor="remark" >
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="textarea" className="shadow-none" size="sm"
                                name="remark"
                                id="remark"
                                rows={5}
                                value={values.remark}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" onClick={() => this.props.onClose(false)}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = async values => {
        this.setState({ isSubmitting: true });
        const params = {
            conversationGroupId: this.state.data.conversationGroupId,
            remark: values.remark
        };

        const url = Site.resolveClientUrl('ChatTypeMapping/UpdateRemark');
        await DataService.postDataAsync(url, params).then(response => {
            this.setState({ editResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose(true);
                }, 3000);
            } else {
                this.setState({ isSubmitting: true });
            }
        }).catch(Site.handleAxiosError);
    };

    render() {
        const { data } = this.state;
        const initialValues = {
            remark: data.remark
        };
        return (
            <Modal show className="edit-no-of-inquiry-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateRemark')}</Modal.Title>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}

export default EditRemark;