import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import { Languages }from '@jsroot/common/constants';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

export default class CreateNewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'EN',
            createMessageResult: null,
            confirmPopup: {isShowing: false, params: null}
        };
    }

    handleChangeTab = selected => this.setState({tab: selected});

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.state.createMessageResult &&
                        <ResponseMessage isSuccessful={this.state.createMessageResult.isSuccessful}
                            message={this.state.createMessageResult.message || LangHelper.getResource('AddSendMessageSMASuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" htmlFor="title"
                        >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.title}
                                name="title" id="title"
                                className="shadow-none" autoComplete="off"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3"
                            className="required" htmlFor="username"
                        >
                            {LangHelper.getResource('SMAUsernames')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="textarea" size="sm" value={values.username}
                                name="username" id="username"
                                autoComplete="off" className="required shadow-none"
                                isInvalid={touched.username && errors.username}
                                onPaste={event => this.onPasteUsernameHandler(event, values.username, setFieldValue)}
                                onChange={handleChange}
                            />
                            <div className='pt-1'>{LangHelper.getResource('MaximumSMAUsernameInput')}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3"
                            className="required" htmlFor="content"
                        >
                            {LangHelper.getResource('Content')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <div className='pb-1'>{LangHelper.getResource('ContentSendMessageSMA')}</div>
                            <Tabs
                                className='languages-text'
                                id="controlled-tab"
                                activeKey={this.state.tab}
                                onSelect={selected => this.handleChangeTab(selected)}
                            >
                                {
                                    Languages !== null && Languages.map((item, key) => {
                                    return (
                                        <Tab key={key} eventKey={item} title={item}>
                                            <Form.Control as="textarea" className="shadow-none form-control"
                                                value={values['language_' + item]}
                                                name={'language_' + item} id={'language_' + item} rows="4"
                                                isInvalid={touched['language_' + item] && errors['language_' + item]}
                                                onChange={handleChange}
                                            />
                                        </Tab>
                                    );
                                })
                                }
                            </Tabs>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Save')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.handleResetField}>{LangHelper.getResource('Reset')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    initialValues = () =>{
        const initialValues = {
            title: '',
            username: ''
        };
        Languages !== null && Languages.map(item => {
            initialValues['language_' + item] = '';
        });
        return initialValues;
    }

    handleResetField = () =>{
        this.formik.resetForm();
    }

    validateFormik = values => {
        const errors = {};
        const isValidLengthUsername = this.validateUsernameInput(values.username);
        if (values.username === '') {
            errors.username = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SMAUsernames'));
        }

        if(isValidLengthUsername){
            errors.username = 'SMA usernames must not over 50 characters long!';
        }

        if(values.language_EN === ''){
            errors.language_EN = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('ContentEN'));
        }

        return errors;
    };

    validateUsernameInput = username =>{
        const customersInput = username.trim()
            .replace(/,\s+/g, ',').replace(/^,+|,+$/g, '').replace(/,{2,}/g, ',').split(',');
        return customersInput.length > 50;
    }

    onPasteUsernameHandler = (event, usernames, setFieldValue) => {
        const usernamesTrim = usernames.trim();
        const items = (event.clipboardData || window.clipboardData).getData('text').replace(/ /g, ',')
            .replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',').split(',').filter(item => item !== '');
        setTimeout(() => {
            const usernamesInput = (usernamesTrim.length > 0 ? usernamesTrim + ',' : '').concat(items.join(','));
            setFieldValue('username', usernamesInput);
        }, 100);
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = {
            title: values.title,
            Usernames: values.username,
            contents: []
        };
        Languages.map(item => {
            template.contents.push({
                content: values['language_' + item]
            });
        });

        this.handleConfirmAddMessage(template);
    };

    handleConfirmAddMessage = params =>{
        this.setState({confirmPopup: {isShow: true, params}});
    }

    handleCancelConfirmAddMessage = () =>{
        this.setState({confirmPopup: {isShow: false, params: null}});
        this.formik.setSubmitting(false);
    }

    handleCreateNewMessage = async() => {
        this.handleCancelConfirmAddMessage();
        this.formik.setSubmitting(true);
        const params = this.state.confirmPopup.params;
        const url = Site.resolveClientUrl('SMAPersonalMessage/CreateNewMessage');
        await DataService.postDataAsync(url, params).then(response => {
            const data = response.data;
            this.setState({createMessageResult: data});
            if (data.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        }).catch(Site.handleAxiosError);
    }

    render() {
        const initValues = this.initialValues(); 
        return (
            <div>
                <Modal show className="add-sma-message-modal" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('AddSMAPersonalMessage')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={p => this.formik = p}
                        initialValues={initValues}
                        validate={values => this.validateFormik(values)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    this.state.confirmPopup.isShow &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmMultipleUpdates')}
                        contents={<div>{LangHelper.formatString(LangHelper.getResource('ConfirmCreateNewMessageSMA'), this.formik.values.username)}</div>}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCreateNewMessage}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCancelConfirmAddMessage}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCancelConfirmAddMessage}
                    />
                }
            </div>
        );
    }
}