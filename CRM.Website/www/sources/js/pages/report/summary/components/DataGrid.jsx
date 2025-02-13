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
            isCollapseReport: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.gridData !== nextProps.gridData) {
            nextState.shouldResetScrollPosition = true;
            nextState.toggleRowReport = [];
            nextState.isCollapseReport = false;

        }
        if (this.state.toggleRowReport.length > 0) {
            nextState.shouldResetScrollPosition = false;
        }
        return true;
    }

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

    buildHeader = () => {
        const { months} = this.props.gridData;

        const headers = [];
        const cells = [];
        cells.push(<HeaderCell key="header" className='sticky-header' colWidth={60}>{LangHelper.getResource('Categories')}</HeaderCell>);
        months.map(item => {
            cells.push(<HeaderCell key={item} colWidth={12}>{item}</HeaderCell>);
        });
        headers.push(
            <HeaderRow key='group-header'>
                {cells}
            </HeaderRow>
        );
        return headers;
    };

    renderFooter = () => {
        const {grandTotals} = this.props.gridData;
        const cells = [];
        if(grandTotals.length > 0){
            cells.push(<Cell key="grandtotal">Grand Total</Cell>);
            grandTotals.map(item => {
                cells.push(<Cell className='right' key={item.month+'-footer'}>{item.amount}</Cell>);
            });
            return (
                [<Row key='footer' className='footer-container font-weight-bold'>
                    {cells}
                </Row>]
            );
        }
        return null;
    };

    buildBody = () => {
        const { categorySummaries } = this.props.gridData;

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

    renderSubCategoryRows = (parentId, sub) => {
        const toggle = this.state.toggleRowReport;
        if (!toggle.includes(parentId)) {
            const cells = [];
            cells.push(<Cell key={sub.name} className='child' style={{ width: 280, 'paddingLeft': 20 }}>{sub.name}</Cell>);
            sub.summaries.map(sumMonth => {
                cells.push(
                    <Cell key={sumMonth.month} className='complaints-text right'>
                        <span>{sumMonth.amount === 0 ? '' : sumMonth.amount}</span>
                    </Cell>
                );
            });
            return (
                <Row key={`child-${sub.id}`}>
                    {cells}
                </Row>
            );
        } else {
            return null;
        }
    };

    handleToggleRow = id => {
        const categories = this.state.toggleRowReport;
        const index = categories.indexOf(id);
        if (index >= 0) {
            categories.splice(index, 1);
        } else {
            categories.push(id);
        }

        this.setState({ categories });
    };

    getMaxWidth = totalWidth => document.getElementById('right-row-container').clientWidth < totalWidth ?
                                document.getElementById('right-row-container').clientWidth : totalWidth;

    handleShowChart = () => {
        this.props.setChartPopup({ show: true });
    };

    renderMainCategoryRows = item => {
        const rows = [];
        const cells = [];
        const toggles = this.state.toggleRowReport;

        cells.push(
            <Cell key={item.id+'icon'} className='complaints-text' >
                <span className={`expand-icon fa pr-2 ${!toggles.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{item.name}</span>
            </Cell>
        );
        item.summaries.map(sumMonth => {
            cells.push(
                <Cell key={sumMonth.month} className='complaints-text right'>
                    <span>{sumMonth.amount === 0 ? '' : sumMonth.amount}</span>
                </Cell>
            );
        });
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
        if(reportTitle === null || categorySummaries === null || grandTotals === null || months === null ){
            return null;
        }
        const defaultWidth = 400;
        const totalWidth = defaultWidth + months.length * 60;
        const maxWidth = document.getElementById('right-row-container').clientWidth;

        return (
            <div className='table'>
                <div style={{ width:totalWidth, maxWidth:maxWidth }} className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{reportTitle}</span>
                    {
                        categorySummaries.length > 0 && this.renderCustomButtonReport()
                    }
                </div>
                <Table
                    width={totalWidth}
                    autoWidth={false}
                    maxWidth={maxWidth}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    footer={this.renderFooter()}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);