import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={8}>{LangHelper.getResource('ID')}</HeaderCell>
                <HeaderCell colWidth={11} sortOrder='desc' sortBy='createdDate'>{LangHelper.getResource('CreatedDate')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Creator')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Headline')}</HeaderCell>
                <HeaderCell colWidth={15} sortOrder='desc' sortBy='userName'>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RemarkTitle')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('RemarkContent')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RelatedTo')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('UpdatedBy')}</HeaderCell>
                <HeaderCell colWidth={11}>{LangHelper.getResource('LastUpdate')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Requester')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Approver')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Acknowledger')}</HeaderCell>
                <HeaderCell colWidth={8}>{LangHelper.getResource('History')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={8}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }

        return [<Row key='new-remark-body' className="no-data" ><Cell colSpan={isHost ? 16 : 15}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => {
        const userNameFormat = `${item.isGroupHeadLine ? item.userName + 'headline' : item.userName}`;
        return (
            <Row key={index}>
                <Cell className='text-center link-click' onClick={() =>this.handleOpenEdit(item)}>{item.remarkID}</Cell>
                <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createdDate)}</Cell>
                <Cell className='text-center'>{item.creator}</Cell>
                <Cell className='text-center'>{item.HeadlineName}</Cell>
                <Cell className='text-center'>{userNameFormat}</Cell>
                <Cell className='text-center'>{item.remarkName}</Cell>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip id="tooltip-remark-content"><span dangerouslySetInnerHTML={{__html: item.remark}} /></Tooltip>
                    }
                >
                    <Cell className='link-click remark-content' onClick={() =>this.handleOpenEdit(item)} dangerouslySetInnerHTML={{__html: item.remark}}/>
                </OverlayTrigger>
                <Cell className='text-center'>{item.relatedPICs}</Cell>
                <Cell className='text-center'>
                    <div>{item.handler}</div>
                    <div>{`(Ext: ${item.ext})`}</div>
                </Cell>
                <Cell className='text-center'>{item.updater}</Cell>
                <Cell className='text-center'>{item.lastUpdate}</Cell>
                <Cell className='text-center'>{item.requester}</Cell>
                <Cell className='text-center'>{item.approver}</Cell>
                <Cell className='text-center'>{item.acknowledger}</Cell>
                <Cell className='text-center'>
                    <span className='fa fa-history icon-edit'
                        onClick={() => this.handleShowHistory(userNameFormat, item)}
                    />
                </Cell>
                {
                    isHost &&
                    this.renderEditIcon(item)
                }
            </Row>
        );
    };

    renderEditIcon = item => {
        return (
            <Cell className='text-center'>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='fa fa-pencil icon-edit'
                        onClick={() => this.handleOpenEdit(item)}
                    />
                     <span className='fa fa-trash-o icon-delete'
                         onClick={() => this.handleShowPopupConfirmDelete(item.remarkID)}
                     />
                </div>
            </Cell>
        );
    };

    handleOpenEdit = item =>{
        this.props.setOpenEditPopup({show: true, data: item, isViewHistory: false});
    };

    handleShowPopupConfirmDelete = remarkID =>{
        this.props.setOpenConfirmDelete({show: true, id: remarkID});
    };

    handleCloseDelete = () =>{
        this.props.setOpenConfirmDelete({show: false , id: null});
    };

    handleShowHistory = (userNameFormat, item) =>{
        const historyParams = {
            custID: item.custID,
            remarkID: item.remarkID,
            pageIndex: 1,
            pageSize: 100,
            userNameFormat: userNameFormat,
            creator: item.creator,
            createdDate: item.createdDate
        };
        this.props.setShowHistory({show: true});
        this.props.setHistoryGridParams(historyParams);
    };

    handleDelete = id =>{
        const params ={
            remarkID: id
        };
        this.props.deleteNewRemark(params).then(response => {
            if(response.isSuccessful){
                toast.success(LangHelper.getResource('DeleteNewRemarkSuccessfully'));
                this.props.getNewRemarks(this.props.gridParams);
            }else{
                toast.error(response.message);
            }
            this.handleCloseDelete();
        });
    };

    renderConfirmMessage = id => {
        return (
            <div>
                Are you sure you want to delete this remark {id}. This action is permanent and cannot be undone.
             </div>
        );
    };


    onSort = (sortBy, sortOrder) => {
        const { gridData } = this.props;
        const cloneGridData = [...gridData.data];
        let gridDataSortAsc = null;
        if(sortBy === 'createdDate'){
            if(sortOrder === 'asc'){
                gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortDateAsc(sortBy, first, second));
            }else{
                gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortDateDesc(sortBy, first, second));
            }
        }else{
            if(sortOrder === 'asc'){
                gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortStringAsc(sortBy, first, second));
            }else{
                gridDataSortAsc = [...cloneGridData].sort((first, second) => this.handleSortStringDesc(sortBy, first, second));
            }
        }
        this.props.setRemarks({...this.props.gridData.data, data: gridDataSortAsc});
    };

    handleSortDateAsc = (sortBy, first, second) => new Date(first[`${sortBy}`]) > new Date(second[`${sortBy}`]) ? 1 : -1;

    handleSortDateDesc = (sortBy, first, second) => new Date(first[`${sortBy}`]) < new Date(second[`${sortBy}`]) ? 1 : -1;

    handleSortStringAsc = (sortBy, first, second) => first[`${sortBy}`] > second[`${sortBy}`] ? 1 : -1;

    handleSortStringDesc = (sortBy, first, second) => first[`${sortBy}`] < second[`${sortBy}`] ? 1 : -1;

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;

        this.props.setGridParams(params);
        this.props.getNewRemarks(params);
    };

    render() {
        if (!this.props.gridData || this.props.gridData === null) {
            return null;
        }

        const { totalItems } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost, popupDeleteConfirm} = this.props;

        const pagingOptions = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };
        const width = document.getElementById('app-container').clientWidth < 1889 ? 1889 : document.getElementById('app-container').clientWidth;
        return (
            <Fragment>
                <div className='table-title'>
                    <span>{LangHelper.getResource('Remark')}</span>
                </div>
                <Table
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    autoWidth={false}
                    width={width}
                    isPaging
                    onSort={this.onSort}
                    containerPadding={0}
                    adjustedHeight={10}
                    pageOption={pagingOptions}
                    onPaging={this.onPaging}
                />
                {
                    this.props.popupDeleteConfirm.show &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={this.renderConfirmMessage(popupDeleteConfirm.id)}
                        onSubmit={() => this.handleDelete(popupDeleteConfirm.id)}
                        onClose={() =>  this.handleCloseDelete()}
                    />
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
        popupDeleteConfirm
    } = state;
    return {
        gridParams,
        gridData,
        popupDeleteConfirm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);