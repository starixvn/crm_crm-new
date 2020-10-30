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
import MultipleSelect from '@jsroot/components/multiple-select/index';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { renderOption, validateFormik, getTemplateCommunicationTool } from '../common.functions';

export class EditPicManagement extends Component {

    constructor(props) {
        super(props);
        this.formik = React.createRef();
        let communicationTools = [];
        if (this.props.selectedPic.communicationTools.length > 0) {
            communicationTools = this.props.selectedPic.communicationTools.map((item, index) => ({ type: item.settingId, value: item.value, unique: index }));
        }
        const languages = this.props.setting.languages.map(item => {
            const index = this.props.selectedPic.languages.findIndex(language => language.settingId === item.settingId);
            if (index >= 0) {
                return { ...item, checked: true };
            }
            return item;
        });
        this.props.selectedPic.languages.forEach(item => {
            const index = languages.findIndex(language => language.settingId === item.settingId);
            if (index < 0) {
                languages.push({ ...item, checked: true });
            }
        });
        this.state = {
            communicationTools,
            languages,
            showConfirmClose: false
        };
    }

    handleConfirmCancelPopup = event => {
        const { values } = this.formik;
        if (event) {
            event.preventDefault();
        }
        const initialValues = this.getInitValue();
        if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
            this.handleClosePopup();
        } else {
            this.setState({ showConfirmClose: true });
        }
    }

    handleCloseConfirm = () => {
        this.setState({ showConfirmClose: false });
    }

    handleClosePopup = () => {
        this.props.setEditPicPopup({ show: false });
        if (this.props.editPicResult) {
            this.props.setEditPicResult(null);
        }
    }

    handleAddRowCommunication = () => {
        const { communicationTools } = this.state;
        const temp = getTemplateCommunicationTool();
        this.formik.values[`communication-${temp.unique}`] = { type: temp.type, value: temp.value };
        this.setState({ communicationTools: [...communicationTools, temp] });
    }

    handleRemoveRowCommunication = unique => {
        const data = [...this.state.communicationTools];
        const index = data.findIndex(c => c.unique === unique);
        data.splice(index, 1);
        this.setState({ communicationTools: data });
        if (this.formik.values[`communication-${unique}`]) {
            delete this.formik.values[`communication-${unique}`];
        }
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = this.getTemplateEdit(values);
        this.props.editPic(template).then(() => {
            if (this.props.editPicResult.isSuccessful) {
                setTimeout(() => {
                    this.handleClosePopup();
                    this.props.getGridData(this.props.gridParams);
                    this.props.setEditPicResult(null);
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    }

    getTemplateEdit = values => {
        const picCommunicationTools = [];
        for (const key in values) {
            if (key.includes('communication') && values[key]) {
                const index = picCommunicationTools.findIndex(item => +item.type === +values[key].type);
                if (index >= 0) {
                    const newValue = picCommunicationTools[index].value.concat(', ', values[key].value);
                    picCommunicationTools[index].value = newValue;
                } else {
                    picCommunicationTools.push({ ...values[key] });
                }
            }
        }
        return {
            picId: values.picId,
            picName: values.picName,
            role: values.roleId,
            language: values.languageIds,
            country: values.countryId,
            remark: values.remark,
            picCommunicationTools
        };
    }

    renderCommunicationTool = ({
        values,
        errors,
        touched,
        handleChange
    }) => {
        const { communicationTools } = this.state;
        return communicationTools.map((item, index) => {
            const isInvalidFirstRowCommunicationTools = index === 0 && touched.communication && errors.communication;
            const isInvalidCommunicationTools = (touched[`communication-${item.unique}`] && errors[`communication-${item.unique}`]) || isInvalidFirstRowCommunicationTools;
            return (
                <Form.Group as={Row} key={item.unique}>
                    <Col sm="4" md="3" className="select-communication">
                        <Form.Control as="select" size="sm" className="shadow-none"
                            isInvalid={isInvalidCommunicationTools}
                            value={values[`communication-${item.unique}`].type}
                            name={`communication-${item.unique}.type`} id={`communication-${item.unique}.type`}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {this.props.setting.communicationTools.map(com => renderOption(com, 'settingId', 'settingValue'))}
                        </Form.Control>
                        {
                            index === 0 &&
                            <span
                                className="required"
                            >*</span>
                        }
                    </Col>
                    <Col sm="8" md="9"  >
                        <Row>
                            <Col sm="11" md="11" >
                                <Form.Control type="text" size="sm"
                                    name={`communication-${item.unique}.value`} id={`communication-${item.unique}.value`}
                                    value={values[`communication-${item.unique}`].value}
                                    className="shadow-none" autoComplete="off"
                                    isInvalid={isInvalidCommunicationTools}
                                    onChange={handleChange}
                                    placeholder={LangHelper.getResource('SeparatedByComma')}
                                />
                            </Col>
                            <Col sm="1" md="1" className="tool-action" >
                                {
                                    index > 0 &&
                                    <span
                                        onClick={() => this.handleRemoveRowCommunication(item.unique)}
                                        className="fa fa-times mr-2"
                                    />
                                }
                                {
                                    index === communicationTools.length - 1 &&
                                    <span
                                        onClick={() => this.handleAddRowCommunication()}
                                        className="fa fa-plus"
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>
            );
        });
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
        const { roleList, countries } = this.props.setting;
        const { languages } = this.state;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.editPicResult &&
                        <ResponseMessage isSuccessful={this.props.editPicResult.isSuccessful}
                            message={this.props.editPicResult.message || LangHelper.getResource('EditPICSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="picName">
                            {LangHelper.getResource('Name')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" name="picName" id="picName"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.picName && errors.picName}
                                value={values.picName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label className="required" column sm="4" md="3" htmlFor="roleId">
                            {LangHelper.getResource('Role')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" className="shadow-none" size="sm"
                                isInvalid={touched.roleId && errors.roleId}
                                name="roleId" id="roleId"
                                value={values.roleId}
                                onChange={handleChange}
                            >
                                <option disabled hidden value="">{LangHelper.getResource('PleaseSelect')}</option>
                                {roleList.map(item => renderOption(item, 'settingId', 'settingValue'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="languageIds" column sm="4" md="3" >
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <MultipleSelect
                                id="languageIds"
                                name="languageIds"
                                keyField='settingId'
                                isAllTextShown
                                valueField='settingValue'
                                statusField='checked'
                                dataSource={languages}
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('languageIds')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="countryId" column sm="4" md="3">
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" className="shadow-none" size="sm"
                                name="countryId" id="countryId"
                                isInvalid={touched.countryId && errors.countryId}
                                value={values.countryId}
                                onChange={handleChange}
                            >
                                <option value={0} hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                {countries.map(item => renderOption(item, 'id', 'name'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label htmlFor="remark" column sm="4" md="3" >
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="textarea"
                                className="shadow-none form-control"
                                name="remark" id="remark" rows="4"
                                value={values.remark}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {this.renderCommunicationTool({ values, errors, touched, handleChange })}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        size="sm" type="submit"
                        variant="primary" disabled={isSubmitting}
                    >
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="submit" variant="primary" onClick={this.handleConfirmCancelPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    }

    getInitValue = () => {
        const { selectedPic } = this.props;
        const tempCommunication = {};
        selectedPic.communicationTools.forEach((item, index) => {
            tempCommunication[`communication-${index}`] = {
                type: item.settingId,
                value: item.value
            };
        });
        return {
            picId: selectedPic.picId,
            picName: selectedPic.username,
            roleId: selectedPic.roleId,
            languageIds: selectedPic.languages.map(item => item.settingId).join(','),
            countryId: selectedPic.countryId,
            communication: null,
            remark: selectedPic.remark,
            ...tempCommunication
        };
    }

    render() {
        const initialValues = this.getInitValue();
        return (
            <Modal show className="pic-management-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.handleConfirmCancelPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">
                        {LangHelper.getResource('EditPIC')}
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    innerRef={p => (this.formik = p)}
                    validate={validateFormik}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
                {
                    this.state.showConfirmClose &&
                    <ConfirmPopup
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        size='lg'
                        onSubmit={this.handleClosePopup}
                        onClose={this.handleCloseConfirm}
                    />
                }
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { setting, gridParams, selectedPic, editPicResult } = state;
    return {
        setting, gridParams, selectedPic, editPicResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPicManagement);