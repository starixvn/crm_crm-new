import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { filterAndSortSites } from '../common.functions';
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandPanels: false,
            cancelPopup: { show: false, notificationId: null },
            resendFailPopup: { show: false, notificationId: null },
            deactivatePopup: { show: false, notificationId: null },
        };
        this.panels = [];
    }

    handleToggleRow = id => {
        this.setState(prevState => {
            const { toggleRows } = prevState;
            const index = toggleRows.indexOf(id);
            const updatedToggleRows = [...toggleRows];
            
            if (index >= 0) {
                updatedToggleRows.splice(index, 1);
            } else {
                updatedToggleRows.push(id);
            }
    
            return { toggleRows: updatedToggleRows };
        });
    };

    toggleExpandPanels = () => {
        this.setState(prevState => ({ expandPanels: !prevState.expandPanels }), () => {
            if (this.props.gridData.data.length) {
                this.panels.filter(x => x && (x.state.isOpen !== this.state.expandPanels)).forEach(panel => {
                    panel.set(this.state.expandPanels);
                });
            }
        });
    };

    buildHeader = isHost => (
        <HeaderRow>
            <HeaderCell colWidth={15}>{LangHelper.getResource('NotificationID')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Event Info')}</HeaderCell>
            <HeaderCell colWidth={30}>{LangHelper.getResource('Sites')}</HeaderCell>
            <HeaderCell colWidth={65}>{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={10}>{LangHelper.getResource('status')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Sender/SendDate')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={13}>{LangHelper.getResource('Action')}</HeaderCell>
            }
        </HeaderRow>
    );

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 7 : 6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData({ ...params });
    };

    handleAction = (notificationId, isOstUser) => {
        const actionParam = {
            notificationId: notificationId,
            isOstUser: isOstUser,
            redirectParams: this.props.gridParams
        };
        this.props.navigate(Site.resolveClientUrl('MessageNotificationCenter/Action'), {state: actionParam});
    };

    handleClosePopup = () => {
        this.setState({
            cancelPopup: { show: false, notificationId: null },
            resendFailPopup: { show: false, notificationId: null },
            deactivatePopup: { show: false, notificationId: null }
        });
    };

    getParamStatus = (notificationId, status) => ({
        notificationId,
        newStatus: status
    });

    handleUpdateStatus = async params => {
        await this.props.editAdmStatus(params).then(response => {
            this.handleClosePopup();
            if (response.isSuccessful) {
                toast.success(LangHelper.getResource('UpdateNotificationStatusSuccessfully'));
                this.props.getGridData(this.props.gridParams);
            } else {
                toast.error(response.message);
            }
        });
    };

    handleCancel = notificationId => {
        this.setState({ cancelPopup: { show: true, notificationId: notificationId } });
    };

    handleCancelConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Cancelled');
        await this.handleUpdateStatus(params);
    };

    handleResendFail = notificationId => {
        this.setState({ resendFailPopup: { show: true, notificationId: notificationId } });
    };

    handleResendConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Sending');
        await this.handleUpdateStatus(params);
    };

    handleDeactivate = notificationId => {
        this.setState({ deactivatePopup: { show: true, notificationId: notificationId } });
    };

    handleDeactivateConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Inactive');
        await this.handleUpdateStatus(params);
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

    renderTooltipComponent = (title, component) => {
        return(
            <OverlayTrigger
                placement="bottom-start"
                overlay={
                    <Tooltip>
                        <span>{title}</span>
                    </Tooltip>
                }
            >
                { component }
            </OverlayTrigger>
        )
    };

    renderActionButtonOST = (status, notificationId) => {
        switch (status) {
            case 'New':
                return (
                    <>
                        <div className='review-button' onClick={() => this.handleAction(notificationId, true)}>{LangHelper.getResource('Review')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Failed':
                return <div className='review-button' onClick={() => this.handleResendFail()}>{LangHelper.getResource('ResendFail')}</div>;
            case 'Draft':
                return (
                    <>
                        <div className='review-button' onClick={() => this.handleAction(notificationId, true)}>{LangHelper.getResource('Edit')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Cancelled':
                return <div className='review-button' onClick={() => this.handleAction(notificationId, true)}>{LangHelper.getResource('Edit')}</div>;
            default:
                return null;
        }
    };

    renderActionButtonCSD = (status, notificationId) => {
        switch (status) {
            case 'New':
                return <div className='review-button' onClick={() => this.handleAction(notificationId, false)}>{LangHelper.getResource('Activate')}</div>;
            case 'Active':
                return <div className='review-button' onClick={() => this.handleDeactivate(notificationId)}>{LangHelper.getResource('Deactivate')}</div>;
            case 'Inactive':
                return <div className='review-button' onClick={() => this.handleAction(notificationId, false)}>{LangHelper.getResource('Activate')}</div>;
            default:
                return null;
        }
    };

    renderConfirmPopup = () => {
        const popups = [
            { data: this.state.cancelPopup, status: 'cancel', handler: 'handleCancelConfirm' },
            { data: this.state.resendFailPopup, status: 'resend', handler: 'handleResendConfirm' },
            { data: this.state.deactivatePopup, status: 'deactivate', handler: 'handleDeactivateConfirm' }
        ];
        const activePopup = popups.find(popup => popup.data.show);
        const { data, status, handler } = activePopup;

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
                        Are you sure you want to {status} the notification: <strong>{data.notificationId}</strong>?
                    </div>
                }
                onSubmit={() => this[handler](data.notificationId)}
                onClose={this.handleClosePopup}
            />
        );
    };

    renderSiteSection = (sites, title, status) => {
        if (sites.length === 0) {
            return null;
        }
        return (
            <div>
                <div className='text-bold'>{title}</div>
                {sites.map(item => (
                    <div key={item.siteGroup} className='text-padding-bottom'>
                        {item.siteGroup}: <span className={status === 'Failed' ? 'failed-siteName' : ''}>{item.siteNames}</span>
                    </div>
                ))}
            </div>
        );
    };

    renderMapSite = (id, status) => {
        const { allSite } = this.props.gridData;
        const sites = allSite.filter(item => item.notificationID === id);
        const creditSites = filterAndSortSites(sites, 'Credit');
        const licenseeSites = filterAndSortSites(sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, 'Credit', status)}
                {this.renderSiteSection(licenseeSites, 'Licensee', status)}
            </div>
        );
    };

    renderCollapseContent = item => {
        return (
            <div>
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
            </div>
        );
    };

    horizontalLine = () => (
        <div>---------------------------------------------------------------------------------------------------------------------------------------------</div>
    );

    contentBlock = (index, title, content) => (
        <div key={index}>
            {this.horizontalLine()}
            <div className='text-bold'>{title}</div>
            <div className='text-padding-bottom text-line' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );


    renderMapOstContent = item => {
        const languages = [
            { code: 'en', title: 'English' },
            { code: 'cs', title: 'Simplified Chinese' },
            { code: 'ch', title: 'Traditional Chinese' }
        ];

        return (
            <div>
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
                {languages.map(({ code, title }, index) =>
                    item[`content_${code}`] && this.contentBlock(index, title, item[`content_${code}`])
                )}
            </div>
        );
    };

    renderRow = (item, index, isHost) => {
        const isExistContent = item.content_en || item.content_cs || item.content_ch;

        return (
            <Row key={item.notificationID+'-'+index}>
                <Cell className='text-center icon-info'>
                    <div className='text-session'>
                        {item.notificationID}
                        {
                            item.sessionID &&
                            (
                                <div className='show-icon' onClick={() => this.copyGroupIdToClipboard(item.sessionID)}>
                                    {
                                        this.renderTooltipComponent(`Copy SessionID: ${item.sessionID}`,
                                            <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-info.png')} />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>{item.messageID ? `(Msg: ${item.messageID})` : null}</div>
                </Cell>
                <Cell className='text-left'>
                    <div className='text-padding-bottom'>{item.eventDate ? DateTimeService.toShortDateFormat(item.eventDate) : null}</div>
                    <div>{item.eventName}</div>
                </Cell>
                <Cell className='text-left'>
                    {this.renderMapSite(item.notificationID, item.status)}
                </Cell>
                <Cell className='text-left'>
                    <div className='content-item'>
                        {
                            isExistContent &&
                            <Panel ref={panel => this.panels[index] = panel}>
                                <PanelHeader>
                                    <div className='split-content'>{this.renderCollapseContent(item)}</div>
                                </PanelHeader>
                                <div className='content'>{this.renderMapOstContent(item)}</div>
                            </Panel>
                        }
                    </div>
                </Cell>
                <Cell className='text-left'>
                    <div className={`status-button status-${item.status}`}>{item.status}</div>
                </Cell>
                <Cell className='text-left'>
                    <div className='text-padding-bottom'>{item.sender}</div>
                    <div>{item.sendDate && DateTimeService.toLongDateTimeFormat(item.sendDate)}</div>
                </Cell>
                {
                    isHost && (
                        <Cell className='text-center'>
                            <div className='action-button'>
                                {
                                    this.props.gridParams.isOstUser ? this.renderActionButtonOST(item.status, item.notificationID) : this.renderActionButtonCSD(item.status, item.notificationID)
                                }
                            </div>
                        </Cell>
                    )
                }
            </Row>
        )
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        const { totalItems } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;
        const { cancelPopup, resendFailPopup, deactivatePopup } = this.state;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <>
                <div className='d-flex table-title justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('MessageNotificationCenter')}</div>
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    adjustedHeight={10}
                    shouldResetScrollPosition={false}
                />
                {
                    (cancelPopup.show || resendFailPopup.show || deactivatePopup.show) &&
                    this.renderConfirmPopup()
                }
            </>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData
    } = state;

    return {
        gridParams,
        gridData
    };
};

const DataGridNavigation = WithNavigation(DataGrid);

export default connect(mapStateToProps, mapDispatchToProps)(DataGridNavigation);