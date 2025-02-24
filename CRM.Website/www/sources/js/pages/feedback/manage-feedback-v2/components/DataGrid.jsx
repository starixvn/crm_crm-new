import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { MaximumDisplayRelatedCustomer, PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map()
        };
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.gridDataFeedbacks) !== JSON.stringify(this.props.gridDataFeedbacks)){
            this.setState({checkedItems: new Map()});
        }
    }

    buildHeader = isHost => {
        const isCheckAll = this.isCheckAll();
        return (
            <HeaderRow>
                {
                    isHost && <HeaderCell colWidth={10}>
                        <div>
                            <input type='checkbox' className='cursor-pointer'
                                checked={isCheckAll}
                                onChange={this.handleChangeCheckBoxAll}
                            />
                        </div>
                    </HeaderCell>
                }
                <HeaderCell colWidth={13}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        const { gridDataFeedbacks } = this.props;
        if (gridDataFeedbacks.data.length > 0) {
            return gridDataFeedbacks.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [
            <Row key='body-nodata' className="no-data" >
                <Cell className='text-center' colSpan={8}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    isCheckAll = () => {
        if (this.props.gridDataFeedbacks.data.length === 0) {
            return false;
        }
        return Array.from(this.state.checkedItems.values()).filter(x => x === true).length === this.props.gridDataFeedbacks.data.length;
    };

    handleGroupCategory = filterCategory => {
        const groupCategory = filterCategory.reduce((category, currentValue) => {
            const CategorySetting = category.find(item => currentValue.settingId === item.settingId);
            if (CategorySetting) {
                CategorySetting.subSettingId = [...CategorySetting.subSettingId, currentValue.subSettingId];
            } else {
                category.push({ settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId] });
            }
            return category;
        }, []);
        return groupCategory;
    };

    renderCategory = item => {
        const { mainCategories } = this.props.gridDataFeedbacks;
        const filterCategories = item.settings.filter(el => el.settingType === 'Category');
        const groupCategory = this.handleGroupCategory(filterCategories);

        return groupCategory.map((value, key) => {
            const filterMainCategory = mainCategories.find(el => el.settingId === value.settingId);
            return (
                filterMainCategory !== undefined &&
                <div key={key}>
                    <div className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subSettingId.map((subId, index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(el => el.subCategoryId === subId);
                            return (
                                <div key={index} className="font-italic ml-3 py-1">{filterSubCategory?.name}</div>
                            );
                        })
                    }
                </div>
            );
        });
    };

    renderRelatedCustomer = item => {
        const totalItems = item.length;
        if (totalItems > MaximumDisplayRelatedCustomer) {
            return (
                <a onClick={() => this.handleOpenViewRelatedCustomer(item.join(', '))}>
                    {totalItems} customers
                </a>
            );
        } else {
            return item.join(', ');
        }
    };

    handleOpenViewRelatedCustomer = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    handleChangeCheckbox = event => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(parseInt(item, 10), isChecked)
        }));
    };

    handleChangeCheckBoxAll = event => {
        const isChecked = event.target.checked;
        const items = this.state.checkedItems;
        if (isChecked) {
            this.props.gridDataFeedbacks.data.forEach(element => {
                if (!items.get(element.feedbackId)) {
                    items.set(element.feedbackId, true);
                }
            });

            this.setState({ checkedItems: items });
        } else {
            const clearCheckedItems = new Map();
            this.setState({ checkedItems: clearCheckedItems });
        }
    };

    renderRow = (item, index, isHost) => {
        const feedbackDateFormat = DateTimeService.toShortDateTimeFormat(item.feedbackDate);
        const createDateFormat = DateTimeService.toShortDateTimeFormat(item.createDate);
        const solveDateFormat = DateTimeService.toShortDateTimeFormat(item.solveDate);
        return (
            <Row key={`${item.feedbackId}-${index}`} className={`manage-feedback-row ${this.renderStatus(item.status)}`}>
                <Cell className='text-center'>
                    <input type='checkbox'
                        name={item.feedbackId} key={item.feedbackId}
                        checked={this.state.checkedItems.get(item.feedbackId) || false}
                        onChange={this.handleChangeCheckbox}
                    />
                </Cell>
                {
                    isHost &&
                    <Cell className='text-center'>
                        <span className="edit-feedback cursor-pointer pr-1 fa fa-pencil" onClick={() => this.handleEditNoOfInquiry(item.feedbackId)} />
                    </Cell>
                }
                <Cell className='text-center'>{item.feedbackId}</Cell>
                <Cell>
                    {this.tooltipFeedback(item)}
                    <div className="pl-3">
                        <div className="py-1">Feedback date <strong>{feedbackDateFormat}</strong></div>
                        <div className="py-1">By<strong> {item.creatorName} </strong>on {createDateFormat}</div>
                        <div className="py-1">Solving Duration: {item.durationTime}</div>
                        {
                            item.reviewerName &&
                            <div className="info">
                                Reviewed by <strong> {item.reviewerName} </strong> on {solveDateFormat}
                            </div>
                        }
                    </div>
                </Cell>
                <Cell>{item.username}</Cell>
                <Cell>{this.renderCategory(item)}</Cell>
                <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
                <Cell className='break-word'>{this.renderRelatedCustomer(item.relatedCustomer.split(','))}</Cell>
            </Row>
        );
    };

    renderStatus = status =>{
        if(status === 'Pending') {
            return 'pending';
        }
        return status === 'Closed' ? 'closed' : '';
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    handleEditNoOfInquiry = id => {
        this.props.setEditNoOfInquiryDialog({ show: true, feedbackId: id });
    };

    handleEditFeedback = id => {
        this.props.setEditFeedbackDialog({ show: true, feedbackId: id });
    };

    renderExportExcel = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel cursor-pointer" onClick={this.handleExportExcel} />
            </OverlayTrigger>
        );
    };

    tooltipFeedback = item => {
        const description = !item.description ? '' : `Description: <br>${item.description}<br>`,
            solution = !item.solution ? '' : `Solution: <br>${item.solution}<br>`,
            lastCharacterSlit = description.substring(578, 580),
            isEscapesWord = '<br />'.includes(lastCharacterSlit),
            subLength = isEscapesWord ? 592 : 580;

        const lastCharacterSlitSolution = solution.substring(578, 580),
            isEscapesWordSolution = '<br />'.includes(lastCharacterSlitSolution),
            subLengthSolution = isEscapesWordSolution ? 592 : 580;

        const tooltipDescription = description.length > subLength ? description.substring(0, subLength) + ' ... <br><br>' : description;
        const tooltipSolution = solution.length > subLengthSolution ? solution.substring(0, subLengthSolution) + ' ... <br><br>' : solution;

        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipManageFeedback">
                        <div dangerouslySetInnerHTML={{ __html: tooltipDescription + tooltipSolution }} />
                    </Tooltip>
                }
            >
                <div className='link-click cursor-pointer' onClick={() => this.handleEditFeedback(item.feedbackId)}>
                    <span className="pr-1 fa fa-pencil-square-o" />
                    <strong>{item.subject}</strong>
                </div>
            </OverlayTrigger>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getGridFeedbacks(params);
        this.props.setGridParams(params);
    };

    handleMultipleReviewAndStatus = () => {
        const feedbackSelected = [];
        for (const [key, value] of this.state.checkedItems.entries()) {
            if (value === true) {
                feedbackSelected.push(key);
            }
        }

        this.props.setEditMultipleLogStatusDialog({ show: true, feedbackIds: feedbackSelected });
    };

    handleMultipleEdit = () => {
        const feedbackArr = [];
        for (const [key, value] of this.state.checkedItems.entries()) {
            if (value === true) {
                const feedbackInfo = this.props.gridDataFeedbacks.data.filter(x => x.feedbackId === key)[0];
                feedbackArr.push({
                    feedbackId: feedbackInfo.feedbackId,
                    username: feedbackInfo.username
                });
            }
        }

        this.props.setEditMultipleLogDialog({ show: true, feedbackArr: feedbackArr });
    };

    renderTableTitle = gridDataFeedbacks => {
        const isClickableEditMultiple = Array.from(this.state.checkedItems.values()).includes(true);
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                {
                     this.props.isHost ?
                     <div>
                        <span className='mx-1'>{LangHelper.getResource('Feedback')}</span>
                        <span className='mx-1'>|</span>
                        <span className={`mx-1 cursor-pointer multiple-edit link-click ${isClickableEditMultiple ? '' : 'disabled-multiple-edit-status'}`} onClick={this.handleMultipleEdit}>
                            <span className="mx-1 fa fa-pencil-square-o cursor-pointer" />
                            <strong>{LangHelper.getResource('MultipleEdit')}</strong>
                        </span>
                        <span className='mx-1'>|</span>
                        <span className={`cursor-pointer multiple-edit link-click ${isClickableEditMultiple ? '' : 'disabled-multiple-edit-status'}`} onClick={this.handleMultipleReviewAndStatus}>
                            <span className='mx-1 fa fa-pencil-square-o' />
                            <strong>{LangHelper.getResource('MultipleReviewAndUpdateStatus')}</strong>
                        </span>
                    </div> :
                    <span className='mx-1'>{LangHelper.getResource('Feedback')}</span>
                }
                {
                    gridDataFeedbacks.data.length > 0 && this.renderExportExcel()
                }
            </div>
        );
    };

    render() {
        const { gridDataFeedbacks, isHost } = this.props;
        if (!gridDataFeedbacks || !gridDataFeedbacks.data) {
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridDataFeedbacks.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                {this.renderTableTitle(gridDataFeedbacks)}
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    containerPadding={0}
                    shouldResetScrollPosition={false}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings, gridDataFeedbacks } = state;
    return { gridParams, settings, gridDataFeedbacks };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);