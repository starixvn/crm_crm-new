import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import RemarkInfo from './RemarkInfo';

export class EditRemark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedPicsOption: [],
            isNoChange: false
        };
    }

    componentDidMount(){
        const data = this.props.popupEdit.data;
        this.props.getAllSettings();
        this.props.getRelatedPics({custId: data.custID}).then(response =>{
            const picOptions = response.map(item =>{
                return {
                    picID: item.picID,
                    username: item.username,
                    checked: data.relatedPICs !== null && data.relatedPICs.includes(item.picID)
                };
            });
            this.setState({relatedPicsOption: picOptions});
        });
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        this.setState({isNoChange: false});
        const isChanged = this.isChangedValue(values);
        if(!isChanged){
            setSubmitting(false);
            this.setState({isNoChange: true});
            return;
        }
        const params = {
            remarkID: this.props.popupEdit.data.remarkID,
            custID: this.props.popupEdit.data.custID,
            remark: values.remarkContent,
            remarkTitle: values.remarkTitle,
            acknowledgerID: values.acknowledgedBy === '' ? null : parseInt(values.acknowledgedBy, 10),
            relatedPICs: values.relatedPics === '' ? null : values.relatedPics,
            ext: values.extStation === '' ? null : parseInt(values.extStation, 10),
            handlerID: values.handledBy === '' ? null : parseInt(values.handledBy, 10),
            approverID: values.approvedBy === '' ? null : parseInt(values.approvedBy, 10),
            requester: values.requestedBy === '' ? null : values.requestedBy
        };

        this.props.editNewRemarks(params).then(() => {
            if (this.props.editResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    isChangedValue = values => {
        const data = this.props.popupEdit.data;
        const oldValue = {
            remarkTitle: parseInt(data.remarkTitle, 10),
            relatedPics: data.relatedPICs,
            requestedBy: data.requester,
            approvedBy: data.approverID === 0 ? '' : data.approverID.toString(),
            acknowledgedBy: data.acknowledgerID === 0 ? '' : data.acknowledgerID.toString(),
            handledBy: data.handlerID === 0 ? '' : data.handlerID.toString(),
            extStation: data.ext === 0 ? '' : data.ext.toString(),
            remarkContent: data.remark
        };

        const newValue = {
            remarkTitle: values.remarkTitle,
            relatedPics: values.relatedPics,
            requestedBy: values.requestedBy,
            approvedBy: values.approvedBy,
            acknowledgedBy: values.acknowledgedBy,
            handledBy: values.handledBy,
            extStation: values.extStation,
            remarkContent: values.remarkContent
        };

        const isChange = JSON.stringify(oldValue) !== JSON.stringify(newValue);
        return isChange;
    };

    validateFormik = values => {
        const errors = {};
        const remarkTitleId = parseInt(this.props.popupEdit.data.remarkTitle, 10);
        if(values.remarkTitle === '' || values.remarkTitle === null){
            if(remarkTitleId > 0){
                errors.remarkTitle = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle'));
            }else{
                errors.remarkTitle = LangHelper.getResource('RemarkTitleMigrateRequired');
            }
        }

        if(values.remarkContent === '' || values.remarkContent === null){
            if(remarkTitleId > 0){
                errors.remarkContent = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'));
            }else{
                errors.remarkContent = LangHelper.getResource('RemarkContentMigrateRequired');
            }
        }
        return errors;
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const { allSettings, remarkTitles, popupEdit, editResult } = this.props;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        editResult &&
                        <ResponseMessage isSuccessful={editResult.isSuccessful}
                            message={editResult.message || LangHelper.getResource('EditNewRemarkSuccessfully')}
                        />
                    }
                    {
                        this.state.isNoChange &&
                        <ResponseMessage isSuccessful={false}
                            message={LangHelper.getResource('ThereIsNoChangeValue')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="12" md="12">
                            <span>Created By </span>
                            <span style={{fontWeight: 'bold'}}>{popupEdit.data.creator}</span>
                            <span> on </span>
                            <span style={{fontWeight: 'bold'}}>{DateTimeService.toLongDateTimeFormat(popupEdit.data.createdDate)}</span>
                        </Form.Label>
                    </Form.Group>
                    {
                        <RemarkInfo
                            touched = {touched} errors={errors} values = {values}
                            handleChange = {handleChange} remarkTitles = {remarkTitles} setFieldValue = {setFieldValue}
                            relatedPicsOption = {this.state.relatedPicsOption} allSettings = {allSettings} isValidCustomer
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="12" md="12">
                            <span>Updated By </span>
                            <span style={{fontWeight: 'bold'}}>{popupEdit.data.updater}</span>
                            <span> on </span>
                            <span style={{fontWeight: 'bold'}}>{DateTimeService.toLongDateTimeFormat(popupEdit.data.lastUpdate)}</span>
                        </Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !popupEdit.isViewHistory &&
                        <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    }
                    <Button variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const {allSettings, popupEdit} = this.props;

        if(allSettings === null || !allSettings || popupEdit.data === null){
            return null;
        }
        const data = popupEdit.data;

        const initialValues = {
            remarkTitle: parseInt(data.remarkTitle, 10),
            relatedPics: data.relatedPICs,
            requestedBy: data.requester,
            approvedBy: data.approverID === 0 ? '' : data.approverID.toString(),
            acknowledgedBy: data.acknowledgerID === 0 ? '' : data.acknowledgerID.toString(),
            handledBy: data.handlerID === 0 ? '' : data.handlerID.toString(),
            extStation: data.ext === 0 ? '' : data.ext.toString(),
            remarkContent: data.remark
        };

        return (
            <Modal show className="edit-remark-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{`${data.userName} > Remark ${data.remarkID}`}</Modal.Title>
                </Modal.Header>
                <Formik
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
    const { allSettings, remarkTitles, gridParams, editResult, popupEdit } = state;
    return {
        allSettings, remarkTitles, gridParams, editResult, popupEdit
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRemark);