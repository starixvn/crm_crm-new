import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';

export class History extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getNewRemarkHistory(this.props.historyGridParams);
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={8}>{LangHelper.getResource('Version')}</HeaderCell>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='createdDate'>{LangHelper.getResource('DateOfUpdate')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('UpdatedBy')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RemarkTitle')}</HeaderCell>
                <HeaderCell colWidth={35}>{LangHelper.getResource('RemarkContent')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RelatedTo')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Requester')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Approver')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Acknowledger')}</HeaderCell>
                <HeaderCell colWidth={6}>{LangHelper.getResource('View')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        if (this.props.remarksHistory.data.length > 0) {
            return this.props.remarksHistory.data.map((item, index) => this.renderRow(item, index));
        }

        return [<Row key='new-remark-history-body' className="no-data"><Cell colSpan={11}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className='text-center link-click' onClick={() =>this.handleOpenEdit(item)}>{item.versionID}</Cell>
                <Cell className='text-center' sortOrder='desc' sortBy='lastUpdate'>{DateTimeService.toLongDateTimeFormat(item.lastUpdate)}</Cell>
                <Cell className='text-center'>{item.updater}</Cell>
                <Cell className='text-center'>{item.remarkName}</Cell>
                <OverlayTrigger
                    overlay={
                        <Tooltip id="tooltip-remark-content">
                            <span dangerouslySetInnerHTML={{__html: item.remark}} />
                        </Tooltip>
                    }
                    placement="auto"
                >
                    <Cell className='link-click remark-content' dangerouslySetInnerHTML={{__html: item.remark}} onClick={() =>this.handleOpenEdit(item)}/>
                </OverlayTrigger>
                <Cell className='text-center'>{item.relatedPICs}</Cell>
                <Cell className='text-center'>
                    <div>{item.handler}</div>
                    <div>{`(Ext: ${item.ext})`}</div>
                </Cell>
                <Cell className='text-center'>{item.requester}</Cell>
                <Cell className='text-center'>{item.approver}</Cell>
                <Cell className='text-center'>{item.acknowledger}</Cell>
                <Cell className='text-center'>
                    <span className='fa fa-eye-slash icon-edit' onClick={() => this.handleOpenView(item)} />
                </Cell>
            </Row>
        );
    };

    renderHistorySection = () =>{
        const historyParams = this.props.historyGridParams;
        return (
            <div className='history-section'>
                <div className='history-info'>
                    <div>{`Edit History of Remark ${historyParams.remarkID}`}</div>
                    <div>
                        <span>Logged On: </span>
                        <span>{historyParams.userNameFormat}</span>
                    </div>
                    <div>
                        <span>Created By: </span>
                        <span>{historyParams.creator}</span>
                    </div>
                    <div>
                        <span>Created Date: </span>
                        <span>{DateTimeService.toLongDateTimeFormat(historyParams.createdDate)}</span>
                    </div>
                </div>
            </div>
        );
    };
    handleOpenView = item =>{
        this.props.setOpenEditPopup({show: true, data: item, isViewHistory: true});
    };

    onSort = (sortBy, sortOrder) => {
        const { remarksHistory } = this.props;
        const cloneGridData = [...remarksHistory.data];
        let gridDataSortAsc = null;
        if(sortOrder === 'asc'){
            gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortStringAsc(sortBy, first, second));
        }else{
            gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortStringDesc(sortBy, first, second));
        }
        this.props.setRemarksHistory({...this.props.remarksHistory.data, data: gridDataSortAsc});
    };

    handleSortStringAsc = (sortBy, first, second) => first[`${sortBy}`] > second[`${sortBy}`] ? 1 : -1;

    handleSortStringDesc = (sortBy, first, second) => first[`${sortBy}`] < second[`${sortBy}`] ? 1 : -1;


    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.historyGridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;

        this.props.setHistoryGridParams(params);
        this.props.getNewRemarkHistory(params);
    };

    handleGoBack = () =>{
        this.props.setShowHistory({show: false});
        this.props.setRemarksHistory(null);
        this.props.setHistoryGridParams(null);
    };

    render() {
        if (!this.props.remarksHistory || this.props.remarksHistory === null) {
            return null;
        }

        const { totalItems } = this.props.remarksHistory;
        const { pageIndex, pageSize } = this.props.historyGridParams;

        const pagingOptions = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };

        const width = document.getElementById('app-container').clientWidth < 1589 ? 1589 : document.getElementById('app-container').clientWidth - 300;
        return (
            <div>
                <div className='pb-2 link-click'  onClick={() => this.handleGoBack()}>
                    <span className='fa fa-backward mr-2'/>
                    <span>{LangHelper.getResource('BackToRemarksList')}</span>
                </div>
                <div className='history-container'>
                    {
                        this.renderHistorySection()
                    }
                    <Table
                        width={width}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        autoWidth={false}
                        isPaging
                        onSort={this.onSort}
                        containerPadding={0}
                        adjustedHeight={10}
                        pageOption={pagingOptions}
                        onPaging={this.onPaging}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        historyGridParams,
        remarksHistory
    } = state;
    return {
        historyGridParams,
        remarksHistory
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);