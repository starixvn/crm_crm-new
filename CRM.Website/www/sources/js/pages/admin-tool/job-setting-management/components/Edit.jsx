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
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            confirmEditDialog: { show: false, params: null }
        };
    }
    validateFormik = values =>{
        const errors = {};
        if(values.dataType !== 'Boolean' &&  values.value === '' && this.isRequired(values.settingName)){
            errors.settingName = LangHelper.formatString(LangHelper.getResource('FieldRequired'), values.settingName);
        }
        return errors;
    };

    isRequired = settingName => {
        return settingName !== 'AutoSendNotificationBySport';
    };

    getParamCheckboxType = values => {
        switch (values.dataType) {
            case 'Boolean':
                if(values.value === true){
                    return 1;
                }else{
                    return 0;
                }
            case 'DateTime':
                return DateTimeService.toLongDateTime24HourFormat(values.value);
            default:
                return values.value;
        }
    };

    handleSubmit = (values, { setSubmitting }) => {
        let settings = [];
        if(this.props.editPopup.isEditMultiple){
            const splitIds = values.id.split(', ');
            const splitServiceName = values.serviceName.split(', ');

            for(let i=0; i< splitIds.length; i++){
                const setting = {
                    ID: splitIds[i].toString(),
                    SETTING: values.settingName,
                    VALUE: this.getParamCheckboxType(values).toString(),
                    SERVICENAME: splitServiceName[i]
                };
                settings.push(setting);
            }
        }else{
            const setting = {
                ID: values.id.toString(),
                SETTING: values.settingName,
                VALUE: this.getParamCheckboxType(values).toString(),
                SERVICENAME: values.serviceName
            };
            settings.push(setting);
        }

        const params = {
            Settings: settings
        };
        
        setSubmitting(true);
        this.confirmEdit(params);
    };

    renderByDataType = (values, setFieldValue, handleChange, touched, errors) => {
        switch (values.dataType) {
            case 'Boolean':
                return this.renderCheckbox(values.value, setFieldValue);
            case 'DateTime':
                return this.renderDateTime(values.value);
            case 'Int32':
                return this.renderNumber(values.value, handleChange, touched, errors);
            default:
                return this.renderFormControl(values.value, handleChange, touched, errors);
        }
    }

    renderCheckbox = (value, setFieldValue) =>{
        return (
            <Form.Check type="checkbox"
                onChange={event => setFieldValue('value', event.target.checked)}
                checked={value}
            />
        );
    };

    handleChangeDatetime = value => {
        this.formik.setFieldValue('value', value);
    }

    renderDateTime = value =>{
        return (
            <div className='react-datepicker-wrapper-container'>
                <DatePicker
                    dropdownMode="select" showTimeInput selected={new Date(value)}
                    timeInputLabel="Time:" dateFormat="MMM dd, yyyy hh:mm aa"
                    onChange={value => this.handleChangeDatetime(value)}
                />
            </div>
        );
    };

    renderNumber = (value, handleChange, touched, errors) =>{
        return (
            <Form.Control type="number" value={value}
                name="value" id="value" className="shadow-none form-control" autoComplete="off"
                isInvalid={touched.value && errors.value} onChange={handleChange}
            />
        );
    };

    renderFormControl = (value, handleChange, touched, errors) =>{
        return (
            <Form.Control as="textarea" value={value}
                name="value" id="value" className="shadow-none form-control" autoComplete="off"
                isInvalid={touched.value && errors.value} onChange={handleChange}
            />
        );
    };

    confirmEdit = params => {
        this.setState({
            confirmEditDialog: { show: true, params }
        });
    };

    handleCloseConfirmEditDialog = () => {
        this.setState({
            confirmEditDialog: { show: false, params: null }
        });
        this.formik.setSubmitting(false);
    };

    handleEdit = () =>{
        const params = this.state.confirmEditDialog.params;
        this.handleCloseConfirmEditDialog();
        this.props.editJobSetting(params).then(() => {
            if (this.props.editJobSettingResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting
    }) => {
        const jobStatusOptions = values.serviceName === 'Notification Center' ? [
            LangHelper.getResource('Done'),
            LangHelper.getResource('Running')
        ] : [LangHelper.getResource('Completed'), LangHelper.getResource('Running')];

        const isRenderComboBox = jobStatusOptions.filter(x=> x === values.value).length > 0;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.editJobSettingResult &&
                        <ResponseMessage isSuccessful={this.props.editJobSettingResult.isSuccessful}
                            message={this.props.editJobSettingResult.message || LangHelper.getResource('EditConfigSettingSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="serviceName">
                            {LangHelper.getResource('ServiceName')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Label className='disabled-label'>{values.serviceName}</Form.Label>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="3"  sm="4" htmlFor="settingName" className={this.isRequired(values.settingName) ? 'required' : ''}>
                            {values.settingName}
                        </Form.Label>
                        <Col>
                        {
                            isRenderComboBox ?
                            <Form.Control as="select" size="sm"
                                name="value" id="value"
                                value={values.value}
                                onChange={handleChange}
                            >
                            {
                                jobStatusOptions.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control> :
                            this.renderByDataType(values, setFieldValue, handleChange, touched, errors)
                        }
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" variant="primary" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };


    render() {
        const {editPopup} = this.props;
        if(!editPopup || editPopup.data === null){
            return null;
        }

        const initialValues = {
            id: editPopup.data.id,
            serviceName: editPopup.data.serviceName,
            settingName: editPopup.data.settingName,
            value: editPopup.data.dataType === 'Boolean' ? editPopup.data.value === '1' : editPopup.data.value,
            dataType: editPopup.data.dataType
        };

        return (
            <>
                <Modal className="job-setting-modal" show dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} centered size='lg'
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div" >{LangHelper.getResource('EditJobSettingValue')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={p => (this.formik = p)}
                        validate={this.validateFormik}
                        initialValues={initialValues}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    this.state.confirmEditDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmUpdate')}
                        className='confirm-edit-modal'
                        contents={<div>
                            {LangHelper.formatString(LangHelper.getResource('ConfirmEditContent'), initialValues.settingName, initialValues.serviceName)}
                        </div>}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleEdit}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmEditDialog}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirmEditDialog}
                    />
                }
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editPopup, editJobSettingResult } = state;
    return {
        editPopup, editJobSettingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);