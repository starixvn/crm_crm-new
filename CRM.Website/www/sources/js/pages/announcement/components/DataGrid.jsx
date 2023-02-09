import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PAGING_SIZES } from '@jsroot/common/constants';
import AutoRefresh from './AutoRefresh';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.getGridData(params);
    };

    getGridData = params => {
        this.props.setGridParams(params);
        this.props.getGridData({ ...params });
    };

    renderHeaderAnnouncement = isHost =>
        (<HeaderRow>
            <HeaderCell colWidth={5}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
            <HeaderCell colWidth={8}>{LangHelper.getResource('AnnouncementId')}</HeaderCell>
            <HeaderCell colWidth={12}>{LangHelper.getResource('NotificationTemplate')}</HeaderCell>
            <HeaderCell colWidth={10}>{LangHelper.getResource('SendDateTimeGMTA8')}</HeaderCell>
            <HeaderCell colWidth={30}>{LangHelper.getResource('Title')}/{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={10}>{LangHelper.getResource('CreatedBy')}</HeaderCell>
            <HeaderCell colWidth={15}>{LangHelper.getResource('CreatedTimeGM8')}</HeaderCell>
            <HeaderCell colWidth={10}>{LangHelper.getResource('Status')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={5}>{LangHelper.getResource('Action')}</HeaderCell>
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

    setIsRefresh = isRefresh => {
        this.props.setIsRefresh(isRefresh);
    };

    renderRow = (item, index, isHost) =>{
        const statusMatch = item.status === 'Completed' && item.description ? item.description.match(/(?<=\[)[^\][]*(?=])/g) : [];
        return(
            <Row key={index} >
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell>{item.announcementId}</Cell>
                <Cell>{item.notificationTemplateName}</Cell>
                <Cell className='text-center'>
                    <div>{item.sendDateString}</div>
                    <div>{item.sendTimeString}</div>
                </Cell>
                <Cell className='link-click' onClick={() => this.openContentPopup(item.announcementId)}>{item.title}</Cell>
                <Cell>{item.createdBy}</Cell>
                <Cell>{DateTimeService.toLongDateTimeFormat(item.createdTime)}</Cell>
                {
                    item.status === 'Completed' ? 
                    <Cell className={`text-center status ${item.status.toLowerCase()}`}>
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
                    <Cell className={`text-center status ${item.status.toLowerCase()}`}>{item.status}</Cell>
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
                            <span className='rounded-circle fa fa-ban icon-delete' onClick={() => this.handleCancel(item.announcementId)} />
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
            default:
                return <Cell />;
        }
    }

    handleEdit = announcementId => {
        this.props.setIsRefresh(false);
        this.props.setOpenActionAnnouncementPopup({show: true, announcementId: announcementId, isEdit: true});
    }

    handleDuplicate = announcementId => {
        this.props.setIsRefresh(false);
        this.props.setOpenActionAnnouncementPopup({show: true, announcementId: announcementId, isEdit: false});
    }

    handleCancel = announcementId => {
        this.props.setIsRefresh(false);
        this.props.setOpenCancelAnnouncementPopup({show: true, announcementId: announcementId});
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
                <div className='d-flex table-title justify-content-between align-items-center'>
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
        isRefresh
    } = state;

    return {
        gridParams,
        gridData,
        isRefresh
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);