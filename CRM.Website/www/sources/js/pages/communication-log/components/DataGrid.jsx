import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy } from '@jsroot/common/constants';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                {
                    window.customerInfoPolicy === Policy.Host &&
                    <HeaderCell colWidth={15}>{LangHelper.getResource('Update')}</HeaderCell>
                }
                <HeaderCell colWidth={25}>{LangHelper.getResource('FeedbackDate')}</HeaderCell>
                <HeaderCell colWidth={55}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Reviewer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData, gridPages } = this.props;
        const { pageIndex, pageSize } = gridPages;
        const skip = pageSize * (pageIndex - 1);
        const data = gridData.data.slice(skip, pageSize * pageIndex);

        if (data.length > 0) {
            return data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={window.customerInfoPolicy === Policy.Host ? 9 : 8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
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

    renderCategoryColumn = item => {
        const { mainCategories } = this.props.gridData;
        const groupCategory = this.handleGroupCategory(item.communicationSettings);

        return groupCategory.map((value,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === value.mainCategoryId);
            return (
                <Fragment key={key}>
                    <div className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subCategoryId.map((subId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
                            return(
                                <div key={index} className="font-italic ml-3">{filterSubCategory.name}</div>
                            );
                        })
                    }
                </Fragment>
            );
        });
    };

    renderRow = (item, index) => {
        return (
            <Row key={index} className={item.status === 'Pending' ? 'pending' : item.status === 'Closed' ? 'closed' : ''}>
                <Cell className="text-center">
                {
                    <span className='link-click' onClick={() => this.handleEditCommunicationLog(item.feedbackId)}>{item.feedbackId}</span>
                }
                </Cell>
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEditNoOfInquiry(item.feedbackId)}
                    />
                </Cell>
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
        this.props.setGridPages({pageIndex: pageIndex, pageSize: pageSize});
    };

    render() {
        const { gridData, gridPages } = this.props;
        if (!gridData) {
            return null;
        }
        const { pageIndex, pageSize } = gridPages;
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
                    width={1150}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridPages, gridData } = state;
    return { gridPages, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
