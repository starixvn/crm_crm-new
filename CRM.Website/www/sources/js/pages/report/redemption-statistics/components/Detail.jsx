import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { ActionCreators } from '../actions';
import DateTimeService from '@jsroot/common/dateTimeService';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class Detail extends Component {
    constructor(props) {
        super(props);
    }
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={13}>{LangHelper.getResource('ClaimedDate')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={35}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('Done By')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridDataDetails } = this.props;
        if (gridDataDetails.length > 0) {
            return gridDataDetails.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key='body-nodata' className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = (item, index) =>{
        return (
            <Row key={`redemption-detail-${index}`}>
                <Cell className='text-center'>{DateTimeService.toShortDateFormat(item.claimTime)}</Cell>
                <Cell>{item.userName}</Cell>
                <Cell>{item.subject}</Cell>
                <Cell className='text-center'>{item.currency}</Cell>
                <Cell className='text-center'>{Number(item.amount).toFixed(2)}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell>{item.doneBy}</Cell>
            </Row>
        );
    };

    handleExportExcel = () =>{
        const params = this.props.gridParamDetails;
        this.props.exportExcelDetails(params);
    };

    handleGoBack = () =>{
        this.props.setOpenDetails({show: false, title: ''});
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamDetails };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getRedemptionDetails(params);
        this.props.setGridParamDetails(params);
    };

    render() {
        const { detailPopup, gridParamDetails, gridDataDetails } = this.props;
        if (gridDataDetails === null || !gridDataDetails) {
            return null;
        }
        const pagingOption = {
            PageIndex: gridParamDetails.pageIndex,
            PageSize: gridParamDetails.pageSize,
            TotalItem: gridDataDetails.length,
            PageList: PAGING_SIZES
        };

        return (
                <div className='details'>
                    <div className='table-title title-detail d-flex justify-content-between align-items-center'>
                    <span>{detailPopup.title}</span>
                    <div>
                        <OverlayTrigger
                            overlay={
                                <Tooltip><span>Go Back</span></Tooltip>
                            }
                            placement="auto"
                        >
                            <span className="fa fa-arrow-circle-left icon pl-3 fa-lg" onClick={() => this.handleGoBack()} />
                        </OverlayTrigger>
                        {
                            gridDataDetails.length > 0 &&
                            <OverlayTrigger
                                overlay={
                                    <Tooltip><span>Export to Excel</span></Tooltip>
                                }
                                placement="auto"
                            >
                            <span className="fa fa-file-excel-o icon-excel pl-3" onClick={this.handleExportExcel} />
                            </OverlayTrigger>
                        }
                    </div>
                </div>
                <Table
                    width={980}
                    autoWidth={false}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={10}
                    shouldResetScrollPosition={false}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParamDetails, gridDataDetails, detailPopup } = state;
    return { gridParamDetails, gridDataDetails, detailPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);