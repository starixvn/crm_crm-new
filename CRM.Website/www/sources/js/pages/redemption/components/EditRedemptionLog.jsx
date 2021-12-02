import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy } from '@jsroot/common/constants';
import { validateFormik } from '../common.functions';
import CreateEditForm from './CreateEditForm';

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
        await this.props.getAllStatus();
        this.setState({
            redemptionLog: this.initFormikData(this.props.redemptionLog)
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
                setSubmitting(false);
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
                    <CreateEditForm
                        {...{ values, errors, touched, setFieldValue, handleChange }}
                        statuses={allStatus}
                    />
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
        const { allStatus } = this.props;
        if ( redemptionLog === null || allStatus === null ) {
            return null;
        }

        return (
            <div>
                <Modal show className="modal-edit-redemption" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={() => this.props.onClose(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditRedemptionLog')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={el => this.formik = el}
                        initialValues={redemptionLog}
                        validate={values => validateFormik(values)}
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
    const { allStatus, redemptionLog } = state;
    return { allStatus, redemptionLog };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRedemptionLog);
