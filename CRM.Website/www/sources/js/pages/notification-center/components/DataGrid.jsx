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
import { Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { filterAndSortSites } from '../common.functions';
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';
import DetailNotification from './DetailNotification';
import AutoRefresh from './AutoRefresh';
import EditReasonPopup from './EditReasonPopup';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandPanels: false,
            cancelPopup: { show: false, notificationId: null },
            resendFailPopup: { show: false, notificationId: null },
            deactivatePopup: { show: false, notificationId: null },
            detailNotificationPopup: { show: false, notificationId: null },
            totalSitesPopup: { show: false, sites: null },
            isShowEditReasonPopup: false,
            reasonPopup: {
                notificationId: null,
                reasonId: null
            }
        };
        this.panels = [];
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={13}>{LangHelper.getResource('NotificationID')}</HeaderCell>
                <HeaderCell colWidth={22}>{LangHelper.getResource('Sites')}</HeaderCell>
                <HeaderCell colWidth={isHost ? 90 : 100}>{LangHelper.getResource('Content')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Reason')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('SenderSendDateGMT8')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={12}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        )
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 8 : 7}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData({ ...params });
    };

    handleAction = (notificationId) => {
        const actionParam = {
            notificationId: notificationId,
            isOstUser: this.props.gridParams.isOstUser,
            redirectParams: this.props.gridParams
        };
        this.props.navigate(Site.resolveClientUrl('NotificationCenter/Action'), { state: actionParam });
    };

    handleClosePopup = () => {
        this.setState({
            cancelPopup: { show: false, notificationId: null },
            resendFailPopup: { show: false, notificationId: null },
            deactivatePopup: { show: false, notificationId: null },
            detailNotificationPopup: { show: false, notificationId: null }
        });
        this.props.setIsRefresh(true);
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
        this.props.setIsRefresh(false);
    };

    handleCancelConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Cancelled');
        await this.handleUpdateStatus(params);
    };

    handleResendFail = notificationId => {
        this.setState({ resendFailPopup: { show: true, notificationId: notificationId } });
        this.props.setIsRefresh(false);
    };

    handleResendConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Sending');
        await this.handleUpdateStatus(params);
    };

    handleDeactivate = notificationId => {
        this.setState({ deactivatePopup: { show: true, notificationId: notificationId } });
        this.props.setIsRefresh(false);
    };

    handleDeactivateConfirm = async notificationId => {
        const params = this.getParamStatus(notificationId, 'Inactive');
        await this.handleUpdateStatus(params);
    };

    handleDetailNotification = notificationId => {
        this.setState({ detailNotificationPopup: { show: true, notificationId: notificationId } });
        this.props.setIsRefresh(false);
    };

    copySessionIdToClipboard = conversationId => {
        const input = document.createElement('input');
        input.value = conversationId;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        Site.displayCopiedToClipboard();
    };

    copySitesToClipboard = sites => {
        const dataSite = sites.map(item =>
            `${item.siteGroup}: ${item.siteNames.split(',').length}\n${item.siteNames}\n\n`
        ).join('');

        const textarea = document.createElement("textarea");
        textarea.value = dataSite;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        Site.displayCopiedToClipboard();
    };

    renderTooltipComponent = (title, component, className) => {
        return (
            <OverlayTrigger
                placement={className}
                overlay={
                    <Tooltip>
                        <span>{title}</span>
                    </Tooltip>
                }
            >
                {component}
            </OverlayTrigger>
        )
    };

    renderActionButtonOST = (status, notificationId) => {
        switch (status) {
            case 'New':
                return (
                    <>
                        <div className='review-button' onClick={() => this.handleAction(notificationId)}>{LangHelper.getResource('Review')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Failed':
                return <div className='review-button' onClick={() => this.handleResendFail(notificationId)}>{LangHelper.getResource('ResendFail')}</div>;
            case 'Draft':
                return (
                    <>
                        <div className='review-button' onClick={() => this.handleAction(notificationId)}>{LangHelper.getResource('Edit')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Cancelled':
                return <div className='review-button' onClick={() => this.handleAction(notificationId)}>{LangHelper.getResource('Edit')}</div>;
            default:
                return null;
        }
    };

    renderActionButtonCSD = (status, notificationId) => {
        switch (status) {
            case 'New':
                return <div className='review-button' onClick={() => this.handleAction(notificationId)}>{LangHelper.getResource('Activate')}</div>;
            case 'Active':
                return <div className='review-button' onClick={() => this.handleDeactivate(notificationId)}>{LangHelper.getResource('Deactivate')}</div>;
            case 'Inactive':
                return <div className='review-button' onClick={() => this.handleAction(notificationId)}>{LangHelper.getResource('Activate')}</div>;
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

    renderTotalSites = () => {
        const { sites } = this.state.totalSitesPopup;
        return (
            <Modal show className="total-sites" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.handleCloseTotalSites}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('TotalSites')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sites.map(item => (
                        <div className='block-site'>
                            <div key={item.siteGroup}>
                                {item.siteGroup}: <span style={{ 'font-weight': '700' }}>{item.siteNames.split(',').length}</span>
                            </div>
                            <div style={{ 'font-weight': '700' }}>{item.siteNames}</div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" className='btn-close' size="sm" onClick={this.handleCloseTotalSites}>
                        {LangHelper.getResource('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    };

    handleOpenTotalSites = sites => {
        this.setState({ totalSitesPopup: { show: true, sites } });
        this.props.setIsRefresh(false);
    };

    handleCloseTotalSites = () => {
        this.setState({ totalSitesPopup: { show: false } });
        this.props.setIsRefresh(true);
    }

    renderSiteSection = (sites, title) => {
        if (sites.length === 0) {
            return null;
        }
        let countSites = 0;
        sites.forEach(item => {
            let siteLengthItem = item.siteNames.split(',').length;
            countSites += siteLengthItem;
        });
        return (
            <div>
                <div className='title-site'>
                    <div className='text-bold'>{title}: </div>
                    <span className='total-site' onClick={() => this.handleOpenTotalSites(sites)}>Total {countSites}</span>
                    <span onClick={() => this.copySitesToClipboard(sites)}>
                        {
                            this.renderTooltipComponent(`Click to copy the list of sites`,
                                <span className='icon-copy-site' />, "right-start"
                            )
                        }
                    </span>
                </div>
                {sites.map(item => (
                    <div key={item.siteGroup} className='text-padding-bottom'>
                        {item.siteGroup}: <span className='wrap-text'>{item.siteNames.split(',').length > 1 ? item.siteNames.split(',').length : item.siteNames}</span>
                    </div>
                ))}
            </div>
        );
    };

    renderMapSite = id => {
        const { allSite } = this.props.gridData;
        const sites = allSite.filter(item => item.notificationID === id);
        const creditSites = filterAndSortSites(sites, 'Credit');
        const licenseeSites = filterAndSortSites(sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, 'Credit')}
                {this.renderSiteSection(licenseeSites, 'Licensee')}
            </div>
        );
    };

    renderCollapseContent = item => {
        return (
            <div>
                <div className='text-bold'>Match ID: {item.matchId}</div>
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
            </div>
        );
    };

    contentBlock = (index, title, content) => (
        <div key={index}>
            <div className='linear-gradient'></div>
            <div className='text-bold'>{title}</div>
            <div className='text-padding-bottom text-line' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );

    handleOpenPopupEditReason = item => {
        this.setState({
            isShowEditReasonPopup: true,
            reasonPopup: {
                notificationId: item.notificationID,
                reasonId: item.reasonId
            }
        });
    }

    handleClosePopupEditReason = (isRefesh = false) => {
        this.setState({
            isShowEditReasonPopup: false,
            reasonPopup: {
                notificationId: null,
                reasonId: null
            }
        });

        if (isRefesh) {
            this.props.getGridData(this.props.gridParams);
        }
    }

    renderMapOstContent = item => {
        const languages = [
            { code: 'en', title: 'English' },
            { code: 'ch', title: 'Traditional Chinese' },
            { code: 'cs', title: 'Simplified Chinese' },
            { code: 'zhcn', title: 'New Simplified Chinese' }
        ];

        return (
            <div>
                <div className='text-bold'>Match ID: {item.matchId}</div>
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
                {languages.map(({ code, title }, index) =>
                    item[`content_${code}`] && this.contentBlock(index, title, item[`content_${code}`])
                )}
            </div>
        );
    };

    renderRow = (item, index, isHost) => {
        const isExistContent = item.content_en || item.content_cs || item.content_ch || item.content_zhcn;

        return (
            <Row key={item.notificationID + '-' + index}>
                <Cell className='text-center show-sessionId'>
                    <div className='text-session'>
                        <span onClick={() => this.handleDetailNotification(item.notificationID)}>{item.notificationID}</span>
                    </div>
                    <div className='text-msg'>{item.messageID ? `(Msg: ${item.messageID})` : null}</div>
                    {
                        item.sessionID &&
                        (
                            <div className='show-icon' onClick={() => this.copySessionIdToClipboard(item.sessionID)}>
                                {
                                    this.renderTooltipComponent(`Copy SessionID: ${item.sessionID}`,
                                        <span className='icon-sessionId' />, "bottom-start"
                                    )
                                }
                            </div>
                        )
                    }
                </Cell>
                <Cell className='text-left'>
                    {this.renderMapSite(item.notificationID)}
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
                    <div>
                        {
                            isHost && <span className="pr-2 fa fa-pencil-square-o link-click"
                                onClick={() => this.handleOpenPopupEditReason(item)} />
                        }
                        <span >{item.reason}</span>
                    </div>
                </Cell>
                <Cell className='text-left'>
                    <div className={`status-button status-${item.status}`}></div>
                </Cell>
                <Cell className='text-left'>
                    <div className='text-padding-bottom'>{item.sender}</div>
                    <div className='text-padding-bottom'>{item.sendDate && DateTimeService.toShortDateFormat(item.sendDate)}</div>
                    <div>{item.sendDate && DateTimeService.toTimeFormat(item.sendDate)}</div>
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
        const { cancelPopup, resendFailPopup, deactivatePopup, detailNotificationPopup, totalSitesPopup, isShowEditReasonPopup, reasonPopup } = this.state;
        const detailParam = { notificationId: detailNotificationPopup.notificationId, isOstUser: this.props.gridParams.isOstUser };
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };
        return (
            <>
                <div className='d-flex table-title justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('NotificationCenter')}</div>
                    <AutoRefresh />
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
                {
                    detailNotificationPopup.show && <DetailNotification onClose={this.handleClosePopup} actionParam={detailParam} />
                }
                {
                    totalSitesPopup.show && this.renderTotalSites()
                }
                {
                    isShowEditReasonPopup && <EditReasonPopup
                        onClose={this.handleClosePopupEditReason}
                        notificationId={reasonPopup.notificationId}
                        reasonId={reasonPopup.reasonId}
                    />
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