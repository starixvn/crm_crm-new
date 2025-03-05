import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

export class EditReasonPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            settings: props.reasonSettings,
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
                            message={editResult.message || LangHelper.getResource('UpdateReasonSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" htmlFor="remark" >
                            {LangHelper.getResource('Reason')}
                        </Form.Label>
                        <Col sm="9" md="10">

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
            notificationId: this.state.data.notificationId,
            reasonSettingId: values.settingId
        };

        const url = Site.resolveClientUrl('NotificationCenter/UpdateReason');
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
            reasonSettingId: data.settingId
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