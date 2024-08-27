import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES, LogActions, BackGroundChange } from '@jsroot/common/constants';

export class PicDataGrid extends Component {
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={7}>{LangHelper.getResource('LogID')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('LogDate')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('EditBy')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('PicType')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('PIC')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={63}>{LangHelper.getResource('Detail')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { picReport, gridParamsPic } = this.props;
        const { pageIndex, pageSize } = gridParamsPic;
        this.startIndex = (pageIndex - 1) * pageSize + 1;
        if (picReport.picInfo.length > 0) {
            return picReport.picInfo.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell className='text-center' colSpan={8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const detailValuePic = this.renderDetailsValuePic(item);
        return (
            <Row key={index}>
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell className='text-center'>{item.logId}</Cell>
                <Cell className='text-center' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: item.logTime }} />
                <Cell>{item.editBy}</Cell>
                <Cell>{item.picTypeName}</Cell>
                <Cell>{item.name}</Cell>
                <Cell >{item.action}</Cell>
                <Cell>{detailValuePic}</Cell>
            </Row>
        );
    };

    renderDetailsValuePic = item => {
        let detailValue = '';
        switch (item.actionId) {
            case LogActions.InsertNewPic:
                detailValue = this.getDetailValueInsertNewPic(item);
                break;
            case LogActions.UpdatePic:
                detailValue = this.getDetailValueUpdatePic(item);
                break;
            case LogActions.UpdatePicStatus:
                detailValue = this.getDetailValueUpdatePicStatus(item);
                break;
            case LogActions.InsertChatTypeMapping:
                detailValue = this.getDetailChatTypeMappingInsert(item);
                break;
            case LogActions.UpdateChatTypeMapping:
                detailValue = this.getDetailChatTypeMappingUpdate(item);
                break;
            case LogActions.UpdateChatTypeMappingRemark:
                detailValue = this.getDetailChaTypeMappingRemark(item);
                break;
            case LogActions.UpdateChatTypeMappingStatus:
                detailValue = this.getDetailChaTypeMappingAction(item, true);
                break;
            case LogActions.DeleteConversationGroup:
                detailValue = this.getDetailChaTypeMappingAction(item, false);
                break;
        }
        return detailValue;
    };

    getDetailValueInsertNewPic = item => {
        const languageValue = this.getStringJoinArray(item.newLogInfo.languages);
        const picTypes = this.getStringJoinArray(item.newLogInfo.picTypes);
        const countryValue = item.newLogInfo.country ? item.newLogInfo.country.name : '-';
        const newCommunicationTools = [];
        this.recursiveCommunicationTools(item.newLogInfo.communicationTools, newCommunicationTools);
        const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTools);
        const remarkValue = this.getStringValue(item.newLogInfo.remark);
        const picTypeName = LangHelper.getResource('PicType');
        const communicationToolsName = LangHelper.getResource('CommunicationTool');
        const name = LangHelper.getResource('Name');
        const roleName = LangHelper.getResource('Role');
        const languageName = LangHelper.getResource('Language');
        const countryName = LangHelper.getResource('country');
        const isActiveName = LangHelper.getResource('IsActive');
        const remarkName = LangHelper.getResource('Remark');

        return (
            <div className='pic-container'>
                {this.renderHtmlDetail(picTypeName, picTypes, communicationToolsName, newCommunicationToolValue)}
                {this.renderHtmlDetail(name, item.newLogInfo.name, roleName, item.newLogInfo.role.name)}
                {this.renderHtmlDetail(languageName, languageValue, countryName, countryValue)}
                {this.renderHtmlDetail(isActiveName, 'Yes', remarkName, remarkValue)}
            </div>
        );
    };

    getDetailChatTypeMappingInsert = item => {
        const newLog = item.newLogInfo;
        const botNameValue = this.getStringObject(newLog.bot);
        const displayNameValue = this.getStringValue(newLog.conversationGroup.name);
        const chatTypeValue = this.getStringObject(newLog.chatType);
        const recipientTypeValue = this.getStringObject(newLog.recipientType);
        const recipientValue = this.getStringJoinArray(newLog.recipients);
        const chatBotIdValue = newLog.conversationGroup.letstalkID?.length > 0 ? newLog.conversationGroup.letstalkID : newLog.conversationGroup.username;
        const groupHeadlineValue = this.getStringJoinArray(newLog.headlines);
        const languageValue = this.getStringJoinArray(newLog.languages);
        const remarkValue = this.getStringValue(newLog.conversationGroup.remark);
        const activeValue = this.convertBoolToDecision(newLog.conversationGroup.active);

        const botName = LangHelper.getResource('BotName');
        const displayName = LangHelper.getResource('DisplayName');
        const chatTypeName = LangHelper.getResource('ChatType');
        const recipientTypeName = LangHelper.getResource('RecipientType');
        const recipientName = LangHelper.getResource('Recipient');
        const letstalkIDUsername = LangHelper.getResource('LetstalkIDUsername');
        const groupHeadline = LangHelper.getResource('GroupHeadline');
        const languageName = LangHelper.getResource('Language');
        const remarkName = LangHelper.getResource('Remark');
        const activeNameName = LangHelper.getResource('Active');

        return (
            <div className='pic-container'>
                {this.renderHtmlDetail(botName, botNameValue, displayName, displayNameValue)}
                {this.renderHtmlDetail(chatTypeName, chatTypeValue, recipientTypeName, recipientTypeValue)}
                {this.renderHtmlDetail(recipientName, recipientValue, letstalkIDUsername, chatBotIdValue)}
                {this.renderHtmlDetail(groupHeadline, groupHeadlineValue, languageName, languageValue)}
                {this.renderHtmlDetail(remarkName, remarkValue, activeNameName, activeValue)}
            </div>
        );
    };

    getDetailValueUpdatePic = item => {
        const roleValue = this.changeValueToHtmlString(this.getStringObject(item.oldLogInfo.role), this.getStringObject(item.newLogInfo.role));
        const nameValue = this.changeValueToHtmlString(item.oldLogInfo.name, item.newLogInfo.name);
        const newPicType = this.getStringJoinArray(item.newLogInfo.picTypes);
        const oldPicType = this.getStringJoinArray(item.oldLogInfo.picTypes);
        const picTypeValue = this.changeValueToHtmlString(oldPicType, newPicType);
        const newLanguage = this.getStringJoinArray(item.newLogInfo.languages);
        const oldLanguage = this.getStringJoinArray(item.oldLogInfo.languages);
        const languageValue = this.changeValueToHtmlString(oldLanguage, newLanguage);
        const countryValue = this.changeValueToHtmlString(this.getStringObject(item.oldLogInfo.country), this.getStringObject(item.newLogInfo.country));
        const newCommunicationTool = [];
        this.recursiveCommunicationTools(item.newLogInfo.communicationTools, newCommunicationTool);
        const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTool);
        const newCommunicationString = newCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
        const oldCommunicationTool = [];
        this.recursiveCommunicationTools(item.oldLogInfo.communicationTools, oldCommunicationTool);
        const oldCommunicationToolValue = this.renderCommunicationTools(oldCommunicationTool);
        const oldCommunicationString = oldCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
        const communicationToolValue = this.changeValueToHtmlString(oldCommunicationToolValue, newCommunicationToolValue, newCommunicationString !== oldCommunicationString, true);
        const remarkValue = this.changeValueToHtmlString(this.getStringValue(item.oldLogInfo.remark), this.getStringValue(item.newLogInfo.remark));
        return (
            <div className='pic-container'>
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('PicType'), picTypeValue,
                        LangHelper.getResource('CommunicationTool'), communicationToolValue,
                        oldPicType !== newPicType,
                        oldCommunicationString !== newCommunicationString
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Name'), nameValue,
                        LangHelper.getResource('Role'), roleValue,
                        item.oldLogInfo.name !== item.newLogInfo.name,
                        this.getStringObject(item.oldLogInfo.role) !== this.getStringObject(item.newLogInfo.role)
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Language'), languageValue,
                        LangHelper.getResource('Country'), countryValue,
                        oldLanguage !== newLanguage,
                        this.getStringObject(item.oldLogInfo.country) !== this.getStringObject(item.newLogInfo.country)
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Remark'), remarkValue,
                        null, null,
                        item.oldLogInfo.remark !== item.newLogInfo.remark,
                        false
                    )
                }
            </div>
        );
    };

    getDetailChatTypeMappingUpdate = item => {
        const { newLogInfo, oldLogInfo } = item;
        const newDisplayName = this.getStringValue(newLogInfo.conversationGroup?.name);
        const oldDisplayName = this.getStringValue(oldLogInfo.conversationGroup?.name);
        const displayNameValue = this.changeValueToHtmlString(oldDisplayName, newDisplayName);
        const newRecipientType = this.getStringObject(newLogInfo.recipientType);
        const oldRecipientType = this.getStringObject(oldLogInfo.recipientType);
        const recipientTypeValue = this.changeValueToHtmlString(oldRecipientType, newRecipientType);
        const newRecipient = this.getStringJoinArray(newLogInfo.recipients);
        const oldRecipient = this.getStringJoinArray(oldLogInfo.recipients);
        const recipientValue = this.changeValueToHtmlString(oldRecipient, newRecipient);
        const botServiceNewId = newLogInfo.conversationGroup?.letstalkID ? newLogInfo.conversationGroup.letstalkID : newLogInfo.conversationGroup?.username;
        const botServiceOldId = oldLogInfo.conversationGroup?.letstalkID ? oldLogInfo.conversationGroup.letstalkID : oldLogInfo.conversationGroup?.username;
        const newBotService = this.getStringValue(botServiceNewId);
        const oldBotService = this.getStringValue(botServiceOldId);
        const botServiceValue = this.changeValueToHtmlString(oldBotService, newBotService);
        const newBotName = this.getStringObject(newLogInfo.bot);
        const oldBotName = this.getStringObject(oldLogInfo.bot);
        const botNameValue = this.changeValueToHtmlString(oldBotName, newBotName);
        const newGroupHeadline = this.getStringJoinArray(newLogInfo.headlines);
        const oldGroupHeadline = this.getStringJoinArray(oldLogInfo.headlines);
        const groupHeadlineValue = this.changeValueToHtmlString(oldGroupHeadline, newGroupHeadline);
        const newLanguage = this.getStringJoinArray(newLogInfo.languages);
        const oldLanguage = this.getStringJoinArray(oldLogInfo.languages);
        const languageValue = this.changeValueToHtmlString(oldLanguage, newLanguage);
        const oldRemark = this.getStringValue(oldLogInfo.conversationGroup?.remark);
        const newRemark = this.getStringValue(newLogInfo.conversationGroup?.remark);
        const remarkValue = this.changeValueToHtmlString(oldRemark, newRemark);
        return (
            <div className='pic-container'>
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('BotName'), botNameValue,
                        LangHelper.getResource('DisplayName'), displayNameValue,
                        oldBotName !== newBotName, oldDisplayName !== newDisplayName
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('RecipientType'), recipientTypeValue,
                        LangHelper.getResource('Recipient'), recipientValue,
                        oldRecipientType !== newRecipientType, oldRecipient !== newRecipient
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('GroupHeadline'), groupHeadlineValue,
                        LangHelper.getResource('Language'), languageValue,
                        oldGroupHeadline !== newGroupHeadline, oldLanguage !== newLanguage
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Remark'), remarkValue,
                        LangHelper.getResource('LetstalkIDUsername'), botServiceValue,
                        oldRemark !== newRemark, newBotService !== oldBotService
                    )
                }
            </div>
        );
    };

    getDetailValueUpdatePicStatus = item => {
        const newDirectAccountJoin = this.getStringJoinArray(item.newLogInfo.directAccounts);
        const oldDirectAccountJoin = this.getStringJoinArray(item.oldLogInfo.directAccounts);
        const isChangeDirectAccount = newDirectAccountJoin !== oldDirectAccountJoin;
        const directAccountValue = this.changeValueToHtmlString(oldDirectAccountJoin, newDirectAccountJoin);
        const isActiveValue = this.changeValueToHtmlString(
            this.convertBoolToDecision(item.oldLogInfo.isActive),
            this.convertBoolToDecision(item.newLogInfo.isActive)
        );
        const oldHeadlineJoin = this.getStringJoinArray(item.oldLogInfo.headlines);
        const newHeadlineJoin = this.getStringJoinArray(item.newLogInfo.headlines);
        const isChangeHeadline = oldHeadlineJoin !== newHeadlineJoin;
        const headlineValue = this.changeValueToHtmlString(oldHeadlineJoin, newHeadlineJoin);
        return (
            <div className='pic-container'>
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('DirectAccount'), directAccountValue,
                        LangHelper.getResource('IsActive'), isActiveValue,
                        isChangeDirectAccount,
                        item.oldLogInfo.isActive !== item.newLogInfo.isActive
                    )
                }
                <div className='container-detail'>
                    <div className='detail-child-col col-title-detail'>
                        <div className='p-1'>{LangHelper.getResource('DefaultPIC')}</div>
                    </div>
                    <div className={`border-right-0 col-value-larger detail-child-col ${isChangeHeadline ? BackGroundChange : ''}`}>
                        <div className='p-1'>{headlineValue}</div>
                    </div>
                </div>
            </div>
        );
    };

    getDetailChaTypeMappingAction = (item, isUpdateStatus) => {
        const displayName = LangHelper.getResource('DisplayName');
        const displayNameValue = this.getStringObject(item.newLogInfo.conversationGroup);
        const name = isUpdateStatus ? LangHelper.getResource('Active') : LangHelper.getResource('Deleted');
        const changedValue = this.changeValueToHtmlString(
            this.convertBoolToDecision(isUpdateStatus ? item.oldLogInfo.conversationGroup?.active : item.oldLogInfo.conversationGroup?.deleted),
            this.convertBoolToDecision(isUpdateStatus ? item.newLogInfo.conversationGroup?.active : item.newLogInfo.conversationGroup?.deleted)
        );

        return (
            <div className='pic-container'>
                {this.renderHtmlDetail(displayName, displayNameValue, name, changedValue)}
            </div>
        );
    };

    getDetailChaTypeMappingRemark = item => {
        const displayName = LangHelper.getResource('DisplayName');
        const displayNameValue = this.getStringObject(item.newLogInfo.conversationGroup);
        const remarkName = LangHelper.getResource('Remark');
        const changedValueRemark = this.changeValueToHtmlString(
            item.oldLogInfo.conversationGroup?.remark,
            item.newLogInfo.conversationGroup?.remark
        );

        return (
            <div className='pic-container'>
                {this.renderHtmlDetail(displayName, displayNameValue, remarkName, changedValueRemark)}
            </div>
        );
    };

    changeValueToHtmlString = (oldValue, newValue, isChangeCommunication, isCommunication = false) => {
        const isChange = isCommunication ? isChangeCommunication : newValue !== oldValue;
        return (
            isChange ?
                <div>
                    <div className='new-value'>
                        <div className='pt-1 pb-1'>{newValue}</div>
                    </div><div className='old-value'>
                        <div className='pt-1 pb-1'>{oldValue}</div>
                    </div>
                </div>
                : <div className='pt-1 pb-1'>{newValue}</div>
        );
    };

    renderHtmlDetail = (title1, value1, title2, value2, isChange1 = false, isChange2 = false) => {
        return (
            <div className='container-detail'>
                <div className='detail-child-col col-title-detail'>
                    <div className='p-1'>{title1}</div>
                </div>
                <div className={`${value2 !== null ? 'detail-child-col' : ''} col-value-detail ${isChange1 ? BackGroundChange : ''}`}>
                    <div className='p-1'>{value1}</div>
                </div>
                <div className={`${title2 !== null ? 'detail-child-col col-title-detail' : ''}`}>
                    <div className='p-1'>{title2}</div>
                </div>
                <div className={`${value2 !== null ? 'detail-child-col col-value-detail' : ''} ${isChange2 ? BackGroundChange : ''}`}>
                    <div className='p-1'>{value2}</div>
                </div>
            </div>
        );
    };

    recursiveCommunicationTools = (tools, newCommunicationTools) => {
        if (tools !== null && tools.length > 0) {
            const pivot = tools[0].name;
            const childTools = tools.filter(tool => tool.name === pivot);
            newCommunicationTools.push(childTools);
            const moreTools = tools.filter(tool => tool.name !== pivot);
            this.recursiveCommunicationTools(moreTools, newCommunicationTools);
        }
    };

    getStringCommunicationTools = tools => {
        if (tools.length > 0) {
            const name = tools[0].name;
            const value = tools.map(tool => tool.value).join(', ');
            return `${name}: ${value}`;
        }
        return '-';
    };

    renderCommunicationTools = communicationTools => {
        return (
            <div>
                {
                    communicationTools.map(tools => {
                        if (tools.length > 0) {
                            const name = tools[0].name;
                            const valueJoin = tools.map(tool => tool.value).join(', ');
                            return <div>{name}: {valueJoin}</div>;
                        }
                        return <div>'-'</div>;
                    })
                }
            </div>
        );
    };

    getStringObject = object => object && object.name ? object.name : '-';

    getStringValue = value => value ? value : '-';

    getStringJoinArray = array => array !== null && array.length > 0 ? array.map(item => item.name).join(', ') : '-';

    convertBoolToDecision = value => {
        if (value === true) {
            return 'Yes';
        } else if (value === false) {
            return 'No';
        } else {
            return '-';
        }
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamsPic };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParamsPic(params);
        this.props.getPicReport(params);
    };

    render() {
        const { picReport } = this.props;
        if (!picReport || !picReport.picInfo) {
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParamsPic;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: picReport.totals,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title justify-content-between d-flex align-items-center'>
                    <span>{LangHelper.getResource('ChangesLog')}</span>
                </div>
                <Table
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    width={1500}
                    autoWidth={false}
                    isPaging
                    adjustedHeight={10}
                    pageOption={pagingOption}
                    containerPadding={0}
                    onPaging={this.onPaging}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { picReport, gridParamsPic } = state;
    return { picReport, gridParamsPic };
};

export default connect(mapStateToProps, mapDispatchToProps)(PicDataGrid);