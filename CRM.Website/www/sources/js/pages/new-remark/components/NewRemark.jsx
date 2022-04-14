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
import ConfirmPopup from '@jsroot/components/ConfirmPopup';


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
        const {username, isGuest} = this.props.gridParams;
        if(this.props.inputAddUsername === '' && username !== ''){
            this.props.validateUsername({username: username, isGuest: isGuest});
        }
    }

    // handleConfirmCancelPopup = event => {
    //     const { values } = this.formik;
    //     if (event) {
    //         event.preventDefault();
    //     }
    //     const initialValues = {
    //         picName: '',
    //         roleId: '',
    //         languageIds: '',
    //         countryId: 0,
    //         communication: null,
    //         remark: ''
    //     };
    //     if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
    //         this.handleClosePopup();
    //     } else {
    //         this.setState({ showConfirmClose: true });
    //     }
    // };

    // handleCloseConfirm = () => {
    //     this.setState({ showConfirmClose: false });
    // };

    // handleClosePopup = () => {
    //     this.props.setCreatePicPopup({ show: false });
    //     if (this.props.createPicResult) {
    //         this.props.setCreatePicResult(null);
    //     }
    // };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = this.getTemplateCreate(values);
        this.props.createPic(template).then(() => {
            if (this.props.createPicResult.isSuccessful) {
                setTimeout(() => {
                    this.handleClosePopup();
                    this.props.getGridData(this.props.gridParams);
                    this.props.setCreatePicResult(null);
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    handleValidate = values =>{
        if(values.username !== this.props.gridParams.username){
            this.setState({isFirstLoad: false}, () =>{
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
        const { remarkTitle, gridParams, inputAddUsername, validateResult } = this.props;
        const errorsFirstLoad = this.validateFirstLoadFormik(gridParams.username);
        const errorsValidate = this.validateFirstLoadFormik(inputAddUsername);
        const touchedFirstLoad = {username: true};
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
                        this.props.addResult &&
                        <ResponseMessage isSuccessful={this.props.addResult.isSuccessful}
                            message={this.props.addResult.message || LangHelper.getResource('InsertPICSuccess')}
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
                                <Col sm="1" md="1" className='mr-2 mt-1'>
                                    <Form.Check type="checkbox" label={LangHelper.getResource('Guest')}
                                        id='isGuest' name='isGuest'
                                        checked={values.isGuest}
                                        onChange={event => setFieldValue('isGuest', event.target.checked)}
                                    />
                                </Col>
                                <Col sm="2" md="2">
                                    <Button variant="primary" size="sm" onClick={() => this.handleValidate(values)}
                                        disabled={this.isValidUsername(values)}
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
                                disabled={!this.isValidUsername(values)}
                                value={values.remarkTitle}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {remarkTitle.map((value, key) => <option key={key} value={value.settingId}>{value.settingValue}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="picName">
                            {LangHelper.getResource('Name')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.picName}
                                name="picName" id="picName"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.picName && errors.picName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="roleId">
                            {LangHelper.getResource('Role')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.roleId && errors.roleId}
                                name="roleId" id="roleId"
                                onChange={handleChange}
                                value={values.roleId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.state.roles.map(item => renderOption(item, 'settingId', 'settingValue'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="languageIds">
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <MultipleSelect
                                id="languageIds"
                                name="languageIds"
                                dataSource={languages}
                                keyField='settingId'
                                isAllTextShown
                                valueField='settingValue'
                                statusField='checked'
                                onChange={(currentItem, selectedItemsKey) => {
                                    handleChange('languageIds')(selectedItemsKey);
                                }}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="countryId">
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.countryId && errors.countryId}
                                name="countryId" id="countryId"
                                onChange={handleChange}
                                value={values.countryId}
                            >
                                <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {countries.map(item => renderOption(item, 'id', 'name'))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="remark">
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="textarea"
                                name="remark" id="remark" rows="4"
                                className="shadow-none form-control"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group> */}
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
        const {gridParams, remarkTitle, validateResult} = this.props;
        const initialValues = {
            username: validateResult ? gridParams.username : '',
            isGuest: validateResult ? gridParams.isGuest : false,
            remarkTitle: ''
        };

        if(remarkTitle === null || !remarkTitle || (gridParams.username !== '' && validateResult === null)){
            return null;
        }

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
                {
                    this.state.showConfirmClose &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        onSubmit={this.handleClosePopup}
                        onClose={this.handleCloseConfirm}
                    />
                }
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarkTitle, gridParams, addResult, validateResult, inputAddUsername } = state;
    return {
        remarkTitle, gridParams, addResult, validateResult, inputAddUsername
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRemark);