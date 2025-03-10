import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

export class EditReasonPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedReason: props.reasonId,
            reasonOptions: null,
            editResult: null,
            isSubmitting: false
        };
    }

    async componentDidMount() {
        const url = Site.resolveClientUrl('NotificationCenter/GetReasonSettingOptions');
        await DataService.getDataAsync(url).then(response => {
            this.setState({
                reasonOptions: response.data
            });
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);;
    };

    handleChangeReason = event => {
        const value = event.target.value;
        this.setState({
            selectedReason: value
        });
    };

    validateFormik = values => {
        const errors = {};

        if (!values.reasonSettingId) {
            errors.reasonSettingId = 'Please select reason';
        }
        return errors;
    }

    handleSubmit = async values => {
        this.setState({ isSubmitting: true });
        const params = {
            notificationId: this.props.notificationId,
            reasonSettingId: parseInt(values.reasonSettingId, 10)
        };
        const url = Site.resolveClientUrl('NotificationCenter/EditResultAdmNotificationReason');
        await DataService.postDataAsync(url, params).then(response => {
            this.setState({ editResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose(true);
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        }).catch(Site.handleAxiosError);
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleSubmit
    }) => {
        const { editResult, reasonOptions, isSubmitting } = this.state;

        if (reasonOptions === null) {
            return null;
        }
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        editResult &&
                        <ResponseMessage isSuccessful={editResult.isSuccessful}
                            message={editResult.message || LangHelper.getResource('UpdateReasonSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" htmlFor="reason" >
                            {LangHelper.getResource('Reason')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" className="shadow-none reason-id-select" name='reasonSettingId' id='reasonSettingId'
                                value={values.reasonSettingId}
                                onChange={this.handleChangeReason} >
                                <option value="0" hidden disabled />
                                {
                                    reasonOptions.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name}</option>)
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button size="sm" type="button" variant="primary" onClick={() => this.props.onClose(false)}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    

    render() {
        const { selectedReason } = this.state;
        const initialValues = {
            reasonSettingId: selectedReason
        };
        return (
            <Modal show className="edit-no-of-inquiry-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="md" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateRemark')}</Modal.Title>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validate={values => this.validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}

export default EditReasonPopup;