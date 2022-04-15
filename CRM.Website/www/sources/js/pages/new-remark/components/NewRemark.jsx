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
import CkEditor from '@jsroot/components/ckeditor/index';


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
                    this.props.onClose();
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
    }

    validateFirstLoadFormik = username => {
        const errors = {};
        if(username !== '' && !this.props.validateResult.isSuccessful){
            errors.username = `Username ${username} is not valid`;
        }
        return errors;
    };

    validateFormik = values => {
        const errors = {};
        if(values.username !== this.props.inputAddUsername){
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
    }

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
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="remarkTitle">
                            {LangHelper.getResource('RemarkTitle')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.remarkTitle && errors.remarkTitle}
                                name="remarkTitle" id="remarkTitle"
                                onChange={handleChange}
                                disabled={!isValidUsername}
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
                                isDisable={!isValidUsername}
                                dataSource={allSettings.relatedPics}
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
                    <div className={!isValidUsername ? 'disable-content' : ''}>
                        <CkEditor
                            name='remarkContent'
                            isInvalid={touched.remarkContent && errors.remarkContent}
                            data={values.remarkContent}
                            username={window.currentUsername}
                            onChange={value => setFieldValue('remarkContent', value)}
                        />
                    </div>
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
        const {gridParams, allSettings, validateResult} = this.props;

        if(allSettings === null || !allSettings || (gridParams.username !== '' && validateResult === null)){
            return null;
        }

        const initialValues = {
            username: validateResult ? gridParams.username : '',
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
                    {this.renderForm}
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