import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { validateNoOfInquiries, validateInquiriesInput } from '../common.functions';

export class EditNoInquiries extends Component {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
    }

    static propTypes = {
        feedback: PropTypes.shape({
            feedbackId: PropTypes.number,
            noInquiries: PropTypes.number
        }).isRequired
    };

    static defaultProps = {
        feedback: {
            feedbackId: 0,
            noInquiries: 0
        }
    };

    renderForm = ({
        values,
        handleChange,
        handleSubmit,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    {
                        this.props.editNoInquiriesResult &&
                        <ResponseMessage isSuccessful={this.props.editNoInquiriesResult.isSuccessful}
                            message={this.props.editNoInquiriesResult.message || LangHelper.getResource('UpdateFeedbackSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="6">
                            {LangHelper.getResource('NoOfInquiries')}
                        </Form.Label>
                        <Col md="6" sm="8">
                            <Form.Control size="md" type="number" min="1" max="32000" value={values.noInquiries}
                                id="noInquiries" name="noInquiries"
                                onChange={handleChange}
                                className="shadow-none" autoComplete="off"
                                onKeyDown={validateInquiriesInput}
                                onInput={validateNoOfInquiries}

                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = {
            feedbackId: this.props.selectedFeedback.feedbackID,
            noInquiries: values.noInquiries
        };
        this.props.editNoInquiries(data).then(() => {
            if (this.props.editNoInquiriesResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const feedback = this.props.selectedFeedback;
        const initialValues = {
            feedbackId: feedback.feedbackId,
            noInquiries: feedback.noInquiries === 0 ? '' : feedback.noInquiries
        };
        return (
            <Modal show className="quick-feedback-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('QuickUpdate')}</Modal.Title>
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

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { selectedFeedback, editNoInquiriesResult } = state;
    return { selectedFeedback, editNoInquiriesResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoInquiries);
