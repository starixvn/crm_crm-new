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

export class NewPicManagement extends Component {

    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            communicationTools: [
                { type: '', value: '', unique: new Date().getTime() }
            ],
            roles: [],
            showConfirmClose: false
        };
    }

    componentDidMount(){
        this.handleRolesOption(this.props.setting.picTypeList[0].settingId);
    }


    handleRolesOption = picTpe =>{
        this.props.getRolesByPic(picTpe).then(data =>{
            this.setState({roles: data});
        });
    }

    handleChangePicType = (event, setFieldValue) =>{
        const value = event.target.value;
        setFieldValue('picType', value);
        this.handleRolesOption(value);
    }

    handleConfirmCancelPopup = event => {
        const { values } = this.formik;
        if (event) {
            event.preventDefault();
        }
        const initialValues = {
            picName: '',
            roleId: '',
            languageIds: '',
            countryId: 0,
            communication: null,
            remark: ''
        };
        if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
            this.handleClosePopup();
        } else {
            this.setState({ showConfirmClose: true });
        }
    };

    handleCloseConfirm = () => {
        this.setState({ showConfirmClose: false });
    };

    handleClosePopup = () => {
        this.props.setCreatePicPopup({ show: false });
        if (this.props.createPicResult) {
            this.props.setCreatePicResult(null);
        }
    };

    handleAddRowCommunication = () => {
        const data = [...this.state.communicationTools, getTemplateCommunicationTool()];
        this.setState({ communicationTools: data });
    };

    handleRemoveRowCommunication = unique => {
        const data = [...this.state.communicationTools];
        const index = data.findIndex(c => c.unique === unique);
        data.splice(index, 1);
        this.setState({ communicationTools: data });
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = this.getTemplateCreate(values);
        this.props.createPic(template).then(() => {
            if (this.props.createPicResult.isSuccessful) {
                setTimeout(() => {
                    this.handleClosePopup();
                    this.props.getGridData(this.props.gridParams);
                    this.props.setCreatePicResult(null);
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    getTemplateCreate = values => {
        const picCommunicationTools = [];
        for (const key in values) {
            if (key.includes('communication') && values[key]) {
                const index = picCommunicationTools.findIndex(item => item.type === values[key].type);
                if (index >= 0) {
                    const newValue = picCommunicationTools[index].value.concat(',', values[key].value);
                    picCommunicationTools[index].value = newValue;
                } else {
                    picCommunicationTools.push(values[key]);
                }
            }
        }
        return {
            picName: values.picName,
            picType: values.picType,
            role: values.roleId,
            language: values.languageIds,
            country: values.countryId,
            remark: values.remark,
            picCommunicationTools
        };
    };

    renderCommunicationTool = ({
        values,
        errors,
        touched,
        handleChange
    }) => {
        const { communicationTools } = this.state;
        return communicationTools.map((item, index) => {
            const isInvalidFirstRow = index === 0 && touched.communication && errors.communication;
            const isInvalid = (touched[`communication-${item.unique}`] && errors[`communication-${item.unique}`]) || isInvalidFirstRow;
            return (
                <Form.Group as={Row} key={item.unique}>
                    <Col sm="4" md="3" className="select-communication">
                        <Form.Control as="select" size="sm" className="shadow-none"
                            isInvalid={isInvalid}
                            name={`communication-${item.unique}.type`} id={`communication-${item.unique}.type`}
                            onChange={handleChange}
                            value={values[`communication-${item.unique}.type`]}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {this.props.setting.communicationTools.map(com => renderOption(com, 'settingId', 'settingValue'))}
                        </Form.Control>
                        {
                            index === 0 &&
                            <span className="required">*</span>
                        }
                    </Col>
                    <Col sm="8" md="9"  >
                        <Row>
                            <Col sm="11" md="11" >
                                <Form.Control type="text" size="sm" value={values[`communication-${item.unique}.value`]}
                                    name={`communication-${item.unique}.value`} id={`communication-${item.unique}.value`}
                                    className="shadow-none" autoComplete="off"
                                    isInvalid={isInvalid}
                                    onChange={handleChange}
                                    placeholder={LangHelper.getResource('SeparatedByComma')}
                                />
                            </Col>
                            <Col sm="1" md="1" className="tool-action" >
                                {
                                    index > 0 &&
                                    <span className="fa fa-times mr-2" onClick={() => this.handleRemoveRowCommunication(item.unique)} />
                                }
                                {
                                    index === communicationTools.length - 1 &&
                                    <span className="fa fa-plus" onClick={() => this.handleAddRowCommunication()} />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>
            );
        });
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
        const { picTypeList, countries, languages } = this.props.setting;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createPicResult &&
                        <ResponseMessage isSuccessful={this.props.createPicResult.isSuccessful}
                            message={this.props.createPicResult.message || LangHelper.getResource('InsertPICSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="picType">
                            {LangHelper.getResource('PicType')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.picType && errors.picType}
                                name="picType" id="picType"
                                onChange={e => this.handleChangePicType(e, setFieldValue)}
                                value={values.picType}
                            >
                                <option value='' disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {picTypeList.map(item => renderOption(item, 'settingId', 'settingValue'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="picName">
                            {LangHelper.getResource('Name')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.picName}
                                name="picName" id="picName"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.picName && errors.picName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="roleId">
                            {LangHelper.getResource('Role')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.roleId && errors.roleId}
                                name="roleId" id="roleId"
                                onChange={handleChange}
                                value={values.roleId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.state.roles.map(item => renderOption(item, 'settingId', 'settingValue'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="languageIds">
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <MultipleSelect
                                id="languageIds"
                                name="languageIds"
                                dataSource={languages}
                                keyField='settingId'
                                isAllTextShown
                                valueField='settingValue'
                                statusField='checked'
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('languageIds')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="countryId">
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.countryId && errors.countryId}
                                name="countryId" id="countryId"
                                onChange={handleChange}
                                value={values.countryId}
                            >
                                <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {countries.map(item => renderOption(item, 'id', 'name'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="remark">
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="textarea"
                                name="remark" id="remark" rows="4"
                                className="shadow-none form-control"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {this.renderCommunicationTool({ values, errors, touched, handleChange })}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button variant="primary" size="sm" onClick={this.handleConfirmCancelPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const initialValues = {
            picName: '',
            roleId: '',
            picType: this.props.setting.picTypeList[0].settingId,
            languageIds: '',
            countryId: 0,
            communication: null,
            remark: ''
        };

        if(this.props.setting === null || !this.props.setting){
            return null;
        }

        return (
            <Modal show className="pic-management-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.handleConfirmCancelPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('InsertPIC')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    validate={validateFormik}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
                {
                    this.state.showConfirmClose &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
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
    const { setting, gridParams, createPicResult } = state;
    return {
        setting, gridParams, createPicResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPicManagement);