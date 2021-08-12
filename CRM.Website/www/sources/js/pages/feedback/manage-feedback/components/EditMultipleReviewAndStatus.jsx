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

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

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
                    <div className="panel-group">
                        <div className='alert-box-warn'>
                        <Form.Label className='text' column sm="12" md="12">
                            {LangHelper.getResource('MultipleReviewAndUpdateStatusText')}
                        </Form.Label>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                            <Col sm="3" md="3">
                                <Form.Control as="select" size="sm"
                                    column sm="3" md="3"
                                    name="statusId" id="statusId"
                                    value={statusId}
                                    onChange={this.handleChange}
                                >
                                {
                                    this.props.statuses.map((value,key) => this.renderOptions(value.name, value.statusId, key))
                                }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className="mr-1" column sm="1" md="1" htmlFor="status">{LangHelper.getResource('Reviewed')}</Form.Label>
                            <input type='checkbox' className='cursor-pointer'
                                onChange={this.handleChangeCheckBoxAll}
                            />
                        </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const initialValues = {
            statusId: ''
        };
        return (
            <Modal show className="edit-multiple-review-status-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('MultipleReviewAndUpdateStatus')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}
