import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy } from '@jsroot/common/constants';

export class EditRedemptionLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redemptionLog: null,
            editRedemptionResult: ''
        };
    }

    async componentDidMount() {
        await this.props.getLogById({ id: this.props.logId });
        await this.props.getAllStatus({ isEdit: true });
        this.setState({
            redemptionLog: this.initFormikData(this.props.logDetail)
        });
    }

    initFormikData = data => {
        return {
            id: data.id,
            subject: data.subject,
            claimTime: new Date(data.claimTime),
            remark: data.remark,
            statusId: data.statusId,
            currencyId: data.currencyId,
            amount: data.amount,
            doneBy: data.doneBy
        };
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        Site.blockUI();
        const params = {
            id: values.id,
            subject: values.subject,
            claimTime: DateTimeService.toLongDateTimeFormat(DateTimeService.toServerDateTime(values.claimTime)),
            remark: values.remark,
            statusId: parseInt(values.statusId, 10),
            currencyId: parseInt(values.currencyId, 10),
            amount: parseInt(values.amount, 10),
            doneBy: values.doneBy
        };
        this.props.editRedemptionLog(params).then(response => {
            Site.unblockUI();
            this.setState({ editRedemptionResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose(true);
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting
    }) => {
        const { editRedemptionResult } = this.state;
        const { allStatus } = this.props;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        editRedemptionResult &&
                        <ResponseMessage isSuccessful={editRedemptionResult.isSuccessful}
                            message={editRedemptionResult.message || LangHelper.getResource('UpdateRedemptionLogSuccessfully')}
                        />
                    }
                    <div className="panel-group border-bottom-0">
                        <div className="panel-content">
                            <Form.Group as={Row}>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="ClaimedTime">{LangHelper.getResource('ClaimedTime')}</Form.Label>
                                        <Col md="7" sm="7" className="react-datepicker-wrapper-container form-control-wrapper">
                                            <DatePicker
                                                selected={values.claimTime}
                                                onChange={value => setFieldValue('claimTime', value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="currencyId">{LangHelper.getResource('Currency')}</Form.Label>
                                        <Col sm="7" md="7">
                                            <Form.Control as="select" className="shadow-none"
                                                name="currencyId" id="currencyId" size="sm"
                                                value={values.currencyId} onChange={handleChange}
                                            >
                                                {
                                                    allStatus.currencies.map((value,key) => <option key={key} value={value.id}>{value.name}</option>)
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="doneBy" className="required">{LangHelper.getResource('DoneBy')}</Form.Label>
                                        <Col md="7" sm="7">
                                            <Form.Control type="text" className="shadow-none"
                                                name="doneBy" id="doneBy" size="sm"
                                                value={values.doneBy}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="amount">{LangHelper.getResource('Amount')}</Form.Label>
                                        <Col sm="7" md="7">
                                            <Form.Control type="text" className="shadow-none"
                                                name="amount" id="amount" size="sm"
                                                value={values.amount}
                                                onChange={handleChange}
                                            />
                                            </Col>
                                    </Form.Group>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="subject" className="required">{LangHelper.getResource('Subject')}</Form.Label>
                                        <Col md="7" sm="7">
                                            <Form.Control type="text" className="shadow-none"
                                                name="subject" id="subject" size="sm"
                                                value={values.subject}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm="6" md="6">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4" md="4" htmlFor="statusId">{LangHelper.getResource('Status')}</Form.Label>
                                        <Col sm="7" md="7">
                                            <Form.Control as="select" className="shadow-none"
                                                name="statusId" id="statusId" size="sm"
                                                value={values.statusId} onChange={handleChange}
                                            >
                                                {
                                                    allStatus.statuses.map((value,key) => <option key={key} value={value.statusId}>{value.name}</option>)
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="panel-remark">
                            <Form.Group className="panel-title">
                                <Form.Label className="required">{LangHelper.getResource('Remark')}</Form.Label>
                            </Form.Group>
                            <div className="panel-content">
                                <CkEditor isInvalid={touched.remark && errors.remark}
                                    data={values.remark} username={window.currentUsername}
                                    onChange={value => setFieldValue('remark', value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    {
                        window.createUpdateFeedbackPermission === Policy.Host && (
                            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                                {LangHelper.getResource('Save')}
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const { redemptionLog } = this.state;
        if ( redemptionLog === null ) {
            return null;
        }

        return (
            <div>
                <Modal show className="modal-edit-redemption" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={() => this.props.onClose(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditMultipleLogs')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={el => this.formik = el}
                        initialValues={redemptionLog}
                        validate={values => this.validateFormik(values)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allStatus, logDetail } = state;
    return { allStatus, logDetail };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRedemptionLog);
