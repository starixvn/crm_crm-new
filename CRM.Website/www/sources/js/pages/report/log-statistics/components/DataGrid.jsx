import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import ChildRow from './ChildRow';
import Site from '@jsroot/common/site';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldResetScrollPosition: true,
            isExpand: false,
            toggleRowDaily: [],
            toggleRowLicensee: [],
            widthTotalColumns: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.mainReports !== nextProps.mainReports) {
            nextState.shouldResetScrollPosition = true;
            nextState.toggleRowDaily = [];
        }
        if (this.state.toggleRowDaily.length > 0 || this.state.toggleRowLicensee.length > 0) {
            nextState.shouldResetScrollPosition = false;
        }
        return true;
    }

    buildHeader = ibcReport => {
        const headers = [];
        headers.push(
            <HeaderRow key='group-header'>
                <HeaderCell className='sticky-header' rowSpan={2} colWidth={30}>{LangHelper.getResource('ComplaintsEnquiries')}</HeaderCell>
                <HeaderCell colSpan={ibcReport.communicationColumns.length + 1}>
                    {ibcReport.productColumns.length === 1 ? ibcReport.productColumns[0].name : LangHelper.getResource('AllProducts')}
                </HeaderCell>
            </HeaderRow>
        );
        const cellHeaderCommunication = this.renderHeaderCellsCommunications(ibcReport.communicationColumns);
        const headerRowsCommunication = <HeaderRow key='header-communication'>{cellHeaderCommunication}</HeaderRow>;
        headers.push(headerRowsCommunication);
        return headers;
    };

    buildHeaderExpand = ibcReport => {
        const headers = [];
        const headerCells = [];
        let headerCellCommunications = [];
        headerCells.push(<HeaderCell className='sticky-header' rowSpan={2} colWidth={30}>{LangHelper.getResource('ComplaintsEnquiries')}</HeaderCell>);
        ibcReport.productColumns.map(product =>{
            headerCells.push(<HeaderCell colSpan={ibcReport.communicationColumns.length + 1}>{product.name}</HeaderCell>);
            const cellHeaderCommunication = this.renderHeaderCellsCommunications(ibcReport.communicationColumns);
            headerCellCommunications = [...headerCellCommunications, ...cellHeaderCommunication];
        });

        headers.push(
            <HeaderRow key='group-header'>
                {headerCells}
            </HeaderRow>
        );
        headers.push(<HeaderRow key='header-communication'>{headerCellCommunications}</HeaderRow>);
        return headers;
    };

    renderHeaderCellsCommunications = communicationColumns =>{
        const headerCells = [];
        communicationColumns.map(item =>{
            headerCells.push(<HeaderCell colWidth={12}>{item.name}</HeaderCell>);
        });
        headerCells.push(<HeaderCell colWidth={12}>{LangHelper.getResource('Total')}</HeaderCell>);
        return  headerCells;
    }

    calculateWidth = communicationColumns =>{
        const columnsWidth = [30,12];
        communicationColumns.map(() =>{
            columnsWidth.push(12);
        });
        const columnWidthSum = 198;
        const sumOfColumnWidth = document.getElementById('app-container').clientWidth;
        const newColumnsWidth = columnsWidth.map(cellWidth =>
            sumOfColumnWidth / columnWidthSum * cellWidth);
        const widthTotalColumns = newColumnsWidth.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
        return widthTotalColumns;
    }

    buildBody = (data, tableName) => {
        const rows = [];
        if (data.mainCategories.length > 0) {
            rows.push(
                data.mainCategories.map(item => 
                    this.renderMainCategoryRows(item, data.communicationColumns, tableName))
                );
            return rows;
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={15}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    buildBodyExpand = (data, tableName) => {
        const rows = [];
        if (data.mainCategories.length > 0) {
            rows.push(
                data.mainCategories.map(item => 
                    this.renderMainCategoryRows(item, data.communicationColumns, tableName, data.productColumns))
                );
            return rows;
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={15}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    toggleRow = tableName => tableName === 'mbc' ? this.state.toggleRowDaily : this.state.toggleRowLicensee;

    toggleRowDaily = (id, tableName) => {
        const toggle = this.toggleRow(tableName);
        const index = toggle.indexOf(id);
        if (index >= 0) {
            toggle.splice(index, 1);
        } else {
            toggle.push(id);
        }

        this.setState({ toggle });
    };

    renderMainCategoryRows = (item, communicationColumns, tableName, productColumns) => {
        const rows = [];
        const cells = [];
        const toggle = this.toggleRow(tableName);
        cells.push( 
            <Cell className='complaints-text'>
                <span className={`expand-icon fa pr-2 ${!toggle.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{item.name}</span>
            </Cell>
        );
        cells.push(<ChildRow isParent currentRow={item} communicationColumns={communicationColumns} productColumns={productColumns}/>);
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0' onClick={() => this.toggleRowDaily(item.id, tableName)}>
                {cells}
            </Row>
        );
        if(item.subCategories.length > 0){
            rows.push(
                item.subCategories.map(sub => this.renderSubCategoryRows(item.id, sub, communicationColumns, tableName, productColumns))
            );
        }
        return rows;
    };

    renderSubCategoryRows = (parentId, sub, communicationColumns, tableName, productColumns) => {
        const toggle = this.toggleRow(tableName);
        if(!toggle.includes(parentId)){
            const cells = [];
            cells.push(<Cell className='child'>{sub.name}</Cell>);
            cells.push(<ChildRow currentRow={sub} communicationColumns={communicationColumns} productColumns={productColumns}/>);
            return (
                <Row key={`child-${sub.id}`}>
                    {cells}
                </Row>   
            );
        }
        else {
            return null;
        }
    };

    renderFooter = data => {
        const cells = [];
        const grandTotal = {
            listOfCommunicationCount: data.grandTotalOfCommunicationCount,
            listOfCommunicationSumByProduct: data.grandTotalOfCommunicationSumByProduct
        };
        cells.push(<Cell>Grand Total</Cell>);
        cells.push(<ChildRow currentRow={grandTotal} communicationColumns={data.communicationColumns}/>);
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    renderFooterExpand = data => {
        const cells = [];
        const grandTotal = {
            listOfCommunicationCount: data.grandTotalOfCommunicationCount,
            listOfCommunicationSumByProduct: data.grandTotalOfCommunicationSumByProduct
        };
        cells.push(<Cell>Grand Total</Cell>);
        cells.push(<ChildRow currentRow={grandTotal} communicationColumns={data.communicationColumns}/>);

        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    handleEditDeletedFeedback = id => {
        this.props.setEditFeedbackDialog({ show: true, feedbackId: id });
    };

    handleExportExcel = () => {
        this.props.exportExcel(this.props.gridParams);
    };

    handleCollapseExpandProduct = () => {
        this.setState(prevState => ({
            isExpand: !prevState.isExpand
        }));
    }

    renderCustomButton = () => {
        return (
            <div>
                {
                    this.props.mainReports.ibcReport.productColumns.length > 1 &&
                    <OverlayTrigger
                        overlay={
                            <Tooltip><span>Product Collapse/Expand</span></Tooltip>
                        }
                        placement="auto"
                    >
                        <span className="fa fa-expand icon-expand" onClick={this.handleCollapseExpandProduct} />
                    </OverlayTrigger>
                }
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Export to Excel</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-file-excel-o icon-excel pl-3" onClick={this.handleExportExcel} />
                </OverlayTrigger>
            </div>
        );
    };

    renderDailyLogStatistic = (fromDateFormat, toFormat) =>
    {
        const {ibcReport} = this.props.mainReports;
        return (
            <div className='table-mbc'>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{`MBC Daily Log Statistics | ${fromDateFormat}-${toFormat}`}</span>
                    {/*{
                        mainReports.iBCReport.length > 0 && this.renderExportExcel()
                    } */}
                </div>
                <Table
                    width={document.getElementById('app-container').clientWidth}
                    autoWidth={false}
                    header={this.buildHeader(ibcReport)}
                    body={this.buildBody(ibcReport, 'mbc')}
                    footer={this.renderFooter(ibcReport)}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                />
            </div>
        );
    }

    renderLicenseeDailyStatistic = (fromDateFormat, toFormat) =>
    {
        const {licenseeReport} = this.props.mainReports;
        let totalWidth = 0;
        const width = this.calculateWidth(licenseeReport.communicationColumns);
        if(this.state.isExpand){
            licenseeReport.productColumns.map(item =>{
                totalWidth += this.calculateWidth(licenseeReport.communicationColumns);
            });
        }
        return (
            <div className='table-licensee'>
                <div style={{width: this.state.isExpand ? document.getElementById('app-container').clientWidth : width}} 
                    className='table-title d-flex justify-content-between align-items-center'>
                    <span>{`Licensee Daily Log Statistics | ${fromDateFormat}-${toFormat}`}</span>
                    {
                        licenseeReport.mainCategories.length > 0 && this.renderCustomButton()
                    }
                </div>
                {
                    this.state.isExpand ?
                    <Table
                        width={totalWidth}
                        autoWidth={false}
                        header={this.buildHeaderExpand(licenseeReport)}
                        body={this.buildBodyExpand(licenseeReport, 'licensee')}
                        footer={this.renderFooterExpand(licenseeReport)}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                        shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                    />
                    :
                    <Table
                        width={width}
                        autoWidth={false}
                        header={this.buildHeader(licenseeReport)}
                        body={this.buildBody(licenseeReport, 'licensee')}
                        footer={this.renderFooter(licenseeReport)}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                        shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                    />
                }
            </div>
        );
    }

    render() {
        const {mainReports, gridParams} = this.props;
        if(mainReports === null){
            return null;
        }
        const fromDateFormat = DateTimeService.toShortDateFormat(gridParams.fromDate);
        const toFormat = DateTimeService.toShortDateFormat(gridParams.fromDate);        
        return (
            <div>
                {/* {this.renderDailyLogStatistic(fromDateFormat, toFormat)} */}
                {this.renderLicenseeDailyStatistic(fromDateFormat, toFormat)}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, mainReports } = state;
    return { gridParams, mainReports };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
