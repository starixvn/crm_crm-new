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
                <HeaderCell colWidth={5}>{LangHelper.getResource('Date')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Amount')}</HeaderCell>
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
        const dateFormat = isReportByYear ? item.year : `${monthName} ${item.year}`;
        const titleYearDetail = LangHelper.getResource('RedemptionStatisticsDetailTitle') + dateFormat;
        const titleCurrencyDetail = LangHelper.getResource('RedemptionStatisticsDetailTitle') + item.currency;

        return (
            <Row key={`redemption-${index}`}>
                <Cell className='text-center link-click' onClick={() => this.handleOpenDetail(0, item.year, item.month, titleYearDetail)}>{dateFormat}</Cell>
                <Cell className='text-center link-click' onClick={() => this.handleOpenDetail(item.currencyId, 0, 0, titleCurrencyDetail)}>{item.currency}</Cell>
                <Cell className='text-center right'>{Number(item.amount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</Cell>
            </Row>
        );
    };

    renderRowTotal = totals => {
        const totalArr = Object.entries(totals);
        return (
            <Fragment>
                <Row key='totals-1' className='background-total'>
                    <Cell className='text-center text-bold' rowSpan={totalArr.length}>{LangHelper.getResource('Total')}</Cell>
                    <Cell className='text-center text-bold'>{totalArr[0][0]}</Cell>
                    <Cell className='text-center text-bold right'>{Number(totalArr[0][1]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</Cell>
                </Row>
                {
                    totalArr.length > 1 &&
                    totalArr.slice(1).map((element, key) => (
                        <Row key={`amount-${key}`} className='background-total'>
                            <Cell className='text-center text-bold'>{element[0]}</Cell>
                            <Cell className='text-center text-bold right'>{Number(element[1]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}</Cell>
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

    handleOpenDetail = (currency, year, month, title='') =>{
        const {subject, currencyId, statusId, reportBy, fromDate, toDate} = this.props.gridParams;
        let fromDateDetail = '';
        let toDateDetail = '';
        if(year !== 0 && month !== 0) {
            fromDateDetail = moment(new Date(year, month - 1, 1));
            toDateDetail = moment(new Date(year, month, 0));
        } else if(year !== 0 && month === 0){
            fromDateDetail = new Date('Jan 01, ' + year);
            toDateDetail = new Date('Dec 31, ' + year);
        } else{
            fromDateDetail = fromDate;
            toDateDetail = toDate;
        }

        if(currency === 0){
            currency = currencyId;
        }
        const paramDetail = {
            fromDate: DateTimeService.toShortDateFormat(fromDateDetail),
            toDate: DateTimeService.toShortDateFormat(toDateDetail),
            subject: subject,
            currencyId: currency,
            statusId: statusId,
            reportBy: reportBy,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setOpenDetails({show: true, title: title});
        this.props.setGridParamDetails(paramDetail);
        this.props.getRedemptionDetails(paramDetail);
    };

    render() {
        const { gridData } = this.props;
        if(!gridData || !gridData.data){
            return null;
        }

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{gridData.title}</span>
                    {
                        gridData.data.length > 0 &&
                        <span className="fa fa-file-excel-o btn-export-excel icon-excel" onClick={this.handleExportExcel} />
                    }
                </div>
                <Table
                    width={600}
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
