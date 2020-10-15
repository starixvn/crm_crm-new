import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

export class NewFeedbackSubject extends Component {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            showConfirmClose: false
        };
    }

    validateFormik = values => {
        const errors = {};
        if (!values.subject.trim().length) {
            errors.subject = LangHelper.getResource('FeedbackSubjectContentRequired');
        }

        return errors;
    }

    renderForm = ({
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting,
        errors
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                       this.props.createFeedbackSubjectResult &&
                       <ResponseMessage isSuccessful={this.props.createFeedbackSubjectResult.isSuccessful}
                           message={this.props.createFeedbackSubjectResult.message || LangHelper.getResource('InsertFeedbackSubjectTemplateSuccessfully')}
                       />
                    }
                    <Form.Group as={Row}>
                    <Form.Label column sm="4" md="3" className="required" htmlFor="subject">
                            {LangHelper.getResource('InsertFeedbackSubjectTemplate')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.subject}
                                name="subject" id="subject"
                                isInvalid={touched.subject && errors.subject}
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button type="button" variant="primary" size="sm" onClick={this.handleConfirmCancelPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    }

    handleConfirmCancelPopup = event => {
        const { values } = this.formik;
        if (event) {
            event.preventDefault();
        }
        const initialValues = {
            subject: ''
        };
        if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
            this.props.onClose();
        } else {
            this.setState({ showConfirmClose: true });
        }
    }

    handleCloseConfirm = () => {
        this.setState({ showConfirmClose: false });
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = {
            subject: values.subject
        };
        this.props.createFeedbackSubject(data).then(() => {
            if (this.props.createFeedbackSubjectResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    }


    render() {
        const initialValues = {
            subject: ''
        };
        return (
            <Modal show className="feedback-subject-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.handleConfirmCancelPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('FeedbackSubjectInsert')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                    validate={this.validateFormik}
                >
                    {this.renderForm}
                </Formik>
                {
                    this.state.showConfirmClose &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.props.onClose}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirm}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirm}
                    />
                }
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { createFeedbackSubjectResult } = state;
    return {
        createFeedbackSubjectResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFeedbackSubject);