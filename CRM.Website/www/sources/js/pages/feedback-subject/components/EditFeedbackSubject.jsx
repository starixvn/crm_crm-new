import React, { PureComponent } from 'react';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

export class EditFeedbackSubject extends PureComponent {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            showConfirmClose: false
        };
    }

    static propTypes = {
        feedback: PropTypes.shape({
            templateId: PropTypes.number,
            subject: PropTypes.string
        }).isRequired
    }

    static defaultProps = {
        feedback: {
            templateId: 0,
            subject: '',
            isActive: true
        }
    }

    validateFormik = values => {
        const errors = {};
        if (!values.subject.trim().length) {
            errors.subject = LangHelper.getResource('FeedbackSubjectContentRequired');
        }

        return errors;
    }

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.editFeedbackSubjectResult &&
                        <ResponseMessage isSuccessful={this.props.editFeedbackSubjectResult.isSuccessful}
                            message={this.props.editFeedbackSubjectResult.message || LangHelper.getResource('EditFeedbackSubjectTemplateSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" >
                            {LangHelper.getResource('TemplateId')}
                        </Form.Label>
                        <Form.Label column sm="8" md="9">
                            {values.templateId}
                        </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label className="required" column sm="4" md="3" htmlFor="feedbackSubjectContent">
                            {LangHelper.getResource('TemplateContent')}
                        </Form.Label>
                        <Col md="9" sm="8">
                            <Form.Control size="sm" type="text" value={values.subject} id="subject" name="subject"
                                onChange={handleChange}
                                isInvalid={touched.subject && errors.subject}
                                className="shadow-none" autoComplete="off"
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" size="sm" onClick={this.handleConfirmCancelPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = {
            templateId: values.templateId,
            subject: values.subject
        };
        this.props.editFeedbackSubject(data).then(() => {
            if (this.props.editFeedbackSubjectResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    }

    handleConfirmCancelPopup = event => {
        const { values } = this.formik;
        const { feedback } = this.props;
        if (event) {
            event.preventDefault();
        }

        const initialValues = {
            subject: feedback.subject,
            templateId: feedback.templateId
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

    render() {
        const feedback = this.props.feedback;
        const initialValues = {
            subject: feedback.subject,
            templateId: feedback.templateId
        };
        return (
            <Modal show className="feedback-subject-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.handleConfirmCancelPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('EditFeedbackSubjectTemplate')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    validate={this.validateFormik}
                    onSubmit={this.handleSubmit}
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
                            <Button size="sm" variant="primary" onClick={this.props.onClose}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button size="sm" variant="primary" onClick={this.handleCloseConfirm}>
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
    const { selectFeedbackSubject, editFeedbackSubjectResult } = state;
    return {
        feedback: selectFeedbackSubject,
        editFeedbackSubjectResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFeedbackSubject);
