import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MultipleSelect from '@jsroot/components/multiple-select/index';
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

export class InsertPersonalMappingPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                botId: '',
                displayName: '',
                recipientType: '',
                recipientName: '',
                groupHeadlines: '',
                recipient: '',
                letstalkId: '',
                languageId: '',
                remark: '',
                ignoredNotification: '',
                isTest: false,
                isTelegram: false,
                botServiceId: '',
                chatId: '',
                username: ''
            },
            groupHeadlineDefault: [{ id: '', name: LangHelper.getResource('AllGroupHeadlineAndNotAssignedGroup'), checked: true }],
            isSubmitting: false,
            letstalkIds: '',
            usernames: [],
            validate: {
                isShow: false,
                errMsgs: []
            },
            isLoading: false,
            dirtyFormConfirmation: {
                isShow: false
            },
            ignoreNotificationTypes: null,
            recipientTypes: []
        };

        this.initState = null;
    }

    async componentDidMount() {
        this.initState = Object.assign({}, this.state.form);
        this.setState({
            recipientTypes: this.props.settings.recipientTypes,
            form: {
                ...this.state.form,
                botId: this.props.settings.bots ? this.getBotNameByBotService(this.props.settings?.botServices[0].id)[0].id : '',
                botServiceId: this.props.settings.botServices ? this.props.settings?.botServices[0].id : ''
            }
        });
        await this.getIgnoreNotificationType();
    }

    getBotNameByBotService = botServiceId => {
        const bots = this.props.settings.bots;
        return bots.filter(item => item.channelId === botServiceId);
    };

    getIgnoreNotificationType = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('ChatTypeMapping/GetIgnoreNotificationType');
        await DataService.getDataAsync(url).then(response => {
            this.setState({ignoreNotificationTypes: response.data});
        }).then(() => Site.unblockUI());
    };

    handleChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            form: { ...prevState.form, ...{ [fieldName]: fieldValue } }
        }));
    };

    handleBotServiceChange = botServiceId => {
        this.handleChange('botServiceId', botServiceId);
        this.handleChange('displayName', '');
        this.handleChange('botId', this.getBotNameByBotService(botServiceId)[0].id);

        if (botServiceId === BotServiceType.Telegram) {
            this.setState({
                recipientTypes: this.props.settings.recipientTypes.filter(item => item.name === 'PIC of headline')
            });
        } else {
            this.setState({
                recipientTypes: this.props.settings.recipientTypes
            });
        }
    };

    handleBotChange = value => {
        this.setState({ isLoading: true });
        this.handleChange('botId', value);

        if (this.state.form.botServiceId === BotServiceType.Letstalk) {
            this.props.getLetstalkDisplayName(value, this.state.form.letstalkId).then(() => {
                this.handleChange('displayName', this.props.letstalkName);
                this.setState({ isLoading: false });
            });
        } else {
            this.props.getTelegramDisplayName(value, this.state.form.chatId).then(() => {
                this.handleChange('displayName', this.props.telegramName);
                this.setState({ isLoading: false });
            });
        }
    };

    handleGroupHeadlineChange = (currentItem, selectedItemsKey) => {
        this.handleChange('groupHeadlines', selectedItemsKey);
    };

    handleIgnoreNotificationChange = (currentItem, selectedItemsKey) => {
        this.handleChange('ignoredNotification', selectedItemsKey);
    };

    handleRecipientTypeChange = e => {
        const index = e.nativeEvent.target.selectedIndex;
        const label = e.nativeEvent.target[index].text;
        this.handleChange('recipientType', e.target.value);
        this.handleChange('recipientName', label);
        this.props.getRecipientByRecipientType(e.target.value);
        this.handleChange('letstalkId', '');
        this.handleChange('chatId', '');
        this.handleChange('displayName', '');
        this.setState({
            letstalkIds: '',
            usernames: []
        });
        this.handleChange('recipient', '');
        if (label !== AccountingPIC) {
            this.handleChange('isTest', false);
        }
    };

    handleRecipientChange = option => {
        this.handleChange('recipient', option || '');
        this.handleChange('letstalkId', '');
        this.handleChange('chatId', '');
        this.handleChange('displayName', '');
        this.handleChange('username', '');
        this.setState({
            letstalkIds: option ? option.letstalkIds : '',
            usernames: this.getUsernames(option)
        });
        const optionValue = option ? option.value : '';
        this.props.getGroupHeadlineByRecipient(optionValue);
    };

    handleLetstalkSelect = e => {
        this.setState({ isLoading: true });
        this.handleChange('letstalkId', e.target.value);
        this.props.getLetstalkDisplayName(this.state.form.botId, e.target.value).then(() => {
            this.handleChange('displayName', this.props.letstalkName);
            this.setState({ isLoading: false });
        });
    };

    handleChangeUsername = value => {
        this.handleChange('username', value);

        const botInfo = this.props.recipients.botInfo;
        const botByUsername = botInfo.find(item => item.username === value);
        const chatId = botByUsername ? botByUsername.chatId : '';
        this.handleChange('chatId', chatId);

        this.setState({ isLoading: true });
        this.props.getTelegramDisplayName(this.state.form.botId, chatId).then(() => {
            this.handleChange('displayName', this.props.telegramName);
            this.setState({ isLoading: false });
        });
    };

    getUsernames = option => {
        if (option) {
            return option.usernames ? option.usernames.split(',').map(item => item.trim()) : [];
        }
        return [];
    };

    renderOptions = (item, key) => {
        return (
            <option key={`${key}-${item.id}`} value={item.id}>
                {item.name}
            </option>
        );
    };

    renderLetstalkIds = () => {
        let result = null;
        if (this.state.letstalkIds) {
            const letstalkList = this.state.letstalkIds.split(',');
            result = letstalkList.map((letstalkId, key) => {
                return (
                    <Form.Check key={key}
                        inline label={letstalkId}
                        name='letstalkId'
                        type="radio"
                        id={`letstalkId-${key}`}
                        value={letstalkId}
                        checked={this.state.form.letstalkId === letstalkId}
                        onChange={this.handleLetstalkSelect}
                    />
                );
            });
        }

        return result;
    };

    isValidParams = () => {
        const data = this.state.form;
        const errMsg = [];
        let isValid = true;

        if (!data.botId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('BotRequired'));
        }

        if (!data.recipientType) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientTypeRequired'));
        }

        if (!data.recipient) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientRequired'));
        }

        if (!data.letstalkId && data.botServiceId === BotServiceType.Letstalk) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LetstalkIdRequired'));
        }

        if (!data.groupHeadlines && data.recipientName !== AccountingPIC) {
            isValid = false;
            errMsg.push(LangHelper.getResource('GroupHeadlineRequired'));
        }

        if (!data.languageId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LanguageRequired'));
        }

        if (!data.displayName && data.botServiceId === BotServiceType.Telegram) {
            isValid = false;
            errMsg.push(`The username ${data.username} hasn't added the bot.`)
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

    getParams = () => {
        const isTest =  this.state.form.isTest  ? 1 : 0;
        const {
            botId, botServiceId, recipientType, letstalkId, groupHeadlines, chatId,
            recipient, languageId, remark, ignoredNotification, recipientName, username
        } = this.state.form;

        return {
            botId: botId,
            channelId: botServiceId,
            recipientTypeId: recipientType,
            conversationId: botServiceId === BotServiceType.Letstalk ? letstalkId : chatId,
            username: botServiceId === BotServiceType.Letstalk ? '' : username,
            groupHeadlineIds: groupHeadlines,
            recipientIds: recipient.value,
            languageId: languageId,
            remark: remark,
            ignoredNotificationTypeList: ignoredNotification,
            isTest: recipientName !== AccountingPIC ? null : isTest
        };
    };

    handleSubmit = e => {
        this.props.setInsertPersonalMappingResult(null);
        this.setState({ isSubmitting: true });
        e.preventDefault();

        if (this.isValidParams()) {
            const params = this.getParams();
            this.props.insertPersonalMapping(params).then(() => {
                if (this.props.insertPersonalMappingResult.isSuccessful) {
                    setTimeout(() => {
                        this.props.closeInsertPersonalMappingPopup();
                        this.props.getGridData(this.props.gridParams);
                        this.props.setInsertPersonalMappingResult(null);
                    }, 3000);
                } else {
                    this.setState({ isSubmitting: false });
                }
            });
        }
    };

    isDirtyForm = () => JSON.stringify(this.initState) !== JSON.stringify(this.state.form);

    onCloseInsertPopup = () => {
        if (this.isDirtyForm()) {
            this.setState({
                dirtyFormConfirmation: { isShow: true }
            });
        } else {
            this.props.closeInsertPersonalMappingPopup();
        }
    };

    closeConfirmDirtyForm = () => {
        this.setState({
            dirtyFormConfirmation: { isShow: false }
        });
    };

    isShowGreenCheck = value => {
        const { displayName, username } = this.state.form;
        if (displayName && displayName.length > 0 && value === username) {
            return true;
        }
        return false;
    };

    renderForm = () => {
        const recipientOptions = this.props.recipients.data && this.props.recipients.data.map(item => {
            return {
                value: item.id, label: item.name,
                letstalkIds: item.letstalkIds,
                usernames: item.usernames
            };
        });
        const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.props.groupHeadline;
        const { botServiceId } = this.state.form;
        const { usernames } = this.state;
        const botOptions = this.getBotNameByBotService(botServiceId);

        return (
            <Form onSubmit={this.handleSubmit}>
                <Modal.Body>
                    {
                        this.state.validate.isShow &&
                        <Alert variant="danger">
                            <ul className="list-message-error">
                                {
                                    this.state.validate.errMsgs.map((msg, key) => <li key={key}>{msg}</li>)
                                }
                            </ul>
                        </Alert>
                    }
                    {
                        this.props.insertPersonalMappingResult &&
                        <ResponseMessage isSuccessful={this.props.insertPersonalMappingResult.isSuccessful}
                            message={this.props.insertPersonalMappingResult.message || LangHelper.getResource('InsertPersonalMappingSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('BotService')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name='botService'
                                onChange={e => this.handleBotServiceChange(parseInt(e.target.value, 10))}
                                value={botServiceId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.botServices.map(this.renderOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('BotName')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name='botId'
                                onChange={e => this.handleBotChange(e.target.value)}
                                value={this.state.form.botId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {botOptions.map(this.renderOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('DisplayName')}
                        </Form.Label>
                        <Form.Label column sm="9" md="10">
                            {
                                this.state.isLoading &&
                                <Loading />
                            }
                            {
                                !this.state.isLoading &&
                                this.state.form.displayName
                            }
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('ChatType')}
                        </Form.Label>
                        <Form.Label column sm="9" md="10">
                            {LangHelper.getResource('Personal')}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('RecipientType')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="recipientTypeId"
                                onChange={e => this.handleRecipientTypeChange(e)}
                                value={this.state.form.recipientType}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.state.recipientTypes.map(this.renderOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('Recipient')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <CustomReactSelect
                                className='basic-single'
                                isSearchable
                                isClearable
                                name='recipient'
                                onChange={this.handleRecipientChange}
                                options={recipientOptions}
                                value={this.state.form.recipient}
                            />
                        </Col>
                    </Form.Group>
                    {
                        botServiceId === BotServiceType.Telegram && (
                            <>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" md="2" className="required">
                                        {LangHelper.getResource('Username')}
                                    </Form.Label>
                                    {
                                        usernames.length > 0 &&
                                        usernames.map((value, key) => (
                                            <Col key={key + value} sm="auto" md="auto" className="radioCheck">
                                                <Form.Check
                                                    inline label={value}
                                                    name='usernameId'
                                                    type="radio"
                                                    id={key + value}
                                                    value={value}
                                                    onChange={event => this.handleChangeUsername(event.target.value)}
                                                />
                                                {
                                                    this.isShowGreenCheck(value) && (
                                                        <OverlayTrigger
                                                            key={key + value}
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
                                        ))
                                    }
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" md="2">
                                        {LangHelper.getResource('ChatID')}
                                    </Form.Label>
                                    <Form.Label column sm="9" md="10">
                                        {LangHelper.getResource(this.state.form.chatId)}
                                    </Form.Label>
                                </Form.Group>
                            </>
                        )
                    }
                    {
                        botServiceId === BotServiceType.Letstalk && (
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" md="2" className="required">
                                    {LangHelper.getResource('LetstalkID')}
                                </Form.Label>
                                <Col sm="9" md="10">
                                    {
                                        this.renderLetstalkIds(this.selectedLetstalkIds)
                                    }
                                </Col>
                            </Form.Group>
                        )
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('GroupHeadline')}
                        </Form.Label>
                        <Col sm="9" md="10" className={`${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`}>
                            <MultipleSelect
                                width={'100%'}
                                name="headlineIds"
                                dataSource={groupHeadlinesOption}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                onChange={this.handleGroupHeadlineChange}
                                hasSearchBox
                                isDisable={this.state.form.recipientName === AccountingPIC}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="languageId"
                                onChange={e => this.handleChange('languageId', e.target.value)}
                                value={this.state.form.languageId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.languages.map(this.renderOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('IgnoredNotificationType')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <MultipleSelect
                                width={'100%'}
                                name="ignoredNotification"
                                dataSource={this.state.ignoreNotificationTypes}
                                keyField='notificationTypeId'
                                valueField='notificationTypeName'
                                onChange={this.handleIgnoreNotificationChange}
                                hasSearchBox
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" >
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="9" md="10" name="insert-personal">
                            <Form.Control as="textarea" size="sm" className="shadow-none"
                                rows={5}
                                name="remark"
                                onChange={e => this.handleChange('remark', e.target.value)}
                                value={this.state.form.remark}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" />
                        <Col sm="9" md="10" name="checkbox-isTest">
                            <Form.Group controlId="isTest-insert" className={this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : ''}>
                                <Form.Check type="checkbox" label={LangHelper.getResource('IsTest')}
                                    checked={this.state.form.isTest}
                                    onChange={event => this.handleChange('isTest', event.target.checked)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Submit')}
                    </Button>
                    <Button type="button" variant="primary" size="sm" onClick={this.onCloseInsertPopup}>
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
                <Modal show className="chat-type-mapping-modal" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.onCloseInsertPopup}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('InsertPersonalMapping')}</Modal.Title>
                    </Modal.Header>
                    {
                        this.renderForm()
                    }

                </Modal>
                {
                    this.state.dirtyFormConfirmation.isShow &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        onSubmit={this.props.closeInsertPersonalMappingPopup}
                        onClose={this.closeConfirmDirtyForm}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, recipients, groupHeadline, gridParams, insertPersonalMappingResult, letstalkName, telegramName } = state;
    return {
        settings,
        recipients,
        groupHeadline,
        gridParams,
        insertPersonalMappingResult,
        letstalkName,
        telegramName
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertPersonalMappingPopup);