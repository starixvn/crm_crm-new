import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { renderNotificationTypeOption, validateFormik } from '../common.functions';

export class DataGrid extends Component {
    static propTypes = {
        feedbackSubjectTemplateByPagingIndex: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        feedbackSubjectTemplateByPagingIndex:[]
    };

    constructor(props) {
        super(props);
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                {
                    this.props.createTemplateResult &&
                    <ResponseMessage isSuccessful={this.props.createTemplateResult.isSuccessful}
                        message={this.props.createTemplateResult.message || LangHelper.getResource('InsertNotificationTemplateSuccessfully')}
                    />
                }
                <Form.Group as={Row}>
                    <Form.Label column sm="4" md="3"
                        className="required" htmlFor="notificationTemplateName"
                    >
                        {LangHelper.getResource('TemplateName')}
                    </Form.Label>
                    <Col sm="8" md="9">
                        <Form.Control type="text" size="sm" value={values.notificationTemplateName}
                            name="notificationTemplateName" id="notificationTemplateName"
                            className="shadow-none" autoComplete="off"
                            isInvalid={touched.notificationTemplateName && errors.notificationTemplateName}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="4" md="3"
                        className="required" htmlFor="title"
                    >
                        {LangHelper.getResource('Title')}
                    </Form.Label>
                    <Col sm="8" md="9">
                        <Form.Control type="text" size="sm" value={values.title}
                            name="title" id="title"
                            className="shadow-none" autoComplete="off"
                            isInvalid={touched.title && errors.title}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        
    };

    render() {
        const initialValues = {
            notificationTypeId: '',
            notificationTemplateName: '',
            title: ''
        };

        return (
                <Formik
                    initialValues={initialValues}
                    validate={values => validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { feedbackSubjectTemplateByPagingIndex, settings, addFeedbackResult } = state;
    return {
        feedbackSubjectTemplateByPagingIndex,
        settings,
        addFeedbackResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);