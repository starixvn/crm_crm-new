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

export class QuickUpdateFeedback extends PureComponent {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            showConfirmClose: false
        };
    }

    static propTypes = {
        feedback: PropTypes.shape({
            feedbackId: PropTypes.number,
            NoInquiries: PropTypes.number
        }).isRequired
    };

    static defaultProps = {
        feedback: {
            feedbackId: 0,
            NoInquiries: ''
        }
    };

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
                        this.props.editQuickUpdateFeedbackResult &&
                        <ResponseMessage isSuccessful={this.props.editQuickUpdateFeedbackResult.isSuccessful}
                            message={this.props.editQuickUpdateFeedbackResult.message || LangHelper.getResource('EditQuickUpdateFeedbackSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label className="required" column sm="4" md="3" htmlFor="feedbackSubjectContent">
                            {LangHelper.getResource('NoOfInquiries')}
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
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = {
            feedbackId: values.feedbackId,
            NoInquiries: values.NoInquiries
        };
        this.props.editQuickUpdateFeedback(data).then(() => {
            if (this.props.editQuickUpdateFeedbackResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    handleConfirmCancelPopup = event => {
        const { values } = this.formik;
        const { feedback } = this.props;
        if (event) {
            event.preventDefault();
        }

        const initialValues = {
            feedbackId: feedback.feedbackId,
            noInquiries: values.NoInquiries
        };
        if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
            this.props.onClose();
        } else {
            this.setState({ showConfirmClose: true });
        }
    };


    handleCloseConfirm = () => {
        this.setState({ showConfirmClose: false });
    };

    render() {
        const feedback = this.props.feedback;
        const initialValues = {
            feedbackId: feedback.feedbackId,
            noInquiries: values.NoInquiries
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
    const { editQuickUpdateFeedbackResult } = state;
    return { editQuickUpdateFeedbackResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickUpdateFeedback);
