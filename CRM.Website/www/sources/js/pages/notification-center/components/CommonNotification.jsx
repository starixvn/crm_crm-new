import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Tabs, Tab, Button, Collapse, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Formik } from 'formik';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import CkEditor from '@jsroot/components/ckeditor/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import { filterAndSortSites, languageOptions } from '../common.functions';
import AffectedTicket from './AffectedTicket';
import { FileUpload } from './FileUpload';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

const MAXIMUM_HEIGHT_WIDTH = 2560;
export class CommonNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'English',
            data: null,
            sites: null,
            confirmActionDialog: { show: false, params: null, content: null },
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            isSubmitting: false,
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false },
            messageSuccessful: null,
            isFirstCheck: false,
            collapseEvent: true,
            uploadedFiles: [],
            invalidWidthHeight: [],
            errorDrafts: {
                invalidFileTypeDraft: [],
                invalidFileSizeDraft: []
            }
        }

        this.languages = languageOptions(this.props.actionParam.isOstUser);
    }

    async componentDidMount() {
        this.getAdmNotificationDetail();
        this.props.isEdit && this.props.setEditAdmNotification(null);
        await this.changeStringToFile();
    };

    getAdmNotificationDetail = async () =>{
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getAdmNotificationById(notificationId).then(response => {
            const { notificationDetails, sites } = response.data;
            const notificationDetail = notificationDetails[0];
            this.setState({data: notificationDetail, sites, uploadedFiles: this.getFileString(notificationDetail.filename)});
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    handleCreateNotification = async (params, message) => {
        console.log('invalidWidthHeight', this.state.invalidWidthHeight);
        console.log('errorDrafts', this.state.errorDrafts);
        console.log('params', params);
        this.formik.setSubmitting(true);
        await this.props.editAdmNotification(params).then(() => {
            this.handleClosePopup();
            if (this.props.editAdmNotificationResult.isSuccessful) {
                this.setState({ messageSuccessful: message });
                setTimeout(() => {
                    this.props.setEditAdmNotification(null);
                    this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    handleSaveDraft = async () => {
        const params = this.getParams('Draft');
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    handleSubmitConfirm = async () => {
        const status = this.props.actionParam.isOstUser ? 'Sending' : 'Active';
        const params = this.getParams(status);
        const message = status === 'Sending' ? 'PushNotificationSuccessfully' : 'ActiveNotificationSuccessfully';
        await this.handleCreateNotification(params, LangHelper.getResource(message));
    };

    handleSaveConfirm = async () => {
        const params = this.getParams(this.state.data.status);
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    getStateData = () => {
        const stateData = {
            isLoadGrid: true,
            filterParams: this.props.actionParam?.redirectParams
        };
        return stateData;
    };

    handleClose = () => {
        this.props.setEditAdmNotification(null);
        this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    renderSiteSection = (sites, title, ticketCnt) => {
        if (sites.length === 0) {
            return null;
        }
        return (
            <div className='content-parent'>
                <div className='content-child'>
                    <span className='text-bold'>{title}</span>
                    <span onClick={() => this.handleOpenPopup(sites[0].siteType)} className='link-ticket'>{ticketCnt}</span>
                </div>
                <div className='site-scrollbar'>
                    {sites.map((item, index) => (
                        <div key={`${item.siteGroup}-${index}`} className='text-line'>
                            {item.siteGroup}: <span className='text-bold'>{item.siteNames}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    getTicketCount = sites => sites.reduce((count, item) => count + item.ticketCnt, 0);

    renderMapSite = () => {
        const creditSites = filterAndSortSites(this.state.sites, 'Credit');
        const licenseeSites = filterAndSortSites(this.state.sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, LangHelper.getResource('CreditTotalTickets'), this.getTicketCount(creditSites))}
                {this.renderSiteSection(licenseeSites, LangHelper.getResource('LicenseeTotalTickets'), this.getTicketCount(licenseeSites))}
            </div>
        );
    };

    handleClosePopup = () => {
        this.formik.setSubmitting(false);
        this.setState({
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false }
        });
    };

    handleActive = popup => {
        const excludeOldImage = this.state.uploadedFiles.filter(item => item.type !== 'string');
        console.log('excludeOldImage1', excludeOldImage);
        this.setState({isFirstCheck: true});
        const errors = this.validateFormik(this.formik.values, excludeOldImage);
        if (Object.keys(errors).length === 0) {
            this.setState({[popup]: { show: true }});
        }
    };

    handleCollapseExpand = () => {
        this.setState(prevState => ({
            collapseEvent: !prevState.collapseEvent
        }));
    };

    validateFormik = (values, files) => {
        const errors = {};
        const { isOstUser } = this.props.actionParam;
        const { subject, content_en, content_cs, content_ch, content_zhcn } = values;
        const { errorDrafts, invalidWidthHeight } = this.state;

        if (!subject && !isOstUser) {
            errors.subject = LangHelper.getResource('SubjectRequired');
        }

        if (!content_en) {
            errors.content_en = LangHelper.getResource('EnglishContentRequired');
        }

        if (content_en && isOstUser && !content_en.includes('@@')) {
            errors.content_en = LangHelper.getResource('RemoveSignAtEnglish');
        }

        if (!content_cs) {
            errors.content_cs = LangHelper.getResource('SimplifiedChineseContentRequired');
        }

        if (content_cs && isOstUser && !content_cs.includes('@@')) {
            errors.content_cs = LangHelper.getResource('RemoveSignAtSC');
        }

        if (!content_ch && isOstUser) {
            errors.content_ch = LangHelper.getResource('TraditionalChineseContentRequired');
        }

        if (content_ch && isOstUser && !content_ch.includes('@@')) {
            errors.content_ch = LangHelper.getResource('RemoveSignAtTC');
        }

        if (!content_zhcn && isOstUser) {
            errors.content_zhcn = LangHelper.getResource('NewSimplifiedChineseContentRequired');
        }

        if (content_zhcn && isOstUser && !content_zhcn.includes('@@')) {
            errors.content_zhcn = LangHelper.getResource('RemoveSignAtNSC');
        }

        if (isOstUser && files) {
            const invalidFileType = files.filter(x => !this.validFileType(x) || !this.validFileExtension(x));
            if (invalidFileType.length > 0 || errorDrafts?.invalidFileTypeDraft.length > 0) {
                errorDrafts?.invalidFileTypeDraft.map(item => invalidFileType.push(item));
                const newInvalidFileType = [...new Set(invalidFileType)];
                const nameFileError = newInvalidFileType.map(x => x.name).join(', ');
                errors.imageFileType = LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), nameFileError);
            }

            const invalidFileSize = files.filter(x => !this.validFileSize(x));
            if (invalidFileSize.length > 0 || errorDrafts?.invalidFileSizeDraft.length > 0) {
                errorDrafts?.invalidFileSizeDraft.map(item => invalidFileSize.push(item));
                const newInvalidFileSize = [...new Set(invalidFileSize)];
                const nameFileError = newInvalidFileSize.map(x => x.name).join(', ');
                errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), nameFileError);
            }
        }
    
        if (isOstUser && invalidWidthHeight.length > 0) {
            const uniqInvalidImage = [...new Set(invalidWidthHeight)];
            const nameFileError = uniqInvalidImage.map(x => x.name);
            const uniqErr = [...new Set(nameFileError)].join(', ');
            if (uniqErr) {
                errors.imageFileSize = LangHelper.formatString(LangHelper.getResource('ImageSizeError'), [...new Set(nameFileError)].join(', '));
            }
        }

        return errors;
    };

    invalidTabCss = errors => {
        const invalidCss = [];
        if (this.state.isFirstCheck) {
            if (errors.content_en) {
                invalidCss.push('invalid-content_en');
            }
            if (errors.content_cs) {
                invalidCss.push('invalid-content_cs');
            }
            if (errors.content_ch) {
                invalidCss.push('invalid-content_ch');
            }
            if (errors.content_zhcn) {
                invalidCss.push('invalid-content_zhcn');
            }
        }
        return invalidCss.join(' ');
    };

    isRenderPopupAction = () => {
        const { pushPopup, savePopup, activatePopup } = this.state;
        return pushPopup.show || savePopup.show || activatePopup.show;
    };

    renderConfirmPopup = () => {
        const popups = [
            { data: this.state.pushPopup, status: 'push', handler: 'handleSubmitConfirm' },
            { data: this.state.savePopup, status: 'update', handler: 'handleSaveConfirm' },
            { data: this.state.activatePopup, status: 'activate', handler: 'handleSubmitConfirm' }
        ];
        const activePopup = popups.find(popup => popup.data.show);
        const { status, handler } = activePopup;

        if (!activePopup) {
            return null;
        }

        return (
            <ConfirmPopup
                size='lg'
                className='confirmNotification'
                title={LangHelper.getResource('Confirmation')}
                content={
                    <div>
                        Are you sure you want to {status} this notification?
                    </div>
                }
                onSubmit={() => this[handler]()}
                onClose={this.handleClosePopup}
            />
        );
    };


    renderButton = isSubmitting => {
        const isOstUser = this.props.actionParam.isOstUser;

        if (isOstUser) {
            return(
                <>
                    <Button className="btn-save" type="submit" variant="primary" size="md" disabled={isSubmitting} onClick={this.handleSaveDraft}>{LangHelper.getResource('Save as Draft')}</Button>
                    <Button className="btn-send" type="submit" variant="primary" size="sm" disabled={isSubmitting} onClick={() => this.handleActive('pushPopup')}>{LangHelper.getResource('Push')}</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button className="btn-save" type="submit" variant="primary" size="md" disabled={isSubmitting} onClick={() => this.handleActive('savePopup')}>{LangHelper.getResource('Save')}</Button>
                    <Button className="btn-send" type="submit" variant="primary" size="sm" disabled={isSubmitting} onClick={() => this.handleActive('activatePopup')}>{LangHelper.getResource('Activate')}</Button>
                </>
            )
        }
    };

    renderMessage = (result, message) =>{
        if(!result.isSuccessful){
            return result.message.split(';');
        }else{
            return [result.message || message];
        }
    };

    setStateUploadFile = (uploadedFiles, fileNameRemove) => {
        console.log('uploadedFiles', uploadedFiles);
        console.log('fileNameRemove', fileNameRemove);

        if (!fileNameRemove) {
            uploadedFiles.forEach((file) => {
                if(file.type !== 'string') {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (event) => {
                        const image = new Image();
                        image.src = event.target.result;
                        image.onload = () => {
                            const { height, width } = image;
                            if (height > MAXIMUM_HEIGHT_WIDTH || width > MAXIMUM_HEIGHT_WIDTH) {
                                this.setState({ invalidWidthHeight: [...this.state.invalidWidthHeight, file] });
                            }
                        };
                    };
                }
            });
        } else {
            this.setState({
                invalidWidthHeight: this.state.invalidWidthHeight.filter(x => x.name !== fileNameRemove),
                errorDrafts: {
                    invalidFileSizeDraft: this.state.errorDrafts.invalidFileSizeDraft.filter(x => x.name !== fileNameRemove),
                    invalidFileTypeDraft: this.state.errorDrafts.invalidFileTypeDraft.filter(x => x.name !== fileNameRemove)
                }
            });
        }

        this.setState({ uploadedFiles });
    };

    changeStringToFile = async () => {
        const { notificationId: id } = this.props.actionParam;
        const { uploadedFiles } = this.state;

        if (uploadedFiles.length === 0) return;

        const urls = uploadedFiles.map(item => ({
            name: item.name,
            key: item.key,
            url: Site.resolveClientUrl(`www/dist/images/notification-center/${id}/${item.name}`)
        }));

        for (const item of urls) {
            const response = await fetch(item.url);
            const data = await response.blob();
            const file = new File([data], item.name);
            file.key = item.key;

            const image = new Image();
            image.src = item.url;
            image.onload = () => {
                const { height, width } = image;
                if (height > MAXIMUM_HEIGHT_WIDTH || width > MAXIMUM_HEIGHT_WIDTH) {
                    this.setState(prevState => ({
                        invalidWidthHeight: [...prevState.invalidWidthHeight, item]
                    }));
                }
            };

            if (!this.validFileExtension(file)) {
                this.setState(prevState => ({
                    errorDrafts: {
                        ...prevState.errorDrafts,
                        invalidFileTypeDraft: [...prevState.errorDrafts.invalidFileTypeDraft, file]
                    }
                }));
            }

            if (!this.validFileSize(file)) {
                this.setState(prevState => ({
                    errorDrafts: {
                        ...prevState.errorDrafts,
                        invalidFileSizeDraft: [...prevState.errorDrafts.invalidFileSizeDraft, file]
                    }
                }));
            }
        }     
    };

    validFileSize = file => {
        const MAX_SIZE_MB = 10000;
        const fileSizeKB = Math.round(file.size / 1024).toFixed(2);
        return fileSizeKB <= MAX_SIZE_MB;
    };
    
    validFileType = file => {
        const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png'];
        return ALLOWED_FILE_TYPES.includes(file.type);
    };

    validFileExtension = (file) => {
        const VALID_EXTENSIONS = ['jpeg', 'pjpeg', 'jpg', 'png'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return VALID_EXTENSIONS.includes(fileExtension);
    };

    getFileString = (filename) => {
        if (!filename) return [];
        return filename.split(',').map(file => ({ name: file, type: 'string' }));
    };

    filterDuplicate = (files) => {
        return files.reduce((uniqueFiles, currentFile) => {
            if (!uniqueFiles.some(file => file?.name === currentFile?.name)) {
                uniqueFiles.push(currentFile);
            }
            return uniqueFiles;
        }, []);
    };

    getFileStringRemove = (oldFileName, uploadedFiles) => {
        const fileStringRemove = oldFileName.filter(item => 
            !uploadedFiles.some(uploaded => uploaded.name === item.name)
        );
        return this.filterDuplicate(fileStringRemove);
    };

    filterFormStringFiles = uploadedFiles => {
        const formFiles = uploadedFiles.filter(item => item.type !== 'string');
        const fileStrings = uploadedFiles.filter(item => item.type === 'string');
    
        const uniqueFormFiles = this.filterDuplicate(formFiles);
        const uniqueFileStrings = this.filterDuplicate(fileStrings);
    
        if (uniqueFileStrings.length > 0) {
            const filteredFormFiles = uniqueFormFiles.filter(
                file => !uniqueFileStrings.some(stringFile => stringFile.name === file.name)
            );
            return [...uniqueFileStrings, ...filteredFormFiles];
        }
    
        return uniqueFormFiles;
    };

    getFileName = uploadedFiles => {
        return uploadedFiles.map(file => file.name).join(',');
    };
    

    handlePreviewImage = (event, notificationId, fileName) => {
        event.preventDefault();
        const url = Site.resolveClientUrl(`www/dist/images/notification-center/${notificationId}/${fileName}`);
        window.open(url);
    };

    getParams = status => {
        const { content_en, content_cs, content_ch, content_zhcn, subject, remark, oldFileName } = this.formik.values;
        const { uploadedFiles } = this.state;
        const { notificationId, isOstUser } = this.props.actionParam;
        const formData = new FormData();

        if (oldFileName.length > 0) {
            const fileStringRemoves = this.getFileStringRemove(oldFileName, uploadedFiles);
            if (fileStringRemoves.length > 0) {
                fileStringRemoves.forEach(oldFile => {
                    formData.append('fileStringRemove', oldFile.name);
                });
            }
        }

        const filteredFiles = this.filterFormStringFiles(uploadedFiles);
        filteredFiles.forEach(file => {
            if (file.type === 'string') {
                formData.append('fileString', file.name);
            } else {
                formData.append('formFile', file);
            }
        });

        const params = {
            notificationId,
            newStatus: status,
            newSubject: subject,
            newContentEN: content_en,
            newContentCS: content_cs,
            newContentCH: isOstUser ? content_ch : null,
            newContentZHCN: isOstUser ? content_zhcn : null,
            subject,
            remark: isOstUser ? remark : null,
            filename: isOstUser ? this.getFileName(uploadedFiles) : null,
        };

        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        return formData;
    };

    renderForm = ({
        values,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        errors,
        touched
    }) => {
        const { messageSuccessful, affectedTicketPopup, collapseEvent } = this.state;
        const { editAdmNotificationResult, isEdit, actionParam } = this.props;
        const { isOstUser } = actionParam;
        const headerClass = isOstUser ? 'group-header required' : 'group-header';
        const resourceKey = isOstUser ? 'Content' : 'SubjectAndContent';

        return (
            <Form noValidate onSubmit={handleSubmit}>
                {
                    editAdmNotificationResult &&
                    <ResponseMessage isSuccessful={editAdmNotificationResult.isSuccessful}
                        messages={this.renderMessage(editAdmNotificationResult, messageSuccessful)}
                    />
                }
                {
                    <FormikErrorMessage isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                }
                <div className="action-notification">
                    <div className='action-content'>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{`${LangHelper.getResource('NotificationID_MsgID')}:`}</Form.Label>
                                <div>{values.notificationID}</div>
                                { values.messageID && <span className='pl-2'>{`(Msg: ${values.messageID})`}</span> }
                            </Form.Group>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoStatus'>{`${LangHelper.getResource('Status')}:`}</Form.Label>
                                <div className='action-status'><div className={`status-button status-${values.status} status-width`}></div></div>
                            </Form.Group>
                        </Form.Row>
                        <div className="group-item">
                            <div className="group-header header-event"
                                aria-controls="text-expand-event"
                                aria-expanded={!collapseEvent}
                                onClick={() => this.handleCollapseExpand()}
                            >
                                <div className='label'>{LangHelper.getResource('EventInfo')}</div>
                                <div className={`drop-down-event ${collapseEvent && 'down-right'}`}></div>
                            </div>
                            <Collapse in={!collapseEvent}>
                                <div id="text-expand-event" >
                                    <div className="group-event-info">
                                        <Form.Group className='info-event'>
                                            <Form.Label className='text-bold' htmlFor="eventTime">
                                                {`${LangHelper.getResource('EventTimeGMT8')}:`}
                                            </Form.Label>
                                            <div>{values.eventTime ? DateTimeService.toShortDateTimeFormat(values.eventTime) : null}</div>
                                        </Form.Group>
                                        <Form.Group className='info-event'>
                                            <Form.Label className='text-bold event-name' htmlFor="eventName">
                                                {`${LangHelper.getResource('EventName')}:`}
                                            </Form.Label>
                                            <div>{values.eventName}</div>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Sites')}</div>
                            <div className="group-site">
                                <div className="content">
                                    {
                                        this.renderMapSite()
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className={`${headerClass} group-sub-lan`}>{LangHelper.getResource(resourceKey)}</div>
                            {
                                !isOstUser &&
                                (
                                    <Form.Group className='info-subject'>
                                        <Form.Label className='text-bold required' htmlFor="subject">
                                            {LangHelper.getResource('Subject')}
                                        </Form.Label>
                                        <Form.Control className='shadow-none' type="text" id="subject"
                                            autoComplete="off" name="subject" value={values.subject}
                                            onChange={event => setFieldValue('subject', event.target.value)}
                                            isInvalid={touched.subject && errors.subject}
                                        />
                                    </Form.Group>
                                )
                            }
                            <div className="group-language">
                                <Col sm={12} md={12}>
                                    {
                                        !isOstUser &&
                                        (
                                            <Form.Label className='text-bold required' htmlFor="content">
                                                {LangHelper.getResource('Content')}
                                            </Form.Label>
                                        )
                                    }
                                    <Tabs
                                        className={`languages-text ${this.invalidTabCss(errors)}`}
                                        id="controlled-tab"
                                        activeKey={this.state.tab}
                                        onSelect={selected => this.handleChangeTab(selected)}
                                    >
                                        {
                                            this.languages.map((language, key) =>
                                                (<Tab key={key} eventKey={language.name} title={language.name}>
                                                    <CkEditor
                                                        name={language.name}
                                                        data={values[language.mapLabel]}
                                                        username={window.currentUsername}
                                                        onChange={value => isEdit ? setFieldValue([language.mapLabel], value) : null}
                                                        isRemoveToolbarForChatbot
                                                        isRemoveAllToolbar={isOstUser || !isEdit}
                                                        isInvalid={touched[language.mapLabel] && errors[language.mapLabel]}
                                                        isPaddingContent
                                                    />
                                                </Tab>)
                                            )
                                        }
                                    </Tabs>
                                </Col>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Remarks')}</div>
                            <div className='group-remark'>
                                <Form.Control as="textarea"
                                    className="shadow-none form-control"
                                    name={'remark'} id={'remark' } rows="8"
                                    value={values.remark}
                                    onChange={event => setFieldValue('remark', event.target.value)}
                                />
                                {
                                    isOstUser && (
                                        isEdit ? (
                                            <FileUpload
                                                id={values.notificationID}
                                                uploadedFiles={this.state.uploadedFiles}
                                                setStateUploadFile={this.setStateUploadFile}
                                            />
                                        ) : (
                                            <div className={this.getFileString(values.filename).length > 0 ? 'content-border pb-2 cl-file' : ''}>
                                                {this.getFileString(values.filename).length > 0 && 
                                                    this.getFileString(values.filename).map((image, key) => (
                                                        <div key={key} className="d-flex image-section">
                                                            <span className="fa fa-file-image-o mr-2 pt-1" />
                                                            <span 
                                                                className="mr-2 text-color" 
                                                                onClick={event => this.handlePreviewImage(event, values.notificationID, image.name)}
                                                            >
                                                                {image.name}
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        {
                            isEdit && (
                                <div className="group-btn">
                                    <Button className="btn-cancel" variant="primary" size="sm" onClick={() => this.handleClose()}>{LangHelper.getResource('Cancel')}</Button>
                                    {
                                        this.renderButton(isSubmitting)
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    affectedTicketPopup.show &&
                    <AffectedTicket
                        notificationId={values.notificationID}
                        eventTime={values.eventTime}
                        eventName={values.eventName}
                        exportExcel={this.props.exportExcel}
                        isCredit={affectedTicketPopup.isCredit}
                        siteTickets={affectedTicketPopup.siteTickets}
                        onClose={this.handleClosePopup}
                    />
                }
                {
                    this.props.isEdit && this.isRenderPopupAction() &&
                    this.renderConfirmPopup()
                }
            </Form>
        )
    }

    render = () => {
        const { data } = this.state;
        const { isOstUser } = this.props.actionParam;

        if(!data) {
            return null;
        }
        const fileStrings = this.getFileString(data.filename);
        console.log('fileStrings', fileStrings);
        const initialValues = {
            notificationID: data.notificationID,
            messageID: data.messageID,
            status: data.status,
            eventTime: data.eventTime,
            eventName: data.eventName,
            subject: data.subject,
            content_en: data.content_en,
            content_cs: data.content_cs,
            content_ch: isOstUser ? data.content_ch : null,
            content_zhcn: isOstUser ? data.content_zhcn : null,
            remark: isOstUser ? data.remark : null,
            filename: isOstUser ? data.filename : null,
            imageFileType: '',
            imageFileSize: '',
            oldFileName: isOstUser ? this.getFileString(data.filename) : null,
        };
        const excludeOldImage = this.state.uploadedFiles.filter(item => item.type !== 'string');

        return (
            <Formik
                innerRef={p => (this.formik = p)}
                initialValues={initialValues}
                validate={values => this.validateFormik(values, excludeOldImage)}
                onSubmit={this.handleActive}
            >
                {this.renderForm}
            </Formik>
        )
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editAdmNotificationResult } = state;
    return { gridParams, editAdmNotificationResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonNotification);