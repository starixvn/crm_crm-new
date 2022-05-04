import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

export class Edit extends Component {
    validateFormik = values =>{
        const errors = {};
        if(values.settingValue === ''){
            errors.settingValue = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue'));
        }
        if(values.settingName === ''){
            errors.settingName = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName'));
        }
        return errors;
    };

    handleSubmit = (values, { setSubmitting }) => {
        const params = {
            settingId: values.settingId,
            settingName: values.settingName,
            settingValue: values.settingValue,
            displayOrder: values.displayOrder === '' ? 0 : values.displayOrder
        };
        setSubmitting(true);
        this.props.editNewSetting(params).then(() => {
            if (this.props.editNewSettingResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.editNewSettingResult &&
                        <ResponseMessage isSuccessful={this.props.editNewSettingResult.isSuccessful}
                            message={this.props.editNewSettingResult.message || LangHelper.getResource('InsertNewSettingSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="settingName">
                            {LangHelper.getResource('SettingName')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.settingName}
                                name="settingName" id="settingName"
                                disabled
                                className="shadow-none" autoComplete="off"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="settingValue">
                            {LangHelper.getResource('SettingValue')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.settingValue}
                                name="settingValue" id="settingValue"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.settingValue && errors.settingValue}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="displayOrder">
                            {LangHelper.getResource('DisplayOrder')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="number"
                                name="displayOrder" id="displayOrder"
                                className="shadow-none form-control"
                                value={values.displayOrder}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const {editPopup} = this.props;
        if(!editPopup && editPopup.data !== null){
            return null;
        }

        const initialValues = {
            settingId: editPopup.data.settingId,
            settingName: editPopup.data.settingName,
            settingValue: editPopup.data.settingValue,
            displayOrder: editPopup.data.displayOrder
        };

        return (
            <Modal show className="setting-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('EditSettingValue')}</Modal.Title>
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

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editPopup, editNewSettingResult } = state;
    return {
        editPopup, editNewSettingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);