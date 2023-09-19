import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy, PAGING_SIZES } from '@jsroot/common/constants';
import { handleSort } from '@jsroot/common/shareScripts';
import UnderlineButton from '@jsroot/common/underlineButton';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.sortDesc = true;
    }

    buildHeader = () => {
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        return (
            <HeaderRow>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='feedbackId'>{LangHelper.getResource('RunningNo')}</HeaderCell>
                {
                    hasCreateFeedbackPermission &&
                    <HeaderCell colWidth={12}>{LangHelper.getResource('Update')}</HeaderCell>
                }
                <HeaderCell colWidth={25} sortOrder='desc' sortBy='feedbackDate'>{LangHelper.getResource('FeedbackDate')}</HeaderCell>
                <HeaderCell colWidth={50} sortOrder='desc' sortBy='mainCategoryValue'>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={35} sortOrder='desc' sortBy='subject'>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='status'>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='duration'>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='handler'>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={18} sortOrder='desc' sortBy='reviewer'>{LangHelper.getResource('Reviewer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData, gridParams } = this.props;
        const { pageIndex, pageSize } = gridParams;
        const skip = pageSize * (pageIndex - 1);
        const data = gridData.data.slice(skip, pageSize * pageIndex);
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        if (data.length > 0) {
            return data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={hasCreateFeedbackPermission ? 9 : 8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    onSort = (sortBy, sortOrder) => {
        const { gridData } = this.props;
        const cloneGridData = [...gridData.data];

        const gridDataSortAsc = handleSort(cloneGridData, sortBy, sortOrder);
        this.props.setLogsByCustomerId({ data: gridDataSortAsc, mainCategories: gridData.mainCategories });
    };

    handleGroupCategory = category => {
        const groupCategory = category.reduce( (accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.mainCategoryId === item.mainCategoryId);
            if (itemExist) {
                itemExist.subCategoryId = [...itemExist.subCategoryId, currentValue.subCategoryId];
            }else {
                accumulator.push({mainCategoryId: currentValue.mainCategoryId, subCategoryId: [currentValue.subCategoryId]});
            }
            return accumulator;
        },[]);
        return groupCategory;
    };

    handleEditNoOfInquiry = id => {
        this.props.setEditNoOfInquiryDialog({ show: true, feedbackId: id });
    };

    handleEditCommunicationLog = id => {
        this.props.setEditCommunicationDialog({ show: true, feedbackId: id });
    };

    handleDoubleClickShowEdit = (event, id) => {
        if(event.detail === 2){
            this.props.setEditCommunicationDialog({ show: true, feedbackId: id });
        }
    };

    handleCreate = () => {
        this.props.setCreateCommunicationDialog({ show: true });
    };

    renderCategoryColumn = item => {
        const { mainCategories } = this.props.gridData;

        return item.groupCategory.map((value,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === value.mainCategoryId);
            return (
                <Fragment key={key}>
                    <div className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subCategoryId.map((subId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
                            return(
                                <div key={index} className="font-italic ml-3">{filterSubCategory?.name}</div>
                            );
                        })
                    }
                </Fragment>
            );
        });
    };

    renderRow = (item, index) => {
        const cssStatus = item.status ? item.status.toLowerCase() : '',
            cssClass = (cssStatus !== 'pending' && cssStatus !== 'closed') ? '' : cssStatus;
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        return (
            <Row key={index} className={cssClass} onClick={event => this.handleDoubleClickShowEdit(event, item.feedbackId)}>
                <Cell className="text-center">
                    <span className='link-click' onClick={() => this.handleEditCommunicationLog(item.feedbackId)}>{item.feedbackId}</span>
                </Cell>
                {
                    hasCreateFeedbackPermission && (
                        <Cell className="text-center">
                            <span className="rounded-circle fa fa-pencil icon-edit"
                                onClick={() => this.handleEditNoOfInquiry(item.feedbackId)}
                            />
                        </Cell>
                    )
                }
                <Cell className="text-center">{DateTimeService.toShortDateTimeFormat(item.feedbackDate)}</Cell>
                <Cell>{this.renderCategoryColumn(item)}</Cell>
                <Cell>{item.subject}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.duration.replace(/\s+/g, '')}</Cell>
                <Cell className='text-center'>{item.handler}</Cell>
                <Cell className='text-center'>{item.reviewer}</Cell>
            </Row>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.setGridParams(params);
        this.props.getLogsByCustomerId(params);
    };

    render() {
        const { gridData, gridParams, canCreateCommunicationLog } = this.props;
        if (!gridData) {
            return null;
        }
        const { pageIndex, pageSize } = gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridData.data.length,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('CustomerCommunicationLogs')}</span>
                </div>
                <Table
                    width={1300}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    onSort={this.onSort}
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    canCreateCommunicationLog &&
                    <Button variant="primary" size="sm" className="mt-3" onClick={this.handleCreate}>
                        <UnderlineButton.insertCaseButton />
                    </Button>
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
