import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldResetScrollPosition: true,
            toggleRowReport: [],
            isCollapseReport: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.gridData !== nextProps.gridData) {
            nextState.shouldResetScrollPosition = true;
            nextState.toggleRowReport = [];
        }
        if (this.state.toggleRowReport.length > 0) {
            nextState.shouldResetScrollPosition = false;
        }
        return true;
    }

    calculateWidth = monthColumns => {
        const columnsWidth = [12, 12];
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
                    <span className="fa fa-bar-chart icon pl-3" onClick={this.handleShowChart} />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Collapse/Expand</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-expand icon pl-3" onClick={this.handleCollapseExpandReport} />
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

    handleCollapseExpandReport = () => {
        const { toggleRowReport, isCollapseReport } = this.state;
        if (!isCollapseReport) {
            this.props.gridData.categorySummaries.forEach(main => {
                if (toggleRowReport.indexOf(main) < 0) {
                    toggleRowReport.push(main.id);
                }
            });
            this.setState(prevState => ({
                toggleRowReport,
                isCollapseReport: !prevState.isCollapseReport
            }));
        } else {
            this.setState(prevState => ({
                toggleRowReport: [],
                isCollapseReport: !prevState.isCollapseReport
            }));
        }
    };

    handleExportExcel = () => {
        const params = { ...this.props.gridParams };
        this.props.exportExcel(params);
    };

    buildHeader = months => {
        const headers = [];
        const cells = [];
        cells.push(<HeaderCell className='sticky-header' colWidth={60}>{LangHelper.getResource('Categories')}</HeaderCell>);
        months.map(item => {
            cells.push(<HeaderCell key={item} colWidth={17}>{item}</HeaderCell>);
        });
        headers.push(
            <HeaderRow key='group-header'>
                {cells}
            </HeaderRow>
        );
        return headers;
    };

    renderFooter = data => {
        const cells = [];
        cells.push(<Cell>Grand Total</Cell>);
        data.map(item => {
            cells.push(<Cell className='right' key={item}>{item.amount}</Cell>);
        });
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    buildBody = (categorySummaries) => {
        const rows = [];
        rows.push(
            categorySummaries.map(item =>
                this.renderMainCategoryRows(item))
        );
        return rows;
    };

    renderSubCategoryRows = (parentId, sub) => {
        const toggle = this.state.toggleRowReport
        if (!toggle.includes(parentId)) {
            const cells = [];
            cells.push(<Cell className='child' style={{ width: 280, 'paddingLeft': 20 }}>{sub.name}</Cell>);
            sub.summaries.map(sumMonth => {
                cells.push(
                    <Cell key={sumMonth.month} className='complaints-text right'>
                        <span>{sumMonth.amount === 0 ? "" : sumMonth.amount}</span>
                    </Cell>
                );
            })
            return (
                <Row key={`child-${sub.id}`}>
                    {cells}
                </Row>
            );
        } else {
            return null;
        }
    };

    handleToggleRow = (id) => {
        const toggleName = this.state.toggleRowReport;
        const index = toggleName.indexOf(id);
        if (index >= 0) {
            toggleName.splice(index, 1);
        } else {
            toggleName.push(id);
        }

        this.setState({ toggleName });
    };

    handleShowChart = () => {
        this.props.setChartPopup({ show: true });
    };

    renderMainCategoryRows = (item) => {
        const rows = [];
        const cells = [];
        const toggles = this.state.toggleRowReport;

        cells.push(
            <Cell className='complaints-text' >
                <span className={`expand-icon fa pr-2 ${!toggles.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{item.name}</span>
            </Cell>
        );
        item.summaries.map(sumMonth => {
            cells.push(
                <Cell key={sumMonth.month} className='complaints-text right'>
                    <span>{sumMonth.amount === 0 ? "" : sumMonth.amount}</span>
                </Cell>
            );
        })
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0' onClick={() => this.handleToggleRow(item.id)}>
                {cells}
            </Row>
        );
        if (item.subCategories.length > 0) {
            rows.push(
                item.subCategories.map(sub => this.renderSubCategoryRows(item.id, sub))
            );
        }
        return rows;
    };

    render() {
        const { categorySummaries, grandTotals, months, reportTitle } = this.props.gridData;
        const width = this.calculateWidth(months);

        if (categorySummaries.length === 0) {
            return null;
        }

        return (
            <div className='table-mbc'>
                <div style={{ maxWidth: width, minWidth: 350 }} className='table-title d-flex justify-content-between align-items-center'>
                    <span>{reportTitle}</span>
                    {
                        categorySummaries.length > 0 && this.renderCustomButtonReport()
                    }
                </div>
                <Table
                    width={width}
                    minWidth={350}
                    autoWidth={false}
                    header={this.buildHeader(months)}
                    body={this.buildBody(categorySummaries)}
                    footer={this.renderFooter(grandTotals)}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
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