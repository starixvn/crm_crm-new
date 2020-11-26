import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getSubCategories } from '../functions';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import MultipleSelect from '../../../components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';

export class EditCommunitionSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mainCategoryOptionsEdit: [],
            subCategoryOptionsEdit: [],
            communicationToolOptionsEdit: [],
            selectedSubCategoryIdsEdit: []
        };
    }

    componentDidMount() {
        const selectedData = this.props.selectCommunication;

        const selectedCatagoryId = [];
        const mainCategoryOptionsEdit = this.props.settings.mainCategories.map(main => {
            selectedCatagoryId.push(main.mainCategoryID);
            return {
                mainCategoryID: main.mainCategoryID,
                name: main.name,
                checked: this.isCheckCatagories(selectedData.category, main.mainCategoryID)
            };
        });

        const selectedCatagory = selectedData.category === '0' ? selectedCatagoryId.join(',') : selectedData.category;
        const findSubByMain = this.props.settings.subCategories.filter(item => selectedCatagory.includes(item.mainCategoryID.toString()));
        const setSubCatagories = selectedData.subCategory === '0' ? getSubCategories(true, findSubByMain, []) : getSubCategories(false, findSubByMain, selectedData.subCategory);

        const selectedSubCatagories = [];
        setSubCatagories.forEach(sub => {
            selectedSubCatagories.push(sub.subCategoryId);
        });

        const communicationToolOptionsEdit = this.props.settings.communicationTools.map(tool => {
            return {
                id: tool.id,
                name: tool.name,
                checked: selectedData.commTool.includes(tool.id) ? true : false
            };
        });

        const hasCheckedCatalogy = mainCategoryOptionsEdit.findIndex(item => item.checked === true) !== -1;

        this.setState({
            mainCategoryOptionsEdit: mainCategoryOptionsEdit,
            subCategoryOptionsEdit: hasCheckedCatalogy ? setSubCatagories : [],
            communicationToolOptionsEdit: communicationToolOptionsEdit,
            selectedSubCategoryIdsEdit: selectedData.subCategory === '0' ? selectedSubCatagories.join(',') : selectedData.subCategory
        });
    }

    isCheckCatagories = (selectedData, id) => {
        if (selectedData === '0') {
            return true;
        }
        return selectedData.includes(id) ? true : false;
    };

    mainCategoriesChangeEdit = (currentItem, selectedItemsKey, setFieldValue) => {
        setFieldValue('mainCategoryTypesEdit', selectedItemsKey);
        if (selectedItemsKey) {
            const selectedSub = this.state.selectedSubCategoryIdsEdit.length > 1 ? this.state.selectedSubCategoryIdsEdit.split(',') : this.state.selectedSubCategoryIdsEdit;
            const selectedMain = selectedItemsKey.split(',');
            const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
            const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
            const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;

            this.setState({
                selectedSubCategoryIdsEdit: resetSelectedSubJoin
            }, () => {
                const isCheckDefault = false;
                const setSubCatagories = getSubCategories(isCheckDefault, findSubByMain, this.state.selectedSubCategoryIdsEdit);
                this.setState({
                    subCategoryOptionsEdit: setSubCatagories
                });
            });
        } else {
            setFieldValue('subCategoryTypesEdit', '');
            this.setState({
                subCategoryOptionsEdit: [],
                selectedSubCategoryIdsEdit: []
            });
        }
    };

    validateEditCommunication = values => {
        const errors = {};
        if (!values.mainCategoryTypesEdit) {
            errors.mainCategoryTypesEdit = LangHelper.getResource('CategoryRequired');
        }

        if (!values.subCategoryTypesEdit) {
            errors.subCategoryTypesEdit = LangHelper.getResource('SubCategoryRequied');
        }

        if (!values.comunicationToolTypesEdit) {
            errors.comunicationToolTypesEdit = LangHelper.getResource('CommunicationToolRequired');
        }

        return errors;
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const countCatagories = values.mainCategoryTypesEdit.split(',').length;
        const countSubCatagories = values.subCategoryTypesEdit.split(',').length;
        if (countCatagories === this.props.settings.mainCategories.length) {
            values.mainCategoryTypesEdit = '0';
        }

        if (countSubCatagories === this.state.subCategoryOptionsEdit.length) {
            values.subCategoryTypesEdit = '0';
        }

        const data = {
            DefaultCommId: values.defaultCommId,
            CategoryIds: values.mainCategoryTypesEdit,
            SubCategoryIds: values.subCategoryTypesEdit,
            CommunicationIds: values.comunicationToolTypesEdit
        };

        this.props.editCommunication(data).then(() => {
            if (this.props.editCommunicationResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    renderFormEditCommunication = ({
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
                        this.props.editCommunicationResult &&
                        <ResponseMessage isSuccessful={this.props.editCommunicationResult.isSuccessful}
                            message={this.props.editCommunicationResult.message || LangHelper.getResource('UpdateCommunicationSettingSuccessfully')}
                        />
                    }

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="customerNameInput">
                            {LangHelper.getResource('Customer')}
                        </Form.Label>
                        <Col sm="3 mt-2" md="3 mt-2">
                            {values.userName}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="mainCategoryID">
                            {LangHelper.getResource('Category')}
                        </Form.Label>
                        <Col sm="4" md="4">
                            <MultipleSelect
                                isInvalid={touched.mainCategoryTypesEdit && errors.mainCategoryTypesEdit}
                                dataSource={this.state.mainCategoryOptionsEdit}
                                keyField='mainCategoryID'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                isAllTextShown={this.state.mainCategoryOptionsEdit.length > 0}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.mainCategoriesChangeEdit(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                        </Col>
                        <Col sm="2" md="2">
                            <Form.Label className="required sub-category-left" htmlFor="subCategoryId">
                                {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                        </Col>
                        <Col sm="4" md="4">
                            <MultipleSelect
                                isInvalid={touched.subCategoryTypesEdit && errors.subCategoryTypesEdit}
                                dataSource={this.state.subCategoryOptionsEdit}
                                keyField='subCategoryId'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                isAllTextShown={this.state.subCategoryOptionsEdit.length > 0}
                                hasAllOption={this.state.subCategoryOptionsEdit.length > 0}
                                hasSearchBox
                                isDisable={this.state.subCategoryOptionsEdit.length === 0}
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('subCategoryTypesEdit')(selectedItemsKey);
                                    this.setState({
                                        selectedSubCategoryIdsEdit: selectedItemsKey
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="CommunicationTool">
                            {LangHelper.getResource('CommunicationTool')}
                        </Form.Label>
                        <Col sm="4" md="4">
                            <MultipleSelect
                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                dataSource={this.state.communicationToolOptionsEdit}
                                keyField='id'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                isSummited={false}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="primary" type="submit" disabled={isSubmitting}>
                        {LangHelper.getResource('Update')}
                    </Button>
                    <Button size="sm" variant="primary" type="submit"   onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const Communication = this.props.selectCommunication;
        const initialValuesEditForm = {
            userName: Communication.username,
            mainCategoryTypesEdit: Communication.category,
            subCategoryTypesEdit: Communication.subCategory,
            comunicationToolTypesEdit: Communication.commTool,
            defaultCommId: Communication.defaultCommId
        };
        return (
            <Modal show className="communication-setting-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateSetting')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValuesEditForm}
                    validate={this.validateEditCommunication}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderFormEditCommunication}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, editCommunicationResult, selectCommunication } = state;
    return {
        settings,
        editCommunicationResult,
        selectCommunication
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCommunitionSetting);