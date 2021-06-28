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

export class UpdateFeedback extends PureComponent {
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            communicationToolOptionsEdit: []
        };
    }

    static propTypes = {
    };

    componentDidMount() {

        const communicationToolOptionsEdit = this.props.settings.communicationToolList.map(tool => {
            return {
                id: tool.id,
                name: tool.settingName,
                checked: false
            };
        });

        this.setState({
            communicationToolOptionsEdit: communicationToolOptionsEdit
        });
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
                        <div class='title' required>Details</div>
                        <div class='content'>
                            <div class="row">
                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('FeedbackDate')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                                <DatePicker
                                                    //selected={values.feedbackDateString}
                                                    onChange={value => this.handleFeedbackDateChange(value)}
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
                                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
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
                                            {LangHelper.getResource('Product')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Response')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Role')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('ResolutionTime')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Category')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('SubProduct')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Language')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Country')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div class="col-xs-4 col-sm-4 col-md-4">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Station')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('SubCategory')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('BetType')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('Status')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5" md="4" htmlFor="name" className="required">
                                            {LangHelper.getResource('NoOfInquiries')}
                                        </Form.Label>
                                        <Col sm="7" md="8">
                                            <Form.Control type="text" size="sm" value={values.notificationTypeName} name="notificationTypeName" id="name"
                                                className="shadow-none" autoComplete="off"
                                                isInvalid={touched.notificationTypeName && errors.notificationTypeName}
                                                onChange={handleChange}
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
            feedbackDateString: feedback.feedbackDate
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
