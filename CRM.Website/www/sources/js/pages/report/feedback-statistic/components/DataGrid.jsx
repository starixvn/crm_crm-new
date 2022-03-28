import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleRow: [],
            isCollapse: false
        };
    }

    buildHeader = gridData => {
        const header = [];
        header.push(<HeaderCell colWidth={45}>{LangHelper.getResource('Subcategory')}</HeaderCell>);
        gridData.usernames.forEach(item =>{
            header.push(<HeaderCell colWidth={15}>{item.name}</HeaderCell>);
        });
        return (
            <HeaderRow>
                {header}
            </HeaderRow>
        );
    };

    buildBody = gridData => {
        const rows = [];
        if (gridData.feedbackCategories.length > 0) {
            rows.push(
                gridData.feedbackCategories.map((item, index) =>
                    this.renderMainCategoryRows(item, index))
                );
            return rows;
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center'>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleToggleRow = id => {
        const {toggleRow} = this.state;
        const index = toggleRow.indexOf(id);
        if (index >= 0) {
            toggleRow.splice(index, 1);
        } else {
            toggleRow.push(id);
        }

        this.setState({ toggleRow });
    };

    renderMainCategoryRows = (item, index) => {
        const rows = [];
        const cells = [];
        const cellsSubTotal = [];
        const {toggleRow} = this.state;
        cells.push(
            <Cell className='subcategory'>
                <span className={`expand-icon fa pr-2 ${!toggleRow.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{`${item.name} - ${item.feedbackSubcategories.length} item(s)`}</span>
            </Cell>
        );
        this.props.gridData.usernames.forEach(() =>{
            cells.push(
                <Cell className='subcategory' />
            );
        });
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0' onClick={() => this.handleToggleRow(item.id)}>
                {cells}
            </Row>
        );
        if(item.feedbackSubcategories.length > 0){
            rows.push(
                item.feedbackSubcategories.map(sub => this.renderSubCategoryRows(item.id, sub))
            );
            if(!toggleRow.includes(item.id)){
                cellsSubTotal.push(
                    <Cell className='child sub-total pl-4'>{`Sub Total ${item.subTotal.total}`}</Cell>
                );
                item.subTotal.resolves.forEach((count, index) =>{
                    cellsSubTotal.push(
                        <Cell key={`sub-total-count-${index}`} 
                            className='child link-click cursor-pointer text-center'
                            onClick={() => this.handleOpenFeedbackDetail()}
                        >
                            {count}
                        </Cell>
                    );
                });
                rows.push(
                <Row key={`sub-total-${index}`}>
                    {cellsSubTotal}
                </Row>);
            }
        }
        return rows;
    };

    renderSubCategoryRows = (parentId, sub) => {
        const {toggleRow} = this.state;
        const rows = [];

        if(!toggleRow.includes(parentId)){
            const cells = [];
            cells.push(<Cell key={`sub-${sub.id}`} className='child pl-4'>{sub.name}</Cell>);
            sub.resolves.forEach((count, index) =>{
                cells.push(<Cell key={`count-${index}`} className='child text-center'>{count}</Cell>);
            });
            rows.push(
                <Row key={`child-${sub.id}`}>
                    {cells}
                </Row>
            );
            return rows;
        } else {
            return null;
        }
    };

    renderFooter = gridData => {
        const cells = [];
        cells.push(<Cell>Grand Total</Cell>);
        gridData.grandTotals.forEach(item =>{
            cells.push(<Cell className='text-center'>{item}</Cell>);
        });
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    handleShowDetails = () => {
        const params = {...this.props.gridParams, valueId: -1, mainCategoryId: 0, subCategoryId: 0};
        this.props.setOpenDetailPopup({show: true});
        this.props.getDetails(params);
        this.props.setGridParamDetails(params);
    };

    handleExportExcel = tableName => {
        const siteType = tableName === 'mbc' ? 0 : 1;
        const params = {...this.props.gridParams, ...{siteType:siteType}};
        this.props.exportExcel(params);
    };

    handleViewChart = gridData =>{
        this.props.setOpenChartPopup({show: true, chartInfo: gridData});
    };

    handleCollapseExpand = () =>{
        const {toggleRow, isCollapse} = this.state;
        if(!isCollapse){
            this.props.gridData.feedbackCategories.forEach(main => {
                if(toggleRow.indexOf(main) < 0){
                    toggleRow.push(main.id);
                }
            });
            this.setState(prevState => ({
                toggleRow,
                isCollapse: !prevState.isCollapse
            }));
        } else{
            this.setState(prevState => ({
                toggleRow: [],
                isCollapse: !prevState.isCollapse
            }));
        }
    };

    renderCustomButton= () => {
        const {gridData} = this.props;
        return (
            <div>
                {
                    gridData.usernames.length > 0 &&
                    <OverlayTrigger
                        overlay={
                            <Tooltip><span>View Chart</span></Tooltip>
                        }
                        placement="auto"
                    >
                        <span className="fa fa-bar-chart icon pl-3 cursor-pointer" onClick={() => this.handleViewChart(gridData)} />
                    </OverlayTrigger>
                }
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Show Details</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-info-circle icon pl-3 fa-lg cursor-pointer" onClick={() => this.handleShowDetails()} />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Collapse/Expand</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-expand icon pl-3 cursor-pointer" onClick={this.handleCollapseExpand} />
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

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getGridFeedbacks(params);
        this.props.setGridParams(params);
    };

    render() {
        const {gridData, gridParams} = this.props;
        if(gridData === null){
            return null;
        }
        const { pageIndex, pageSize } = gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridData.totalItems,
            PageList: PAGING_SIZES
        };

        const defaultWidth = 420;
        const totalWidth = defaultWidth + gridData.usernames.length * 155;
        return (
            <div style={{width: totalWidth}}>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{gridData.title}</span>
                    {
                        gridData.feedbackCategories.length > 0 && this.renderCustomButton()
                    }
                </div>
                <Table
                    width={totalWidth}
                    autoWidth={false}
                    header={this.buildHeader(gridData)}
                    body={this.buildBody(gridData)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    footer={this.renderFooter(gridData)}
                    containerPadding={0}
                    adjustedHeight={10}
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
