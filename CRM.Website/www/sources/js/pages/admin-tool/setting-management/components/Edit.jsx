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
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionMappings: [],
            sourceMappings: ''
        };
    }

    componentDidMount() {
        this.props.sourceMapping.length > 0 && this.handleOptionMapping();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.formik.submitForm();
        }
    }

    handleOptionMapping() {
        const { sourceMapping, editPopup } = this.props;
        let selectedMapping = [];
        if (editPopup.data.settingSource !== null) {
            selectedMapping = editPopup.data.settingSource.split(', ').map(tool => {
                return {
                    id: tool,
                    name: tool,
                    checked: true
                };
            });
        }

        const optionMappings = sourceMapping.map(tool => {
            return {
                id: tool.source.trim(),
                name: tool.source.trim(),
                checked: false
            };
        });
        const concatenated = [];
        concatenated.push(...selectedMapping);
        concatenated.push(...optionMappings);
        this.setState({ optionMappings: concatenated, sourceMappings: editPopup.data.settingSource });
    }

    validateFormik = values => {
        const errors = {};
        if (values.settingValue === '') {
            errors.settingValue = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue'));
        }
        if (values.settingName === '') {
            errors.settingName = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName'));
        }
        return errors;
    };

    handleSubmit = (values, { setSubmitting }) => {
        const params = {
            settingId: values.settingId,
            settingName: values.settingName,
            extraInfo: values.extraInfo,
            settingValue: values.settingValue,
            settingSource: this.state.sourceMappings === '' ? null : this.state.sourceMappings
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
                    <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} isDocumentHandle />
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.editNewSettingResult &&
                        <ResponseMessage isSuccessful={this.props.editNewSettingResult.isSuccessful}
                            message={this.props.editNewSettingResult.message || LangHelper.getResource('UpdateSettingSuccess')}
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
                        <Form.Label column md="3" sm="4" htmlFor="extraInfo" >
                            {LangHelper.getResource('ExtraInfo')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.extraInfo}
                                name="extraInfo" id="extraInfo" className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="3" sm="4" htmlFor="settingValue" className="required">
                            {LangHelper.getResource('SettingValue')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.settingValue}
                                name="settingValue" id="settingValue" className="shadow-none" autoComplete="off"
                                isInvalid={touched.settingValue && errors.settingValue} onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {
                        this.props.sourceMapping.length > 0 &&
                        <Form.Group as={Row}>
                            <Form.Label column sm="4" md="3" htmlFor="SourceMapping">
                                {LangHelper.getResource('SourceMapping')}
                            </Form.Label>
                            <Col sm="8" md="9">
                                <MultipleSelect
                                    keyField='id' valueField='name'
                                    hasSearchBox isNAOption
                                    dataSource={this.state.optionMappings}
                                    onChange={(currentItem, selectedItemsKey) => {
                                        this.setState({ sourceMappings: selectedItemsKey });
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" size="sm" disabled={isSubmitting}>
                        <UnderlineButton.saveButton />
                    </Button>
                    <Button size="sm" variant="primary" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const { editPopup } = this.props;
        if (!editPopup || editPopup.data === null) {
            return null;
        }

        const initialValues = {
            settingId: editPopup.data.settingId,
            settingName: editPopup.data.settingName,
            extraInfo: editPopup.data.extraInfo,
            settingValue: editPopup.data.settingValue,
            settingSource: editPopup.data.settingSource
        };

        return (
            <Modal className="setting-modal" show dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div" >{LangHelper.getResource('EditSettingValue')}</Modal.Title>
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
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editPopup, editNewSettingResult, sourceMapping } = state;
    return {
        editPopup, editNewSettingResult, sourceMapping
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);