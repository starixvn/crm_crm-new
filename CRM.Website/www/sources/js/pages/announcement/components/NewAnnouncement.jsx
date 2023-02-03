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
import {UploadFileForwardingRef} from './UploadFile';
import ContentTab from './ContentTab';
import Option from './Option';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import {
    validateFormik, renderOption
} from '../common.functions';

export class NewAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.imageInputRef = React.createRef();
        this.headlineInputRef = React.createRef();
        this.state = {
            languages: null,
            uploadedFiles: [],
            tab: '',
            headlineGroups: [],
            siteOptions: [],
            currencyOptions: [],
            options: {
                site: '1',
                currency: '1'
            },
            confirmInsertDialog: { show: false, params: null}
        };
    }

    async componentDidMount() {
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            this.setState({languages:response, tab: firstLanguage});
        });
        const param = {
            notificationTypeId: null,
            notificationTemplateName: '',
            PageSize: 0
        };
        await this.props.getNotificationTemplates(param);
        await this.props.getSettings().then(() =>{
            const siteIds = [];
            const siteOptions = this.props.settings.siteList.map(x => {
                siteIds.push(x.site);
                return {
                    id: x.site,
                    name: x.site,
                    checked: true
                };
            });

            const currencyIds = [];
            const currencyOptions = this.props.settings.currencyList.map(x => {
                currencyIds.push(x.id);
                return {
                    id: x.id,
                    name: x.name,
                    checked: true
                };
            });

            this.setState(prevState => ({
                siteOptions,
                currencyOptions,
                options: {
                    ...prevState.options,
                    site: siteIds.toString(),
                    currency: currencyIds.toString()
                }
            }));
        });
    }

    setStateUploadFile = uploadedFiles => this.setState({uploadedFiles});

    handleChangeNotificationTemplate = event=> {
        event.preventDefault();
        this.formik.setFieldValue('notificationTemplate', event.target.value);
        this.handleChangeContentById(event.target.value);
    }

    handleChangeContentById = id => {
        this.props.getTemplateById(id).then(data =>{
            const {setFieldValue} = this.formik;
            const contentEN = data.contents.filter(x => x.language === 'EN')[0];
            const contentArr = [contentEN];
            const contentLanguage = data.contents.filter(x => x.language === this.state.tab);
            const contents = (!contentLanguage || this.state.tab ==='EN') ? contentArr : [...contentArr, contentLanguage[0]];
            const content = !contentLanguage ? '' : contentLanguage[0].content;
            setFieldValue('notificationTemplateId', data.notificationTemplateId);
            setFieldValue('languageId', contentLanguage[0].languageId);
            setFieldValue(this.state.tab, content);
            setFieldValue('contents', contents);
        });
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
        const templateId = this.formik.values.notificationTemplate;
        if(templateId){
            this.handleChangeContentById(templateId);
        }
    }

    handlePasteGroupHeadline = event=>{
        const headlineGroups = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
            .split(',').filter(item => item !== '');
        setTimeout(() => {
            this.handleSetValueHeadline(headlineGroups);
        }, 100);
    }

    handleSetValueHeadline = headlineGroups =>{
        this.setState({headlineGroups});
        this.headlineInputRef.current.focus();
        this.headlineInputRef.current.value = '';
    }

    handleChangeInputHeadline = event => {
        const value = event.target.value;
        if(value.includes(',')){
            let headlineGroups = [... this.state.headlineGroups, value.slice(0, -1)];
            this.handleSetValueHeadline(headlineGroups);
        }
    }

    handleRemoveHeadline = (event, headline) =>{
        event.preventDefault();
        const headlineFilter = this.state.headlineGroups.filter(x => x !== headline);
        this.setState({headlineGroups: headlineFilter});
    }

    handleOptionChange = (name, value) =>
        this.setState(prevState => ({
            options: {
                ...prevState.options,
                [name]: value
            }
     }));

    handleDateChange = value =>{
        this.formik.setFieldValue('sendDate', value);
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting
    }) => {
        const {uploadedFiles} = this.state;
        const propsOption = {
            values, handleChange, errors, touched
        };
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createAnnouncementResult &&
                        <ResponseMessage isSuccessful={this.props.createAnnouncementResult.isSuccessful}
                            message={this.props.createAnnouncementResult.message || LangHelper.getResource('InsertAnnouncementSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="notificationTemplate">
                            {LangHelper.getResource('NotificationTemplate')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.notificationTemplate && errors.notificationTemplate}
                                name="notificationTemplate" id="notificationTemplate"
                                value={values.notificationTemplate}
                                onChange={this.handleChangeNotificationTemplate}
                            >
                                <option value="" hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.notificationTemplates.map((value, key) => renderOption(key, value.notificationTemplateId, value.notificationTemplateName))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2"
                            className="required" htmlFor="title"
                        >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control type="text" size="sm" value={values.title}
                                name="title" id="title"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.title && errors.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {
                        <ContentTab
                            isValidContent={touched.content && errors.content} content={values.content} setFieldValue={setFieldValue}
                            languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab}
                        />
                    }
                    <UploadFileForwardingRef ref={this.imageInputRef} setStateUploadFile={this.setStateUploadFile} uploadedFiles={uploadedFiles}/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="groupHeadline">
                            {LangHelper.getResource('GroupHeadline')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <div className="headline-group-form" onClick={() => this.headlineInputRef.current.focus()}>
                                {
                                    this.state.headlineGroups.map((headline,index) =>(
                                        <div key={index} className='headline-box'>
                                            <span className='fa fa-times mr-2' onClick={event => this.handleRemoveHeadline(event, headline)}/>
                                            <span className='headline'>{headline}</span>
                                        </div>
                                    ))
                                }
                                <input className='text-input-headline' ref={this.headlineInputRef}
                                    onChange={this.handleChangeInputHeadline} onPaste={this.handlePasteGroupHeadline}
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Option 
                        {...propsOption} stateValue={this.state} settings={this.props.settings}
                        handleDateChange={this.handleDateChange} handleOptionChange={this.handleOptionChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Save')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const {notificationTemplateId, languageId, content, headlineType, sendDate, sendType} = values;
        const formData = new FormData();
        this.state.uploadedFiles.forEach(file => {
            formData.append('formFile', file);
        });
        formData.append('content[languageId]', languageId);
        formData.append('content[value]', content);
        const params = {
            notificationTemplateId: notificationTemplateId,
            headlineNameList: this.state.headlineGroups.join(','),
            siteNameList: this.state.options.site,
            currencyList: this.state.options.currency,
            headlineType: headlineType,
            title: values.title,
            sendDate: DateTimeService.toLongDateTimeFormat(sendDate),
            sendImmediately: sendType !== 'Send At'
        };
        Object.keys(params).forEach(key => {
            formData.append(key, params[key]);
        });
        this.setState({confirmInsertDialog: { show: true, params: formData}});
    };

    handleConfirmInsertDialog = () =>{
        this.handleCloseConfirmInsertDialog();
        const formData = this.state.confirmInsertDialog.params;
        this.props.createAnnouncement(formData).then(() => {
            if (this.props.createAnnouncementResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    }

    handleCloseConfirmInsertDialog = () =>{
        this.setState({confirmInsertDialog: { show: false, params: null }});
    }

    renderContentConfirm = () =>{
        const {sendType, sendDate} = this.formik.values;
        const sendDateFormat = DateTimeService.toLongDateTimeFormat(sendDate);
        const content = sendType === 'Send At' ? 
                        LangHelper.formatString(LangHelper.getResource('ConfirmSendAt'), sendDateFormat) :
                        LangHelper.getResource('ConfirmSendImmediately');
        return(
            <div>{content}</div>
        );
    }

    render() {
        const {notificationTemplates, settings} = this.props;
        if(!this.state.languages || !notificationTemplates || !settings) {
            return null;
        }

        const initialValues = {
            notificationTemplateId: '',
            notificationTemplate: '',
            title: '',
            content: '',
            contents: [],
            languageId: '',
            headlineType: '2',
            sendType: '',
            sendDate: null,
            imageFileType: '',
            imageFileSize: ''
        };

        return (
            <div>
                <Modal show className="new-announcement-modal" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('InsertAnnouncement')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={p => (this.formik = p)}
                        initialValues={initialValues}
                        validate={values => validateFormik(values, this.state, this.state.uploadedFiles)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    this.state.confirmInsertDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmInsertAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmInsertDialog}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmInsertDialog}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirmInsertDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { notificationTemplates, createAnnouncementResult, settings } = state;
    return { notificationTemplates, createAnnouncementResult, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncement);