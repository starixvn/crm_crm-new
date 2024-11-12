import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PAGING_SIZES } from '@jsroot/common/constants';
import AutoRefresh from './AutoRefresh';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

export class DataGrid extends Component {
    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData({ ...params });
    };

    renderHeaderAnnouncement = isHost =>
        (<HeaderRow>
            <HeaderCell colWidth={4}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
            <HeaderCell colWidth={6}>{LangHelper.getResource('AnnouncementId')}</HeaderCell>
            <HeaderCell colWidth={5}>{LangHelper.getResource('SendDateTimeGMTA8')}</HeaderCell>
            <HeaderCell colWidth={30}>{LangHelper.getResource('Title')}/{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={5}>{LangHelper.getResource('CreatedBy')}</HeaderCell>
            <HeaderCell colWidth={5}>{LangHelper.getResource('CreatedTimeGM8')}</HeaderCell>
            <HeaderCell colWidth={6}>{LangHelper.getResource('Status')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={4}>{LangHelper.getResource('Action')}</HeaderCell>
            }
        </HeaderRow>);

    renderBodyAnnouncement = isHost => {
        const { pageIndex, pageSize } = this.props.gridParams;

        this.startIndex = (pageIndex - 1) * pageSize + 1;

        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }

        return [<Row key='body-announcement' className='no-data' ><Cell colSpan={isHost ? 9 : 8}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    openContentPopup = announcementId => {
        this.props.setContentPopup({
            show: true,
            announcementId: announcementId
        });

        this.setIsRefresh(false);
    };

    handleOpenNotificationList = announcementId => {
        this.props.navigate(Site.resolveClientUrl('NotificationList'), {state: announcementId});
    };

    setIsRefresh = isRefresh => {
        this.props.setIsRefresh(isRefresh);
    };

    renderRow = (item, index, isHost) =>{
        const statusMatch = item.status === 'Completed' && item.description ? item.description.match(/(?<=\[)[^\][]*(?=])/g) : [];
        const statusLowerCase = item.status.toLowerCase();
        const classLinkAnn = `text-center ${statusLowerCase === 'completed' ? 'link-click' : 'disable-click'}`;
        return(
            <Row key={index} >
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell className={classLinkAnn} onClick={() => this.handleOpenNotificationList(item.announcementId)}>{item.announcementId}</Cell>
                <Cell className='text-center'>
                    <div>{item.sendDateString}</div>
                    <div>{item.sendTimeString}</div>
                </Cell>
                <Cell className='link-click' onClick={() => this.openContentPopup(item.announcementId)}>{item.title}</Cell>
                <Cell>{item.createdBy}</Cell>
                <Cell className='text-center'>
                    <div>{item.createdDateString}</div>
                    <div>{item.createdTimeString}</div>
                </Cell>
                {
                    item.status === 'Completed' ? 
                    <Cell className={`text-center status ${statusLowerCase}`}>
                        <div>{item.status}</div>
                        <div>
                            <span>(S:</span>
                            <span className='sent'>{statusMatch[0]}</span>
                            <span>,D:</span>
                            <span>{statusMatch[1]}</span>
                            <span>,E:</span>
                            <span className='error'>{statusMatch[2]}</span>
                            <span>)</span>
                        </div>
                    </Cell> :
                    <Cell className={`text-center status ${statusLowerCase}`}>{item.status}</Cell>
                }
                {
                    isHost && this.renderAction(item)
                }
            </Row>
        );
    }

    renderAction = item => {
        switch (item.status) {
            case 'Planned':
                return(
                    <OverlayTrigger placement="bottom-start" overlay={
                        <Tooltip id="tooltip-cancel-announcement">
                            {LangHelper.getResource('CancelThisAnnouncement')}
                        </Tooltip>}
                    >
                        <Cell className="text-center">
                            <span className='rounded-circle fa fa-ban icon-delete' onClick={() => this.handleCancel(item.announcementId, 'Cancelled')} />
                        </Cell>
                    </OverlayTrigger>
                );
            case 'Cancelled':
                return(
                    <OverlayTrigger placement="bottom-start" overlay={
                        <Tooltip id="tooltip-cancel-announcement">
                            {LangHelper.getResource('EditThisAnnouncement')}
                        </Tooltip>}
                    >
                        <Cell className="text-center">
                            <span className='rounded-circle fa fa-pencil icon-edit' onClick={() => this.handleEdit(item.announcementId)} />
                        </Cell>
                    </OverlayTrigger>
                );
            case 'Completed':
                return(
                    <OverlayTrigger placement="bottom-start" overlay={
                        <Tooltip id="tooltip-cancel-announcement">
                            {LangHelper.getResource('DuplicateThisAnnouncement')}
                        </Tooltip>}
                    >
                        <Cell className="text-center">
                            <span className='rounded-circle fa fa-files-o icon-duplicate' onClick={() => this.handleDuplicate(item.announcementId)} />
                        </Cell>
                    </OverlayTrigger>
                );     
            case 'Draft':
                return(
                    <Cell className="text-center">
                        <OverlayTrigger placement="bottom-start" overlay={
                            <Tooltip id="tooltip-cancel-announcement">
                                {LangHelper.getResource('CancelThisAnnouncement')}
                            </Tooltip>}
                        >
                            <span className='rounded-circle fa fa-ban icon-delete' onClick={() => this.handleCancel(item.announcementId, 'Cancelled')} />
                        </OverlayTrigger>

                        <OverlayTrigger placement="bottom-start" overlay={
                            <Tooltip id="tooltip-cancel-announcement">
                                {LangHelper.getResource('EditThisAnnouncement')}
                            </Tooltip>}
                        >
                            <span className='rounded-circle fa fa-pencil icon-edit' onClick={() => this.handleEdit(item.announcementId)} />
                        </OverlayTrigger>
                    </Cell>
                );
            default:
                return <Cell />;
        }
    }

    handleEdit = announcementId => {
        const actionParam = {
            announcementId: announcementId,
            isEdit: true,
            redirectActionParams: this.props.redirectActionParams
        };
        this.props.navigate(Site.resolveClientUrl('Announcement/EditAnnouncement'), {state: actionParam});
    }

    handleDuplicate = announcementId => {
        const actionParam = {
            announcementId: announcementId,
            isEdit: false,
            redirectActionParams: this.props.redirectActionParams
        };
        this.props.navigate(Site.resolveClientUrl('Announcement/CloneAnnouncement'), {state: actionParam});
    }

    handleCancel = (announcementId, status) => {
        this.props.setIsRefresh(false);
        this.props.setOpenCancelAnnouncementPopup({show: true, announcementId: announcementId, status: status});
    }

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }

        const { totalItems } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='d-flex table-title-v2 justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('AnnouncementList')}</div>
                    <AutoRefresh />
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.renderHeaderAnnouncement(isHost)}
                    body={this.renderBodyAnnouncement(isHost)}
                    isPaging
                    shouldResetScrollPosition={false}
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData,
        isRefresh,
        redirectActionParams
    } = state;

    return {
        gridParams,
        gridData,
        isRefresh,
        redirectActionParams
    };
};

const DataGridNavigation = WithNavigation(DataGrid);

export default connect(mapStateToProps, mapDispatchToProps)(DataGridNavigation);
