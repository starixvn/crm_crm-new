import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

export default class CreateNewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'EN',
            languages: [],
            createMessageResult: null
        };
    }

    async componentDidMount() {
        const url = Site.resolveClientUrl('NotificationTemplate/GetLanguages');
        await DataService.getDataAsync(url).then(response => {
            this.setState({languages: response.data});
        }).catch(Site.handleAxiosError);
    }

    handleChangeTab = selected => this.setState({tab: selected});

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.state.createMessageResult &&
                        <ResponseMessage isSuccessful={this.state.createMessageResult.isSuccessful}
                            message={this.state.createMessageResult.message || LangHelper.getResource('InsertNotificationTemplateSuccessfully')}
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
                            <Form.Control type="text" size="sm" value={values.username}
                                name="username" id="username"
                                autoComplete="off" className="required shadow-none"
                                isInvalid={touched.username && errors.username}
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
                                    this.state.languages !== null && this.state.languages.map((item, key) => {
                                    return (
                                        <Tab key={key} eventKey={item.settingValue} title={item.settingValue}>
                                            <Form.Control as="textarea" className="shadow-none form-control"
                                                value={values['language_' + item.settingId]}
                                                name={'language_' + item.settingId} id={'language_' + item.settingId} rows="4"
                                                isInvalid={touched['language_' + item.settingId] && errors['language_' + item.settingId]}
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
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    validateFormik = values => {
        const errors = {};
        if (values.username === '') {
            errors.username = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SMAUsernames'));
        }

        return errors;
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = {
            username: values.username,
            title: values.title,
            contents: []
        };
        this.state.languages !== null && this.props.state.map(item => {
            template.contents.push({
                languageId: item.settingId,
                content: values['language_' + item.settingId]
            });
        });

        this.props.createTemplate(template).then(() => {
            if (this.props.createMessageResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        if(this.state.languages.length === 0 ){
            return null;
        }
        const initialValues = {
            title: '',
            username: ''
        };
        this.state.languages !== null && this.state.languages.map(item => {
            initialValues['language_' + item.settingId] = '';
        });

        return (
            <Modal show className="add-sma-message-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('AddSMAPersonalMessage')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validate={values => this.validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}