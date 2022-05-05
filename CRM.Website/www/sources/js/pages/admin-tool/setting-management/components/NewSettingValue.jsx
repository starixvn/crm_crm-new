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

export class NewSettingValue extends Component {
    componentDidMount(){
        this.props.getParentSettings();
    }
    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = {
            settingName: values.settingName,
            settingValue: values.settingValue,
            displayOrder: values.displayOrder === '' ? 0 : values.displayOrder,
            parentId: this.props.settingName !== '' ? 0 : parseInt(values.parentId, 10)
        };
        this.props.insertNewSetting(params).then(() => {
            if (this.props.insertNewSettingResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    validateFormik = values =>{
        const errors = {};
        if(values.settingName === ''){
            errors.settingName = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName'));
        }
        if(values.settingValue === ''){
            errors.settingValue = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue'));
        }
        return errors;
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
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.insertNewSettingResult &&
                        <ResponseMessage isSuccessful={this.props.insertNewSettingResult.isSuccessful}
                            message={this.props.insertNewSettingResult.message || LangHelper.getResource('InsertNewSettingSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="settingName">
                            {LangHelper.getResource('SettingName')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.settingName}
                                name="settingName" id="settingName"
                                disabled={this.props.settingName !== ''}
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.settingName && errors.settingName}
                                onChange={handleChange}
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
                        <Form.Label column sm="4" md="3" htmlFor="parentId">
                            {LangHelper.getResource('Parent')}
                        </Form.Label>
                        <Col sm="8" md="9">
                        <Form.Control as="select" size="sm" className="shadow-none"
                            name="picType" id="picType"
                            onChange={event => setFieldValue('parentId', event.target.value)}
                            value={values.parentId}
                        >
                            <option value='0'>{LangHelper.getResource('NotApply')}</option>
                            {
                                this.props.parents.map((item, key) => <option key={key} value={item.settingId}>{`${item.settingName} - ${item.settingValue}`}</option>)
                            }
                        </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="displayOrder">
                            {LangHelper.getResource('DisplayOrder')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="number"
                                value={values.displayOrder}
                                name="displayOrder" id="displayOrder"
                                className="shadow-none form-control"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit"  size="sm" variant="primary" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm"  variant="primary" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const {parents, settingName} = this.props;
        if(parents === null || !parents){
            return null;
        }

        const initialValues = {
            settingName: settingName,
            settingValue: '',
            parentId: 0,
            displayOrder: ''
        };

        return (
            <Modal className="setting-modal" dialogAs={DraggableModalDialog} 
                backdrop="static" keyboard={false} show centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('InsertNewSetting')}</Modal.Title>
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
    const { parents, insertNewSettingResult } = state;
    return {
        parents, insertNewSettingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSettingValue);