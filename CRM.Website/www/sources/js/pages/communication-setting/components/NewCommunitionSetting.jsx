import React, { PureComponent } from 'react';
import { getSubCategories } from '../functions';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ValidateCustomerResult from './ValidateCustomerResult';
import { connect } from 'react-redux';
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

export class NewCommunitionSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mainCategoryOptionsNew: [],
            subCategoryOptionsNew: [],
            communicationToolOptionsNew: [],
            selectedSubCategoryIdsNew: [],
            listOfCustomerValid: [],
            listOfCustomer: [],
            isSuccessful: false
        };
    }

    componentDidMount() {
        this.setState({
            mainCategoryOptionsNew: this.props.settings.mainCategories,
            communicationToolOptionsNew: this.props.settings.communicationTools
        });
    }

    isValidCustomer = customers => {
        return customers.split(',').filter(function (value) {
            return value.length > 50;
        }).length === 0;
    };

    handleVerify = (event, setFieldValue, value) => {
        event.preventDefault();
        const regex1 = new RegExp(/,\s+/g);
        const regex2 = new RegExp(/^,+|,+$/g);
        const regex3 = new RegExp(/,{2,}/g);

        const customersInput = value.trim().replace(regex1, ',') // NOSONAR
            .replace(regex2, '') // NOSONAR
            .replace(regex3, ','); // NOSONAR
        if (this.isValidCustomer(customersInput)) {
            this.props.verifyUserName({ Username: customersInput }).then(data => {
                let customers = [...this.state.listOfCustomer, ...data];
                customers = customers.filter((v, i, a) => a.findIndex(t => t.id === v.id && t.name === v.name) === i);
                this.setState({
                    listOfCustomer: customers,
                    listOfCustomerValid: customers.filter(item => item.id !== 0)
                });
            });
            setFieldValue('isVerifiedCustomers', true);
        }
        setFieldValue('customerNameInput', '');
    };

    pasteCustomerHandler = (event, customers, setFieldValue) => {
        const customer = customers.trim();
        const items = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',')
            .replace(/\r\n/g, ',')
            .replace(/\n/g, ',')
            .replace(/\t/g, ',')
            .split(',').filter(item => item !== '');

        setTimeout(() => {
            const customersInput = (customer.length > 0 ? customer + ',' : '').concat(items.join(','));
            setFieldValue('customerNameInput', customersInput);
        }, 100);
    };

    mainCategoriesChangeNew = (currentItem, selectedItemsKey, setFieldValue) => {
        setFieldValue('mainCategoryTypesNew', selectedItemsKey);
        if (selectedItemsKey) {
            const selectedSub = this.state.selectedSubCategoryIdsNew.length > 1 ? this.state.selectedSubCategoryIdsNew.split(',') : this.state.selectedSubCategoryIdsNew;
            const selectedMain = selectedItemsKey.split(',');
            const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
            const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
            const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;

            this.setState({
                selectedSubCategoryIdsNew: resetSelectedSubJoin
            }, () => {
                const isCheckDefault = false;
                const setSubCatagories = getSubCategories(isCheckDefault, findSubByMain, this.state.selectedSubCategoryIdsNew);
                this.setState({
                    subCategoryOptionsNew: setSubCatagories
                });
            });
        } else {
            this.setState({
                subCategoryOptionsNew: [],
                selectedSubCategoryIdsNew: []
            });
        }
    };

    handleResetSubCatagory = () => {
        this.setState({
            selectedSubCategoryIdsNew: '',
            mainCategoryOptionsNew: this.state.mainCategoryOptionsNew.map(main => ({ ...main, checked: false })),
            subCategoryOptionsNew: [],
            communicationToolOptionsNew: this.state.communicationToolOptionsNew.map(tool => ({ ...tool, checked: false }))
        });
    };

    renderTooltipCustomers = props => (
        <Tooltip id="tooltip-customers" {...props}>
            {LangHelper.getResource('MultiplecustomersToolTip')}
        </Tooltip>
    );

    deleteCustomer = id => {
        this.setState({
            listOfCustomer: this.state.listOfCustomer.filter(item => item.id !== id),
            listOfCustomerValid: this.state.listOfCustomerValid.filter(item => item.id !== id)
        });
    };

    handleCloseCreatePopup = () => {
        this.props.onClose(this.state.isSuccessful);
    };

    validateNewCommunication = values => {
        const errors = {};
        if (values.customerNameInput.length > 0 && !values.isVerifiedCustomers) {
            errors.isVerifiedCustomers = LangHelper.getResource('VerifyListOfUsernameBeforeInsertSetting');
        }

        if (this.state.listOfCustomerValid.length === 0) {
            errors.customerNameInput = LangHelper.getResource('ListofcustomersRequired');
        }

        if (!values.mainCategoryTypesNew) {
            errors.mainCategoryTypesNew = LangHelper.getResource('CategoryRequired');
        }

        if (!values.subCategoryTypesNew) {
            errors.subCategoryTypesNew = LangHelper.getResource('SubCategoryRequied');
        }

        if (!values.comunicationToolTypesNew) {
            errors.comunicationToolTypesNew = LangHelper.getResource('CommunicationToolRequired');
        }

        return errors;
    };

    renderFormNewCommunication = ({
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
                        this.props.createCommunicationResult &&
                        <ResponseMessage isSuccessful={this.props.createCommunicationResult.isSuccessful}
                            message={this.props.createCommunicationResult.message || LangHelper.getResource('InsertCommunicationSettingSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>

                        <Col sm="2" md="2">
                            <Form.Label className="required" htmlFor="customerNameInput">
                                {LangHelper.getResource('Listofcustomers')}
                                <OverlayTrigger
                                    placement="bottom-start"
                                    overlay={this.renderTooltipCustomers()}
                                >
                                    <span className="fa fa-question-circle-o" />
                                </OverlayTrigger>
                            </Form.Label>
                        </Col>
                        <Col sm="10" md="10">
                            <Row>
                                <Col>
                                    <Form.Control type="text" size="sm" value={values.customerNameInput}
                                        name="customerNameInput" id="customerNameInput"
                                        onPaste={event => this.pasteCustomerHandler(event, values.customerNameInput, setFieldValue)}
                                        isInvalid={touched.customerNameInput && errors.customerNameInput}
                                        className="shadow-none" autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm="2" md="2">
                                    <Button disabled={values.customerNameInput.length === 0} name="isVerifiedCustomers" id="isVerifiedCustomers" type="submit" variant="primary"
                                        size="sm" onClick={event => this.handleVerify(event, setFieldValue, values.customerNameInput)}
                                    >
                                        {LangHelper.getResource('Verify')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    <ValidateCustomerResult listOfCustomers={this.state.listOfCustomer} onClick={this.deleteCustomer} />
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="mainCategoryID">
                            {LangHelper.getResource('Category')}
                        </Form.Label>
                        <Col sm="10" md="4">
                            <MultipleSelect
                                isInvalid={touched.mainCategoryTypesNew && errors.mainCategoryTypesNew}
                                dataSource={this.state.mainCategoryOptionsNew}
                                keyField='mainCategoryID'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                isAllTextShown={this.state.mainCategoryOptionsNew.length > 0}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.mainCategoriesChangeNew(currentItem, selectedItemsKey, setFieldValue);
                                }}
                            />
                        </Col>
                        <Col sm="2" md="2">
                            <Form.Label className="sub-category-left required" htmlFor="subCategoryId">
                                {LangHelper.getResource('SubCategory')}
                            </Form.Label>
                        </Col>
                        <Col sm="10" md="4">
                            <MultipleSelect
                                isInvalid={touched.subCategoryTypesNew && errors.subCategoryTypesNew}
                                dataSource={this.state.subCategoryOptionsNew}
                                keyField='subCategoryId'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                isAllTextShown={this.state.subCategoryOptionsNew.length > 0}
                                hasAllOption={this.state.subCategoryOptionsNew.length > 0}
                                hasSearchBox
                                isDisable={this.state.subCategoryOptionsNew.length === 0}
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('subCategoryTypesNew')(selectedItemsKey);
                                    this.setState({
                                        selectedSubCategoryIdsNew: selectedItemsKey
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="CommunicationTool">
                            {LangHelper.getResource('CommunicationTool')}
                        </Form.Label>
                        <Col sm="10" md="4">
                            <MultipleSelect
                                isInvalid={touched.comunicationToolTypesNew && errors.comunicationToolTypesNew}
                                dataSource={this.state.communicationToolOptionsNew}
                                keyField='id'
                                valueField='name'
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('comunicationToolTypesNew')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="saveandcontinue-button" type="submit" variant="primary" size="sm"
                        onClick={() => { setFieldValue('isSaveAndContinue', true); }}
                        disabled={isSubmitting}
                    >
                        {LangHelper.getResource('SaveAndContinue')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.handleCloseCreatePopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const countCatagories = values.mainCategoryTypesNew.split(',').length;
        const countSubCatagories = values.subCategoryTypesNew.split(',').length;
        if (countCatagories === this.props.settings.mainCategories.length) {
            values.mainCategoryTypesNew = '0';
        }

        if (countSubCatagories === this.state.subCategoryOptionsNew.length) {
            values.subCategoryTypesNew = '0';
        }

        const data = {
            CategoryIds: values.mainCategoryTypesNew,
            SubCategoryIds: values.subCategoryTypesNew,
            CommunicationIds: values.comunicationToolTypesNew,
            Customers: this.state.listOfCustomerValid
        };

        this.props.createCommunication(data).then(() => {
            if (this.props.createCommunicationResult.isSuccessful) {
                if (values.isSaveAndContinue) {
                    values.customerNameInput = '';
                    this.setState({
                        listOfCustomerValid: '',
                        listOfCustomer: '',
                        isSuccessful: true
                    });
                    this.handleResetSubCatagory();
                    resetForm({});
                    setSubmitting(false);
                    setTimeout(() => {
                        this.props.setCreateCommunicationResult('');
                    }, 3000);
                } else {
                    this.setState({
                        isSuccessful: false
                    });
                    setTimeout(() => {
                        this.props.onSuccess();
                    }, 3000);
                }
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const initialValuesNewForm = {
            customerNameInput: '',
            mainCategoryTypesNew: '',
            subCategoryTypesNew: '',
            comunicationToolTypesNew: '',
            isVerifiedCustomers: false,
            isSaveAndContinue: false
        };
        return (
            <Modal show className="communication-setting-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('InsertNewSetting')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValuesNewForm}
                    validate={this.validateNewCommunication}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderFormNewCommunication}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { createCommunicationResult, settings } = state;
    return {
        createCommunicationResult,
        settings
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCommunitionSetting);