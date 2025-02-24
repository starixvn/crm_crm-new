﻿import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ActionCreators } from '../actions/index';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES, ChatTypeMapping, MappingStatus } from '@jsroot/common/constants';
import Site from '@jsroot/common/site';
import { Form } from 'react-bootstrap';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import EditGroupMappingPopup from './EditGroupMappingPopup';
import EditPersonalMappingPopup from './EditPersonalMappingPopup';
import EditRemark from './EditRemark';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isShowRemark: false,
            deletePopup: {
                isShow: false,
                id: null
            }
        };
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    onChangeActiveStaus = (conversationGroupId, isChecked) => {
        this.props.setUpateActivePopup({ isShowPopup: true, conversationGroupId, isChecked });
    };

    updateActiveStatus = () => {
        const params = { conversationGroupId: this.props.updateActiveStatusPopup.conversationGroupId, isActive: this.props.updateActiveStatusPopup.isChecked };
        this.props.updateActiveStatus(params).then(() => {
            this.onCloseConfirmPopupChangeActiveStaus();
            if (this.props.updateActiveStatusResult) {
                toast.success(LangHelper.getResource('UpdateChatTypeMappingSuccessfully'));
                this.props.getGridData(this.props.gridParams);
            } else {
                toast.error(this.props.updateActiveStatusResult.message);
            }
        });
    };

    onCloseConfirmPopupChangeActiveStaus = () => {
        this.props.setUpateActivePopup({ isShowPopup: false });
    };

    renderRecipients = (recipient, key) => {
        return (
            <div key={key} className='recipient-item' title={`${recipient.recipientName} (${recipient.roleName})`}>
                {`${recipient.recipientName} (${recipient.roleName})`}
            </div>
        );
    };

    handleEdit = chatMapping => {
        if (parseInt(chatMapping.chatTypeId, 10) === ChatTypeMapping.Personal) {
            this.props.openUpdatePersonalMappingPopup(chatMapping);
        } else {
            this.props.openUpdateGroupMappingPopup(chatMapping);
        }
    };

    
    handleOpenDelete = conversationGroupId => {
        this.setState({
            deletePopup:{ isShow: true, id: conversationGroupId}
        });
    };

    handleDelete = () =>{
        this.props.deleteConversationGroup(this.state.deletePopup.id).then(response => {
            if(!response || !response.data){
                return;
            }
            if (response.data.isSuccessful) {
                this.onClosePopupDelete(true);
                toast.success(LangHelper.getResource('DeleteChatTypeMappingSuccessfully'));
            } else {
                this.onClosePopupDelete(false);
                toast.error(response.data.message);
            }
        });
    }

    onClosePopupDelete = isSuccessful => {
        this.setState({
            deletePopup:{ isShow: false, id: null}
        }, () => {
            if (isSuccessful) {
                this.props.getGridData(this.props.gridParams);
            }
        });
    };



    handleOpenPopupEditRemark = item => {
        this.setState({
            isShowRemark: true,
            data: item
        });
    };

    onClosePopupEditRemark = isSuccessful => {
        this.setState({
            isShowRemark: false,
            data: null
        },() => {
            if(isSuccessful) {
                this.props.getGridData(this.props.gridParams);
            }
        });
    };

    copyGroupIdToClipboard = conversationId => {
        const input = document.createElement('input');
        input.value = conversationId;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        Site.displayCopiedToClipboard();
    };

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('BotService')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('BotName')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('ChatType')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('DisplayName')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Recipient')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('LetstalkIDUsername')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Language')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('MappingStatus')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Active')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Remark')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={10}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildChatTypeMappingBody = isHost => {
        const { pageIndex, pageSize } = this.props.gridParams;

        this.startIndex = (pageIndex - 1) * pageSize + 1;
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan={isHost ? 13 : 12}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderIsActiveCol = (isHost, item) => {
        if (isHost) {
            const isPersonalCheckDisabled = item.chatTypeId === ChatTypeMapping.Personal && (item.letstalkID_Username === '' || !item.recipients.length || !item.headlines.length);
            const isGroupCheckDisabled = item.chatTypeId === ChatTypeMapping.Group && item.mappingStatusId === MappingStatus.NotMapped;
            const isDisabled = isGroupCheckDisabled || isPersonalCheckDisabled;

            return (
                <Cell className='text-center'>
                    <Form.Control className='checkbox-cell-style'
                        id={`active-chk-${item.conversationGroupId}`}
                        type='checkbox'
                        checked={item.isActive}
                        onChange={e => this.onChangeActiveStaus(item.conversationGroupId, e.target.checked)}
                        disabled={isDisabled}
                    />
                </Cell>
            );
        }

        return <Cell className='text-center'>{item.isActive ? <span className="fa fa-check badge-green" /> : ''}</Cell>;
    };

    renderEditIcon = (isBotRemovedStatus, chatMapping) => {
        return (
            <Cell className='text-center'>
                <div className={isBotRemovedStatus ? 'cursor-not-allowed' : ''}>
                    <span className={`fa fa-pencil icon-edit ${isBotRemovedStatus ? 'pointer-event-none' : ''}`}
                        onClick={() => this.handleEdit(chatMapping)}
                    />
                    <span className={`${chatMapping.isActive ? 'pointer-event-none' : 'rounded-circle'} fa fa-trash icon-delete`}
                        onClick={() => this.handleOpenDelete(chatMapping.conversationGroupId)}
                    />
                </div>
            </Cell>
        );
    };

    renderRow = (item, index, isHost) => {
        const isBotRemovedStatus = (item.chatTypeId === ChatTypeMapping.Group) && (item.mappingStatusId === MappingStatus.BotRemoved);
        return (
            <Row key={index}>
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell>{item.channelName}</Cell>
                <Cell>{item.botName}</Cell>
                <Cell>{item.chatType}</Cell>
                <Cell>
                    {item.displayName}
                </Cell>
                <Cell >{item.headlines.length > 0 ? item.headlines.map(h => h.headlineName).join(', ') : ''}</Cell>
                <Cell className='recipient-merge-cell'>
                    {
                        item.recipients.length > 0 &&
                        item.recipients.map(this.renderRecipients)
                    }
                </Cell>
                <Cell className={item.chatTypeId === ChatTypeMapping.Personal ? '' : 'text-center'}>
                    {
                        item.chatTypeId === ChatTypeMapping.Personal ?
                            item.letstalkID_Username :
                            <span className="icon-copy fa fa-copy" onClick={() => this.copyGroupIdToClipboard(item.letstalkID_Username)} title={item.letstalkID_Username} />
                    }
                </Cell>
                <Cell >{item.language}</Cell>
                <Cell className='text-center'>
                    <span className={Site.mappingStatusClass(item.mappingStatusId)}>{item.chatTypeId === ChatTypeMapping.Group ? item.mappingStatus : ''}</span>
                </Cell>
                {this.renderIsActiveCol(isHost, item)}
                <Cell>
                    <div>
                        {
                            isHost && <span className="pr-2 fa fa-pencil-square-o link-click" onClick={() => this.handleOpenPopupEditRemark(item)} />
                        }
                        <span >{item.remark}</span>
                    </div>
                </Cell>
                {
                    isHost &&
                    this.renderEditIcon(isBotRemovedStatus, item)
                }
            </Row>
        );
    };

    renderConfirmMessage = () => {
        const isChecked = this.props.updateActiveStatusPopup.isChecked;
        return (
            <div>
                The Personal/Group shall be {!isChecked ? 'not ' : ''} received notification{!isChecked ? ' anymore' : ''}.
                Are you sure you want to {isChecked ? 'activate' : 'deactivate'} it?
            </div>
        );
    };

    handleExportExcelMapping = () => {
        const { gridParams } = this.props;
        this.props.exportExcelMapping(gridParams);
    };

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipExport">
                        <span>
                            Export to Excel
                        </span>
                    </Tooltip>
                }
            >
                {
                    <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcelMapping} />
                }
            </OverlayTrigger>
        );
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }

        const { totalItems } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;

        const pagingOptions = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };
        const confirmMsg = this.renderConfirmMessage();
        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('ChatTypeMapping')}</span>
                    {
                        this.props.gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>
                <Table
                    isPaging
                    minWidth={960}
                    header={this.buildHeader(isHost)}
                    body={this.buildChatTypeMappingBody(isHost)}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    onPaging={this.onPaging}
                    shouldResetScrollPosition={false}
                    pageOption={pagingOptions}
                />
                {
                    this.props.updateActiveStatusPopup.isShowPopup &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={confirmMsg}
                        onSubmit={this.updateActiveStatus}
                        onClose={this.onCloseConfirmPopupChangeActiveStaus}
                    />
                }
                {
                    this.state.deletePopup.isShow &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={LangHelper.getResource('ConfirmDeleteChatTypeMapping')}
                        onSubmit={this.handleDelete}
                        onClose={() => this.onClosePopupDelete(false)}
                    />
                }
                {
                    this.props.updatePersonalMappingData.isShow &&
                    <EditPersonalMappingPopup />
                }
                {
                    this.props.updateGroupMappingData.isShow &&
                    <EditGroupMappingPopup />
                }
                {
                    this.state.isShowRemark &&
                    <EditRemark data={this.state.data} onClose={this.onClosePopupEditRemark} />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData,
        updateActiveStatusPopup,
        updateActiveStatusResult,
        updatePersonalMappingData,
        updateGroupMappingData,
        exportExcelMapping
    } = state;
    return {
        gridParams,
        gridData,
        updateActiveStatusPopup,
        updateActiveStatusResult,
        updatePersonalMappingData,
        updateGroupMappingData,
        exportExcelMapping
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);