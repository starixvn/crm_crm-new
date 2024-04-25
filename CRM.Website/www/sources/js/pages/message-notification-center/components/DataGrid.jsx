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
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandPanels: false,
            statuses: [
                { id: 1, status: 'New'},
                { id: 2, status: 'Draft'},
                { id: 3, status: 'Cancelled'},
                { id: 4, status: 'Failed'},
                { id: 5, status: 'Sent'},
                { id: 6, status: 'Sending'},
                { id: 7, status: 'Active'},
                { id: 8, status: 'Inactive'},
            ],
            cancelPopup: { show: false, notificationId: null },
            resendFailPopup: { show: false, notificationId: null },
            deactivatePopup: { show: false, notificationId: null },
        };
        this.panels = [];

        this.data = [
            { notificationId: 1, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: ' Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023', statusId: 1, sender: '' },
            { notificationId: 2, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'ReCalculation time: Oct 27, 2023 09:13:18 AM [Home Over 11 Runs OE; Refund | Home Over 10 Runs; Refund] ReCalculation time: Oct 27, 2023 09:13:18 AM [Home Over 11 Runs OE; Refund | Home Over 10 Runs; Refund]ReCalculation time: Oct 27, 2023 09:13:18 AM [Home Over 11 Runs OE; Refund | Home Over 10 Runs; Refund]', statusId: 2, sender: '' },
            { notificationId: 3, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'Created on Dec 12, 2023 Created on Dec 12, 2023', statusId: 3, sender: '' },
            { notificationId: 3, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'As of now, OST and CSD teams have to handle many steps to send notifications to our customers (members, SMA, licensees, headlines) when having a change result of events. Additionally, all customers will be received the notifications event they do play on the match. To keep thi', statusId: 4, sender: '' },
            { notificationId: 3, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'It will destroy the company reputation for a long term. As the result, we have a project to build a service/system that send the notifications to dedicated customers who are affected by the result', statusId: 5, sender: '' },
            { notificationId: 3, isOst: true, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'OST team needs to review the messages on the first launching time to make sure the system work as expected. After that, we can configure the system to run automatically.', statusId: 6, sender: '' },
            { notificationId: 5, isOst: false, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: ' Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 3 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023 Created on Dec 12, 2023', statusId: 1, sender: '' },
            { notificationId: 6, isOst: false, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'OST team needs to review the messages on the first launching time to make sure the system work as expected. After that, we can configure the system to run automatically.', statusId: 7, sender: '' },
            { notificationId: 7, isOst: false, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'OST team needs to review the messages on the first launching time to make sure the system work as expected. After that, we can configure the system to run automatically.', statusId: 8, sender: '' },
        ];
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
            if (this.data.length) {
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
            <HeaderCell colWidth={35}>{LangHelper.getResource('Sites')}</HeaderCell>
            <HeaderCell colWidth={50}>{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={15}>{LangHelper.getResource('status')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Sender/SendDate')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={20}>{LangHelper.getResource('Action')}</HeaderCell>
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
        console.log('actionParam', actionParam);
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

    handleCancel = notificationId => {
        this.setState({ cancelPopup: { show: true, notificationId: notificationId } });
    };

    handleCancelConfirm = async notificationId => {
        console.log('handleCancelConfirm');
        const params = this.getParamStatus(notificationId, 'cancelled');
        // await this.props.editAdmStatus(params).then(response => {
        //     this.handleClosePopup();
        //     if (response.isSuccessful) {
        //         toast.success(LangHelper.getResource('Update notification status successfully!'));
        //         this.props.getGridData(this.props.gridParams);
        //     } else {
        //         toast.error(response.message);
        //     }
        // });
    };

    handleResendFail = notificationId => {
        this.setState({ resendFailPopup: { show: true, notificationId: notificationId } });
    };

    handleResendConfirm = () => {
        console.log('Re-send');
        toast.error('Re-send the sites which were sent failed (inserted failed in DBMSG)');
    };

    handleDeactivate = notificationId => {
        this.setState({ deactivatePopup: { show: true, notificationId: notificationId } });
    };

    handleDeactivateConfirm = async notificationId => {
        console.log('handleDeactivateConfirm');
        const params = this.getParamStatus(notificationId, 'inactive');
        // await this.props.editAdmStatus(params).then(response => {
        //     this.handleClosePopup();
        //     if(response.isSuccessful) {
        //         toast.success(LangHelper.getResource('Update notification status successfully!'));
        //         this.props.getGridData(this.props.gridParams);
        //     }else{
        //         toast.error(response.message);
        //     }
        // });
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
        console.log('notificationId, ', notificationId);
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

    filterAndSortSites = (sites, siteType) => {
        return sites
            .filter(item => item.siteType === siteType)
            .sort((x, y) => x.siteGroupOrd - y.siteGroupOrd);
    };

    renderSiteSection = (sites, title) => {
        if (sites.length === 0) {
            return null;
        }
        return (
            <div>
                <div className='text-bold'>{title}</div>
                {sites.map(item => (
                    <div key={item.siteGroup} className='text-padding-bottom'>
                        {item.siteGroup}: {item.siteNames}
                    </div>
                ))}
            </div>
        );
    };

    renderMapSite = id => {
        const { allSite } = this.props.gridData;
        const sites = allSite.filter(item => item.notificationID === id);
        const creditSites = this.filterAndSortSites(sites, 'Credit');
        const licenseeSites = this.filterAndSortSites(sites, 'Licensee');

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
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
            </div>
        );
    };

    renderLine = () => (
        <div>-----------------------------------------------------------------------------------------------------</div>
    );

    renderMapContent = item => {
        return (
            <div>
                <div className='text-it'>Created on {DateTimeService.toLongDateTimeFormat(item.createdTime)}</div>
                <div className='text-bold'>{item.subject}</div>
                {
                    item.content_en &&
                    <>
                        {this.renderLine()}
                        <div className='text-bold'>English</div>
                        <div className='text-padding-bottom'>{item.content_en}</div>
                    </>
                }
                {
                    item.content_cs &&
                    <>
                        {this.renderLine()}
                        <div className='text-bold'>Simplified Chinese</div>
                        <div className='text-padding-bottom'>{item.content_cs}</div>
                    </>
                }
                {
                    item.content_ch &&
                    <>
                        {this.renderLine()}
                        <div className='text-bold'>Traditional Chinese</div>
                        <div className='text-padding-bottom'>{item.content_ch}</div>
                    </>
                }
            </div>
        );
    };

    renderRow = (item, index, isHost) => {
        const isExistContent = item.content_en || item.content_cs || item.content_ch;
        console.log('item', item);
        console.log('réndmsdasd', this.renderMapContent(item));
        return (
            <Row key={item.notificationID+'-'+index}>
                <Cell className='text-center'>
                    <div>{item.notificationID}</div>
                    {
                        this.renderTooltipComponent(`Copy SessionID: ${item.sessionID}`,
                            <span style={{cursor: 'pointer'}} className="fa fa-info"/>
                        )
                    }
                </Cell>
                <Cell className='text-left'>
                    <div>{DateTimeService.toShortDateFormat(item.eventDate)}</div>
                    <div>{item.eventName}</div>
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
                                <div className='content'>{this.renderMapContent(item)}</div>
                            </Panel>
                        }
                    </div>
                </Cell>
                <Cell className='text-left'>
                    <div className={`status-button status-${item.status}`}>{item.status}</div>
                </Cell>
                <Cell className='text-left'>
                    <div>{item.sender}</div>
                    <div>{item.sendDate}</div>
                </Cell>
                <Cell className='text-center'>
                    <div className='action-button'>
                        {
                            this.props.gridParams.isOstUser ? this.renderActionButtonOST(item.status, item.notificationID) : this.renderActionButtonCSD(item.status, item.notificationID)
                        }
                    </div>
                </Cell>
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