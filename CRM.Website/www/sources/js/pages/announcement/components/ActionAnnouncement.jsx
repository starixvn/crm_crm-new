import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row} from 'react-bootstrap';
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
    validateFormik, renderOption, mapLabelLanguage, setValueContent, getParams
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
            content: null,
            uploadedFiles: [],
            tab: '',
            headlineGroups: [],
            siteOptions: [],
            options: {
                site: '1',
                currency: '1'
            },
            currencyOptions: [],
            confirmActionDialog: { show: false, params: null},
            isChangeTemplate: false,
            parameters: null
        };
    }

    async componentDidMount() {
        await this.getLanguages();
        await this.props.getAnnouncementTemplate();
        await this.getAnnounceDetail();
    }

    getAnnounceDetail = async () =>{
        const {announcementId} = this.props.actionAnnouncementPopup;
        Site.blockUI();
        await this.props.getAnnouncementById(announcementId).then(response => {
            const {data, contents} = response.data;
            const announcement = data[0];
            this.setState({data: announcement});
            this.getContentByLanguage(contents);
            this.getSettingOption(announcement);
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());    
    }

    getContentByLanguage = contents =>{
        const contentObj = {};
        contents.length > 0 && contents.forEach(content =>{
            const replaceContent = content.languageCode.replace(/[^A-Z0-9]/ig, '');
            contentObj[replaceContent] = content.content;
        });
        this.setState({content: contentObj});
    }

    getSettingOption = async announcement =>{
        await this.props.getSettings().then(() =>{
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
                    checked: announcement.currencyIdList?.split(',').includes(x.id.toString())
                };
            });

            this.setState({
                siteOptions,
                currencyOptions,
                options: {
                    ...this.state.options,
                    site: announcement.siteNameList,
                    currency: announcement.currencyIdList
                },
                headlineGroups: !announcement.siteNameList ? announcement.headlineNameList.split(',') : [] ,
                uploadedFiles: !announcement.fileName ? [] : announcement.fileName.split(',')
            });
        });
    }

    getLanguages = async () =>{
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            const languages = mapLabelLanguage(response);
            this.setState({languages, tab: firstLanguage});
        });
    }

    getContentTab = contents =>{
        setValueContent(this.formik.setFieldValue, contents);
    }

    handleChangeNotificationTemplate = event=> {
        event.preventDefault();
        const value = parseInt(event.target.value);
        this.formik.setFieldValue('notificationTemplateId', value);
        this.formik.setFieldValue('notificationTemplateName', value);
        this.getContentByTemplateId(value);
        this.setState({isChangeTemplate: true});
    }

    handleGetParameters = content =>{
        const parameters = content.match(/\{.*?\}/g);
        this.setState({parameters});
    }

    getContentByTemplateId = id =>{
        const contents = this.props.announcementTemplate.contents.filter(x => x.notificationTemplateId === id);
        const title = this.props.announcementTemplate.notificationTemplates.filter(x => x.notificationTemplateId === id)[0].title;
        this.formik.setFieldValue('title', title);
        setValueContent(this.formik.setFieldValue, contents);
        const content = contents.filter(x=> x.language === this.state.tab)[0].content;
        this.handleGetParameters(content);
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
        const replaceTab = selected.replace(/[^A-Z0-9]/ig, '');
        const content = this.formik.values.content[replaceTab];
        this.handleGetParameters(content);
    }

    handlePasteGroupHeadline = event=>{
        const item = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
            .split(',').filter(item => item !== '');

        const concatHeadline = [...this.state.headlineGroups, ...item];
        setTimeout(() => {
            this.setState({headlineGroups: concatHeadline});
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
        if(value.includes(',') || value.includes(' ')){
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

    setStateUploadFile = uploadedFiles => this.setState({uploadedFiles});

    renderMessage = (result, message) =>{
        if(!result.isSuccessful){
            return result.message.split(';');
        }else{
            return [result.message || message];
        }
    }

    handleChangeParameter = (event, param, removeSpaceParam) =>{
        const {value, name} = event.target;
        const {setFieldValue, values} = this.formik;
        const replaceTab = this.state.tab.replace(/[^A-Z0-9]/ig, '');
        let replaceContent = values.cloneContent[replaceTab];
        setFieldValue(name, value);
        replaceContent = replaceContent.replace(param, value);
        replaceContent = replaceContent.replace(param, value);
        removeSpaceParam.forEach(parameter =>{
            const removeSpaceParam = parameter.replace(/\s+/g, "");
            if(values[removeSpaceParam] && removeSpaceParam !== name){
                replaceContent = replaceContent.replace(parameter, values[removeSpaceParam]);
            }
        });
        setFieldValue(`content.${replaceTab}`, replaceContent);
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
        const propsOption = {
            values, handleChange, errors, touched
        };
        const {parameters, isChangeTemplate, uploadedFiles} = this.state;
        const {actionAnnouncementPopup, editAnnouncementResult, createAnnouncementResult} = this.props;
        const result = actionAnnouncementPopup.isEdit ? editAnnouncementResult : createAnnouncementResult; 
        const message = this.props.actionAnnouncementPopup.isEdit ? 
                        LangHelper.getResource('EditAnnouncementSuccessfully') :
                        LangHelper.getResource('CloneAnnouncementSuccessfully');
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        result &&
                        <ResponseMessage isSuccessful={result.isSuccessful}
                            messages={this.renderMessage(result, message)}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="notificationTemplateName">
                            {LangHelper.getResource('NotificationTemplate')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.notificationTemplateName && errors.notificationTemplateName}
                                name="notificationTemplateName" id="notificationTemplateName"
                                value={values.notificationTemplateName}
                                onChange={this.handleChangeNotificationTemplate}
                                disabled={actionAnnouncementPopup.isEdit}
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
                            isValidContent={touched.content && errors.content} content={values.content} setFieldValue={setFieldValue}
                            languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab} 
                        />
                    }
                    {
                        !actionAnnouncementPopup.isEdit && isChangeTemplate && parameters &&
                        <Form.Group as={Row} className='pt-2'>
                            <Form.Label column sm="2" md="2" />
                            <div className='parameters'>
                                <div className='text-parameters'>Parameters</div>
                                {
                                    parameters.map((param,index) =>{
                                        const removeSpaceParam = param.replace(/\s+/g, "");
                                        return (
                                            <div key={index} className='d-flex box-param'>
                                                <div className='param pt-1'>{param}</div>
                                                <Form.Control as="textarea"  value={values[removeSpaceParam] || ''}
                                                    name={removeSpaceParam} id={removeSpaceParam}
                                                    className="shadow-none form-input-param" autoComplete="off"
                                                    onChange={event => this.handleChangeParameter(event, param, parameters)}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Form.Group>
                    }
                    <UploadFileForwardingRef ref={this.imageInputRef} id={actionAnnouncementPopup.announcementId}
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
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" />
                        <Col sm="10" md="10">
                            <Form.Label>
                                {LangHelper.getResource('GroupHeadlineEnterNotice')}
                            </Form.Label>
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
        const params = getParams(values, this.state);
        const {announcementId, isEdit} = this.props.actionAnnouncementPopup;
        params.append(isEdit ? 'announcementId' : 'cloneAnnouncementId', announcementId);
        this.setState({confirmActionDialog: { show: true, params}});
    };

    handleConfirmActionDialog = () =>{
        this.handleCloseConfirmEditDialog();
        const formData = this.state.confirmActionDialog.params;
        const {createAnnouncement, editAnnouncement, actionAnnouncementPopup} = this.props;
        const {isEdit} = actionAnnouncementPopup;
        const actionFunc = isEdit ? editAnnouncement : createAnnouncement;
        actionFunc(formData).then(() => {
            const resultAction = isEdit ? this.props.editAnnouncementResult : this.props.createAnnouncementResult; 
            if (resultAction.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    }

    handleCloseConfirmEditDialog = () =>{
        this.setState({confirmActionDialog: { show: false, params: null }});
        this.formik.setSubmitting(false);
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
        if(!data || !announcementTemplate || !this.state.languages || !settings || !this.state.content) {
            return null;
        }
        const {isEdit} = actionAnnouncementPopup;
        const initialValues = {
            notificationTemplate: data.notificationTemplateName,
            notificationTemplateId: data.notificationTemplateId,
            title: data.title,
            content: this.state.content,
            headlineType: data.headlineType,
            sendType: data.sendImmediately ? 'Send immediately' : 'Send At' ,
            sendDate: new Date(data.sendDate),
            imageFileType: '',
            imageFileSize: '',
            fileName: data.fileName,
            oldFileName: data.fileName,
            cloneContent:{
                EN:'',
                SC:'',
                ENSC:'',
                TH:'',
                YN:''
            }
        };
        const excludeOldImage = this.state.uploadedFiles.filter(x => !initialValues.oldFileName.includes(x));

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
                    this.state.confirmActionDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmEditAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmActionDialog}>
                                {LangHelper.getResource('Yes')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmEditDialog}>
                                {LangHelper.getResource('No')}
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
    const { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup, createAnnouncementResult } = state;
    return { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup, createAnnouncementResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionAnnouncement);