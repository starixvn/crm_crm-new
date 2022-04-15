import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import CkEditor from '@jsroot/components/ckeditor/index';


export class EditRemark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedPicsOption: []
        };
    }

    componentDidMount(){
        this.props.getAllSettings().then(() =>{
            const picOptions = this.props.allSettings.relatedPics.map(item =>{
                return {
                    id: item.id,
                    name: item.name,
                    checked: this.props.popupEdit.data.relatedPICs.includes(item.id)
                };
            });
            this.setState({relatedPicsOption: picOptions});
        });
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = {
            remarkID: this.props.popupEdit.data.remarkID,
            custID: this.props.popupEdit.data.custID,
            remark: values.remarkContent,
            remarkTitle: values.remarkTitle,
            relatedPICs: values.relatedPics,
            ext: values.extStation === '' ? null : parseInt(values.extStation, 10),
            handlerID: values.handledBy === '' ? null : parseInt(values.handledBy, 10),
            approverID: values.approvedBy === '' ? null : parseInt(values.approvedBy, 10),
            acknowledgerID: values.acknowledgedBy === '' ? null : parseInt(values.acknowledgedBy, 10),
            requester: values.requestedBy        
        };
        this.props.editNewRemarks(params).then(() => {
            if (this.props.editResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    validateFormik = values => {
        const errors = {};
        if(values.remarkTitle === ''){
            errors.remarkTitle = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle'));
        }

        if(values.remarkContent === ''){
            errors.remarkContent = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'));
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
                            message={editResult.message || LangHelper.getResource('CreateNewRemarkSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="12" md="12">
                            <span>Created By </span>
                            <span style={{fontWeight: 'bold'}}>{popupEdit.data.creator}</span>
                            <span>on </span>
                            <span style={{fontWeight: 'bold'}}>{DateTimeService.toLongDateTimeFormat(popupEdit.data.createdDate)}</span>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="remarkTitle">
                            {LangHelper.getResource('RemarkTitle')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.remarkTitle && errors.remarkTitle}
                                name="remarkTitle" id="remarkTitle"
                                onChange={handleChange}
                                value={values.remarkTitle}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {remarkTitles.map((value, key) => <option key={key} value={value.settingId}>{value.settingValue}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="relatedToPICs">
                            {LangHelper.getResource('RelatedToPICs')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <MultipleSelect
                                id="relatedToPICs"
                                name="relatedToPICs"
                                hasSearchBox
                                dataSource={this.state.relatedPicsOption}
                                keyField='id'
                                isAllTextShown
                                valueField='name'
                                statusField='checked'
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('relatedPics')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="requestedBy">
                            {LangHelper.getResource('RequestedBy')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control size="sm" type="text"
                                name="requestedBy" id="requestedBy"
                                value={values.requestedBy}
                                isInvalid={touched.requestedBy && errors.requestedBy}
                                className='shadow-none'
                                autoComplete="off"
                                onChange={handleChange}
                            /> 
                        </Col>
                        <Form.Label column sm="2" md="2" htmlFor="approvedBy">
                            {LangHelper.getResource('ApprovedBy')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.approvedBy && errors.approvedBy}
                                name="approvedBy" id="approvedBy"
                                onChange={handleChange}
                                value={values.approvedBy}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="2" md="2" htmlFor="acknowledgedBy">
                            {LangHelper.getResource('AcknowledgedBy')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.acknowledgedBy && errors.acknowledgedBy}
                                name="acknowledgedBy" id="acknowledgedBy"
                                onChange={handleChange}
                                value={values.acknowledgedBy}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="handledBy">
                            {LangHelper.getResource('HandledBy')}
                        </Form.Label>
                        <Col sm="2" md="2">
                        <Form.Control as="select" size="sm" className="shadow-none"
                            isInvalid={touched.handledBy && errors.handledBy}
                            name="handledBy" id="handledBy"
                            onChange={handleChange}
                            value={values.handledBy}
                        >
                            <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                        </Form.Control>
                        </Col>
                        <Form.Label column sm="2" md="2" htmlFor="extStation">
                            {LangHelper.getResource('ExtStation')}
                        </Form.Label>
                        <Col sm="2" md="2">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.extStation && errors.extStation}
                                name="extStation" id="extStation"
                                onChange={handleChange}
                                value={values.extStation}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {allSettings.extentions.map((value, key) => <option key={key} value={value.id}>{value.value}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="12" md="12" className="required">
                                {LangHelper.getResource('RemarkContent')}
                        </Form.Label>
                    </Form.Group>
                    <CkEditor
                        name='remarkContent'
                        isInvalid={touched.remarkContent && errors.remarkContent}
                        data={values.remarkContent}
                        username={window.currentUsername}
                        onChange={value => setFieldValue('remarkContent', value)}
                    />
                    <Form.Group as={Row}>
                        <Form.Label column sm="12" md="12">
                            <span>Updated By </span>
                            <span style={{fontWeight: 'bold'}}>{popupEdit.data.updater}</span>
                            <span>on </span>
                            <span style={{fontWeight: 'bold'}}>{DateTimeService.toLongDateTimeFormat(popupEdit.data.lastUpdate)}</span>
                        </Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
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
                    <Modal.Title as="div">{`Member ${data.userName} Remark ${data.remarkID}`}</Modal.Title>
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