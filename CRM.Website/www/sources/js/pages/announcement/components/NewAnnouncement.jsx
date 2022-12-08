import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const CkEditor = lazy(() => import('@jsroot/components/ckeditor/index'));
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

const portal = document.createElement("div");
document.body.appendChild(portal);
export class NewAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.imageInputRef = React.createRef();
        this.headlineInputRef = React.createRef();
        this.state = {
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
        await this.props.getLanguages().then(() => {
            const firstLanguage = this.props.languages?.[0]?.settingValue;
            this.setState({tab: firstLanguage});
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

    handleUploadFiles = files => {
        const uploaded = [...this.state.uploadedFiles];
        files.some(file => {
            const isNotExist = uploaded.findIndex((f) => f.name === file.name) === -1;
            if (isNotExist) {
                uploaded.push(file);
            }
        });
        this.setState({uploadedFiles: uploaded});
        this.imageInputRef.current.value = null;
    }

    handleFileEvent = e => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    }

    validateWidthHeigh = file =>{
        const url = URL.createObjectURL(file);
        const img = new Image();
        const maximumHeighWidth = 2560;
        img.src = url;
        const result = img.onload = function() {
            if(img.width > maximumHeighWidth || img.height > maximumHeighWidth){
                return false;
            }
            return true;
        }();
        return result;
    }

    validFileSize = file =>{
        const convertSize = Math.round(file.size / 1024).toFixed(2);
        const maximumSize10MB = 10000;
        if(convertSize > maximumSize10MB){
            return false;
        }
        return true;
    };

    validFileType = file =>{
        const fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];
        return fileTypes.includes(file.type);
    }

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const filterFiler = this.state.uploadedFiles.filter(x => x.name !== fileName);
        this.setState({uploadedFiles: filterFiler});
        this.imageInputRef.current.value = null;
    }

    onDragEnd = result =>{
        if (!result.destination) {
            return;
          }
      
        const uploadedFiles = this.reorder(
            this.state.uploadedFiles,
            result.source.index,
            result.destination.index
        );
    
        this.setState({
            uploadedFiles
        });
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    handlePreviewImage = (event, fileName) => {
        event.stopPropagation();
        const url = URL.createObjectURL(fileName);
        window.open(url);
    }

    renderListPortalFile = (provided, snapshot, item) =>{
        const usePortal = snapshot.isDragging;

        const child = (
            <Form.Group as={Row} ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Form.Label column sm="2" md="2" />
                <Col sm="10" md="10" className='list-file-image'>
                    <span className='fa fa-file-image-o mr-2'/>
                    <span className="mr-2 text-color" onClick={event => this.handlePreviewImage(event, item)}>
                        {item.name}
                    </span>
                    <span className="rounded-circle fa fa-trash icon-delete" onClick={event => this.handleRemoveFile(event, item.name)} />
                </Col>
          </Form.Group>
        );
      
        if (!usePortal) {
          return child;
        }
      
        return ReactDOM.createPortal(child, portal);
    }

    handleChangeNotificationTemplate = event=> {
        event.preventDefault();
        this.formik.setFieldValue('notificationTemplate', event.target.value);
        this.handleChangeContentById(event.target.value);
    }

    handleChangeContentById = id => {
        this.props.getTemplateById(id).then(data =>{
            const contentLanguage = data.contents.filter(x => x.language === this.state.tab);
            const content = !contentLanguage ? '' : contentLanguage[0].content;
            this.formik.setFieldValue('content', content);
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
        const item = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
            .split(',').filter(item => item !== '');
        setTimeout(() => {
            this.setState({headlineGroups: item});
            this.headlineInputRef.current.focus();
            this.headlineInputRef.current.value = '';
        }, 100);
    }

    handleChangeInputHeadline = event => {
        const value = event.target.value;
        if(value.includes(',')){
            let headlineGroups = [... this.state.headlineGroups, value.slice(0, -1)];
            this.setState({headlineGroups});
            this.headlineInputRef.current.focus();
            this.headlineInputRef.current.value = '';
        }
    }

    handleRemoveHeadline = (event, headline) =>{
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
        handleSubmit,
        isSubmitting
    }) => {
        const {uploadedFiles} = this.state;
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
                                {this.props.notificationTemplates.map((value, key) => <option key={key} value={value.notificationTemplateId}>{value.notificationTemplateName}</option>)}
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
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" md="2" className="required" htmlFor="content">
                            {LangHelper.getResource('Content')}
                        </Form.Label>
                        <Col sm="10" md="10">
                            <Tabs
                                className='languages-text'
                                id="controlled-tab"
                                activeKey={this.state.tab}
                                onSelect={selected => this.handleChangeTab(selected)}
                            >
                                {
                                    this.props.languages.map((language, key) =>
                                        (<Tab key={key} eventKey={language.settingValue} title={language.settingValue}>
                                            {
                                               <Suspense fallback={<div />}>
                                                    <CkEditor
                                                        name='content'
                                                        isInvalid={touched.content && errors.content}
                                                        data={values.content}
                                                        username={window.currentUsername}
                                                        onChange={handleChange}
                                                    />
                                                </Suspense>
                                            }
                                        </Tab>)
                                    )
                                }
                            </Tabs>               
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formFileMultiple">
                        <Form.Label column sm="2" md="2" />
                        <Col >
                            <span className="fa fa-upload mr-2 mt-2" />
                            <span className="btn-file">
                                <span>Browse and attach image (limit: </span>
                                <span className='text-color'>10MB</span>
                                <span>, max size: </span>
                                <span className='text-color'>2560*2560)</span>
                                <input ref={this.imageInputRef} type="file" multiple onChange={this.handleFileEvent} />
                            </span>
                        </Col>
                    </Form.Group>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable-list-image">
                            {(droppableProvided, droppableSnapshot) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                            {
                                uploadedFiles.map((item, index) => (
                                    <Draggable key={index} draggableId={`draggableId-${index}`} index={index}>
                                        {(draggableProvided, draggableSnapshot)  => (
                                            this.renderListPortalFile(draggableProvided, draggableSnapshot, item)
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                       </Droppable>
                    </DragDropContext>
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
                    {
                        this.renderOption(values, handleChange)
                    }
                    {
                        this.renderSendTime(values, handleChange, errors, touched)
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Save')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    renderOption = (values, handleChange) =>{
        const {headlineGroups} = this.state;
        return(
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2">{LangHelper.getResource('Site')}</Form.Label>
                <Col sm="10" md="10">
                    <div className='form-option-wrapper'>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                isDisable={headlineGroups.length > 0}
                                dataSource={this.state.siteOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => this.handleOptionChange('site', selectedItemsKey)
                                }
                            />
                        </div>
                        <Form.Label column sm="2" md="2">{LangHelper.getResource('Currency')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.currencyOptions}
                                isDisable={headlineGroups.length > 0}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => this.handleOptionChange('currency', selectedItemsKey)
                                }
                            />
                        </div>
                        <Form.Label column sm="2" md="2">{LangHelper.getResource('HeadlineType')}</Form.Label>
                        <Form.Control as='select' size='sm' className='form-control-wrapper'
                            name='headlineType' value={values.headlineType} disabled={headlineGroups.length > 0}
                            onChange={handleChange}
                        >
                            <option value=''>{LangHelper.getResource('All')}</option>
                            {
                                this.props.settings.headlineTypeList.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                            }
                        </Form.Control>
                    </div>
                </Col>
            </Form.Group>
        );
    }

    renderSendTime = (values, handleChange, errors, touched) =>{
        const sendOption = ['Send At', 'Send immediately'];
        const dateTimeNow = new Date(DateTimeService.toLongDateTimeFormat(new Date()));
        const isSendAt = values.sendType === 'Send At';
        return(
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2"  className='required' >{LangHelper.getResource('SendTime')}</Form.Label>
                    <Col sm="10" md="10">
                        <div className='form-option-wrapper'>
                            <Form.Control as='select' size='sm' className='form-control-wrapper'
                                name="sendType" id="sendType"
                                value={values.sendType}
                                isInvalid={touched.sendType && errors.sendType}
                                onChange={handleChange}
                            >
                                <option value=''>{LangHelper.getResource('PleaseSelect')}</option>
                                {
                                    sendOption.map((value, key) => <option key={key} value={value}>{value}</option>)
                                }
                            </Form.Control>
                            <div className='react-datepicker-wrapper-container form-control-wrapper' style={{marginLeft: 15}}>
                                <DatePicker
                                    readOnly={!isSendAt}
                                    dropdownMode="select"
                                    showMonthDropdown
                                    isInvalid={touched.sendDate && errors.sendDate}
                                    showYearDropdown
                                    timeInputLabel="Time:"
                                    showTimeInput
                                    useShortMonthInDropdown
                                    minDate={dateTimeNow}
                                    selected={isSendAt ? values.sendDate : null}
                                    onChange={value => this.handleDateChange(value)}
                                />
                            </div>
                            <Form.Label column sm="2" md="2">(GMT+8)</Form.Label>
                        </div>
                    </Col>
            </Form.Group>       
        );
    }

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const formData = new FormData();
        this.state.uploadedFiles.forEach(file => {
            formData.append('formFile', file);
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
                setSubmitting(false);
            }
        });
    }

    handleCloseConfirmInsertDialog = () =>{
        this.setState({confirmInsertDialog: { show: false, params: null }});
    }

    validateFormik = values => {
        let errors = {};
        if (!values.notificationTemplate) {
            errors.notificationTemplate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('NotificationTemplate'));
        }

        if (!values.title) {
            errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
        }
    
        if (!values.content) {
            const contentEnglish = `Content (${this.state.tab})`;
            errors.content = LangHelper.formatString(LangHelper.getResource('FieldRequired'), contentEnglish);
        }

        if (this.state.tab === 'EN' && (values.content.includes('{') || values.content.includes('}'))) {
            errors.content = LangHelper.getResource('ContentLanguageError');
        }

        if (values.sendType === 'Send At' && !values.sendDate) {
            errors.sendDate = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
        }

        if (!values.sendType) {
            errors.sendType = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'));
        }

        const invalidFileType = this.state.uploadedFiles.filter(x => !this.validFileType(x));
        if(invalidFileType.length > 0){
            const nameFileError = invalidFileType.map(x => x.name).join(', ');
            errors.imageFileType = LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), nameFileError);
        }

        const invalidFileSize = this.state.uploadedFiles.filter(x => !this.validFileSize(x));
        const invalidFileWidthHeigh = this.state.uploadedFiles.filter(x => !this.validateWidthHeigh(x));

        if(invalidFileSize.length > 0 || invalidFileWidthHeigh.length > 0){
            const nameFileError = invalidFileSize.map(x => x.name).join(', ');
            errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
        }

        return errors;
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
        const {languages, notificationTemplates, settings} = this.props;
        if(!languages || !notificationTemplates || !settings) {
            return null;
        }

        const initialValues = {
            notificationTemplate: '',
            title: '',
            content: '',
            groupHeadline: '',
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
                        validate={values => this.validateFormik(values)}
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
    const { languages, notificationTemplates, createAnnouncementResult, settings } = state;
    return { languages, notificationTemplates, createAnnouncementResult, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncement);