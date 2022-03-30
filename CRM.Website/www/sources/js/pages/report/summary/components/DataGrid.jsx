import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import ChildRow from './ChildRow';

export class DataGrid extends PureComponent {
    calculateWidth = monthColumns =>{
        const columnsWidth = [50,12];
        monthColumns.map(() =>{
            columnsWidth.push(12);
        });
        const columnWidthSum = 198;
        const sumOfColumnWidth = document.getElementById('app-container').clientWidth;
        const newColumnsWidth = columnsWidth.map(cellWidth =>
            sumOfColumnWidth / columnWidthSum * cellWidth);
        const widthTotalColumns = newColumnsWidth.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
        return widthTotalColumns;
    };

    renderCustomButtonReport= () => {
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
                    <span className="fa fa-file-excel-o icon-excel pl-3" />
                </OverlayTrigger>
            </div>
        );
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

    renderHeaderCellsMonths = months =>{
        const headerCells = [];
        months.map(item =>{
            headerCells.push(<HeaderCell key={item} colWidth={12}>{item}</HeaderCell>);
        });
        return  headerCells;
    };

    renderFooter = data => {
        const cells = [];
        cells.push(<Cell>Grand Total</Cell>);       
        data.map(item =>{
            cells.push(<Cell key={item} colWidth={12}>{item.amount}</Cell>);
        });
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    render() {
        const {categorySummaries, grandTotals, months, reportTitle } = this.props.gridData;   
        const width = this.calculateWidth(months);

        return ( 
            <div className='table-mbc'>
                 <div style={{minWidth:400}} className='table-title d-flex justify-content-between align-items-center'>
                    <span>{reportTitle}</span>
                    {
                        categorySummaries.length > 0 && this.renderCustomButtonReport()
                    }
                </div>
                <Table
                    maxWidth={1600}
                    autoWidth={false}
                    header={this.buildHeader(months)}
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