import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import MultipleSelect from '../../../components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Loading from '@jsroot/components/Loading';
import DataService from '@jsroot/common/dataService';
import { BotServiceType }from '@jsroot/common/constants';
const AccountingPIC = 'Accounting PIC';

export class EditGroupMappingPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                bot: {
                    id: this.props.updateGroupMappingData.data.botId,
                    name: this.props.updateGroupMappingData.data.botName
                },
                botServiceId: this.props.updateGroupMappingData.data.channelId,
                displayName: this.props.updateGroupMappingData.data.displayName,
                conversationId: this.props.updateGroupMappingData.data.conversationId,
                recipientTypeId: this.props.updateGroupMappingData.data.recipients.length > 0 ? this.props.updateGroupMappingData.data.recipients[0].recipientTypeId : '',
                recipientIds: this.props.updateGroupMappingData.data.recipients.map(r => r.recipientId).toString(),
                recipientName: this.props.updateGroupMappingData.data.recipients.length > 0 ? this.props.updateGroupMappingData.data.recipients[0].recipientTypeName : '',
                groupHeadlines: this.props.updateGroupMappingData.data.headlines.map(v => v.headlineId).toString(),
                mappingStatus: {
                    id: this.props.updateGroupMappingData.data.mappingStatusId,
                    name: this.props.updateGroupMappingData.data.mappingStatus
                },
                languageId: this.props.updateGroupMappingData.data.languageId || '',
                remark: this.props.updateGroupMappingData.data.remark || '',
                ignoredNotification: this.props.updateGroupMappingData.data.ignoredNotificationTypeList,
                isTest: this.props.updateGroupMappingData.data.isTest === 1 ? true : false
            },
            groupHeadlineDefault: [{ id: '', name: LangHelper.getResource('AllGroupHeadlineAndNotAssignedGroup'), checked: true }],
            isSubmitting: false,
            settings: {
                displayLetstalkIds: [],
                recipientOptions: [],
                headlineOptions: []
            },
            validate: {
                isShow: false,
                errMsgs: []
            },
            isShowConfirmDirtyForm: false,
            isBotRemoved: false,
            isLoading: false,
            ignoreNotificationTypes: null,
            telegramVerifies: []
        };

        this.conversationGroupId = this.props.updateGroupMappingData.data.conversationGroupId;
        this.initUpdateGroupMappingState = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.updateGroupMappingData.data !== null) {
            const selectedRecipientIds = prevState.form.recipientIds.split(',');
            let recipientOptions = [];
            if (nextProps.recipients.data) {
                recipientOptions = nextProps.recipients.data;
                nextProps.recipients.data.map(item => {
                    item['checked'] = selectedRecipientIds.some(v => parseInt(v, 10) === item.id);
                });
            }

            const headlineIds = prevState.form.groupHeadlines.split(',');
            const headlineOptions = nextProps.groupHeadline;
            headlineOptions.map(headline => {
                const checkedId = headlineIds.some(v => parseInt(v, 10) === headline.id);
                headline['checked'] = checkedId;
            });
            const state = {
                settings: {
                    recipientOptions: recipientOptions,
                    headlineOptions: headlineOptions
                },
                isBotRemoved: nextProps.letstalkVerification.isBotRemoved || nextProps.telegramVerification.isBotRemoved
            };

            return state;
        }

        return null;
    }

    async componentDidMount() {
        this.initUpdateGroupMappingState = Object.assign({}, this.state.form);
        const initData = this.props.updateGroupMappingData.data;
        const recipientTypeId = initData.recipients.length > 0 ? initData.recipients[0].recipientTypeId : '';
        const selectedRecipientIds = initData.recipients.map(r => r.recipientId).toString();

        if (recipientTypeId) {
            this.props.getRecipientByRecipientType(recipientTypeId).then(() => {
                this.props.getGroupHeadlineByRecipient(selectedRecipientIds);
                this.state.form.botServiceId === BotServiceType.Letstalk && this.verifyLetstalk(selectedRecipientIds.split(','));
                this.state.form.botServiceId === BotServiceType.Telegram && this.verifyTelegram(selectedRecipientIds.split(','));
            });
        }

        this.state.form.botServiceId === BotServiceType.Telegram && await this.getGroupTelegramDisplayName();
        await this.getIgnoreNotificationType();
    }

    getGroupTelegramDisplayName = async() => {
        const botId = this.props.updateGroupMappingData.data.botId;
        const chatId = this.props.updateGroupMappingData.data.conversationId;
        Site.blockUI();
        const url = Site.resolveClientUrl('ChatTypeMapping/GetGroupTelegramDisplayName');
        await DataService.getDataAsync(url, { botId: parseFloat(botId), chatId: parseFloat(chatId) }).then(response => {
            this.handleChange('displayName', response.data);
        }).then(() => Site.unblockUI());
    };

    getIgnoreNotificationType = async () =>{
        Site.blockUI();
        const url = Site.resolveClientUrl('ChatTypeMapping/GetIgnoreNotificationType');
        const { ignoredNotificationTypeList } = this.props.updateGroupMappingData.data;
        await DataService.getDataAsync(url).then(response => {
            const ignoreNotificationTypes = !ignoredNotificationTypeList ? response.data :
                    response.data.map(item =>{
                        return{
                            ...item,
                            checked: ignoredNotificationTypeList.includes(item.notificationTypeId)
                        };
                    });
            this.setState({ignoreNotificationTypes});
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    handleChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            form: { ...prevState.form, ...{ [fieldName]: fieldValue } }
        }));
    };

    handleRecipientTypeChange = e => {
        const index = e.nativeEvent.target.selectedIndex;
        const label = e.nativeEvent.target[index].text;
        this.handleChange('recipientTypeId', e.target.value);
        this.handleChange('recipientName', label);
        this.handleChange('recipientIds', '');
        this.handleChange('groupHeadlines', '');
        this.props.getGroupHeadlineByRecipient('');
        this.state.form.botServiceId === BotServiceType.Letstalk && this.verifyLetstalk([]);
        this.state.form.botServiceId === BotServiceType.Telegram && this.verifyTelegram([]);
        this.props.getRecipientByRecipientType(e.target.value);
        if (label !== AccountingPIC) {
            this.handleChange('isTest', false);
        }
    };

    handleRecipientChange = (currentItem, selectedItemsKey) => {
        this.handleChange('recipientIds', selectedItemsKey);
        this.handleChange('groupHeadlines', '');
        this.state.form.botServiceId === BotServiceType.Letstalk && this.verifyLetstalk(selectedItemsKey.split(','));
        this.state.form.botServiceId === BotServiceType.Telegram && this.verifyTelegram(selectedItemsKey.split(','));
        this.props.getGroupHeadlineByRecipient(selectedItemsKey);
    };

    handleIgnoreNotificationChange = (currentItem, selectedItemsKey) => {
        this.handleChange('ignoredNotification', selectedItemsKey);
    };

    verifyLetstalk = recipientIds => {
        this.setState({ isLoading: true });
        const selectedOptions = this.state.settings.recipientOptions.filter(r => recipientIds.some(id => parseInt(id, 10) === r.id));

        const params = {
            botId: this.state.form.bot.id,
            groupConversationId: this.state.form.conversationId,
            recipients: selectedOptions.map(item => {
                return {
                    recipientId: item.id,
                    recipientName: item.name,
                    letstalks: !item.letstalkIds ? [] : item.letstalkIds.split(',').map(l => {
                        return {
                            letstalkId: l
                        };
                    })
                };
            })
        };

        this.props.verifyLetstalkInGroup(params).then(() => {
            this.setState({ isLoading: false });
        });
    };

    verifyTelegram = recipientIds => {
        this.setState({ isLoading: true });
        const selectedOptions = this.state.settings.recipientOptions.filter(r => recipientIds.some(id => parseInt(id, 10) === r.id));
        const botInfos = this.props.recipients.botInfo;

        const chatIds = [];
        const telegramVerifies = selectedOptions.map(item => {
            const usernames = item.usernames ? item.usernames.split(',') : [];
            if (usernames.length > 0) {
                usernames.map(data => {
                    const botInfo = botInfos.find(element => element.username === data.trim());
                    botInfo && chatIds.push(botInfo.chatId);
                })
            }
            return {
                ...item,
                recipientName: item.name,
                usernames: usernames
            }
        });

        const params = {
            botId: this.state.form.bot.id,
            groupConversationId: this.state.form.conversationId,
            chatIdMembers: chatIds
        };

        this.setState({
            telegramVerifies: telegramVerifies
        });
        this.props.verifyTelegramInGroup(params).then(() => {
            this.setState({ isLoading: false });
        });
    };

    renderTelegramVerification = (item, key) => {
        return (
            <div className='letstalk-group-mapping' key={key}>
                <div className='recipient-name common-letstalk-display' title={item.recipientName}>{item.recipientName}</div>
                <div className='letstalk-wrapper'>
                    {
                        item.usernames.length > 0 &&
                        item.usernames.map((element, index) => {
                            return (
                                <div key={index} className='letstalk-name common-letstalk-display' title={element}>
                                    {element}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    handleGroupHeadlineChange = (currentItem, selectedItemsKey) => {
        this.handleChange('groupHeadlines', selectedItemsKey);
    };

    renderEditGroupMappingOptions = (item, key) => {
        return (
            <option key={`${key}-${item.id}`} value={item.id}>
                {item.name}
            </option>
        );
    };

    isCheckRender = (item, botTypeId, listUser) => {
        const { botServiceId } = this.state.form;
        if (botServiceId === botTypeId && item[`${listUser}`].length > 0) {
            return true;
        }
        return false;
    };

    isCheckGroupMemberTelegram = (username) => {
        let isChecked = false;
        const { telegramVerification } = this.props;
        const botInfos = this.props.recipients.botInfo;
        const botInfo = botInfos.find(element => element.username === username);

        const chatId = botInfo ? botInfo.chatId : '';
        telegramVerification && telegramVerification.recipients.map(item => {
            if (item.chatId === chatId) {
                isChecked = item.isGroupMember
            }
        })
        return isChecked;
    };

    renderLetstalkIdTelegramVerification = (item, key) => {
        return (
            <div className='letstalk-group-mapping' key={key}>
                <div className='recipient-name common-letstalk-display' title={item.recipientName}>{item.recipientName}</div>
                <div className='letstalk-wrapper'>
                    {
                        this.isCheckRender(item, BotServiceType.Letstalk, 'letstalks') &&
                        item.letstalks.map((v, k) => {
                            return (
                                <div key={k} className='letstalk-name common-letstalk-display' title={v.letstalkId}>
                                    {v.letstalkId}
                                    <span className={v.isGroupMember ? 'fa fa-check icon' : ''} />
                                </div>
                            );
                        })
                    }
                    {
                        this.isCheckRender(item, BotServiceType.Telegram, 'usernames') &&
                        item.usernames.map((v, k) => {
                            return (
                                <div key={k} className='letstalk-name common-letstalk-display' title={v}>
                                    {v}
                                    <span className={this.isCheckGroupMemberTelegram(v) ? 'fa fa-check icon' : ''} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    isValidParams = () => {
        const data = this.state.form;
        const errMsg = [];
        let isValid = true;

        if (!data.recipientTypeId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientTypeRequired'));
        }

        if (!data.recipientIds) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientRequired'));
        }

        if (!data.languageId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LanguageRequired'));
        }

        if (!data.groupHeadlines && data.recipientName !== AccountingPIC) {
            isValid = false;
            errMsg.push(LangHelper.getResource('GroupHeadlineRequired'));
        }

        if (this.state.isBotRemoved) {
            isValid = false;
            errMsg.push(LangHelper.getResource('TheBotRemoved'));
        }

        if (!data.displayName && data.botServiceId === BotServiceType.Telegram) {
            isValid = false;
            errMsg.push(`The bot ${data.bot.name} hasn't added in the group.`)
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

    isDirtyForm = () => JSON.stringify(this.initUpdateGroupMappingState) !== JSON.stringify(this.state.form);

    onClosePopup = () => {
        if (this.isDirtyForm()) {
            this.setState({ isShowConfirmDirtyForm: true });
        } else {
            this.props.closeUpdateGroupMappingPopup();
        }
    };

    closeConfirmDirtyForm = () => {
        this.setState({
            isShowConfirmDirtyForm: false
        });
    };

    getParams = () => {
        const isTest =  this.state.form.isTest  ? 1 : 0;
        return {
            conversationGroupId: this.conversationGroupId,
            botId: this.state.form.bot.id,
            displayName: this.state.form.displayName,
            recipientTypeId: this.state.form.recipientTypeId,
            conversationId: this.state.form.conversationId,
            groupHeadlineIds: this.state.form.recipientName === AccountingPIC ? '' : this.state.form.groupHeadlines,
            recipientIds: this.state.form.recipientIds,
            languageId: this.state.form.languageId,
            remark: this.state.form.remark,
            ignoredNotificationTypeList: this.state.form.ignoredNotification,
            isTest: this.state.form.recipientName !== AccountingPIC ? null : isTest
        };
    };

    handleSubmitForm = e => {
        this.setState({ isSubmitting: true });
        this.props.setGroupMappingResult(null);
        e.preventDefault();
        if (this.isValidParams()) {
            const params = this.getParams();
            this.props.updateGroupMapping(params).then(() => {
                if (this.props.updateGroupMappingResult.isSuccessful) {
                    setTimeout(() => {
                        this.props.closeUpdateGroupMappingPopup();
                        this.props.getGridData(this.props.gridParams);
                    }, 3000);
                } else {
                    this.setState({ isSubmitting: false });
                }
            });
        }
    };

    renderForm = isHiddenIsTest => {
        const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.state.settings.headlineOptions;
        const { botServiceId } = this.state.form;
        return (
            <Form onSubmit={this.handleSubmitForm}>
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
                        this.props.updateGroupMappingResult &&
                        <ResponseMessage isSuccessful={this.props.updateGroupMappingResult.isSuccessful}
                            message={this.props.updateGroupMappingResult.message || LangHelper.getResource('UpdateGroupMappingSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('BotService')}
                        </Form.Label>
                        <Form.Label sm="9" md="10" column>
                            {this.props.updateGroupMappingData.data.channelName}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('BotName')}
                        </Form.Label>
                        <Form.Label column sm="9" md="10">
                            {this.state.form.bot.name}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('DisplayName')}
                        </Form.Label>
                        <Form.Label column sm="9" md="10">
                            {this.state.form.displayName}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="2" sm="3">
                            {LangHelper.getResource('ChatType')}
                        </Form.Label>
                        <Form.Label column md="10" sm="9">
                            {LangHelper.getResource('Group')}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" className="required" md="2">
                            {LangHelper.getResource('RecipientType')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="recipientTypeId"
                                value={this.state.form.recipientTypeId}
                                onChange={e => this.handleRecipientTypeChange(e)}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.recipientTypes.map(this.renderEditGroupMappingOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('Recipient')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <MultipleSelect
                                width={'100%'}
                                name="headlineIds"
                                dataSource={this.state.settings.recipientOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                onChange={this.handleRecipientChange}
                                hasSearchBox

                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('Username')}
                        </Form.Label>
                        <Col sm="9" md="10" className="mrg-top-3">
                            {
                                this.state.isLoading &&
                                <Loading />
                            }
                            {
                                botServiceId === BotServiceType.Letstalk ? (
                                    this.props.letstalkVerification.recipients.length > 0 && !this.state.isLoading &&
                                    this.props.letstalkVerification.recipients.map(this.renderLetstalkIdTelegramVerification)
                                ) :
                                (
                                    this.state.telegramVerifies.length > 0 && !this.state.isLoading &&
                                    this.state.telegramVerifies.map(this.renderLetstalkIdTelegramVerification)
                                )
                            }
                        </Col>
                    </Form.Group>
                    {
                        botServiceId === BotServiceType.Telegram &&
                        (
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" md="2">
                                    {LangHelper.getResource('ChatID')}
                                </Form.Label>
                                <Form.Label column sm="9" md="10">
                                    {LangHelper.getResource(this.state.form.conversationId)}
                                </Form.Label>
                            </Form.Group>
                        )
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('GroupHeadline')}
                        </Form.Label>
                        <Col sm="9" md="10" className={`${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`}>
                            <MultipleSelect
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                onChange={this.handleGroupHeadlineChange}
                                hasSearchBox
                                width={'100%'}
                                name="headlineIds"
                                dataSource={groupHeadlinesOption}
                                keyField='id'
                                isDisable={this.state.form.recipientName === AccountingPIC}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2">
                            {LangHelper.getResource('MappingStatus')}
                        </Form.Label>
                        <Form.Label column sm="9" md="10" className={Site.mappingStatusClass(this.state.form.mappingStatus.id)}>
                            {this.state.form.mappingStatus.name}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="2" className="required">
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="languageId"
                                value={this.state.form.languageId}
                                onChange={e => this.handleChange('languageId', e.target.value)}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.languages.map(this.renderEditGroupMappingOptions)}
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
                        <Form.Label column sm="3" md="2" htmlFor="groupEditRemark" >
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="9" md="10">
                            <Form.Control as="textarea" className="shadow-none" size="sm"
                                name="remark"
                                rows={5}
                                value={this.state.form.remark}
                                onChange={e => this.handleChange('remark', e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="2" sm="3" />
                        <Col sm="9" md="10" name="checkbox-isTest">
                            <Form.Group controlId="isTest-edit-group" className={isHiddenIsTest}>
                                <Form.Check type="checkbox" label={LangHelper.getResource('IsTest')}
                                    onChange={event => this.handleChange('isTest', event.target.checked)}
                                    checked={this.state.form.isTest}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={this.state.isSubmitting && this.state.isBotRemoved} id="edit-group-mapping-submit">
                        {LangHelper.getResource('Submit')}
                    </Button>
                    <Button type="button" variant="primary" size="sm" onClick={this.onClosePopup}>
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
        const isHiddenIsTest = this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : '';
        return (
            <Fragment>
                <Modal show className="chat-type-mapping-modal update-group-mapping" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.onClosePopup}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditGroupMapping')}</Modal.Title>
                    </Modal.Header>
                    {
                        this.renderForm(isHiddenIsTest)
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
                        onSubmit={this.props.closeUpdateGroupMappingPopup}
                        onClose={this.closeConfirmDirtyForm}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, recipients, gridParams, groupHeadline, updateGroupMappingData, updateGroupMappingResult, letstalkVerification, telegramVerification } = state;
    return {
        settings,
        recipients,
        groupHeadline,
        gridParams,
        updateGroupMappingData,
        updateGroupMappingResult,
        letstalkVerification,
        telegramVerification
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupMappingPopup);