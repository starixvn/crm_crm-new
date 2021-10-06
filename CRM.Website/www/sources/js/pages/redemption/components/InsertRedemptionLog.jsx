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
import RenderFormEditInsert from './RenderFormEditInsert';

export class InsertRedemptionLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            insertRedemptionResult: ''
        };
    }

    async componentDidMount() {
        this.props.getStatusForInsert();
    }

    initFormikData = () => {
        return {
            subject: '',
            claimTime: new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime))),
            remark: '',
            statusId: this.props.statusForInsert.statuses[0].statusId,
            currencyId: 0,
            amount: 0,
            doneBy: ''
        };
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        Site.blockUI();
        const params = {
            customerId: 1754,
            subject: values.subject,
            remark: values.remark,
            claimTime: DateTimeService.toLongDateTimeFormat(DateTimeService.toServerDateTime(values.claimTime)),
            amount: parseInt(values.amount, 10),
            doneBy: values.doneBy,
            statusId: parseInt(values.statusId, 10),
            currencyId: parseInt(values.currencyId, 10),
        };
        this.props.insertRedemptionLog(params).then(response => {
            Site.unblockUI();
            this.setState({ insertRedemptionResult: response.data });
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
        const { insertRedemptionResult } = this.state;
        const { statusForInsert } = this.props;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        insertRedemptionResult &&
                        <ResponseMessage isSuccessful={insertRedemptionResult.isSuccessful}
                            message={insertRedemptionResult.message || LangHelper.getResource('InsertRedemptionLogSuccessfully')}
                        />
                    }
                    <RenderFormEditInsert
                        statuses={statusForInsert}
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
        const { statusForInsert } = this.props;
        if ( statusForInsert === null ) {
            return null;
        }

        return (
            <div>
                <Modal className="modal-edit-redemption" show dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} centered size="xl"
                    onHide={() => this.props.onClose(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('InsertRedemptionLog')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={el => this.formik = el}
                        initialValues={this.initFormikData()}
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
    const { statusForInsert } = state;
    return { statusForInsert };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertRedemptionLog);
