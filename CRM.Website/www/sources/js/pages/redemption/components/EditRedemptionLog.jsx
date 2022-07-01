import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy } from '@jsroot/common/constants';
import { validateFormik } from '../common.functions';
import CreateEditForm from './CreateEditForm';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class EditRedemptionLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redemptionLog: null,
            editRedemptionResult: '',
            allStatus: null,
            isShowEditConfirm: false
        };
    }

    async componentDidMount() {
        Site.blockUI();
        const urlGetLogById = 'Redemption/GetLogById';
        const urlGetAllStatus = 'Redemption/GetAllStatus?isEdit=true';
        await DataService.getDataAsync(urlGetLogById, { id: this.props.logId }).then(response => {
            this.setState({
                redemptionLog: this.initFormikData(response.data)
            });
        }).then(() => Site.unblockUI());

        await DataService.getDataAsync(urlGetAllStatus).then(response => {
            this.setState({ allStatus: response.data });
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

    handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        Site.blockUI();
        const url = 'Redemption/EditRedemptionLog';
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
        await DataService.postDataAsync(url, params).then(response => {
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

    isNewEqualOldId = () => {
        const { values } = this.formik;
        const { redemptionLog } = this.state;
        if (
            redemptionLog.currencyId !== parseInt(values.currencyId, 10) ||
            redemptionLog.statusId !== parseInt(values.statusId, 10)
        ) {
            return true;
        }
        return false;
    };

    isNewEqualOldValue = () => {
        const { values } = this.formik;
        const { redemptionLog } = this.state;
        if (
            redemptionLog.amount !== values.amount ||
            redemptionLog.doneBy !== values.doneBy ||
            redemptionLog.remark !== values.remark ||
            redemptionLog.subject !== values.subject
        ) {
            return true;
        }
        return false;
    };

    onCloseEditPopup = () => {
        if (this.isNewEqualOldId() || this.isNewEqualOldValue()) {
            this.setState({ isShowEditConfirm: true });
        } else {
            this.props.onClose(false);
        }
    };

    closeEditConfirm = () => {
        this.setState({ isShowEditConfirm: false });
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
        const { editRedemptionResult, allStatus } = this.state;

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
                        this.props.createUpdateFeedbackPermission === Policy.Host && (
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
        const { redemptionLog, allStatus, isShowEditConfirm } = this.state;
        if ( redemptionLog === null || allStatus === null ) {
            return null;
        }

        return (
            <div>
                <Modal show className="modal-edit-redemption" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={this.onCloseEditPopup}
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
                    {
                        isShowEditConfirm &&
                        <ConfirmPopup
                            size='md'
                            title={LangHelper.getResource('ConfirmIgnoreChanges')}
                            content={
                                <div>
                                    <div>{LangHelper.formatString(LangHelper.getResource('ThereAreSomeChangesOnInput'),'redemption')}</div>
                                    <div>{LangHelper.getResource('ConfirmIgnoreTheseChanges')}</div>
                                </div>
                            }
                            onClose={this.closeEditConfirm}
                            onSubmit={() => this.props.onClose(false)}
                        />
                    }
                </Modal>
            </div>
        );
    }
}

export default EditRedemptionLog;
