import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import CkEditor from '@jsroot/components/ckeditor/index';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '../../../components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export default class EditSmaFeedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.statusesOptions = [
            { id: 1, name: 'New' },
            { id: 2, name: 'Completed' },
            { id: 3, name: 'Ignore' },
            { id: 4, name: 'Under Discussion' },
            { id: 5, name: 'CSD Take Over' },
            { id: 6, name: 'Wing Take Over' },
            { id: 7, name: 'No Reply' }
        ]
    }

    validateFormik = values => {
        const errors = {};
        if (values.discussion.length > 4000) {
            errors.discussion = LangHelper.getResource('Maximum 4000 characters');
        }

        return errors;
    };

    handleSubmit = async () => {
        this.formik.setSubmitting(true);

        const { reviewStatus, discussion } = this.formik.values;
        const params = { reviewStatus, discussion };
        await this.props.editSMAFeedback(params).then(() => {
            this.handleClosePopup();
            if (this.props.editSMAFeedbackResult.isSuccessful) {
                this.setState({ editResult: this.props.editSMAFeedbackResult.message });
                setTimeout(() => {
                    this.props.setEditSmaFeedbackDialog(null);
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
    }) => {
        const { editResult } = this.state;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage isSubmitting={this.state.isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        editResult &&
                        <ResponseMessage isSuccessful={editResult.isSuccessful}
                            message={editResult.message || LangHelper.getResource('UpdateSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" htmlFor="review-status" className='bold'>{LangHelper.getResource('ReviewStatus')}</Form.Label>
                        <Col sm="5" md="5">
                            <Form.Control as="select" size="sm"
                                column sm="3" md="3"
                                name="reviewStatus" id="reviewStatus"
                                value={values.reviewStatus}
                                onChange={handleChange}
                            >
                                {
                                    this.statusesOptions.map(item =>
                                    (<option key={item.reviewStatus} value={item.reviewStatus}>
                                        {item.name}
                                    </option>)
                                    )
                                }

                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <div className="text-editor">
                        <Form.Label htmlFor="discussion" className='bold'>{LangHelper.getResource('DiscussionSolution')}</Form.Label>
                        <Form.Control as="textarea"
                            className="shadow-none form-control"
                            name={'discussion'} id={'discussion' } rows="8"
                            value={values.discussion}
                            isInvalid={touched.discussion && errors.discussion}
                            onChange={event => setFieldValue('discussion', event.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting} id='submit'>Save</Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        if (this.props.reviewStatus === null) {
            return null;
        }

        const initialValues = {
            reviewStatus: this.props.reviewStatus,
            discussion: this.props.discussion
        };
        return (
            <Modal show className="edit-sma-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('Update')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={el => this.formik = el}
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