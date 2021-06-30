import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';
import MultipleSelect from '../../../components/multiple-select/index';
import DateTimeService from '@jsroot/common/dateTimeService';

export class UpdateFeedback extends PureComponent {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            isShowDetail: true,
            communicationToolOptionsEdit: [],
            productOptionsEdit: [],
            roleOptionsEdit: [],
            responseOptionsEdit: [],
            mainCategoryOptionsEdit: [],
            subCategoryOptionsEdit: [],
            subProductOptionsEdit: [],
            countryOptionsEdit: [],
            languageOptionsEdit: [],
            extensionOptionsEdit: [],
            statusOptionsEdit: [],
            bettypeOptionsEdit: []
        }; 
    }

    componentDidMount() {

        const communicationToolOptionsEdit = this.props.settings.communicationToolList.map(tool => {
            return {
                id: tool.id,
                name: tool.settingName,
                checked: false
            };
        });
        const productOptionsEdit = this.props.settings.productList.map(product => {
            return {
                id: product.id,
                name: product.value,
                checked: false
            };
        });
        const roleOptionsEdit = this.props.settings.roles.map(role => {
            return {
                id: role.id,
                name: role.value
            };
        });
        const responseOptionsEdit = this.props.settings.responses.map(rep => {
            return {
                id: rep.id,
                name: rep.value
            };
        });
        const mainCategoryOptionsEdit = this.props.settings.mainCategoryList.map(category => {
            return {
                id: category.mainCategoryID,
                name: category.settingName
            };
        });
        const subCategoryOptionsEdit = this.props.settings.subCategoryList.map(sub => {
            return {
                id: sub.subCategoryId,
                name: sub.settingName
            };
        });
        const subProductOptionsEdit = this.props.settings.subProductList.map(subProduct => {
            return {
                id: subProduct.mainCategoryID,
                name: subProduct.name
            };
        });
        const countryOptionsEdit = this.props.settings.countryList.map(country => {
            return {
                id: country.id,
                name: country.name
            };
        });
        const languageOptionsEdit = this.props.settings.languageList.map(language => {
            return {
                id: language.settingId,
                name: language.settingName
            };
        });
        const extensionOptionsEdit = this.props.settings.extensionList.map(extension => {
            return {
                id: extension.id,
                name: extension.value
            };
        });
        const statusOptionsEdit = this.props.settings.statusList.map(status => {
            return {
                id: status.settingId,
                name: status.settingName
            };
        });
        const bettypeOptionsEdit = this.props.settings.bettypeList.map(bettype => {
            return {
                id: bettype.id,
                name: bettype.value
            };
        });

        this.setState({
            communicationToolOptionsEdit: communicationToolOptionsEdit,
            productOptionsEdit: productOptionsEdit,
            roleOptionsEdit: roleOptionsEdit,
            responseOptionsEdit: responseOptionsEdit,
            mainCategoryOptionsEdit: mainCategoryOptionsEdit,
            subCategoryOptionsEdit: subCategoryOptionsEdit,
            subProductOptionsEdit: subProductOptionsEdit,
            countryOptionsEdit: countryOptionsEdit,
            languageOptionsEdit: languageOptionsEdit,
            extensionOptionsEdit: extensionOptionsEdit,
            statusOptionsEdit: statusOptionsEdit,
            bettypeOptionsEdit: bettypeOptionsEdit
        });
    }

    handleDataChange = (name, value) =>
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }));

    renderOptions = (item, key) => <option key={key} value={item.id}>{item.name}</option>;

    IsShowDetail = () => {
        this.setState(prevState => ({
            isShowDetail: !prevState.isShowDetail
        }));
    }

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.updateFeedbackResult &&
                        <ResponseMessage isSuccessful={this.props.updateFeedbackResult.isSuccessful}
                            message={this.props.updateFeedbackResult.message || LangHelper.getResource('UpdateFeedbackSuccess')}
                        />
                    }

                    <div class='panel-group'>
                        <div class='title customername'>{values.username}</div>
                        <div hidden> hello</div>
                    </div>
                    <div class='panel-group'>
                        <div class='title' onClick={this.IsShowDetail}>Details</div>
                        <div class='content' className={`${this.state.isShowDetail ? '' : 'consecutive-container-before'}`}>
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="feedbackDate">
                                            {LangHelper.getResource('FeedbackDate')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                                <DatePicker
                                                    selected={values.feedbackDate}
                                                    onChange={value => this.handleDataChange('feedbackDate', value)}
                                                    timeInputLabel="Time:"
                                                    dateFormat="MMM dd, yyyy hh:mm aa"
                                                    showTimeInput
                                                />
                                            </div>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Communication')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.communicationToolOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Product')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.productOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Response')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.responseOptionsEdit}
                                                onChange={e => this.onChange('response', e.target.value)}
                                            >
                                                {this.state.responseOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Role')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.roleOptionsEdit}
                                                onChange={e => this.onChange('role', e.target.value)}
                                            >
                                                {this.state.roleOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('ResolutionTime')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                                <DatePicker
                                                    selected={values.feedbackDate}
                                                    onChange={value => this.handleDataChange('feedbackDate', value)}
                                                    timeInputLabel="Time:"
                                                    dateFormat="MMM dd, yyyy hh:mm aa"
                                                    showTimeInput
                                                />
                                            </div>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Category')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.mainCategoryOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('SubProduct')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.subProductOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Language')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.languageOptionsEdit}
                                                onChange={e => this.onChange('language', e.target.value)}
                                            >
                                                {this.state.languageOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Country')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.countryOptionsEdit}
                                                onChange={e => this.onChange('country', e.target.value)}
                                            >
                                                {this.state.countryOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Station')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.extensionOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('SubCategory')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <MultipleSelect
                                                isInvalid={touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit}
                                                dataSource={this.state.subCategoryOptionsEdit}
                                                keyField='id'
                                                valueField='name'
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'All' }}
                                                isSummited={false}
                                                hasSearchBox
                                                onChange={(currentItem, selectedItemsKey) => {
                                                    handleChange('comunicationToolTypesEdit')(selectedItemsKey);
                                                }}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('BetType')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.bettypeOptionsEdit}
                                                onChange={e => this.onChange('bettype', e.target.value)}
                                            >
                                                {this.state.bettypeOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('Status')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control as="select" size="sm" className="shadow-none"
                                                value={this.state.statusOptionsEdit}
                                                onChange={e => this.onChange('status', e.target.value)}
                                            >
                                                {this.state.statusOptionsEdit.map(this.renderOptions)}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name">
                                            {LangHelper.getResource('NoOfInquiries')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control size="md" type="number" min="1" value={values.noInquiries} id="noInquiries" name="noInquiries"
                                                onChange={handleChange}
                                                className="shadow-none" autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = {
        };
        this.props.updateFeedback(data).then(() => {
            if (this.props.updateFeedbackResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const feedback = this.props.updateFeedbackPopup.data.item;
        const initialValues = {
            username: feedback.username,
            feedbackDate: new Date(DateTimeService.toShortDateTimeFormat(DateTimeService.toServerDateTime(feedback.feedbackDateString)))
        };
        return (
            <Modal show className="update-feedback-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateFeedback')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => (this.formik = p)}
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
    const { updateFeedbackPopup, updateFeedbackResult, settings } = state;
    return { updateFeedbackPopup, updateFeedbackResult, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFeedback);
