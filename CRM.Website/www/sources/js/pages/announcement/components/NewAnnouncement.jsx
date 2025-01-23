import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import ContentTab from './ContentTab';
import Option from './Option';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import {
    validateFormik, renderOption, mapLabelLanguage, setValueContent, getParams,
    handleResetWhenBackPage, isDisableSubmit, getUsernames, checkInvalidMaxLengthContent
} from '../common.functions';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

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
            confirmInsertDialog: { show: false, params: null, content: null },
            isChangeTemplate: false,
            parameters: null,
            invalidWidthHeight: [],
            isHeadlineGroup: {
                isUsername: false,
                isSiteType: false
            },
            isSendType: {
                isSendNow: false,
                isSendAt: false
            }
        };
    }

    async componentDidMount() {
        handleResetWhenBackPage(this.props);
        this.props.setLanguageType(true);
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            const languages = mapLabelLanguage(response);
            this.setState({ languages, tab: firstLanguage });
        });
        await this.props.getAnnouncementTemplate();
        await this.handleOptionSettings();
    }

    handleOptionSettings = async () => {
        await this.props.getSettings().then(() => {
            const siteOptions = this.props.settings.siteList.map(x => {
                return {
                    id: x.site,
                    name: x.site,
                    checked: false
                };
            });

            const currencyOptions = this.props.settings.currencyList.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    checked: false
                };
            });

            this.setState(prevState => ({
                siteOptions,
                currencyOptions
            }));
        });
    };

    setStateUploadFile = (uploadedFiles, languageKey, fileNameRemove) => {
        if (!fileNameRemove) {
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
                            this.setState({ invalidWidthHeight: [...this.state.invalidWidthHeight, file] });
                        }
                    };
                };
            });
        } else {
            const invalidWidthHeight = this.state.invalidWidthHeight.filter(x => x.name !== fileNameRemove || x.key !== languageKey);
            this.setState({ invalidWidthHeight });
        }

        this.setState({ uploadedFiles });
    };

    handleChangeNotificationTemplate = event => {
        event.preventDefault();
        const value = parseInt(event.target.value);
        this.formik.setFieldValue('notificationTemplateId', value);
        this.formik.setFieldValue('notificationTemplate', value);
        this.getContentByTemplateId(value);
        this.setState({ isChangeTemplate: true });
    };

    getContentByTemplateId = id => {
        const contents = this.props.announcementTemplate.contents.filter(x => x.notificationTemplateId === id);
        const title = this.props.announcementTemplate.notificationTemplates.filter(x => x.notificationTemplateId === id)[0].title;
        this.formik.setFieldValue('title', title);
        setValueContent(this.formik.setFieldValue, contents);
        const content = contents.filter(x => x.language === this.state.tab)[0].content;
        this.handleGetParameters(content);
    };

    handleGetParameters = content => {
        const parameters = content.match(/\{.*?\}/g);
        this.setState({ parameters });
    };

    handleChangeTab = selected => {
        this.setState({ tab: selected });
        this.formik.setFieldValue('cloneContent', this.formik.values.content);
        const replaceTab = selected.replace(/[^A-Z0-9]/ig, '');
        const content = this.formik.values.content[replaceTab];
        this.handleGetParameters(content);
    };

    handlePasteGroupHeadline = event => {
        if (this.state.isHeadlineGroup.isUsername) {
            const item = (event.clipboardData || window.clipboardData).getData('text')
            .replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',')
            .split(',').filter(item => item !== '');
            const concatHeadline = [...this.state.headlineGroups, ...item];
            setTimeout(() => {
                this.handleSetValueHeadline(concatHeadline);
            }, 100);
        }
    };

    handleSetValueHeadline = headlineGroups => {
        const headlineGroupsRemoveSpace = headlineGroups.filter(word => word.trim().length > 0);
        this.setState({ headlineGroups: headlineGroupsRemoveSpace });
        this.headlineInputRef.current.focus();
        this.headlineInputRef.current.value = '';
    };

    handleChangeInputHeadline = event => {
        const value = event.target.value;
        const isDownKey = value.includes(',') || value.includes(' ') || event.keyCode === 13;
        if (event.keyCode === 8) {
            this.state.headlineGroups.pop();
            this.setState({ headlineGroups: this.state.headlineGroups });
        }
        if (value.trim().length > 0 && isDownKey) {
            event.preventDefault();
            const headlineGroups = [... this.state.headlineGroups, value.slice(0, -1)];
            this.handleSetValueHeadline(headlineGroups);
        }
    };

    handleBlurInputHeadline = event => {
        const value = event.target.value;
        if (value && value.trim().length > 0) {
            const headlineGroups = [... this.state.headlineGroups, value];
            this.setState({ headlineGroups });
            this.headlineInputRef.current.value = '';
        }
    };

    handleRemoveHeadline = (event, headline) => {
        if (this.state.isHeadlineGroup.isUsername) {
            event.stopPropagation();
            const headlineFilter = this.state.headlineGroups.filter(x => x !== headline);
            this.setState({ headlineGroups: headlineFilter });
        }
    };

    handleOptionChange = (name, value) => {
        this.formik.setFieldValue(`${name}`, value);
    };

    handleDateChange = value => {
        this.formik.setFieldValue('sendDate', value);
    };

    handleChangeParameter = (event, param, removeSpaceParam) => {
        const { value, name } = event.target;
        const { setFieldValue, values } = this.formik;
        const replaceTab = this.state.tab.replace(/[^A-Z0-9]/ig, '');
        let replaceContent = values.cloneContent[replaceTab];
        setFieldValue(name, value);
        replaceContent = replaceContent.replace(param, value);
        removeSpaceParam.forEach(parameter => {
            const removeSpaceParam = parameter.replace(/\s+/g, "");
            if (values[removeSpaceParam] && removeSpaceParam !== name) {
                replaceContent = replaceContent.replace(parameter, values[removeSpaceParam]);
            }
        });
        setFieldValue(`content.${replaceTab}`, replaceContent);
    };

    renderMessage = result => {
        if (!result.isSuccessful) {
            const messages = result.message.split(';');
            return messages;
        } else {
            return [result.message || LangHelper.getResource('InsertAnnouncementSuccessfully')];
        }
    };

    handleCheckHeadline = (fieldTrue, fieldFalse) => {
        this.setState({
            isHeadlineGroup: {
                [`${fieldTrue}`]: true,
                [`${fieldFalse}`]: false
            }
        });
    };

    handleSubmit = (values, { setSubmitting }) => {
        const isInvalid = this.handleCheckValidAllContent(values.content);
        if(!isInvalid) {
            setSubmitting(true);
            values.status = 'Planned';
            const param = getParams(values, this.state, this.props.isAllLanguages);
            this.props.validateAnnouncement(param).then(() => {
                const contentConfirm = this.props.validateAnnouncementResult;
                if (!contentConfirm?.code && contentConfirm.length > 0) {
                    this.setState({confirmInsertDialog: { show: true, params: param, content: contentConfirm[0]}});
                }
                this.formik.setSubmitting(false);
            });
        }
    };

    handleConfirmInsertDialog = async () =>{
        this.handleCloseConfirmInsertDialog();
        const formData = this.state.confirmInsertDialog.params;
        await this.props.createAnnouncement(formData).then(() => {
            if (this.props.createAnnouncementResult.isSuccessful) {
                const {sendType} = this.formik.values;
                if(sendType !== 'Send At'){
                    this.props.sendMessageAnnouncementToBotEndpoint();
                }
                setTimeout(() => {
                    this.props.setIsRefresh(true);
                    this.props.setCreateAnnouncement(null);
                    this.props.setValidateAnnouncement(null);
                    this.props.navigate(Site.resolveClientUrl('Announcement'), { state: this.getStateFilter() });
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
    };

    handleCloseConfirmInsertDialog = () =>{
        this.setState({confirmInsertDialog: { show: false, params: null }});
        this.formik.setSubmitting(false);
    };

    getStateFilter = () => {
        const stateAnnouncement = {
            isLoadGrid: true,
            filterParams: this.props.filterParams
        };
        return stateAnnouncement;
    };

    handleClose = () => {
        this.props.setCreateAnnouncement(null);
        this.props.setValidateAnnouncement(null);
        this.props.navigate(Site.resolveClientUrl('Announcement'), { state: this.getStateFilter() });
    };

    handleSaveDraft = (event, values) => {
        event.preventDefault();
        values.status = 'Draft';
        const param = getParams(values, this.state, this.props.isAllLanguages);

        this.props.createAnnouncement(param).then(() => {
            if (this.props.createAnnouncementResult.isSuccessful) {
                setTimeout(() => {
                    this.props.setIsRefresh(true);
                    this.props.setCreateAnnouncement(null);
                    this.props.navigate(Site.resolveClientUrl('Announcement'), { state: this.getStateFilter() });
                }, 3000);
            } else {
                this.formik.setSubmitting(false);
            }
        });
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
    };

    getSettingOption = async announcement =>{
        await this.props.getSettings().then(() =>{
            const currencies = [];
            let headlineType = '';
            this.props.settings.currencyList.map(x => {
                if(announcement.currencyIdList.split(',').includes(x.id.toString())){
                    currencies.push(x.name);
                }
            });

            const headlineTypes = [...this.props.settings.headlineTypeList, {id: 2, name: 'All'}];
            headlineTypes.map(x => {
                if(announcement.headlineType === x.id){
                    headlineType = x.name;
                }
            });

            this.setState({currencies: currencies.join(', '), headlineType});
        });
    };

    handleChangeSendType = value => {
        const isSendAt = value === 'Send At' ? true : false;
        this.formik.setFieldValue('sendType', value);
        this.setState({
            isSendType: {
                isSendNow: !isSendAt,
                isSendAt: isSendAt
            }
        });
    };

    renderContentConfirm = () =>{
        const {sendType} = this.formik.values;
        const contentConfirm = this.state.confirmInsertDialog.content;
        const content = LangHelper.getResource('ConfirmVerifySend');
        const sendDateType = sendType === 'Send At' ? `Send At ${contentConfirm.sendDateString} ${contentConfirm.sendTimeString} (GMT+8)` : 'Send Now';
        const usernames = getUsernames(contentConfirm.headlineNameList, contentConfirm.directAccountList);
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
                                </>
                            )
                        }
                        <div className="group-list">
                            <div className='label-username'>
                                <div className="list-title flex-maxItem"> 
                                    <div>{LangHelper.getResource('Username')}</div>
                                        <div className='no-usernames'>
                                        {`(`}
                                        <div>{`${LangHelper.getResource('NoOfUsernames')}: `}</div>
                                        &nbsp;
                                        <div className='red-number'>{usernames.split(',').length}</div>
                                        {`)`}
                                    </div>
                                </div>
                            </div>
                            <div className="list-info">{usernames ? usernames.replaceAll(',', ', ') : ''}</div>
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
        setFieldValue,
        handleSubmit,
        isSubmitting
    }) => {
        const { uploadedFiles, parameters, isChangeTemplate, siteOptions, currencyOptions, isHeadlineGroup } = this.state;
        const propsOption = { values, handleChange, errors, touched };
        const headlineTypeList = [{id: 2, name: 'All'}, ...this.props.settings.headlineTypeList];
        const {invalidContentMaxLength, textInvalidContentMaxLength} = checkInvalidMaxLengthContent(values.content, this.state.tab);
        const isInvalidContent = this.handleCheckValidAllContent(values.content);

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
                        this.props.createAnnouncementResult &&
                        <ResponseMessage isSuccessful={this.props.createAnnouncementResult.isSuccessful}
                            messages={this.renderMessage(this.props.createAnnouncementResult)}
                        />
                    }
                    <div className="group-item">
                        <div className="group-header">{LangHelper.getResource('Announcement')}</div>
                        <div className="group-content">
                            <div className="content-item item-announcement">
                                <Form.Group as={Row} className='template'>
                                    <Form.Label htmlFor="notificationTemplate">
                                        {LangHelper.getResource('Template')}
                                    </Form.Label>
                                    <Form.Control as="select" size="sm" className="shadow-none"
                                        name="notificationTemplateId" id="notificationTemplateId"
                                        value={values.notificationTemplateId}
                                        onChange={this.handleChangeNotificationTemplate}
                                    >
                                        <option value="" hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                        {this.props.announcementTemplate.notificationTemplates.map((value, key) => renderOption(key, value.notificationTemplateId, value.notificationTemplateName))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Row} className='title-textbox'>
                                    <Form.Label className="required" htmlFor="title">
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
                                    isValidContent={touched.content && errors.content || invalidContentMaxLength} content={values.content} setFieldValue={setFieldValue}
                                    languages={this.state.languages} tab={this.state.tab} handleChangeTab={this.handleChangeTab}
                                    isChangeTemplate={isChangeTemplate} parameters={parameters} values={values} handleChangeParameter={this.handleChangeParameter}
                                    setStateUploadFile={this.setStateUploadFile} uploadedFiles={uploadedFiles} invalidContentMaxLength={invalidContentMaxLength}
                                    textInvalidContentMaxLength={textInvalidContentMaxLength}
                                />
                            }
                        </div>
                    </div>
                    <div className="group-item">
                        <div className="group-header required">{LangHelper.getResource('GroupHeadline')}</div>
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
                                    <div className='label-username'>
                                        <Form.Label>
                                            {LangHelper.getResource('Username')}
                                        </Form.Label>
                                        <div className='no-usernames'>
                                            {`(`}
                                            <div>{`${LangHelper.getResource('NoOfUsernames')}: `}</div>
                                            &nbsp;
                                            <div className='red-number'>{this.state.headlineGroups.length}</div>
                                            {`)`}
                                        </div>
                                    </div>
                                    <div className="headline-group-form" onClick={() => this.headlineInputRef.current.focus()}>
                                        {
                                            this.state.headlineGroups.map((headline, index) => (
                                                <div key={index} className='headline-box'>
                                                    <span className='fa fa-times mr-2' onClick={event => this.handleRemoveHeadline(event, headline)} />
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
                                                isInvalid={touched.site && errors.site}
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
                                                isInvalid={touched.currency && errors.currency}
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
                                            name='headlineType' value={values.headlineType} disabled={!isHeadlineGroup.isSiteType}
                                            onChange={handleChange} isInvalid={touched.headlineType && errors.headlineType}
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
                        {...propsOption} stateValue={this.state} settings={this.props.settings}
                        handleDateChange={this.handleDateChange} handleChange={this.handleChangeSendType}
                    />
                    <div className="group-btn">
                        <Button className="btn-cancel" variant="primary" size="sm" onClick={this.handleClose}>{LangHelper.getResource('Cancel')}</Button>
                        <Button className="btn-save" variant="primary" size="md" onClick={event => this.handleSaveDraft(event, values)}>{LangHelper.getResource('Save as Draft')}</Button>
                        <Button className="btn-send" type="submit" variant="primary" size="sm" disabled={isDisableSubmit(values, this.state, isSubmitting) || isInvalidContent}>{LangHelper.getResource('Push')}</Button>
                    </div>
                </div>
            </Form>
        );
    };

    handleCheckValidAllContent = content =>{
        for (const property in content) {
            const {invalidContentMaxLength} = checkInvalidMaxLengthContent(content, property);
            if(invalidContentMaxLength){
                return true; 
            }
        }
        return false;
    };

    render() {
        const { announcementTemplate, settings, isAllLanguages } = this.props;
        if (!this.state.languages || !announcementTemplate || !settings) {
            return null;
        }

        const initialValues = {
            notificationTemplateId: '',
            notificationTemplate: '',
            title: '',
            content: {
                EN: '',
                SC: '',
                ENSC: '',
                TH: '',
                YN: ''
            },
            headlineType: '',
            site: '',
            currency: '',
            sendType: '',
            sendDate: null,
            imageFileType: '',
            imageFileSize: '',
            cloneContent: {
                EN: '',
                SC: '',
                ENSC: '',
                TH: '',
                YN: ''
            },
            status: 'Planned'
        };

        return (
            <div>
                <Formik
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    validate={values => validateFormik(values, this.state.uploadedFiles, this.state, isAllLanguages)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>

                {
                    this.state.confirmInsertDialog.show &&
                    <SweetModalDialog size="lg" className="announcement-content-modal"
                        title={LangHelper.getResource('ConfirmNewAnnouncement')}
                        contents={this.renderContentConfirm()}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmInsertDialog}>
                                {LangHelper.getResource('Push')}
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
    const { announcementTemplate, createAnnouncementResult, settings, validateAnnouncementResult, isAllLanguages } = state;
    return { announcementTemplate, createAnnouncementResult, settings, validateAnnouncementResult, isAllLanguages };
};

const NewAnnouncementNavigation = WithNavigation(NewAnnouncement);

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncementNavigation);