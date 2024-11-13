import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import { MaximumDisplayRelatedCustomer, PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={35}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData } = this.props;
        if (gridData.data.length > 0) {
            return gridData.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={5}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleGroupCategory = filterCategory => {
        const groupCategory = filterCategory.reduce( (accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.settingId === item.settingId);
            if(itemExist){
                itemExist.subSettingId = [...itemExist.subSettingId, currentValue.subSettingId];
            }else{
                accumulator.push({settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId]});
            }
            return accumulator;
        },[]);
        return groupCategory;
    };

    renderCategoryColumn = item => {
        const { mainCategories } = this.props.gridData;
        const filterCategory = item.settings.filter(element => element.settingType === 'Category');
        const groupCategory = this.handleGroupCategory(filterCategory);

        return groupCategory.map((value,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === value.settingId);
            return (
                <>
                    <div key={key} className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subSettingId.map((subId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
                            return(
                                <div key={index} className="font-italic ml-3">{filterSubCategory?.name}</div>
                            );
                        })
                    }
                </>
            );
        });
    };

    handleOpenViewRelatedCustomerDialog = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    renderRelatedCustomerColumn = item => {
        const totalItems = item.length;
        if(totalItems > MaximumDisplayRelatedCustomer){
            return(
                <a onClick={() => this.handleOpenViewRelatedCustomerDialog(item.join(', '))}>
                    {totalItems} customers
                </a>
            );
        }else{
            return item.join(', ');
        }
    };

    renderRow = (item, index) => {
        return (
            <Row key={index} className="deleted">
                <Cell>
                    <div onClick={() => this.handleEditFeedback(item.feedbackId)}>
                        <span className="rounded-circle fa fa-pencil-square-o link-click pr-2" />
                        <strong className='link-click'>{item.subject}</strong>
                    </div>
                    <div className="feedback-info">
                        <div className="info">Feedback date <strong> {DateTimeService.toShortDateTimeFormat(item.feedbackDate)}</strong></div>
                        <div className="info">By<strong> {item.creatorName} </strong>on {DateTimeService.toShortDateTimeFormat(item.createDate)}</div>
                        {
                            item.reviewerName &&
                            <div className="info">
                                Reviewed by <strong> {item.reviewerName} </strong> on {DateTimeService.toShortDateTimeFormat(item.solveDate)}
                            </div>
                        }
                    </div>
                </Cell>
                <Cell>{item.username}</Cell>
                <Cell>{this.renderCategoryColumn(item)}</Cell>
                <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
                <Cell>{this.renderRelatedCustomerColumn(item.relatedCustomer.split(','))}</Cell>
            </Row>
        );
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    handleEditFeedback = id => {
        this.props.setEditFeedbackDialog({ show: true, feedbackId: id });
    };

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel} />
            </OverlayTrigger>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getDeletedFeedback(params);
    };

    render() {
        const {gridData} = this.props;
        if(!gridData || !gridData.data){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridData.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <>
                <div className='table-title-v2 d-flex justify-content-between align-items-center ha'>
                    <span>Deleted Feedback</span>
                    {
                        gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>

                <Table
                    width={1200}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings, gridData } = state;
    return { gridParams, settings, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
