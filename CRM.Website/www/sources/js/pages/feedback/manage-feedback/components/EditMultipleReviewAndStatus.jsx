import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import CkEditor from '@jsroot/components/ckeditor/index';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

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
            isReviewed: false,
            feedbackIds: props.feedbackIds,
            editResult: null,
            isSubmitting: false
        };
    }

    handleSubmit = async values => {
        this.setState({ isSubmitting: true });
        // const params = {
        //     feedbackId: values.feedbackId,
        //     noInquiries: values.noInquiries
        // };

        // const url = Site.resolveClientUrl('Feedback/EditNoOfInquiry');
        // await DataService.postDataAsync(url, params).then(response => {
        //     this.setState({ editResult: response.data });

        //     if (response.data.isSuccessful) {
        //         setTimeout(() => {
        //             this.props.onClose();
        //         }, 3000);
        //     } else {
        //         this.setState({ isSubmitting: true });
        //     }
        // });
    };
    handleChangeCheckBox = () =>{
        this.setState(prevState =>({
            isReviewed: !prevState.isReviewed
        }));
    }

    validateFormik = values =>{
        const errors = {};
        if (this.state.isReviewed && values.review === '') {
            errors.review = LangHelper.getResource('ReviewRequired');
        }

        return errors;
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
    }) => {
        const editResult = this.state.editResult;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
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
                                    value={values.statusId}
                                    onChange={handleChange}
                                >
                                {
                                    this.props.statuses.map(item =>
                                        <option key={item.statusId} value={item.statusId}>
                                            {item.name}
                                        </option>
                                    )
                                }
                               
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='title'>
                            <Form.Label className="mr-1" column sm="1" md="1" htmlFor="status">{LangHelper.getResource('Reviewed')}</Form.Label>
                            <input type='checkbox' className='cursor-pointer'
                                checked={this.state.isReviewed}
                                onChange={this.handleChangeCheckBox}
                            />
                        </Form.Group>
                        {
                            this.state.isReviewed && <div className="text-editor">
                            <CkEditor isInvalid={touched.review && errors.review}
                                data={values.review}
                                onChange={value => setFieldValue('review', value)}
                            />
                        </div>
                        }
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
            statusId: this.props.statusesSelected.length > 0 ? this.props.statusesSelected[0] : '',
            review: ''
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
                    validate={this.validateFormik}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}
