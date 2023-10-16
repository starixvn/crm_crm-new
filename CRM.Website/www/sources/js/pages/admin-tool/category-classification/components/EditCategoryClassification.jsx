import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import CkEditor from '@jsroot/components/ckeditor/index';
import { Formik } from 'formik';

export class EditCategoryClassification extends Component {
    constructor(props) {
        super(props);
    };

    getParams = values => {
        const { selectCategoryClass } = this.props;
        const actionEdit = 1, actionDelete = 2;
        const params = {
            mainCategoryID: selectCategoryClass.mainCategoryID,
            subCategoryID: selectCategoryClass.subCategoryID,
            remarkNewValue: values.remark,
            actionType: values.remark ? actionEdit : actionDelete
        };
        return params;
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = this.getParams(values);

        this.props.editCategoryClass(params).then(() => {
            if (this.props.editCategoryClassResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    getInitValues = () => {
        const { selectCategoryClass } = this.props;
        const initialValues = {
            remark: selectCategoryClass.remark
        };
        return initialValues;
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const { selectCategoryClass, editCategoryClassResult } = this.props;

        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    {
                        editCategoryClassResult &&
                        <ResponseMessage isSuccessful={editCategoryClassResult.isSuccessful}
                            message={editCategoryClassResult.message || LangHelper.getResource('UpdateRemarkSuccessfully')}
                        />
                    }
                    <Form.Group>
                        <Form.Label column sm="8" md="8" htmlFor="mainCategoryID">
                            {LangHelper.getResource('Category')}
                            <div><b>{selectCategoryClass.mainCategory}</b></div>
                        </Form.Label>
                        <Form.Label column sm="4" md="4" htmlFor="subCategoryID">
                            {LangHelper.getResource('SubCategory')}
                            <div><b>{selectCategoryClass.subCategory}</b></div>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="12" md="12" htmlFor="remark">
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <CkEditor
                            className='col-md-12 col-sm-12'
                            name='remark'
                            isInvalid={touched.remark && errors.remark}
                            data={values.remark}
                            username={window.currentUsername}
                            onChange={value => setFieldValue('remark', value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        return (
            <Modal show className="category-classification-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('EditRemark')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => this.formik = p}
                    initialValues={this.getInitValues()}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { selectCategoryClass, editCategoryClassResult } = state;
    return {
        selectCategoryClass,
        editCategoryClassResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryClassification);