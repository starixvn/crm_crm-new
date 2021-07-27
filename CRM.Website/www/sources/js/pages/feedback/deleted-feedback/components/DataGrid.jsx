import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGrid extends Component {

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
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

    renderCategoryColumn = (item) => {
        const filterCategory = item.settings.find(element => element.settingType === 'Category');
        const subSettingId = filterCategory.subSettingId;       
        const filterMainCategory = this.props.gridData.mainCategories.find(element => element.settingId === filterCategory.settingId);
        const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subSettingId);

        return (
            <>
                <div className="font-weight-bold">{item.subject}</div>
                <div className="font-italic ml-3">{filterSubCategory.name}</div>
            </>     
        )
    };

    renderRelatedCustomerColumn = (item) => {
        return item.map((value,key) => {
            if(key === item.length - 1)
                return <div key={key}>{`${value}`}</div>
            return <div key={key}>{`${value},`}</div>
        });
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell>
                    <div>
                        <span className="rounded-circle fa fa-pencil-square-o" />
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

    render() {
        const {gridData} = this.props;
        if(!gridData || !gridData.data)
            return null;

        const pagingOption = {
            PageIndex: 1,
            PageSize: 100,
            TotalItem: gridData.data.length,
            PageList: [100, 200, 300, 400, 500]
        };

        return (
            <>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>Deleted Feedback</span>
                    {
                        gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>

                <Table
                    width={1336}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings, gridData ,editNoOfInquiryDialog, editFeedbackDialog } = state;
    return { gridParams, settings, gridData ,editNoOfInquiryDialog, editFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
