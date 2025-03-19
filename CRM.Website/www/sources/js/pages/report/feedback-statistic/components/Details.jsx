import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { MaximumDisplayRelatedCustomer, PAGING_SIZES } from '@jsroot/common/constants';

export class Details extends Component {
    constructor(props) {
        super(props);
    }
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { details } = this.props;
        if (details.data.length > 0) {
            return details.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key='body-nodata' className="no-data" >
                <Cell className='text-center' colSpan={5}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleGroupCategory = settings => {
        const categories = settings.reduce((category, currentValue) => {
            const categorySetting = category.find(item => currentValue.settingId === item.settingId);
            if (categorySetting) {
                categorySetting.subSettingId = [...categorySetting.subSettingId, currentValue.subSettingId];
            } else {
                category.push({ settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId] });
            }
            return category;
        }, []);
        return categories;
    };

    renderMainCategory = item => {
        const { mainCategories } = this.props.details;
        const categories = this.handleGroupCategory(item.settings);

        return categories.map((value, key) => {
            const filterCategory = mainCategories.find(el => el.settingId === value.settingId);
            return (
                <div key={key}>
                    <div className="font-weight-bold" >{filterCategory.settingValue}</div>
                    {
                        value.subSettingId.map((subId, index) => {
                            const filterSub = filterCategory.childSettings.find(el => el.subCategoryId === subId);
                            return (
                                <div key={index} className="ml-3 py-1 font-italic">{filterSub?.name}</div>
                            );
                        })
                    }
                </div>
            );
        });
    };

    renderRelatedCustomer = item => {
        if (item.length > MaximumDisplayRelatedCustomer) {
            return (
                <a onClick={() => this.handleOpenViewRelatedCustomer(item.join(', '))}>
                    {item.length} customers
                </a>
            );
        } else {
            return item.join(', ');
        }
    };

    handleOpenViewRelatedCustomer = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    renderRow = (item, index) => {
        const feedbackDateFormat = DateTimeService.toShortDateTimeFormat(item.feedbackDate);
        const createDateFormatDate = DateTimeService.toShortDateTimeFormat(item.createDate);
        const solveDateFormatDate = DateTimeService.toShortDateTimeFormat(item.solveDate);
        const rating = item.rating ? item.rating + ' (' + item.ratingDescription + ')' : item.ratingDescription;
        return (
            <Row key={`${item.feedbackId}-${index}`} className={`manage-feedback-row ${this.renderStatus(item.status)}`}>
                <Cell>
                    <div>
                        <span className="pr-4" />
                        <strong>{item.subject}</strong>
                    </div>
                    <div className="pl-4">
                        <div className="py-1">Feedback date <strong>{feedbackDateFormat}</strong></div>
                        <div className="py-1">By<strong> {item.creator} </strong>on {createDateFormatDate}</div>
                        <div className="py-1">Solving Duration: {item.durationTime}</div>
                        <div className="py-1">Rating: {rating}</div>
                        {
                            item.reviewerName &&
                            <div className="info">Reviewed by <strong> {item.reviewerName} </strong> on {solveDateFormatDate}</div>
                        }
                    </div>
                </Cell>
                <Cell>{item.username}</Cell>
                <Cell>{this.renderMainCategory(item)}</Cell>
                <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
                <Cell className='break-word'>{item.relatedCustomer !== null ? this.renderRelatedCustomer(item.relatedCustomer.split(',')) : ''}</Cell>
            </Row>
        );
    };

    renderStatus = status => {
        if (status === 'Pending') {
            return 'pending';
        }
        return status === 'Closed' ? 'closed' : '';
    };

    handleExportExcel = () => {
        const { gridParamDetails } = this.props;
        this.props.exportExcelDetails(gridParamDetails);
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

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamDetails };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getDetails(params);
        this.props.setGridParamDetails(params);
    };

    renderTableTitle = params => {
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                <span>{`${LangHelper.getResource('FeedbackDetailTitle')} from ${params.fromDate} to ${params.toDate}`}</span>
                {
                    this.props.details.data.length > 0 && this.renderExportExcel()
                }
            </div>
        );
    };

    renderForm = () => {
        const { details } = this.props;
        const { pageIndex, pageSize } = this.props.gridParamDetails;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: details.total,
            PageList: PAGING_SIZES
        };
        return (
            <Modal.Body>
                {this.renderTableTitle(this.props.gridParamDetails)}
                <Table
                    width={1150}
                    autoWidth={false}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={10}
                    shouldResetScrollPosition={false}
                />
            </Modal.Body>
        );
    };

    render() {
        const { details } = this.props;
        if (!details || !details.data) {
            return null;
        }
        return (
            <Fragment>
                <Modal show className="feedback-detail-statistics" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered aria-label="contained-modal-title-vcenter"
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('FeedbackDetailTitle')}</Modal.Title>
                    </Modal.Header>
                    {this.renderForm()}
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParamDetails, details } = state;
    return { gridParamDetails, details };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);