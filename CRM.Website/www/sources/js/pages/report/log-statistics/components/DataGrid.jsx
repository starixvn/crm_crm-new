import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import ChildRow from './ChildRow';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldResetScrollPosition: true,
            toggleRowDaily: [],
            toggleRowLicensee: [],
            isCollapseDaily: false,
            isCollapseLicensee: false,
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

    renderHeaderCellsCommunications = communicationColumns => {
        const headerCells = [];
        communicationColumns.map(item => {
            headerCells.push(<HeaderCell colWidth={12}>{item.name}</HeaderCell>);
        });
        headerCells.push(<HeaderCell colWidth={12}>{LangHelper.getResource('Total')}</HeaderCell>);
        return headerCells;
    };

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

    getToggleRows = tableName => tableName === 'mbc' ? this.state.toggleRowDaily : this.state.toggleRowLicensee;

    handleToggleRow = (id, tableName) => {
        const toggleName = this.getToggleRows(tableName);
        const index = toggleName.indexOf(id);
        if (index >= 0) {
            toggleName.splice(index, 1);
        } else {
            toggleName.push(id);
        }

        this.setState({ toggleName });
    };

    renderMainCategoryRows = (item, communicationColumns, tableName) => {
        const rows = [];
        const cells = [];
        const toggles = this.getToggleRows(tableName);
        cells.push(
            <Cell className='complaints-text'>
                <span className={`expand-icon fa pr-2 ${!toggles.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{item.name}</span>
            </Cell>
        );
        cells.push(<ChildRow isParent currentRow={item} communicationColumns={communicationColumns} />);
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0' onClick={() => this.handleToggleRow(item.id, tableName)}>
                {cells}
            </Row>
        );
        if (item.subCategories.length > 0) {
            rows.push(
                item.subCategories.map(sub => this.renderSubCategoryRows(item.id, sub, communicationColumns, tableName))
            );
        }
        return rows;
    };

    renderSubCategoryRows = (parentId, sub, communicationColumns, tableName) => {
        const toggle = this.getToggleRows(tableName);
        if (!toggle.includes(parentId)) {
            const cells = [];
            cells.push(<Cell className='child'>{sub.name}</Cell>);
            cells.push(<ChildRow currentRow={sub} communicationColumns={communicationColumns} />);
            return (
                <Row key={`child-${sub.id}`}>
                    {cells}
                </Row>
            );
        } else {
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
        cells.push(<ChildRow currentRow={grandTotal} communicationColumns={data.communicationColumns} />);
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    getTitle = tableName => {
        const { gridParams } = this.props;
        const fromDateFormat = DateTimeService.toShortDateFormat(gridParams.fromDate);
        const toFormat = DateTimeService.toShortDateFormat(gridParams.toDate);
        const title = tableName === 'mbc' ?
            `Credit Daily Log Statistics | ${fromDateFormat} - ${toFormat}` :
            `Licensee Daily Log Statistics | ${fromDateFormat} - ${toFormat}`;
        return title;
    };

    getTitleDetail = tableName => {
        const { gridParams } = this.props;
        const fromDateFormat = DateTimeService.toShortDateFormat(gridParams.fromDate);
        const toFormat = DateTimeService.toShortDateFormat(gridParams.toDate);
        const title = tableName === 'mbc' ?
            `Credit Daily Customer Complaints/Enquiries From ${fromDateFormat} To ${toFormat}` :
            `Licensee Daily Customer Complaints/Enquiries From ${fromDateFormat} To ${toFormat}`;
        return title;
    };

    handleShowDetails = tableName => {
        const siteType = tableName === 'mbc' ? 0 : 1;
        const title = this.getTitleDetail(tableName);
        const params = { ...this.props.gridParams, siteType: siteType, pageIndex: 1, pageSize: 100 };
        this.props.setDetailsDataGrid({ show: true, title: title });
        this.props.setGridParamDetails(params);
        this.props.getReportDetails(params);
    };

    handleExportExcel = tableName => {
        const siteType = tableName === 'mbc' ? 0 : 1;
        const params = { ...this.props.gridParams, ...{ siteType: siteType } };
        this.props.exportExcel(params);
    };

    handleViewChart = tableName => {
        const data = tableName === 'mbc' ? this.props.mainReports.ibcReport : this.props.mainReports.licenseeReport;
        const title = this.getTitle(tableName);
        this.props.setChartData({ show: true, title: title, data: data });
    };

    handleCollapseExpandLicensee = () => {
        const { toggleRowLicensee, isCollapseLicensee } = this.state;
        if (!isCollapseLicensee) {
            this.props.mainReports.licenseeReport.mainCategories.forEach(main => {
                if (toggleRowLicensee.indexOf(main) < 0) {
                    toggleRowLicensee.push(main.id);
                }
            });
            this.setState(prevState => ({
                toggleRowLicensee,
                isCollapseLicensee: !prevState.isCollapseLicensee
            }));
        } else {
            this.setState(prevState => ({
                toggleRowLicensee: [],
                isCollapseLicensee: !prevState.isCollapseLicensee
            }));
        }
    };

    handleCollapseExpandDaily = () => {
        const { toggleRowDaily, isCollapseDaily } = this.state;
        if (!isCollapseDaily) {
            this.props.mainReports.ibcReport.mainCategories.forEach(main => {
                if (toggleRowDaily.indexOf(main) < 0) {
                    toggleRowDaily.push(main.id);
                }
            });
            this.setState(prevState => ({
                toggleRowDaily,
                isCollapseDaily: !prevState.isCollapseDaily
            }));
        } else {
            this.setState(prevState => ({
                toggleRowDaily: [],
                isCollapseDaily: !prevState.isCollapseDaily
            }));
        }
    };

    renderCustomButtonLicensee = () => {
        return (
            <div>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip><span>View Chart</span></Tooltip>}
                >
                    <span className="pl-3 fa fa-bar-chart icon" onClick={() => this.handleViewChart('licensee')} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip><span>Show Details</span></Tooltip>}
                >
                    <span className="pl-3 fa fa-info-circle icon fa-lg" onClick={() => this.handleShowDetails('licensee')} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip><span>Collapse/Expand</span></Tooltip>}
                >
                    <span className="pl-3 fa fa-expand icon" onClick={this.handleCollapseExpandLicensee} />
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={<Tooltip><span>Export to Excel</span></Tooltip>}
                >
                    <span className="pl-3 fa fa-file-excel-o icon-excel" onClick={() => this.handleExportExcel('licensee')} />
                </OverlayTrigger>
            </div>
        );
    };

    renderCustomButtonDailyLog = () => {
        return (
            <div>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>View Chart</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-bar-chart icon pl-3" onClick={() => this.handleViewChart('mbc')} />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Show Details</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-info-circle icon pl-3 fa-lg" onClick={() => this.handleShowDetails('mbc')} />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Collapse/Expand</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-expand icon pl-3" onClick={this.handleCollapseExpandDaily} />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Export to Excel</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-file-excel-o icon-excel pl-3" onClick={() => this.handleExportExcel('mbc')} />
                </OverlayTrigger>
            </div>
        );
    };

    renderTitle = (gridData, fromDateFormat, toFormat) => {
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                <span>{`Credit Daily Log Statistics | ${fromDateFormat}-${toFormat}`}</span>
                {
                    gridData.length > 0 && this.renderCustomButtonDailyLog()
                }
            </div>
        );
    };

    renderTitleLicensee = (licenseeReport, fromDateFormat, toFormat) => {
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                <span>{`Licensee Daily Log Statistics | ${fromDateFormat}-${toFormat}`}</span>
                {
                    licenseeReport.length > 0 && this.renderCustomButtonLicensee()
                }
            </div>
        );
    };

    renderDailyLogStatistic = (fromDateFormat, toFormat) => {
        const { ibcReport, licenseeType } = this.props.mainReports;
        const defaultWidth = 400;
        const totalWidth = defaultWidth + ibcReport.communicationColumns.length * 115;
        const maxWidth = this.getMaxWidth(totalWidth);
        const className = licenseeType === 0 ? 'table-mbc' : 'table-mbc single-table';
        return (
            <div className={className}>
                <Table
                    maxWidth={maxWidth}
                    shouldUseMaxWidth
                    width={totalWidth}
                    autoWidth={false}
                    title={this.renderTitle(ibcReport.mainCategories, fromDateFormat, toFormat)}
                    header={this.buildHeader(ibcReport)}
                    body={this.buildBody(ibcReport, 'mbc')}
                    footer={this.renderFooter(ibcReport)}
                    isFixColumn
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                />
            </div>
        );
    };

    getMaxWidth = totalWidth => document.getElementById('right-row-container').clientWidth < totalWidth ?
        document.getElementById('right-row-container').clientWidth : totalWidth;

    renderLicenseeDailyStatistic = (fromDateFormat, toFormat) => {
        const { licenseeReport, licenseeType } = this.props.mainReports;
        const defaultWidth = 400;
        const totalWidth = defaultWidth + licenseeReport.communicationColumns.length * 115;
        const maxWidth = this.getMaxWidth(totalWidth);
        const className = licenseeType === 0 ? 'table-licensee' : 'table-licensee single-table';
        return (
            <div className={className}>
                {
                    <Table
                        maxWidth={maxWidth}
                        shouldUseMaxWidth
                        width={totalWidth}
                        autoWidth={false}
                        title={this.renderTitleLicensee(licenseeReport.mainCategories, fromDateFormat, toFormat)}
                        header={this.buildHeader(licenseeReport)}
                        body={this.buildBody(licenseeReport, 'licensee')}
                        footer={this.renderFooter(licenseeReport)}
                        isFixColumn
                        containerPadding={0}
                        adjustedHeight={10}
                        shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                    />
                }
            </div>
        );
    };

    noPermissionOnBothCreditAndLicenseeHandler = () => {
        const { mainReports } = this.props;
        const isShowCreditReport = mainReports.licenseeType === 0 || mainReports.licenseeType === 1;
        const isShowLicenseeReport = mainReports.licenseeType === 0 || mainReports.licenseeType === 2;

        if (!isShowCreditReport && !isShowLicenseeReport) {
            toast.error(LangHelper.getResource('NoPermissionOnCreditOrLicensee'));
            return null;
        }
    }

    render() {
        const { mainReports, gridParams } = this.props;
        if (mainReports === null) {
            return null;
        }

        const fromDateFormat = DateTimeService.toShortDateFormat(gridParams.fromDate);
        const toFormat = DateTimeService.toShortDateFormat(gridParams.toDate);
        const isShowCreditReport = mainReports.licenseeType === 0 || mainReports.licenseeType === 1;
        const isShowLicenseeReport = mainReports.licenseeType === 0 || mainReports.licenseeType === 2;
        return (
            <div>
                {
                    isShowCreditReport &&
                    this.renderDailyLogStatistic(fromDateFormat, toFormat)
                }
                {
                    isShowLicenseeReport &&
                    this.renderLicenseeDailyStatistic(fromDateFormat, toFormat)
                }
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