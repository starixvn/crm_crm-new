import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MultipleSelect from '../../../components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import CustomReactSelect from '@jsroot/components/CustomReactSelect';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Loading from '@jsroot/components/Loading';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { BotServiceType }from '@jsroot/common/constants';
const AccountingPIC = 'Accounting PIC';

export class EditPersonalMappingPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                botId: this.props.updatePersonalMappingData.data.botId,
                botServiceId: this.props.updatePersonalMappingData.data.channelId,
                displayName: this.props.updatePersonalMappingData.data.displayName,
                letstalkID_Username: this.props.updatePersonalMappingData.data.letstalkID_Username.trim(),
                recipientType: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeId : '',
                recipientName: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeName : '',
                groupHeadlines: this.props.updatePersonalMappingData.data.headlines.map(v => v.headlineId).toString(),
                recipient: {
                    value: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientId : '',
                    label: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientName : ''
                },
                chatId: this.props.updatePersonalMappingData.data.conversationId,
                languageId: this.props.updatePersonalMappingData.data.languageId,
                remark: this.props.updatePersonalMappingData.data.remark,
                ignoredNotification: this.props.updatePersonalMappingData.data.ignoredNotificationTypeList,
                isTest: this.props.updatePersonalMappingData.data.isTest === 1 ? true : false
            },
            groupHeadlineDefault: [{ id: '', name: LangHelper.getResource('AllGroupHeadlineAndNotAssignedGroup'), checked: true }],
            isSubmitting: false,
            settings: {
                letstalkIds: '',
                usernames: '',
                recipientOptions: [],
                headlineOptions: []
            },
            validate: {
                isShow: false,
                errMsgs: []
            },
            isShowConfirmDirtyForm: false,
            isLoading: false,
            ignoreNotificationTypes: null,
            chatIdOptions: []
        };

        this.conversationGroupId = this.props.updatePersonalMappingData.data.conversationGroupId;
        this.initEditPersonalMappingState = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.updatePersonalMappingData.data !== null) {
            const recipientId = prevState.form.recipient.value;
            const headlineIds = prevState.form.groupHeadlines.split(',');
            let letstalkIds = '';
            let usernames = '';
            let recipientOptions = [];
            if (nextProps.recipients.data && nextProps.recipients.data.length > 0) {
                const selectRecipient = nextProps.recipients.data.filter(r => r.id === recipientId);
                letstalkIds = selectRecipient.length > 0 ? selectRecipient[0].letstalkIds : '';
                usernames = selectRecipient.length > 0 ? selectRecipient[0].usernames : '';

                recipientOptions = nextProps.recipients.data.map(item => {
                    return {
                        value: item.id, label: item.name,
                        letstalkIds: item.letstalkIds,
                        usernames: item.usernames
                    };
                });
            }

            const headlineOptions = nextProps.groupHeadline;
            headlineOptions.map(headline => {
                const checkedId = headlineIds.some(v => parseInt(v, 10) === headline.id);
                headline['checked'] = checkedId;
            });
            const state = {
                settings: {
                    letstalkIds: letstalkIds,
                    usernames: usernames,
                    recipientOptions: recipientOptions,
                    headlineOptions: headlineOptions
                }
            };
            return state;
        }

        return null;
    }

    async componentDidMount() {
        this.initEditPersonalMappingState = Object.assign({}, this.state.form);
        const initData = this.props.updatePersonalMappingData.data;
        const recipientTypeId = initData.recipients.length > 0 ? initData.recipients[0].recipientTypeId : '';
        const selectedRecipientId = initData.recipients.length > 0 ? initData.recipients[0].recipientId : '';

        this.props.getRecipientByRecipientType(recipientTypeId);
        this.props.getGroupHeadlineByRecipient(selectedRecipientId);
        await this.getIgnoreNotificationType();
        if (this.state.form.botServiceId === BotServiceType.Telegram) {
            const chatIdOptions = await this.getChatIdOption(this.state.form.letstalkID_Username).chatIdOptions;
            this.setState({ chatIdOptions:  [...new Set(chatIdOptions)] });
        }
    }

    getRecipientTypes = botServiceId => {
        if (botServiceId === BotServiceType.Telegram) {
            return this.props.settings.recipientTypes.filter(item => item.name === 'PIC of headline');
        } else {
            return this.props.settings.recipientTypes;
        }
    };

    getIgnoreNotificationType = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('ChatTypeMapping/GetIgnoreNotificationType');
        const { ignoredNotificationTypeList } = this.props.updatePersonalMappingData.data;
        await DataService.getDataAsync(url).then(response => {
            const ignoreNotificationTypes = !ignoredNotificationTypeList ? response.data :
                    response.data.map(item =>{
                        return{
                            ...item,
                            checked: ignoredNotificationTypeList.includes(item.notificationTypeId)
                        };
                    });
            this.setState({ignoreNotificationTypes});
            this.setState({ignoreNotificationTypes});
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    handleChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            form: { ...prevState.form, ...{ [fieldName]: fieldValue } }
        }));
    };

    handleGroupHeadlineChange = (currentItem, selectedItemsKey) => {
        this.handleChange('groupHeadlines', selectedItemsKey);
    };

    handleIgnoreNotificationChange = (currentItem, selectedItemsKey) => {
        this.handleChange('ignoredNotification', selectedItemsKey);
    };

    handleBotChange = value => {
        this.setState({ isLoading: true });
        this.handleChange('botId', value);

        if (this.state.form.botServiceId === BotServiceType.Telegram) {
            this.getTelegramDisplayName(value, this.state.form.chatId);
        } else {
            this.props.getLetstalkDisplayName(value, this.state.form.letstalkID_Username).then(() => {
                this.handleChange('displayName', this.props.letstalkName);
                this.setState({ isLoading: false });
            });
        }
    };

    handleRecipientTypeChange = e => {
        const index = e.nativeEvent.target.selectedIndex;
        const label = e.nativeEvent.target[index].text;
        this.handleChange('recipientType', e.target.value);
        this.handleChange('recipientName', label);
        this.handleChange('recipient', { value: '' });
        this.handleChange('groupHeadlines', '');
        this.handleChange('letstalkID_Username', '');
        this.handleChange('displayName', '');
        this.handleChange('chatId', '');
        this.setState({ chatIdOptions: [] });
        this.props.getRecipientByRecipientType(e.target.value);
        if (label !== AccountingPIC) {
            this.handleChange('isTest', false);
        }
    };

    handleRecipientChange = option => {
        this.handleChange('recipient', option || '');
        this.handleChange('groupHeadlines', '');
        this.handleChange('letstalkID_Username', '');
        this.handleChange('displayName', '');
        this.handleChange('chatId', '');
        this.setState({ chatIdOptions: [] });
        const optionValue = option ? option.value : '';
        this.props.getGroupHeadlineByRecipient(optionValue);
    };

    handleLetstalkIdSelect = e => {
        this.setState({ isLoading: true });
        this.handleChange('letstalkID_Username', e.target.value);
        this.props.getLetstalkDisplayName(this.state.form.botId, e.target.value).then(() => {
            this.handleChange('displayName', this.props.letstalkName);
            this.setState({ isLoading: false });
        });
    };

    isChatWithBot = (botId, chatId) => {
        const { botInfo } = this.props.recipients;
        if (botInfo && botInfo.find(item => item.botId.toString() === botId.toString() && item.chatId.toString() === chatId.toString())) {
            return true;
        }
        return false;
    };

    renderEditPersonalSelectOptions = (item, key) => {
        return (
            <option key={`${key}-${item.name}`} value={item.id}>
                {item.name}
            </option>
        );
    };

    renderLetstalkIdsRadioButton = () => {
        let result = null;
        if (this.state.settings.letstalkIds) {
            const letstalkList = this.state.settings.letstalkIds.split(',');
            result = letstalkList.map((letstalkId, key) => {
                letstalkId = letstalkId.trim();
                return (
                    <Form.Check key={key} inline label={letstalkId}
                        name='letstalkID_Username' type="radio" id={`letstalkId-${key}`}
                        value={letstalkId}
                        onChange={this.handleLetstalkIdSelect}
                        checked={this.state.form.letstalkID_Username === letstalkId}
                    />
                );
            });
        }
        return result;
    };

    renderUsernameRadioButton = () => {
        let result = null;
        if (this.state.settings.usernames) {
            const usernames = this.state.settings.usernames.split(',');

            result = usernames.map((value, key) => {
                const username = value.trim();
                return (
                    <Col key={key} sm="auto" md="auto" className="radioCheck">
                        <Form.Check key={key} inline label={username}
                            name='username'
                            type="radio"
                            id={`chatId-${key}`}
                            value={username}
                            onChange={event => this.handleChangeUsername(event.target.value)}
                            checked={this.state.form.letstalkID_Username === username}
                        />
                        {
                            this.isShowGreenCheck(username) && (
                                <OverlayTrigger
                                    key={key + username}
                                    placement="auto"
                                    overlay={
                                        <Tooltip>
                                            <span>This username has added the bot</span>
                                        </Tooltip>
                                    }
                                >
                                    <span className="fa fa-check badge-green" />
                                </OverlayTrigger>
                            )
                        }
                    </Col>
                );
            });
        }
        return result;
    };

    getChatIdOption = value => {
        const botInfo = this.props.recipients.botInfo;
        const botByUsername = botInfo?.length > 0 ? botInfo?.filter(item => item.username === value) : [];
        const chatId = botByUsername.length > 0 ? botByUsername[0].chatId : '';
        const chatIdOptions = botByUsername.map(item => item.chatId);

        return { chatId, chatIdOptions };
    };

    handleChangeUsername = value => {
        this.handleChange('letstalkID_Username', value);
        const chatIdOptions = this.getChatIdOption(value).chatIdOptions;
        const filterChatIdOption = [...new Set(chatIdOptions)];

        if (filterChatIdOption.length > 1) {
            this.handleChange('chatId', '');
            this.setState({ chatIdOptions: filterChatIdOption });
            this.getTelegramDisplayName(this.state.form.botId, '');
        } else {
            const chatId = this.getChatIdOption(value).chatId;
            this.handleChange('chatId', chatId);
            this.setState({ chatIdOptions: filterChatIdOption, isLoading: true });
            this.getTelegramDisplayName(this.state.form.botId, chatId);
        }
    };

    handleChangeChatId = value => {
        this.handleChange('chatId', value);
        this.setState({ isLoading: true });
        this.getTelegramDisplayName(this.state.form.botId, value);
    };

    getTelegramDisplayName = (botId, chatId) => {
        this.props.getTelegramDisplayName(botId, chatId).then(() => {
            if (this.isChatWithBot(botId, chatId)) {
                this.handleChange('displayName', this.props.telegramName);
            } else {
                this.handleChange('displayName', '');
            }
            this.setState({ isLoading: false });
        });
    };

    isShowGreenCheck = value => {
        const { displayName, letstalkID_Username } = this.state.form;
        if (displayName && displayName.length > 0 && value === letstalkID_Username) {
            return true;
        }
        return false;
    };

    isValidParams = () => {
        const validateData = this.state.form;
        const errMsg = [];
        let isValid = true;

        if (!validateData.botId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('BotRequired'));
        }

        if (!validateData.recipientType) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientTypeRequired'));
        }

        if (!validateData.recipient) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientRequired'));
        }

        if (!validateData.letstalkID_Username && validateData.botServiceId === BotServiceType.Letstalk) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LetstalkIdRequired'));
        }

        if (!validateData.groupHeadlines && validateData.recipientName !== AccountingPIC) {
            isValid = false;
            errMsg.push(LangHelper.getResource('GroupHeadlineRequired'));
        }

        if (!validateData.languageId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LanguageRequired'));
        }

        if (validateData.botServiceId === BotServiceType.Telegram) {
            if (!validateData.letstalkID_Username) {
                isValid = false;
                errMsg.push(LangHelper.getResource('UsernameRequired'));
            }
            if (!validateData.displayName && validateData.letstalkID_Username) {
                isValid = false;
                errMsg.push(`The username ${validateData.letstalkID_Username} hasn't added the bot.`)
            }

            if (!validateData.chatId) {
                isValid = false;
                errMsg.push(LangHelper.getResource('ChatIdRequired'));
            }
        }

        this.setState({
            isSubmitting: isValid,
            validate: {
                isShow: !isValid,
                errMsgs: errMsg
            }
        });

        return isValid;
    };

    isDirtyForm = () => JSON.stringify(this.initEditPersonalMappingState) !== JSON.stringify(this.state.form);

    onCloseEditPersonalPopup = () => {
        if (this.isDirtyForm()) {
            this.setState({ isShowConfirmDirtyForm: true });
        } else {
            this.props.closeUpdatePersonalMappingPopup();
        }
    };

    closeConfirmDirtyForm = () => {
        this.setState({
            isShowConfirmDirtyForm: false
        });
    };

    getParams = () => {
        const isTest = this.state.form.isTest ? 1 : 0;
        const {
            botId, recipientType, letstalkID_Username, recipientName,
            groupHeadlines, recipient, languageId, remark,
            ignoredNotification, chatId, botServiceId
        } = this.state.form;
        return {
            conversationGroupId: this.conversationGroupId,
            botId: botId,
            channelId: botServiceId,
            username: botServiceId === BotServiceType.Letstalk ? null : letstalkID_Username,
            recipientTypeId: recipientType,
            conversationId: botServiceId === BotServiceType.Letstalk ? letstalkID_Username : chatId,
            groupHeadlineIds: recipientName === AccountingPIC ? '' : groupHeadlines,
            recipientIds: recipient.value,
            languageId: languageId,
            remark: remark,
            ignoredNotificationTypeList: ignoredNotification,
            isTest: recipientName !== AccountingPIC ? null : isTest
        };
    };

    handleEditPersonalSubmitForm = e => {
        this.props.setUpdatePersonalMappingResult(null);
        this.setState({ isSubmitting: true });
        e.preventDefault();

        if (this.isValidParams()) {
            const params = this.getParams();
            this.props.updatePersonalMapping(params).then(() => {
                if (this.props.updatePersonalMappingResult.isSuccessful) {
                    setTimeout(() => {
                        this.props.closeUpdatePersonalMappingPopup();
                        this.props.getGridData(this.props.gridParams);
                    }, 3000);
                } else {
                    this.setState({ isSubmitting: false });
                }
            });
        }
    };

    renderForm = () => {
        const { botServiceId, chatId, botId, recipientType, recipient, displayName, recipientName, languageId, remark, isTest } = this.state.form;
        const { chatIdOptions, isLoading, isSubmitting, validate, ignoreNotificationTypes } = this.state;
        const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.state.settings.headlineOptions;
        const botOptions = this.props.settings.bots.filter(item => item.channelId === botServiceId);
        const recipientTypes = this.getRecipientTypes(botServiceId);

        return (
            <Form onSubmit={this.handleEditPersonalSubmitForm}>
                <Modal.Body>
                    {
                        validate.isShow &&
                        <Alert variant="danger">
                            <ul className="list-message-error">
                                {
                                    validate.errMsgs.map((msg, key) => <li key={key}>{msg}</li>)
                                }
                            </ul>
                        </Alert>
                    }
                    {
                        this.props.updatePersonalMappingResult &&
                        <ResponseMessage isSuccessful={this.props.updatePersonalMappingResult.isSuccessful}
                            message={this.props.updatePersonalMappingResult.message || LangHelper.getResource('UpdatePersonalMappingSuccess')}
                        />
                    }
                    <Form.Row className='form-row border-container'>
                        <Form.Group as={Row} className="col-md-6">
                            <Form.Label column sm="3" md="4" className="required">
                                {LangHelper.getResource('BotService')}
                            </Form.Label>
                            <Form.Label sm="9" md="8" column>
                                {this.props.updatePersonalMappingData.data.channelName}
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-6 col-right">
                            <Form.Label column sm="3" md="4" className="required pr-2 label-width">
                                {LangHelper.getResource('BotName')}
                            </Form.Label>
                            <Col sm="9" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none col-label"
                                    name='botId'
                                    onChange={e => this.handleBotChange(e.target.value)}
                                    value={botId}
                                >
                                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {botOptions.map(this.renderEditPersonalSelectOptions)}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-6">
                            <Form.Label column sm="3" md="4" name="edit-personal">
                                {LangHelper.getResource('ChatType')}
                            </Form.Label>
                            <Form.Label sm="9" md="8" column>
                                {LangHelper.getResource('Personal')}
                            </Form.Label>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className='form-row border-container'>
                        <Form.Group as={Row} className="col-md-6">
                            <Form.Label column md="4" className="required" sm="3">
                                {LangHelper.getResource('RecipientType')}
                            </Form.Label>
                            <Col sm="9" md="8">
                                <Form.Control as="select" size="sm" className="shadow-none"
                                    name="recipientTypeId"
                                    onChange={e => this.handleRecipientTypeChange(e)}
                                    value={recipientType}
                                >
                                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {recipientTypes.map(this.renderEditPersonalSelectOptions)}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-6 col-right">
                            <Form.Label column sm="3" md="4" className="required label-width">
                                {LangHelper.getResource('Recipient')}
                            </Form.Label>
                            <Col sm="9" md="8">
                                <CustomReactSelect
                                    className='basic-single'
                                    name='recipient'
                                    onChange={this.handleRecipientChange}
                                    options={this.state.settings.recipientOptions}
                                    value={recipient}
                                    isSearchable
                                    isClearable
                                />
                            </Col>
                        </Form.Group>

                        {
                            botServiceId === BotServiceType.Telegram && (
                                <>
                                    <Form.Group as={Row} className="col-md-12">
                                        <Form.Label column sm="3" md="2" className="required">
                                            {LangHelper.getResource('Username')}
                                        </Form.Label>
                                        {
                                            this.renderUsernameRadioButton()
                                        }
                                    </Form.Group>
                                </>
                            )
                        }
                        {
                            botServiceId === BotServiceType.Letstalk && (
                                <Form.Group as={Row} className="col-md-12">
                                    <Form.Label column sm="3" md="2" className="required">
                                        {LangHelper.getResource('LetstalkID')}
                                    </Form.Label>
                                    <Col sm="9" md="auto" className="radioCheck">
                                        {
                                            this.renderLetstalkIdsRadioButton(this.selectedLetstalkIds)
                                        }
                                    </Col>
                                </Form.Group>
                            )
                        }

                        <Form.Group as={Row} className="col-md-6">
                            <Form.Label column sm="3" md="4">
                                {LangHelper.getResource('DisplayName')}
                            </Form.Label>
                            <Form.Label column sm="9" md="8">
                                {
                                    isLoading && <Loading />
                                }
                                {
                                    !isLoading && displayName
                                }
                            </Form.Label>
                        </Form.Group>

                        {
                            botServiceId === BotServiceType.Telegram && (
                                <Form.Group as={Row} className="col-md-6 col-right">
                                    <Form.Label column sm="3" md="3" className="label-width">
                                        {LangHelper.getResource('ChatID')}
                                    </Form.Label>
                                    {
                                        chatIdOptions.length > 0 &&
                                        chatIdOptions.map((value, key) => (
                                            <Col key={value + key} sm="auto" md="auto" className="radioCheck">
                                                <Form.Check
                                                    inline label={value}
                                                    name='chatId'
                                                    type="radio"
                                                    id={value + key}
                                                    value={value}
                                                    defaultChecked={value === chatId}
                                                    onChange={event => this.handleChangeChatId(event.target.value)}
                                                />
                                            </Col>
                                        ))
                                    }
                                </Form.Group>
                            )
                        }
                    </Form.Row>

                    <Form.Row className='form-row border-container'>
                        <Form.Group as={Row} className="col-md-6">
                            <Form.Label column sm="3" md="4" className="required pr-2">
                                {LangHelper.getResource('GroupHeadline')}
                            </Form.Label>
                            <Col sm="9" md="8" className={`${recipientName === AccountingPIC ? 'disabled-select' : ''}`}>
                                <MultipleSelect
                                    width={'100%'}
                                    name="headlineIds"
                                    keyField='id'
                                    valueField='name'
                                    statusField='checked'
                                    dataSource={groupHeadlinesOption}
                                    onChange={this.handleGroupHeadlineChange}
                                    isSummited={false}
                                    hasSearchBox
                                    isDisable={recipientName === AccountingPIC}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-6 col-right">
                            <Form.Label column sm="3" md="4" className="required label-width" name="insert-personal-language-label">
                                {LangHelper.getResource('Language')}
                            </Form.Label>
                            <Col sm="9" md="8">
                                <Form.Control size="sm" className="shadow-none" as="select"
                                    name="languageId"
                                    onChange={e => this.handleChange('languageId', e.target.value)}
                                    value={languageId}
                                >
                                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {this.props.settings.languages.map(this.renderEditPersonalSelectOptions)}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-12">
                            <Form.Label column sm="3" md="2">
                                {LangHelper.getResource('IgnoredNotificationType')}
                            </Form.Label>
                            <Col sm="9" md="10" className="fitInput">
                                <MultipleSelect
                                    width={'100%'}
                                    name="ignoredNotification"
                                    dataSource={ignoreNotificationTypes}
                                    keyField='notificationTypeId'
                                    valueField='notificationTypeName'
                                    onChange={this.handleIgnoreNotificationChange}
                                    hasSearchBox
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="col-md-12">
                            <Form.Label column sm="3" md="2" >
                                {LangHelper.getResource('Remark')}
                            </Form.Label>
                            <Col sm="9" md="10" name="personal-edit" className="fitInput">
                                <Form.Control as="textarea" size="sm" className="shadow-none"
                                    name="remark"
                                    value={remark}
                                    rows={5}
                                    onChange={e => this.handleChange('remark', e.target.value)}

                                />
                            </Col>
                        </Form.Group>
                        {
                            botServiceId === BotServiceType.Letstalk && (
                                <Form.Group as={Row} className="col-md-12">
                                    <Form.Label column md="2" sm="4" />
                                    <Col sm="9" md="10" name="checkbox-isTest">
                                        <Form.Group className={recipientName !== AccountingPIC ? 'hidden-isTest' : ''} controlId="isTest-edit-personal">
                                            <Form.Check type="checkbox"
                                                label={LangHelper.getResource('IsTest')}
                                                onChange={event => this.handleChange('isTest', event.target.checked)}
                                                checked={isTest}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Group>
                            )
                        }
                    </Form.Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting} id="edit-personal-mapping-submit-btn">
                        {LangHelper.getResource('Submit')}
                    </Button>
                    <Button type="button" variant="primary" size="sm" onClick={this.onCloseEditPersonalPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const {ignoreNotificationTypes} = this.state;
        if(!ignoreNotificationTypes){
            return null;
        }

        return (
            <Fragment>
                <Modal show className="chat-type-mapping-modal edit-personal-mapping" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.closeUpdatePersonalMappingPopup}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditPersonalMapping')}</Modal.Title>
                    </Modal.Header>
                    {
                        this.renderForm()
                    }

                </Modal>
                {
                    this.state.isShowConfirmDirtyForm &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        onSubmit={this.props.closeUpdatePersonalMappingPopup}
                        onClose={this.closeConfirmDirtyForm}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, recipients, groupHeadline, gridParams, updatePersonalMappingData, updatePersonalMappingResult, letstalkName, telegramName } = state;
    return {
        settings,
        recipients,
        groupHeadline,
        gridParams,
        letstalkName,
        telegramName,
        updatePersonalMappingData,
        updatePersonalMappingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalMappingPopup);