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

export class UpdateFeedback extends PureComponent {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
    }

    static propTypes = {
    };

    static defaultProps = {
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
                        this.props.updateFeedbackResult &&
                        <ResponseMessage isSuccessful={this.props.updateFeedbackResult.isSuccessful}
                            message={this.props.updateFeedbackResult.message || LangHelper.getResource('UpdateFeedbackSuccess')}
                        />
                    }

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
        };
        this.props.updateFeedback(data).then(() => {
            if (this.props.updateFeedbackResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const initialValues = {
        };
        return (
            <Modal show className="update-feedback-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateFeedback')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    validate={this.validateFormik}
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
    const { updateFeedbackResult } = state;
    return { updateFeedbackResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFeedback);
