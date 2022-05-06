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
import RemarkInfo from './RemarkInfo';

export class NewRemark extends Component {
    static defaultProps = {
        gridParams: {username: '', isGuest: false}
    };
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            showConfirmClose: false,
            customerValidated: '',
            isValidCustomer: this.props.customerName !== '',
            relatedPicsOption: []
        };
    }

    componentDidMount(){
        this.props.getAllSettings();
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = {
            custId: this.state.customerValidated.custId,
            remark: values.remarkContent,
            remarkTitle: values.remarkTitle,
            relatedPICs: values.relatedPics,
            ext: values.extStation === '' ? null : parseInt(values.extStation, 10),
            handlerID: values.handledBy === '' ? null : parseInt(values.handledBy, 10),
            approverID: values.approvedBy === '' ? null : parseInt(values.approvedBy, 10),
            acknowledgerID: values.acknowledgedBy === '' ? null : parseInt(values.acknowledgedBy, 10),
            requester: values.requestedBy
        };
        this.props.createNewRemarks(params).then(() => {
            if (this.props.createResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    handleValidateCustomer = (username, isGuest, setFieldValue) =>{
        if(this.state.customerValidated.val === username){
            return;
        }
        this.props.validateUsername({username, isGuest}).then(()=>{
            setFieldValue('username', '');
            if(this.props.validateResult.length > 0){
                const customerValidated = this.props.validateResult[0];
                const isValidCustomer = customerValidated.custId !== 0 && !customerValidated.isLicensee;
                if(this.formik.errors !== null && isValidCustomer){
                    this.formik.errors.username = '';
                }

                if(isValidCustomer){
                    this.props.getRelatedPics({custId: customerValidated.custId}).then(response =>{
                        this.setState({relatedPicsOption: response});
                    });
                }
                this.setState({customerValidated , isValidCustomer});
            }
        });
    }

    validateFormik = values => {
        const errors = {};
        if(!this.state.isValidCustomer){
            errors.username = LangHelper.getResource('UsernameIsNotValid');
        }

        if(values.username !== '' && this.props.validateResult === null && this.props.customerName === ''){
            errors.username = LangHelper.getResource('UsernameIsChanged');
        }

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
        const { allSettings, remarkTitles, customerName} = this.props;
        const {customerValidated, isValidCustomer} = this.state;
        const isDisabled = customerName !== '';
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createResult &&
                        <ResponseMessage
                            message={this.props.createResult.message || LangHelper.getResource('CreateNewRemarkSuccessfully')}
                            isSuccessful={this.props.createResult.isSuccessful}
                        />
                    }
                   <Form.Group as={Row}>
                        <Form.Label className='pr-4 ml-4 col-form-label required' htmlFor="username">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <div className='width-multiple-select'>
                            <Row>
                                <Col>
                                    <Form.Control size="sm" type="text"
                                        name="username" id="username"
                                        value={values.username}
                                        isInvalid={touched.username && errors.username}
                                        className='shadow-none'
                                        disabled={isDisabled}
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm="1" md="1" className='mr-2 mt-1'  controlId="newCheckboxGuest">
                                    <Form.Check type="checkbox" label={LangHelper.getResource('IsGuest')}
                                        id='isGuest' name='isGuest'
                                        disabled={isDisabled}
                                        onChange={event => setFieldValue('isGuest', event.target.checked)}
                                    />
                                </Col>
                                <Col sm="2" md="2">
                                    <Button variant="primary" size="sm" 
                                        disabled={values.username==='' || isDisabled}
                                        onClick={() => this.handleValidateCustomer(values.username, values.isGuest, setFieldValue )}
                                    >
                                        {LangHelper.getResource('Validate')}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label className='pr-4 ml-4 col-form-label' />
                        <div className="validShow mr-5">
                            {LangHelper.getResource('Valid')}
                        </div>
                        <div className="invalidShow">
                            {LangHelper.getResource('Invalid')}
                        </div>
                    </Form.Group>
                    {
                        this.state.customerValidated !== '' &&
                        <Form.Group as={Row}>
                            <Form.Label className='pr-4 ml-4 col-form-label' />
                            <div className='form-group-customer'>
                                <div className={`txt-${isValidCustomer ? 'valid' : 'invalid'}`}>{customerValidated.val}</div>
                            </div>
                        </Form.Group>
                    }
                    {
                        <RemarkInfo
                            touched = {touched} errors={errors} values = {values}
                            handleChange = {handleChange} remarkTitles = {remarkTitles} setFieldValue = {setFieldValue}
                            relatedPicsOption = {this.state.relatedPicsOption} allSettings = {allSettings} isValidCustomer = {isValidCustomer}
                        />
                    }
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
        const {gridParams, allSettings, customerName} = this.props;

        if(allSettings === null || !allSettings){
            return null;
        }

        const initialValues = {
            username: customerName !== '' ? customerName : gridParams.username,
            isGuest: gridParams.isGuest,
            remarkTitle: '',
            relatedPics: '',
            requestedBy: '',
            approvedBy: '',
            acknowledgedBy: '',
            handledBy: allSettings.userId,
            extStation: '',
            remarkContent: ''
        };

        return (
            <Modal show className="new-remark-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('AddNewRemark')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={p => this.formik = p}
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
    const { allSettings, relatedPics, remarkTitles, gridParams, createResult, validateResult } = state;
    return {
        allSettings, relatedPics, remarkTitles, gridParams, createResult, validateResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRemark);