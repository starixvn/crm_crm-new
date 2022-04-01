import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import moment from 'moment';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGrid extends Component {
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Date')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Amount')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData } = this.props;
        const rows = [];
        if ( gridData.data.length > 0) {
            gridData.data.forEach((item, index) =>{
                rows.push(this.renderRow(item, index));
            });
            rows.push(this.renderRowTotal(gridData.totals));
            return (
                rows
            );
        }

        return [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={3}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const { gridParams } = this.props;
        const isReportByYear = gridParams.reportBy === '2';
        const monthName = moment(item.month, 'M').format('MMMM');
        return (
            <Row key={`redemption-${index}`}>
                <Cell className='text-center link-click' onClick={() => this.handleYearOpenDetail(item)}>{isReportByYear ? item.year : `${monthName} ${item.year}`}</Cell>
                <Cell className='text-center link-click' onClick={() => this.handleCurrencyOpenDetail()}>{item.currency}</Cell>
                <Cell className='text-center'>{item.amount}</Cell>
            </Row>
        );
    };

    renderRowTotal = totals => {
        const totalArr = Object.entries(totals);
        return (
            <Fragment>
                <Row key='totals-1' className='background-total'>
                    <Cell className='text-center' rowSpan={totalArr.length}>{LangHelper.getResource('Total')}</Cell>
                    <Cell className='text-center'>{totalArr[0][0]}</Cell>
                    <Cell className='text-center'>{totalArr[0][1]}</Cell>
                </Row>
                {
                    totalArr.length > 1 &&
                    totalArr.slice(1).map((element, key) => (
                        <Row key={`amount-${key}`} className='background-total'>
                            <Cell className='text-center'>{element[0]}</Cell>
                            <Cell className='text-center'>{element[1]}</Cell>
                        </Row>
                    ))
                }
            </Fragment>
        );
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    handleYearOpenDetail = item =>{
        const dateCombine = `${item.year}-${item.month}-01`;
        const date = new Date(DateTimeService.toShortDateFormat(new Date(dateCombine)));
        const {subject, currencyId, statusId, reportBy} = this.props.gridParams;
        const paramDetail = {
            fromDate: date,
            toDate: new Date(DateTimeService.toShortDateFormat(DateTimeService.lastDayOfMonth(date))),
            subject: subject,
            currencyId: currencyId,
            statusId: statusId,
            reportBy: reportBy,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setOpenDetails({show: true});
        this.props.setGridParamDetails(paramDetail);
        this.props.getRedemptionDetails(paramDetail);
    }

    handleCurrencyOpenDetail = () =>{
        const param = {...this.props.gridParams, pageIndex: 1, pageSize: 100};
        this.props.setOpenDetails({show: true});
        this.props.setGridParamDetails(param);
        this.props.getRedemptionDetails(param);
    }

    render() {
        const { gridData } = this.props;
        if(!gridData || !gridData.data){
            return null;
        }

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{gridData.title}</span>
                    <span className="fa fa-file-excel-o btn-export-excel icon-excel" onClick={this.handleExportExcel} />
                </div>
                <Table
                    width={900}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, gridParams } = state;
    return { gridData, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
