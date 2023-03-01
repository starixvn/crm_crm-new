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
import UploadFile from './UploadFile';
import ContentTab from './ContentTab';
import Option from './Option';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import {
    validateFormik, renderOption, mapLabelLanguage, setValueContent, getParams
} from '../common.functions';

export class NewAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.headlineInputRef = React.createRef();
        this.state = {
            languages: null,
            uploadedFiles: [],
            tab: 'EN',
            headlineGroups: [],
            siteOptions: [],
            currencyOptions: [],
            options: {
                site: '1',
                currency: '1'
            },
            confirmInsertDialog: { show: false, params: null},
            isChangeTemplate: false,
            parameters: null,
            invalidWidthHeight: []
        };
    }

    async componentDidMount() {
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            const languages = mapLabelLanguage(response);
            this.setState({languages, tab: firstLanguage});
        });
        await this.props.getAnnouncementTemplate();
        await this.handleOptionSettings();
    }

    handleOptionSettings = async () =>{
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

    setStateUploadFile = (uploadedFiles, fileNameRemove) => {
        if(!fileNameRemove){
            uploadedFiles.forEach((file) => {
                const maximumHeightWidth = 2560;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const image = new Image();
                    image.src = e.target.result;
                    image.onload = () => {
                    const {
                        height,
                        width
                    } = image;
                    if (height > maximumHeightWidth || width > maximumHeightWidth) {
                        this.setState({invalidWidthHeight: [...this.state.invalidWidthHeight, file.name]});
                    }
                };
            };
            });
        }else{
            const invalidWidthHeight = this.state.invalidWidthHeight.filter(x => x !== fileNameRemove);
            this.setState({invalidWidthHeight});
        }
        
        this.setState({uploadedFiles});
    }

    handleChangeNotificationTemplate = event=> {
        event.preventDefault();
        const value = parseInt(event.target.value);
        this.formik.setFieldValue('notificationTemplateId', value);
        this.formik.setFieldValue('notificationTemplate', value);
        this.getContentByTemplateId(value);
        this.setState({isChangeTemplate: true});
    }

    getContentByTemplateId = id =>{
        const contents = this.props.announcementTemplate.contents.filter(x => x.notificationTemplateId === id);
        const title = this.props.announcementTemplate.notificationTemplates.filter(x => x.notificationTemplateId === id)[0].title;
        this.formik.setFieldValue('title', title);
        setValueContent(this.formik.setFieldValue, contents);
        const content = contents.filter(x=> x.language === this.state.tab)[0].content;
        this.handleGetParameters(content);
    }
    
    handleGetParameters = content =>{
        const parameters = content.match(/\{.*?\}/g);
        this.setState({parameters});
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
        this.formik.setFieldValue('cloneContent', this.formik.values.content);
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
            this.handleSetValueHeadline(concatHeadline);
        }, 100);
    }

    handleSetValueHeadline = headlineGroups =>{
        const headlineGroupsRemoveSpace =  headlineGroups.filter(word => word.trim().length > 0);
        this.setState({headlineGroups: headlineGroupsRemoveSpace});
        this.headlineInputRef.current.focus();
        this.headlineInputRef.current.value = '';
    }

    handleChangeInputHeadline = event => {
        const value = event.target.value;
        const isDownKey = value.includes(',') || value.includes(' ') || event.keyCode === 13;
        if(event.keyCode === 8){
            this.state.headlineGroups.pop();
            this.setState({headlineGroups: this.state.headlineGroups});
        }
        if(value.trim().length > 0 && isDownKey){
            event.preventDefault();
            const headlineGroups = [... this.state.headlineGroups, value.slice(0, -1)];
            this.handleSetValueHeadline(headlineGroups);
        }
    }

    handleBlurInputHeadline = event => {
        const value = event.target.value;
        if(value && value.trim().length > 0){
            const headlineGroups = [... this.state.headlineGroups, value];
            this.setState({headlineGroups});
            this.headlineInputRef.current.value = '';
        }
    }

    handleRemoveHeadline = (event, headline) =>{
        event.stopPropagation();
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

    handleChangeParameter = (event, param, removeSpaceParam) =>{
        const {value, name} = event.target;
        const {setFieldValue, values} = this.formik;
        const replaceTab = this.state.tab.replace(/[^A-Z0-9]/ig, '');
        let replaceContent = values.cloneContent[replaceTab];
        setFieldValue(name, value);
        replaceContent = replaceContent.replace(param, value);
        removeSpaceParam.forEach(parameter =>{
            const removeSpaceParam = parameter.replace(/\s+/g, "");
            if(values[removeSpaceParam] && removeSpaceParam !== name){
                replaceContent = replaceContent.replace(parameter, values[removeSpaceParam]);
            }
        });
        setFieldValue(`content.${replaceTab}`, replaceContent);
    }

    renderMessage = result =>{
        if(!result.isSuccessful){
            const messages = result.message.split(';');
            return messages;
        }else{
            return [result.message || LangHelper.getResource('InsertAnnouncementSuccessfully')];
        }
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
        const {parameters, isChangeTemplate} = this.state;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createAnnouncementResult &&
                        <ResponseMessage isSuccessful={this.props.createAnnouncementResult.isSuccessful}
                            messages={this.renderMessage(this.props.createAnnouncementResult)}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="notificationTemplate">
                            {LangHelper.getResource('NotificationTemplate')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.notificationTemplate && errors.notificationTemplate}
                                name="notificationTemplateId" id="notificationTemplateId"
                                value={values.notificationTemplateId}
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
                            isValidContent={touched.content && errors.content} content={values.content} setFieldValue={setFieldValue}
                            languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab}
                        />
                    }
                    {
                        isChangeTemplate && parameters &&
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
                    <UploadFile setStateUploadFile={this.setStateUploadFile} uploadedFiles={uploadedFiles}/>
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
                                    onChange={this.handleChangeInputHeadline}
                                    onKeyDown={this.handleChangeInputHeadline}
                                    onBlur={event => this.handleBlurInputHeadline(event)}
                                    onPaste={this.handlePasteGroupHeadline}
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
        const param = getParams(values, this.state);
        this.setState({confirmInsertDialog: { show: true, params: param}});
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
        const {announcementTemplate, settings} = this.props;
        if(!this.state.languages || !announcementTemplate || !settings) {
            return null;
        }

        const initialValues = {
            notificationTemplateId: '',
            notificationTemplate: '',
            title: '',
            content: {
                EN:'',
                SC:'',
                ENSC:'',
                TH:'',
                YN:''
            },
            headlineType: '2',
            sendType: '',
            sendDate: new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date()))),
            imageFileType: '',
            imageFileSize: '',
            cloneContent:{
                EN:'',
                SC:'',
                ENSC:'',
                TH:'',
                YN:''
            }
        };

        return (
            <div>
                <Modal show className="new-announcement-modal" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('NewAnnouncement')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={p => (this.formik = p)}
                        initialValues={initialValues}
                        validate={values => validateFormik(values, this.state.uploadedFiles, this.state.invalidWidthHeight)}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    this.state.confirmInsertDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('ConfirmNewAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmInsertDialog}>
                                {LangHelper.getResource('Yes')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmInsertDialog}>
                                {LangHelper.getResource('No')}
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
    const { announcementTemplate, createAnnouncementResult, settings } = state;
    return { announcementTemplate, createAnnouncementResult, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncement);