import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Row} from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import UploadFile from './UploadFile';
import Option from './Option';
import ContentTab from './ContentTab';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import {
    validateFormik, renderOption, mapLabelLanguage, setValueContent, getParams, validFileSize, validFileExtension
} from '../common.functions';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

export class ActionAnnouncement extends Component {
    constructor(props) {
        super(props);
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
            confirmActionDialog: { show: false, params: null, content: null },
            isChangeTemplate: false,
            parameters: null,
            invalidWidthHeight: [],
            isHeadlineGroup: {
                isUsername: true,
                isSiteType: false
            },
            isSendType: {
                isSendNow: false,
                isSendAt: false
            },
            errorDrafts: {
                invalidFileTypeDraft: [],
                invalidFileSizeDraft: []
            }
        };
    }

    async componentDidMount() {
        await this.getLanguages();
        await this.props.getAnnouncementTemplate();
        await this.getAnnounceDetail();
        await this.changeStringToFile();
    }

    getAnnounceDetail = async () =>{
        const {announcementId} = this.props.actionParam;
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
            const siteNameListId = [];
            const currencyIdListId = [];
            const siteOptions = this.props.settings.siteList.map(x => {
                siteNameListId.push(x.site);
                return {
                    id: x.site,
                    name: x.site,
                    checked: announcement.siteNameList ? announcement.siteNameList?.includes(x.site) : false
                };
            });

            const currencyOptions = this.props.settings.currencyList.map(x => {
                currencyIdListId.push(x.id);
                return {
                    id: x.id,
                    name: x.name,
                    checked: announcement.currencyIdList ? announcement.currencyIdList?.split(',').includes(x.id.toString()) : false
                };
            });

            this.setState({
                siteOptions,
                currencyOptions,
                options: {
                    ...this.state.options,
                    site: announcement.siteNameList ? announcement.siteNameList : '',
                    currency: announcement.currencyIdList ? announcement.currencyIdList : ''
                },
                headlineGroups: announcement.siteNameList ? [] : (announcement.headlineNameList ? announcement.headlineNameList.split(',') : []),
                uploadedFiles: !announcement.fileName ? [] : (announcement.fileName ? announcement.fileName.split(',') : []),
                isHeadlineGroup: {
                    isUsername: this.checkShowHeadlineGroup(announcement) ? false : (announcement.headlineNameList ? true : false),
                    isSiteType: this.checkShowHeadlineGroup(announcement) ? true : false
                },
                isSendType: {
                    isSendNow: announcement.sendImmediately,
                    isSendAt: !announcement.sendImmediately && announcement.sendDate
                }
            });
        });
    }

    checkShowHeadlineGroup = announcement => {
        if (announcement.siteNameList || announcement.currencyIdList || typeof announcement.headlineType === 'number') {
            return true;
        }
        return false;
    };

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
            this.setState({headlineGroups: concatHeadline});
            this.headlineInputRef.current.focus();
            this.headlineInputRef.current.value = '';
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

    setStateUploadFile = (uploadedFiles, fileNameRemove) => {
        if(!fileNameRemove){
            uploadedFiles.forEach((file) => {
                if(typeof file !== 'string'){
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
                    }};
                }
            });
        }else{
            const invalidWidthHeight = this.state.invalidWidthHeight.filter(x => x !== fileNameRemove);
            const invalidFileSizeDraft = this.state.errorDrafts.invalidFileSizeDraft.filter(x => x.name !== fileNameRemove);
            const invalidFileTypeDraft = this.state.errorDrafts.invalidFileTypeDraft.filter(x => x.name !== fileNameRemove);
            this.setState({
                invalidWidthHeight,
                errorDrafts: {
                    invalidFileSizeDraft: invalidFileSizeDraft,
                    invalidFileTypeDraft: invalidFileTypeDraft
                }
            });
        }
        
        this.setState({uploadedFiles});
    }

    changeStringToFile = async () => {
        const id = this.props.actionParam.announcementId;
        const fileNames = this.state.data.fileName.split(',');
        const maximumHeightWidth = 2560;
        const urls = [];

        if (fileNames.length > 0) {
            fileNames.map(item => urls.push({
                fileName: item,
                url: Site.resolveClientUrl(`www/dist/images/announcement/${id}/${item}`)
            }));
    
            urls.forEach(async (item) => {
                const response = await fetch(item.url);
                const data = await response.blob();
                const file = new File([data], item.fileName);

                const image = new Image();
                image.src = item.url;
                image.onload = () => {
                    const {
                        height,
                        width
                    } = image;

                    if (height > maximumHeightWidth || width > maximumHeightWidth) {
                        this.setState({invalidWidthHeight: [...this.state.invalidWidthHeight, item.fileName]});
                    }
                }

                if (!validFileExtension(file)) {
                    this.setState(prevState => ({
                        errorDrafts: {
                            ...prevState.errorDrafts,
                            invalidFileTypeDraft: [...prevState.errorDrafts.invalidFileTypeDraft, file]
                        }
                    }));
                }
                if (!validFileSize(file)) {
                    this.setState(prevState => ({
                        errorDrafts: {
                            ...prevState.errorDrafts,
                            invalidFileSizeDraft: [...prevState.errorDrafts.invalidFileSizeDraft, file]
                        }
                    }));
                }
            });
        }
    };

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

    handleChangeSendType = value => {
        const isSendAt = value === 'Send At' ? true : false;
        this.formik.setFieldValue('sendType', value);
        this.setState({
            isSendType: {
                isSendNow: !isSendAt,
                isSendAt: isSendAt
            }
        })
    };

    handleCheckHeadline = (fieldTrue, fieldFalse) => {
        this.setState({
            isHeadlineGroup: {
                [`${fieldTrue}`]: true,
                [`${fieldFalse}`]: false
            }
        });
    };

    isValidateContent = content => {
        if (content.EN || content.ENSC || content.SC || content.TH || content.YN) {
            return true;
        }
        return false;
    };

    isDisableSubmit = (values, isSubmitting) => {
        const { isHeadlineGroup } = this.state;
        if (!isSubmitting && values.title && this.isValidateContent(values.content) && values.sendType && (isHeadlineGroup.isUsername || isHeadlineGroup.isSiteType)){
            return false;
        }
        return true;
    };

    handleSaveDraft = (event, values) => {
        event.preventDefault();
        values.status = 'Draft';
        const params = getParams(values, this.state);
        const {announcementId, isEdit} = this.props.actionParam;
        params.append(isEdit ? 'announcementId' : 'cloneAnnouncementId', announcementId);

        this.props.editAnnouncement(params).then(() => {
            if (!isEdit) {
                this.props.setCreateAnnouncement(this.props.editAnnouncementResult);
            }
            if (this.props.editAnnouncementResult.isSuccessful) {
                setTimeout(() => {
                    this.props.setIsRefresh(true);
                    this.props.setEditAnnouncement(null);
                    this.props.setCreateAnnouncement(null);
                    this.props.navigate(Site.resolveClientUrl('Announcement'));
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        values.status = 'Planned';
        const params = getParams(values, this.state);
        const {announcementId, isEdit} = this.props.actionParam;
        params.append(isEdit ? 'announcementId' : 'cloneAnnouncementId', announcementId);

        this.props.validateAnnouncement(params).then(() => {
            const contentConfirm = this.props.validateAnnouncementResult;
            if (!contentConfirm?.code && contentConfirm.length > 0) {
                this.setState({confirmActionDialog: { show: true, params: params, content: contentConfirm[0]}});
            }
            this.formik.setSubmitting(false);
        });
    };

    handleConfirmActionDialog = () =>{
        this.handleCloseConfirmEditDialog();
        const formData = this.state.confirmActionDialog.params;
        const {createAnnouncement, editAnnouncement, actionParam} = this.props;
        const {isEdit} = actionParam;
        const actionFunc = isEdit ? editAnnouncement : createAnnouncement;
        actionFunc(formData).then(() => {
            const resultAction = isEdit ? this.props.editAnnouncementResult : this.props.createAnnouncementResult; 
            if (resultAction.isSuccessful) {
                setTimeout(() => {
                    this.props.setIsRefresh(true);
                    this.props.setEditAnnouncement(null);
                    this.props.setCreateAnnouncement(null);
                    this.props.setValidateAnnouncement(null);
                    this.props.navigate(Site.resolveClientUrl('Announcement'));
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    handleCloseConfirmEditDialog = () =>{
        this.setState({confirmActionDialog: { show: false, params: null, content: null }});
        this.formik.setSubmitting(false);
    };

    handleClose = () => {
        this.props.setCreateAnnouncement(null);
        this.props.setEditAnnouncement(null);
        this.props.setValidateAnnouncement(null);
        this.props.navigate(Site.resolveClientUrl('Announcement'));
    };

    renderContentType = contentConfirm => {
        const currencies = [];
        let headlineType = null;

        const headlineTypes = [{id: 2, name: 'All'}, ...this.props.settings.headlineTypeList];
        headlineTypes.map(data => {
            if(contentConfirm.headlineType === data.id){
                headlineType = data.name;
            }
        });

        this.props.settings.currencyList.map(data => {
            if(contentConfirm.currencyList.split(',').includes(data.id.toString())){
                currencies.push(data.name);
            }
        });
        return { headlineType, currencies: currencies.join(', ') };
    }

    renderContentConfirm = () =>{
        const {sendType, sendDate} = this.formik.values;
        const contentConfirm = this.state.confirmActionDialog.content;
        const sendDateFormat = DateTimeService.toLongDateTimeFormat(sendDate);
        const content = sendType === 'Send At' ? 
                        LangHelper.formatString(LangHelper.getResource('ConfirmSendAt'), sendDateFormat) :
                        LangHelper.getResource('ConfirmSendImmediately');
        const sendDateType = sendType === 'Send At' ? `${contentConfirm.sendDateString} ${contentConfirm.sendTimeString} (GMT+8)` : 'Send Now';
        return(
            <>
                <div className="line-content">{content}</div>
                <div className="group-item">
                    <div className="group-header">{LangHelper.getResource('GroupHeadline')}</div>
                    <div className="group-content">
                        {
                            contentConfirm.siteNameList &&
                            (
                                <>
                                    <div className="group-list">
                                        <div className="list-title"> {LangHelper.getResource('Site')}</div>
                                        <div className="list-info">{contentConfirm.siteNameList.replaceAll(',', ', ')}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title"> {LangHelper.getResource('Currency')}</div>
                                        <div className="list-info">{this.renderContentType(contentConfirm).currencies}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title headline-type"> {LangHelper.getResource('HeadlineType')}: 
                                            <span>{this.renderContentType(contentConfirm).headlineType}</span>
                                        </div>
                                    </div>
                                    {
                                        contentConfirm.directAccounts && contentConfirm.directAccounts.length > 0 &&
                                        <div className="group-list">
                                            <div className="list-title">{LangHelper.getResource('DirectAccount')}</div>
                                            <div className="list-info">{contentConfirm.directAccountList ? contentConfirm.directAccountList.replaceAll(',', ', ') : ''}</div>
                                        </div>
                                    }
                                </>
                            )
                        }
                        <div className="group-list">
                            <div className="list-title"> {LangHelper.getResource('Username')}</div>
                            <div className="list-info">{contentConfirm.headlineNameList ? contentConfirm.headlineNameList.replaceAll(',', ', ') : ''}</div>
                        </div>
                    </div>
                </div>
                <div className="group-item">
                    <div className="group-header"> {LangHelper.getResource('SendingType')}</div>
                    <div className="group-content">{sendDateType}</div>
                </div>
            </>
        );
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const propsOption = { values, handleChange, errors, touched };
        const {parameters, isChangeTemplate, uploadedFiles, siteOptions, currencyOptions, isHeadlineGroup} = this.state;
        const {actionParam, editAnnouncementResult, createAnnouncementResult} = this.props;
        const result = actionParam.isEdit ? editAnnouncementResult : createAnnouncementResult;
        const notificationTemplates = [{notificationTemplateId: 0, notificationTemplateName: LangHelper.getResource('PleaseSelect')}, ...this.props.announcementTemplate.notificationTemplates];
        const headlineTypeList = [{id: 2, name: 'All'}, ...this.props.settings.headlineTypeList];

        return (
            <Form noValidate onSubmit={handleSubmit}>
                <div className="add-announcement">
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.validateAnnouncementResult?.code &&
                        <ResponseMessage isSuccessful={this.props.validateAnnouncementResult.isSuccessful}
                            messages={this.renderMessage(this.props.validateAnnouncementResult)}
                        />
                    }
                    {
                        result &&
                        <ResponseMessage isSuccessful={result.isSuccessful}
                            messages={this.renderMessage(result, message)}
                        />
                    }
                    <div className="group-item">
                        <div className="group-header">{LangHelper.getResource('Announcement')}</div>
                        <div className="group-content">
                            <div className="content-item item-announcement">
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="notificationTemplateName">
                                        {LangHelper.getResource('Template')}
                                    </Form.Label>
                                    <Form.Control as="select" size="sm"  className="shadow-none"
                                        name="notificationTemplateId" id="notificationTemplateId"
                                        value={values.notificationTemplateId}
                                        onChange={this.handleChangeNotificationTemplate}
                                        disabled={actionParam.isEdit}
                                    >
                                        <option value="" hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                        {notificationTemplates.map((value, key) => renderOption(key, value.notificationTemplateId, value.notificationTemplateName))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label
                                        className="required" htmlFor="title"
                                    >
                                        {LangHelper.getResource('Title')}
                                    </Form.Label>
                                    <Form.Control type="text" size="sm" value={values.title}
                                        name="title" id="title"
                                        className="shadow-none" autoComplete="off"
                                        isInvalid={touched.title && errors.title}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            {
                                <ContentTab
                            isValidContent={(touched.content && errors.content) || invalidContentMaxLength} content={values.content} setFieldValue={setFieldValue}
                                    languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab} 
                                />
                            }
                            {
                                !actionParam.isEdit && isChangeTemplate && parameters &&
                                <Form.Group as={Row}>
                                    <Form.Label />
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
                            <div className="group-upload-file">
                                <UploadFile id={actionParam.announcementId}
                                    setStateUploadFile={this.setStateUploadFile} uploadedFiles={uploadedFiles}
                        invalidContentMaxLength={invalidContentMaxLength} textInvalidContentMaxLength={textInvalidContentMaxLength}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="group-item">
                        <div className="group-header">{LangHelper.getResource('GroupHeadline')}</div>
                        <div className="group-content">
                            <div className={"group-headline " + (this.state.isHeadlineGroup.isUsername ? 'send-type-active' : '')}>
                                <input
                                    className="custom"
                                    type="radio"
                                    name="groupHeadline"
                                    id="groupHeadline"
                                    value={this.state.isHeadlineGroup.isUsername}
                                    checked={this.state.isHeadlineGroup.isUsername}
                                    onChange={() => this.handleCheckHeadline('isUsername', 'isSiteType')}
                                />
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="groupHeadline">
                                        {LangHelper.getResource('GroupHeadline')}
                                    </Form.Label>
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
                                            disabled={!isHeadlineGroup.isUsername}
                                            onChange={this.handleChangeInputHeadline}
                                            onKeyDown={this.handleChangeInputHeadline}
                                            onBlur={event => this.handleBlurInputHeadline(event)}
                                            onPaste={this.handlePasteGroupHeadline}
                                        />
                                    </div>
                                    <Form.Label className="notice-line">
                                        {LangHelper.getResource('GroupHeadlineEnterNotice')}
                                    </Form.Label>
                                </Form.Group>
                            </div>
                            <div className={"group-headline " + (this.state.isHeadlineGroup.isSiteType ? 'send-type-active' : '')}>
                                <input
                                    className="custom"
                                    type="radio"
                                    name="groupHeadline"
                                    id="groupHeadline"
                                    value={this.state.isHeadlineGroup.isSiteType}
                                    checked={this.state.isHeadlineGroup.isSiteType}
                                    onChange={() => this.handleCheckHeadline('isSiteType', 'isUsername')}
                                />
                                <div className="group-select">
                                    <Form.Group as={Row}>
                                        <Form.Label >{LangHelper.getResource('Site')}</Form.Label>
                                        <div className='form-control-wrapper'>
                                            <MultipleSelect
                                                isDisable={!isHeadlineGroup.isSiteType}
                                                dataSource={siteOptions}
                                                keyField='id'
                                                hasSearchBox
                                                valueField='name'
                                                statusField='checked'
                                                isSummited={false}
                                                isAllTextShown
                                                isPlacementTop
                                                onChange={
                                                    (currentItem, selectedItemsKey) => this.handleOptionChange('site', selectedItemsKey)
                                                }
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label>{LangHelper.getResource('Currency')}</Form.Label>
                                        <div className='form-control-wrapper'>
                                            <MultipleSelect
                                                dataSource={currencyOptions}
                                                isDisable={!isHeadlineGroup.isSiteType}
                                                keyField='id'
                                                valueField='name'
                                                hasSearchBox
                                                statusField='checked'
                                                isPlacementTop
                                                isSummited={false}
                                                isAllTextShown
                                                onChange={
                                                    (currentItem, selectedItemsKey) => this.handleOptionChange('currency', selectedItemsKey)
                                                }
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label >{LangHelper.getResource('HeadlineType')}</Form.Label>
                                        <Form.Control as='select' size='sm' className='form-control-wrapper'
                                            name='headlineType' value={values.headlineType}
                                            disabled={!isHeadlineGroup.isSiteType}
                                            onChange={handleChange}
                                        >
                                            <option value=''>{LangHelper.getResource('PleaseSelect')}</option>
                                            {
                                                headlineTypeList.map((value, key) => <option key={key} value={value.id}>{value.name}</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Option
                        {...propsOption} stateValue={this.state} settings={this.props.settings} handleChange={this.handleChangeSendType}
                        handleDateChange={this.handleDateChange} handleOptionChange={this.handleOptionChange}
                    />
                    <div className="group-btn">
                        <Button className="btn-cancel" variant="primary" size="sm" onClick={this.handleClose}>{LangHelper.getResource('Cancel')}</Button>
                        <Button className="btn-save" variant="primary" size="md" onClick={event => this.handleSaveDraft(event, values)}>{LangHelper.getResource('Save as Draft')}</Button>
                        <Button className="btn-send" type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Push')}</Button>
                    </div>
                </div>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        const isInvalid = this.handleCheckValidAllContent(values.content);
        if(!isInvalid){
            setSubmitting(true);
            const params = getParams(values, this.state);
            const {announcementId, isEdit} = this.props.actionAnnouncementPopup;
            params.append(isEdit ? 'announcementId' : 'cloneAnnouncementId', announcementId);
            this.setState({confirmActionDialog: { show: true, params}});
        }
    handleCheckValidAllContent = content =>{
        for (const property in content) {
            const {invalidContentMaxLength} = checkInvalidMaxLengthContent(content, property);
            if(invalidContentMaxLength){
                return true; 
            }
        }
        return false;
    };

    handleConfirmActionDialog = async () =>{
        await actionFunc(formData).then(() => {
                const {sendType} = this.formik.values;
                if(sendType !== 'Send At'){
                    this.props.sendMessageAnnouncementToBotEndpoint();
                }
    render() {
        const {settings, actionParam, announcementTemplate} = this.props;
        const {data} = this.state; 
        if(!data || !announcementTemplate || !this.state.languages || !settings || !this.state.content) {
            return null;
        }
        const initialValues = {
            notificationTemplate: data.notificationTemplateName,
            notificationTemplateId: data.notificationTemplateId,
            title: data.title,
            content: this.state.content,
            headlineType: (typeof data.headlineType === 'number') ? data.headlineType : '',
            sendType: data.sendImmediately ? 'Send immediately' : (data.sendDate ? 'Send At' : ''),
            sendDate: data.sendDate ? new Date(data.sendDate) : new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date()))),
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
            },
            status: 'Planned'
        };
        const excludeOldImage = this.state.uploadedFiles.filter(x => !initialValues.oldFileName.includes(x));

        return (
            <div>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    validate={values => validateFormik(values, excludeOldImage, this.state.invalidWidthHeight, this.state.errorDrafts)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
                {
                    this.state.confirmActionDialog.show &&
                    <SweetModalDialog size="lg" className="announcement-content-modal"
                        title={LangHelper.getResource('ConfirmEditAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={() => this.handleConfirmActionDialog()}>
                                {LangHelper.getResource('Push')}
                            </Button>,
                            <Button className="btn-cancel" onClick={this.handleCloseConfirmEditDialog}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={() => this.handleCloseConfirmEditDialog()}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup, createAnnouncementResult, validateAnnouncementResult } = state;
    return { announcementTemplate, settings, editAnnouncementResult, actionAnnouncementPopup, createAnnouncementResult, validateAnnouncementResult };
};

const ActionAnnouncementNavigation = WithNavigation(ActionAnnouncement);

export default connect(mapStateToProps, mapDispatchToProps)(ActionAnnouncementNavigation);