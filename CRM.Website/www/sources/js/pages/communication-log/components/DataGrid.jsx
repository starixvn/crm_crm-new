import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy, PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.sortDesc = true;
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={20}>{LangHelper.getResource('RunningNo')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('feedbackId')}/>
                </HeaderCell>
                {
                    window.createUpdateFeedbackPermission === Policy.Host &&
                    <HeaderCell colWidth={15}>{LangHelper.getResource('Update')}</HeaderCell>
                }
                <HeaderCell colWidth={25}>{LangHelper.getResource('FeedbackDate')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('feedbackDate')}/>
                </HeaderCell>
                <HeaderCell colWidth={55}>{LangHelper.getResource('Category')}
                    <i aria-hidden="true" className="fa fa-sort sort-header" onClick={() => this.handleSort('subject')}/>
                </HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Subject')}
                    <i className="sort-header fa fa-sort" aria-hidden="true" onClick={() => this.handleSort('subject')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}
                    <i aria-hidden="true" className="sort-header fa fa-sort" onClick={() => this.handleSort('status')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Duration')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('duration')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Handler')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('handler')}/></HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Reviewer')}
                    <i aria-hidden="true" className="fa fa-sort sort-header" onClick={() => this.handleSort('reviewer')}/></HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData, gridParams } = this.props;
        const { pageIndex, pageSize } = gridParams;
        const skip = pageSize * (pageIndex - 1);
        const data = gridData.data.slice(skip, pageSize * pageIndex);

        if (data.length > 0) {
            return data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={window.createUpdateFeedbackPermission === Policy.Host ? 9 : 8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    isSortEqual = (itemA, itemB) => {
        if ( itemA === itemB ) {
            return 0;
        } else {
            return -1;
        }
    };

    handleSort = item => {
        const { gridData } = this.props;
        let sortData = [];
        if (this.sortDesc) {
            sortData = [...gridData.data].sort((a, b) => a[item] > b[item] ? 1 : this.isSortEqual(a[item], b[item]));
        } else {
            sortData = [...gridData.data].sort((a, b) => a[item] < b[item] ? 1 : this.isSortEqual(a[item], b[item]));
        }
        this.sortDesc = !this.sortDesc;
        this.props.setLogsByCustomerId({data: sortData, mainCategories: gridData.mainCategories});
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

    handleCreate = () => {
        this.props.setCreateCommunicationDialog({ show: true });
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
        const cssStatus = item.status ? item.status.toLowerCase() : '',
            cssClass = (cssStatus !== 'pending' && cssStatus !== 'closed') ? '' : cssStatus;
        return (
            <Row key={index} className={cssClass}>
                <Cell className="text-center">
                    <span className='link-click' onClick={() => this.handleEditCommunicationLog(item.feedbackId)}>{item.feedbackId}</span>
                </Cell>
                {
                    window.createUpdateFeedbackPermission === Policy.Host && (
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
        this.props.setGridParams({ ...this.props.gridParams, pageIndex: pageIndex, pageSize: pageSize });
    };

    render() {
        const { gridData, gridParams } = this.props;
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
                    width={1400}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    window.customerInfoPolicy === Policy.Host &&
                    <Button variant="primary" size="sm" className="mt-3" onClick={this.handleCreate}>
                        {LangHelper.getResource('InsertCase')}
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
