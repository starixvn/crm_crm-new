import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

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
            ]
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
        if (this.data.length > 0) {
            const filterData = this.data.filter(item => item.isOst === this.props.gridParams.isOstUser);
            return filterData.map((item, index) => this.renderRow(item, index, isHost));
        }
        //return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 4 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData({ ...params });
    };

    handleEdit = notificationId => {
        const actionParam = {
            notificationId: notificationId,
            isEdit: true,
            redirectParams: this.props.gridParams
        };
        this.props.navigate(Site.resolveClientUrl('MessageNotificationCenter/Edit'), {state: actionParam});
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
                        <div className='review-button' onClick={() => this.handleReview(notificationId)}>{LangHelper.getResource('Review')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Failed':
                return <div className='review-button' onClick={() => this.handleReview(notificationId)}>{LangHelper.getResource('ResendFail')}</div>;
            case 'Draft':
                return (
                    <>
                        <div className='review-button' onClick={() => this.handleEdit(notificationId)}>{LangHelper.getResource('Edit')}</div>
                        <div className='cancel-button' onClick={() => this.handleCancel(notificationId)}>{LangHelper.getResource('Cancel')}</div>
                    </>
                );
            case 'Cancelled':
                return <div className='review-button' onClick={() => this.handleEdit(notificationId)}>{LangHelper.getResource('Edit')}</div>;
            default:
                return null;
        }
    };

    renderActionButtonCSD = (status, notificationId) => {
        switch (status) {
            case 'New':
                return <div className='review-button' onClick={() => this.handleReview(notificationId)}>{LangHelper.getResource('Activate')}</div>;
            case 'Active':
                return <div className='review-button' onClick={() => this.handleReview(notificationId)}>{LangHelper.getResource('Deactivate')}</div>;
            case 'Inactive':
                return <div className='review-button' onClick={() => this.handleReview(notificationId)}>{LangHelper.getResource('Activate')}</div>;
            default:
                return null;
        }
    };

    renderRow = (item, index, isHost) => {
        const statusName = item.statusId ? this.state.statuses.find(data => data.id === item.statusId)?.status : '';
        return (
            <Row key={item.notificationId+'-'+index}>
                <Cell className='text-center'>
                    <div>{item.notificationId}</div>
                    {
                        this.renderTooltipComponent('Copy SessionID: 6697e964e-7dd8-4e41-13435d',
                            <span style={{cursor: 'pointer'}} className="fa fa-info"/>
                        )
                    }
                </Cell>
                <Cell className='text-left'><div>{item.eventInfo}</div></Cell>
                <Cell className='text-left'><div>{item.sites}</div></Cell>
                <Cell className='text-left'>
                    <div className='content-item'>
                        {
                            item.content.length > 200 ?
                            <Panel ref={panel => this.panels[index] = panel}>
                                <PanelHeader>
                                    <div className='split-content'>{item.content.slice(0, 200)}</div>
                                </PanelHeader>
                                <div className='content'>{item.content}</div>
                            </Panel> :
                            item.content
                        }
                    </div>
                </Cell>
                <Cell className='text-left'>
                    <div className={`status-button status-${statusName}`}>{statusName}</div>
                </Cell>
                <Cell className='text-left'>{item.sender}</Cell>
                <Cell className='text-center'>
                    <div className='action-button'>
                        {
                            this.props.gridParams.isOstUser ? this.renderActionButtonOST(statusName, item.notificationId) : this.renderActionButtonCSD(statusName, item.notificationId)
                        }
                    </div>
                </Cell>
            </Row>
        )
    };

    render() {
        // if (!this.props.gridData || !this.props.gridData.data) {
        //     return null;
        // }

        // const { totalItems } = this.props.gridData;
        // const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;

        const pagingOption = {
            PageIndex: 1,
            PageSize: 100,
            TotalItem: 2,
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