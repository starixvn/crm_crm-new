import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends PureComponent {
    calculateWidth = monthColumns => {
        const columnsWidth = [50, 12];
        monthColumns.map(() => {
            columnsWidth.push(12);
        });
        const columnWidthSum = 198;
        const sumOfColumnWidth = document.getElementById('app-container').clientWidth;
        const newColumnsWidth = columnsWidth.map(cellWidth =>
            sumOfColumnWidth / columnWidthSum * cellWidth);
        const widthTotalColumns = newColumnsWidth.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return widthTotalColumns;
    };

    renderCustomButtonReport = () => {
        return (
            <div>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>View Chart</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-bar-chart icon pl-3" />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Collapse/Expand</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-expand icon pl-3" />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Export to Excel</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-file-excel-o icon-excel pl-3" onClick={() => this.handleExportExcel()} />
                </OverlayTrigger>
            </div>
        );
    };

    handleExportExcel = () => {
        const params = {...this.props.gridParams};
        this.props.exportExcel(params);
    };

    buildHeader = months => {
        const headers = [];
        headers.push(
            <HeaderRow key='group-header'>
                <HeaderCell className='sticky-header' rowSpan={2} colWidth={50}>{LangHelper.getResource('Categories')}</HeaderCell>
            </HeaderRow>
        );
        const cellHeaderMonth = this.renderHeaderCellsMonths(months);
        const headerRowsMonth = <HeaderRow key='header-month'>{cellHeaderMonth}</HeaderRow>;
        headers.push(headerRowsMonth);
        return headers;
    };

    renderHeaderCellsMonths = months => {
        const headerCells = [];
        months.map(item => {
            headerCells.push(<HeaderCell key={item} colWidth={12}>{item}</HeaderCell>);
        });
        return headerCells;
    };

    renderFooter = data => {
        const cells = [];
        cells.push(<Cell>Grand Total</Cell>);
        data.map(item => {
            cells.push(<Cell key={item} colWidth={12}>{item.amount}</Cell>);
        });
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    buildBody = (categorySummaries) => {
        const rows = [];
        if (categorySummaries.length > 0) {
            rows.push(
                categorySummaries.map(item =>
                    this.renderMainCategoryRows(item))
            );
            return rows;
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={15}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderSubCategoryRows = (sub) => {
        const cells = [];
        cells.push(<Cell className='child' style={{width:280,'padding-left':20}}>{sub.name}</Cell>);
        sub.summaries.map(sumMonth => {
            cells.push(
                <Cell key={sumMonth.month} colWidth={12} className='complaints-text '>                    
                    <span>{sumMonth.amount === 0 ? "" : sumMonth.amount}</span>                
                </Cell>
            );
        })
        return (
            <Row key={`child-${sub.id}`}>
                {cells}
            </Row>
        );
    };

    renderMainCategoryRows = (item) => {
        const rows = [];
        const cells = [];
        cells.push(
            <Cell className='complaints-text'>
                <span className={`expand-icon fa pr-2 ${'fa-caret-down'} `} />
                <span >{item.name}</span>                
            </Cell>
        );
        item.summaries.map(sumMonth => {
            cells.push(
                <Cell key={sumMonth.month} colWidth={12} className='complaints-text '>                    
                    <span>{sumMonth.amount === 0 ? "" : sumMonth.amount}</span>                
                </Cell>
            );
        })
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0'>
                {cells}
            </Row>
        );
        if (item.subCategories.length > 0) {
            rows.push(
                item.subCategories.map(sub => this.renderSubCategoryRows(sub))
            );
        }
        return rows;
    };

    render() {
        const { categorySummaries, grandTotals, months, reportTitle } = this.props.gridData;
        const width = this.calculateWidth(months);

        return (
            <div className='table-mbc'>
                <div style={{ minWidth: 400 }} className='table-title d-flex justify-content-between align-items-center'>
                    <span>{reportTitle}</span>
                    {
                        categorySummaries.length > 0 && this.renderCustomButtonReport()
                    }
                </div>
                <Table
                    width={800}
                    autoWidth={false}
                    header={this.buildHeader(months)}
                    body={this.buildBody(categorySummaries)}
                    footer={this.renderFooter(grandTotals)}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={true}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);