import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import { validateNoOfInquiry } from '../common.functions';

export class AppContainer extends Component {
    static propTypes = {
        feedbackId: PropTypes.number.isRequired,
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
            feedbackId: props.feedbackId,
            noInquiries: '',
            editResult: null,
            isSubmitting: false
        };
    }

    async componentDidMount() {
        const url = Site.resolveClientUrl(`Feedback/GetNoOfInquiryByFeedbackId/${this.state.feedbackId}`);
        await DataService.getDataAsync(url).then(response => {
            this.setState({ noInquiries: response.data.noInquiries });
        });
    }

    handleSubmit = async values => {
        this.setState({ isSubmitting: true });
        const params = {
            feedbackId: values.feedbackId,
            noInquiries: values.noInquiries
        };

        const url = Site.resolveClientUrl('Feedback/EditNoOfInquiry');
        await DataService.postDataAsync(url, params).then(response => {
            this.setState({ editResult: response.data });

            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose();
                }, 3000);
            } else {
                this.setState({ isSubmitting: true });
            }
        });
    };

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
                        <Col md="6" sm="8">
                            <Form.Control type="number" size="sm" className="shadow-none" name="noInquiries"
                                min={1} max={3200} value={values.noInquiries}
                                onInput={validateNoOfInquiry} onChange={handleChange}
                            />
                        </Col>
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
        const { feedbackId, noInquiries } = this.state;
        const initialValues = {
            feedbackId: feedbackId,
            noInquiries: isNaN(parseInt(noInquiries, 10)) || parseInt(noInquiries, 10) === 0 ? '' : noInquiries
        };
        return (
            <Modal show className="edit-no-of-inquiry-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('QuickUpdate')}</Modal.Title>
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

export default AppContainer;
