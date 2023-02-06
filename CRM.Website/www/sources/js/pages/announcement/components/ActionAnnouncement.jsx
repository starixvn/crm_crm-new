import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import {UploadFileForwardingRef} from './UploadFile';
import Option from './Option';
import ContentTab from './ContentTab';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import {
    validateFormik, renderOption, mapLabelLanguage
} from '../common.functions';
import Site from '@jsroot/common/site';

const portal = document.createElement("div");
document.body.appendChild(portal);
export class ActionAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.imageInputRef = React.createRef();
        this.headlineInputRef = React.createRef();
        this.state = {
            data: null,
            languages: null,
            uploadedFiles: [],
            tab: '',
            headlineGroups: [],
            siteOptions: [],
            currencyOptions: [],
            confirmEditDialog: { show: false, params: null}
        };
    }

    async componentDidMount() {
        const {announcementId} = this.props.actionAnnouncementPopup;
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            const languages = mapLabelLanguage(response);
            this.setState({languages, tab: firstLanguage});
        });
        await this.props.getAnnouncementTemplate();
        Site.blockUI();
        await this.props.getAnnouncementById(announcementId).then(response => {
            const {data, contents} = response.data;
            const announcement = data[0];
            this.setState({data: announcement});
            this.props.getSettings().then(() =>{
                const siteOptions = this.props.settings.siteList.map(x => {
                    return {
                        id: x.site,
                        name: x.site,
                        checked: announcement.siteNameList?.includes(x.site)
                    };
                });
    
                const currencyOptions = this.props.settings.currencyList.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        checked: announcement.currencyIdList?.includes(x.id)
                    };
                });
    
                this.setState({
                    siteOptions,
                    currencyOptions,
                    headlineGroups: !announcement.headlineNameList ? [] : announcement.headlineNameList.split(','),
                    uploadedFiles: [announcement.origFileName]
                });
            });
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());    
    }

    getContentTab = contents =>{
        contents.length > 0 && contents.forEach(content =>{
            const key = content.language === 'EN & SC' ? 'content.ENSC' : `content.${content.language}`;
            this.formik.setFieldValue(key, content.content);
        });
    }

    handleChangeNotificationTemplate = event=> {
        event.preventDefault();
        const value = parseInt(event.target.value);
        this.formik.setFieldValue('notificationTemplateId', value);
        this.formik.setFieldValue('notificationTemplate', value);
        this.getContentByTemplateId(value);
    }

    getContentByTemplateId = id =>{
        const contents = this.props.announcementTemplate.contents.filter(x => x.notificationTemplateId === id);
        contents.length > 0 && contents.forEach(content =>{
                const key = content.language === 'EN & SC' ? 'content.ENSC' : `content.${content.language}`;
                this.formik.setFieldValue(key, content.content);
        });
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    }

    handlePasteGroupHeadline = event=>{
        const item = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
            .split(',').filter(item => item !== '');
        setTimeout(() => {
            this.setState({headlineGroups: item});
            this.headlineInputRef.current.focus();
            this.headlineInputRef.current.value = '';
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

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const url = Site.resolveClientUrl(`www/dist/css/images/announcement/${fileName}`);
        window.open(url);
    }

    handleDateChange = value =>{
        this.formik.setFieldValue('sendDate', value);
    }

    setStateUploadFile = uploadedFiles => this.setState({uploadedFiles});

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
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
                        this.props.editAnnouncementResult &&
                        <ResponseMessage isSuccessful={this.props.editAnnouncementResult.isSuccessful}
                            message={this.props.editAnnouncementResult.message || LangHelper.getResource('EditAnnouncementSuccessfully')}
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
                                {this.props.announcementTemplate.notificationTemplates.map((value, key) => renderOption(key, value.notificationTemplateId, value.notificationTemplateName))}
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
                            isValidContent={touched.content && errors.content} content={values.content} handleChange={handleChange}
                            languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab}
                        />
                    }
                    <UploadFileForwardingRef ref={this.imageInputRef}
                        setStateUploadFile={this.setStateUploadFile} uploadedFiles={uploadedFiles}
                    />
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" htmlFor="groupHeadline">
                            {LangHelper.getResource('GroupHeadline')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <div className="headline-group-form" onClick={() => this.headlineInputRef.current.focus()}>
                                {
                                    this.state.headlineGroups.length > 0 && this.state.headlineGroups.map((headline,index) =>(
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
        const formData = new FormData();
        this.state.uploadedFiles.forEach(file => {
            formData.append('formFile', file);
        });

        this.setState({confirmEditDialog: { show: true, params: formData}});
    };

    handleConfirmEditDialog = () =>{
        this.handleCloseConfirmEditDialog();
        const formData = this.state.confirmEditDialog.params;
        this.props.createAnnouncement(formData).then(() => {
            if (this.props.createAnnouncementResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    }

    handleCloseConfirmEditDialog = () =>{
        this.setState({confirmEditDialog: { show: false, params: null }});
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
        const {settings, actionAnnouncementPopup, announcementTemplate} = this.props;
        const {data} = this.state; 
        if(!data || !announcementTemplate || !this.state.languages || !settings) {
            return null;
        }
        const {isEdit} = actionAnnouncementPopup;
        const initialValues = {
            notificationTemplate: data.notificationTemplate,
            title: data.title,
            content: {
                EN:'',
                SC:'',
                ENSC:'',
                TH:'',
                YN:''
            },
            headlineType: data.headlineType,
            sendType: data.sendImmediately ? 'Send immediately' : 'Send At' ,
            sendDate: new Date(data.sendDate),
            imageFileType: '',
            imageFileSize: ''
        };

        const oldSourceImage = data.origFileName;
        const excludeOldImage = this.state.uploadedFiles.filter(x => !oldSourceImage.includes(x));

        return (
            <div>
                <Modal show className="edit-announcement-modal" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{isEdit ? LangHelper.getResource('EditAnnouncement') : LangHelper.getResource('CloneAnnouncement')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={p => (this.formik = p)}
                        initialValues={initialValues}
                        validate={values => validateFormik(values, excludeOldImage)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    this.state.confirmEditDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmEditAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmEditDialog}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmEditDialog}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirmEditDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup } = state;
    return { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionAnnouncement);