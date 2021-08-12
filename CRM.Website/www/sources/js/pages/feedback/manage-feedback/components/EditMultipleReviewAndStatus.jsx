import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

export default class EditMultipleReviewAndStatus extends Component {
    static propTypes = {
        feedbackIds: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        feedbackId: 0,
        onClose: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            feedbackIds: props.feedbackIds,
            editResult: null,
            isSubmitting: false
        };
    }

    // handleSubmit = async values => {
    //     this.setState({ isSubmitting: true });
    //     const params = {
    //         feedbackId: values.feedbackId,
    //         noInquiries: values.noInquiries
    //     };

    //     const url = Site.resolveClientUrl('Feedback/EditNoOfInquiry');
    //     await DataService.postDataAsync(url, params).then(response => {
    //         this.setState({ editResult: response.data });

    //         if (response.data.isSuccessful) {
    //             setTimeout(() => {
    //                 this.props.onClose();
    //             }, 3000);
    //         } else {
    //             this.setState({ isSubmitting: true });
    //         }
    //     });
    // };

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
                            message={editResult.message || LangHelper.getResource('UpdateFeedbackSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="6">
                            {LangHelper.getResource('NoOfInquiries')}
                        </Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        return (
            <Modal show className="edit-multiple-review-status-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('QuickUpdate')}</Modal.Title>
                </Modal.Header>
                <Formik
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}
