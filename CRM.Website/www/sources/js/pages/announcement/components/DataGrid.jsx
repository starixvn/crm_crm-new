import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { Form } from 'react-bootstrap';
import { PAGING_SIZES } from '@jsroot/common/constants';
import AutoRefresh from './AutoRefresh';

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
            <HeaderCell colWidth={15}>{LangHelper.getResource('AnnouncementId')}</HeaderCell>
            <HeaderCell colWidth={23}>{LangHelper.getResource('NotificationTemplate')}</HeaderCell>
            <HeaderCell colWidth={12}>{LangHelper.getResource('SendDateTimeGMTA8')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Title')}/{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={12}>{LangHelper.getResource('CreatedBy')}</HeaderCell>
            <HeaderCell colWidth={12}>{LangHelper.getResource('CreatedTimeGM8')}</HeaderCell>
            <HeaderCell colWidth={12}>{LangHelper.getResource('Status')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={10}>{LangHelper.getResource('Action')}</HeaderCell>
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

    openContentPopup = item => {
        this.props.setContentPopup({
            show: true,
            data: item
        });

        this.setIsRefresh(false);
    };

    openViewDetailPopup = item => {
        this.props.setViewDetailPopup({
            show: true,
            data: item
        });

        this.setIsRefresh(false);
    };

    setIsRefresh = isRefresh => {
        this.props.setIsRefresh(isRefresh);
    };

    renderRow = (item, index, isHost) =>{
        return(
            <Row key={index} >
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell>{item.announcementId}</Cell>
                <Cell>{item.notificationTemplate}</Cell>
                <Cell className='text-center'>
                    <div>{item.sendDateString}</div>
                    <div>{item.sendTimeString}</div>
                </Cell>
                <Cell className='link-click' onClick={() => this.openContentPopup(item)}>{item.title}</Cell>
                <Cell>{item.createdBy}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
            </Row>
        );
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