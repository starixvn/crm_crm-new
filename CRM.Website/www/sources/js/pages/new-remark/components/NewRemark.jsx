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
        gridParams: {username: '', isGuest: false},
        validateResult: {isSuccessful: false}
    };
    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            showConfirmClose: false,
            isFirstLoad: true
        };
    }

    componentDidMount(){
        this.props.getAllSettings();
        const {username, isGuest} = this.props.gridParams;
        if(this.props.inputAddUsername === '' && username !== ''){
            this.props.validateUsername({username: username, isGuest: isGuest});
        }
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const params = {
            username: values.username,
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

    handleValidate = values =>{
        if(values.username !== this.props.gridParams.username){
            this.setState({isFirstLoad: false}, () =>{
                if(this.formik.errors !== null){
                    this.formik.errors.username = '';
                }
                this.props.setInputAddUsername(values.username);
                this.props.validateUsername({username: values.username, isGuest: values.isGuest});
            });
        }
    };

    validateFirstLoadFormik = username => {
        const errors = {};
        if(username !== '' && !this.props.validateResult.isSuccessful){
            errors.username = `Username ${username} is not valid`;
        }
        return errors;
    };

    validateFormik = values => {
        const errors = {};
        if(values.username !== this.props.inputAddUsername && this.props.customerName === ''){
            errors.username = LangHelper.getResource('UsernameIsChanged');
        }

        if(values.username === ''){
            errors.username = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Username'));
        }

        if(values.remarkTitle === ''){
            errors.remarkTitle = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle'));
        }

        if(values.remarkContent === ''){
            errors.remarkContent = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'));
        }
        return errors;
    };

    isValidUsername = values =>{
       const {validateResult, gridParams, inputAddUsername} = this.props;
       return  validateResult.isSuccessful && (values.username === inputAddUsername || values.username === gridParams.username);
    };

    initUserName = (validateResult, username, customerName) => {
        let initUsername = '';
        if(customerName !== '')
        {
            initUsername =  customerName;
        }else{
            initUsername = validateResult ? username : '';
        }
        return initUsername;
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
        const { allSettings, remarkTitles, gridParams, inputAddUsername } = this.props;
        const errorsFirstLoad = this.validateFirstLoadFormik(gridParams.username);
        const errorsValidate = this.validateFirstLoadFormik(inputAddUsername);
        const touchedFirstLoad = {username: true};
        const isValidUsername =  this.isValidUsername(values);
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    {
                        gridParams.username !== '' && this.state.isFirstLoad && errorsFirstLoad.username !== '' &&
                        <FormikErrorMessage touched={touchedFirstLoad} errors={errorsFirstLoad} fieldNames={Object.keys(values)} />
                    }
                    {
                        inputAddUsername !== '' && !this.state.isFirstLoad && errorsValidate.username !== '' &&
                        <FormikErrorMessage touched={touchedFirstLoad} errors={errorsValidate} fieldNames={Object.keys(values)} />
                    }
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createResult &&
                        <ResponseMessage isSuccessful={this.props.createResult.isSuccessful}
                            message={this.props.createResult.message || LangHelper.getResource('CreateNewRemarkSuccessfully')}
                        />
                    }
                   <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="username">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Row>
                                <Col>
                                    <Form.Control size="sm" type="text"
                                        name="username" id="username"
                                        value={values.username}
                                        isInvalid={touched.username && errors.username}
                                        className='shadow-none'
                                        autoComplete="off"
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm="1" md="1" className='mr-2 mt-1'  controlId="newCheckboxGuest">
                                    <Form.Check type="checkbox" label={LangHelper.getResource('Guest')}
                                        id='isGuest' name='isGuest'
                                        checked={values.isGuest}
                                        onChange={event => setFieldValue('isGuest', event.target.checked)}
                                    />
                                </Col>
                                <Col sm="2" md="2">
                                    <Button variant="primary" size="sm" onClick={() => this.handleValidate(values)}
                                        disabled={isValidUsername}
                                    >
                                        {LangHelper.getResource('Validate')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    {
                        <RemarkInfo
                            touched = {touched} errors={errors} values = {values}
                            handleChange = {handleChange} remarkTitles = {remarkTitles} setFieldValue = {setFieldValue}
                            relatedPicsOption = {allSettings.relatedPics} allSettings = {allSettings} isValidUsername={isValidUsername}
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

     renderFormFromCustomer = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const { allSettings, remarkTitles } = this.props;
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
                        <Form.Label column sm="2" md="2" className="required" htmlFor="username">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Row>
                                <Col>
                                    <Form.Control size="sm" type="text"
                                        name="username" id="username"
                                        value={values.username}
                                        className='shadow-none'
                                        disabled
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm="1" md="1" className='mr-2 mt-1'  controlId="newCheckboxGuest">
                                    <Form.Check type="checkbox" label={LangHelper.getResource('Guest')}
                                        id='isGuest' name='isGuest'
                                        disabled
                                    />
                                </Col>
                                <Col sm="2" md="2">
                                    <Button variant="primary" size="sm" disabled>
                                        {LangHelper.getResource('Validate')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    {
                        <RemarkInfo
                            touched = {touched} errors={errors} values = {values}
                            handleChange = {handleChange} remarkTitles = {remarkTitles} setFieldValue = {setFieldValue}
                            relatedPicsOption = {allSettings.relatedPics} allSettings = {allSettings} isValidUsername
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
        const {gridParams, allSettings, validateResult, customerName} = this.props;

        if(allSettings === null || !allSettings || (gridParams.username !== '' && validateResult === null)){
            return null;
        }

        const initialValues = {
            username: this.initUserName(validateResult, gridParams.username, customerName),
            isGuest: validateResult ? gridParams.isGuest : false,
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
                    {customerName === '' ? this.renderForm : this.renderFormFromCustomer}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, remarkTitles, gridParams, createResult, validateResult, inputAddUsername } = state;
    return {
        allSettings, remarkTitles, gridParams, createResult, validateResult, inputAddUsername
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRemark);