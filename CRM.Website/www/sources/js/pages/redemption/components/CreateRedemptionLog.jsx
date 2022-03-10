import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { validateFormik } from '../common.functions';
import CreateEditForm from './CreateEditForm';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class CreateRedemptionLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createRedemptionResult: '',
            isShowCreateConfirm: false
        };
    }

    componentDidMount() {
        this.props.getSettings();
    }

    initFormikData = () => {
        return {
            subject: '',
            claimTime: new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime))),
            remark: '',
            statusId: this.props.settings.statuses[0].statusId,
            currencyId: 0,
            amount: 0,
            doneBy: ''
        };
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        Site.blockUI();
        const params = {
            customerId: this.props.id,
            subject: values.subject,
            remark: values.remark,
            claimTime: DateTimeService.toLongDateTimeFormat(DateTimeService.toServerDateTime(values.claimTime)),
            amount: parseInt(values.amount, 10),
            doneBy: values.doneBy,
            statusId: parseInt(values.statusId, 10),
            currencyId: parseInt(values.currencyId, 10)
        };
        this.props.createRedemptionLog(params).then(response => {
            Site.unblockUI();
            this.setState({ createRedemptionResult: response.data });
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
        const initDataCreate = this.initFormikData();
        const { values } = this.formik;
        if (
            initDataCreate.currencyId !== parseInt(values.currencyId, 10) ||
            initDataCreate.statusId !== parseInt(values.statusId, 10)
        ) {
            return true;
        }
        return false;
    };

    isNewEqualOldValue = () => {
        const initDataCreate = this.initFormikData();
        const { values } = this.formik;
        if (
            initDataCreate.amount !== values.amount ||
            initDataCreate.doneBy !== values.doneBy ||
            initDataCreate.remark !== values.remark ||
            initDataCreate.subject !== values.subject
        ) {
            return true;
        }
        return false;
    };

    onCloseCreatePopup = () => {
        if (this.isNewEqualOldId() || this.isNewEqualOldValue()) {
            this.setState({ isShowCreateConfirm: true });
        } else {
            this.props.onClose(false);
        }
    };

    closeCreateConfirm = () => {
        this.setState({ isShowCreateConfirm: false });
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
        const { createRedemptionResult } = this.state;
        const { settings } = this.props;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        createRedemptionResult &&
                        <ResponseMessage isSuccessful={createRedemptionResult.isSuccessful}
                            message={createRedemptionResult.message || LangHelper.getResource('CreateRedemptionLogSuccessfully')}
                        />
                    }
                    <CreateEditForm
                        statuses={settings}
                        {...{ values, errors, touched, setFieldValue, handleChange }}
                    />
                </Modal.Body >
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const { settings } = this.props;
        if ( settings === null ) {
            return null;
        }

        return (
            <div>
                <Modal className="modal-edit-redemption" show dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} centered size="xl"
                    onHide={this.onCloseCreatePopup}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('CreateRedemptionLog')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={el => this.formik = el}
                        initialValues={this.initFormikData()}
                        validate={values => validateFormik(values)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                    {
                        this.state.isShowCreateConfirm &&
                        <ConfirmPopup
                            size='md'
                            onClose={this.closeCreateConfirm}
                            onSubmit={() => this.props.onClose(false)}
                            title={LangHelper.getResource('ConfirmIgnoreChanges')}
                            content={
                                <div>
                                    <div>{LangHelper.formatString(LangHelper.getResource('ThereAreSomeChangesOnInput'),'redemption')}</div>
                                    <div>{LangHelper.getResource('ConfirmIgnoreTheseChanges')}</div>
                                </div>
                            }
                        />
                    }
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRedemptionLog);
