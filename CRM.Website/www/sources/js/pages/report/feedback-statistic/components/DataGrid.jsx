import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.styleCLick = 'link-click cursor-pointer';
        this.styleDisableCLick= 'disable-click';
        this.state = {
            shouldResetScrollPosition: true,
            toggleRow: [],
            isCollapse: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.gridData !== nextProps.gridData) {
            nextState.shouldResetScrollPosition = true;
            nextState.toggleRow = [];
            nextState.isCollapse = false;

        }
        if (this.state.toggleRow.length > 0) {
            nextState.shouldResetScrollPosition = false;
        }
        return true;
    }

    buildHeader = gridData => {
        const header = [];
        header.push(<HeaderCell className='sticky-header' colWidth={45}>{LangHelper.getResource('Subcategory')}</HeaderCell>);
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
            <Row className="no-data" >
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
        const usernames = this.props.gridData.usernames;
        cells.push(
            <Cell key={`subcategory-${index}`} className='subcategory first-column'>
                <span className={`expand-icon fa pr-2 ${!toggleRow.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                <span >{`${item.name} - ${item.feedbackSubcategories.length} item(s)`}</span>
            </Cell>
        );
        usernames.forEach(username =>{
            cells.push(
                <Cell key={`subcategory-userName-${username.id}`} className='subcategory' />
            );
        });
        rows.push(
            <Row key={`parent-${item.id}`} className='parent-level-0' onClick={() => this.handleToggleRow(item.id)}>
                {cells}
            </Row>
        );
        if(item.feedbackSubcategories.length > 0){
            rows.push(
                item.feedbackSubcategories.map(sub => this.renderSubCategoryRows(item.id, sub, usernames))
            );
            if(!toggleRow.includes(item.id)){
                cellsSubTotal.push(
                    <Cell key={`sub-total-${item.id}`} className='child sub-total pl-4 first-column'>{`Sub Total (${item.subTotal.total})`}</Cell>
                );
                item.subTotal.resolves.forEach((count, index) =>{
                    cellsSubTotal.push(
                        <Cell key={`sub-total-count-${index}`}
                            className={`child ${count > 0 ? this.styleCLick : 'disable-click-subtotal' } text-center`}
                            onClick={() => this.handleShowDetails(usernames[index].id, item.id, 0)}
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

    renderSubCategoryRows = (parentId, sub, usernames) => {
        const {toggleRow} = this.state;
        const rows = [];

        if(!toggleRow.includes(parentId)){
            const cells = [];
            cells.push(<Cell key={`sub-${sub.id}`} className='child pl-4'>{`${sub.name} (${sub.total})`}</Cell>);
            sub.resolves.forEach((count, index) =>{
                cells.push(
                    <Cell key={`count-${index}`}
                        className={`child ${count > 0 ? this.styleCLick : this.styleDisableCLick } text-center`}
                        onClick={() => this.handleShowDetails(usernames[index].id, parentId, sub.id)}
                    >{count}</Cell>);
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
        cells.push(<Cell className = 'first-column'>Grand Total</Cell>);
        gridData.grandTotals.forEach((item,index) =>{
            cells.push(
            <Cell key={`grand-total-${index}`} className={`${item > 0 ? this.styleCLick : this.styleDisableCLick } text-center`}
                onClick={() => this.handleShowDetails(gridData.usernames[index].id,0,0)}
            >
                {item}
            </Cell>);
        });
        return (
            [<Row key='footer' className='footer-container font-weight-bold'>
                {cells}
            </Row>]
        );
    };

    handleShowDetails = (valueId = -1, mainCategoryId = 0, subCategoryId = 0) => {
        const params = {...this.props.gridParams, valueId: valueId, mainCategoryId: mainCategoryId, subCategoryId: subCategoryId};
        this.props.setOpenDetailPopup({show: true});
        this.props.getDetails(params);
        this.props.setGridParamDetails(params);
    };

    handleExportExcel = () => {
        this.props.exportExcel(this.props.gridParams);
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
        this.props.getGridData(params);
        this.props.setGridParams(params);
    };

    getWidth = totalWidth => document.getElementById('right-row-container').clientWidth < totalWidth ?
                                document.getElementById('right-row-container').clientWidth : totalWidth;

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

        const defaultWidth = 400;
        const totalWidth = defaultWidth + gridData.usernames.length * 120;
        const width = this.getWidth(totalWidth) + 20;

        return (
            <div style={{maxWidth:width}}>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{gridData.title}</span>
                    {
                        gridData.feedbackCategories.length > 0 && this.renderCustomButton()
                    }
                </div>
                <Table
                    maxWidth={totalWidth}
                    autoWidth={false}
                    isFixColumn
                    width={width}
                    shouldUseMaxWidth
                    header={this.buildHeader(gridData)}
                    body={this.buildBody(gridData)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    footer={this.renderFooter(gridData)}
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
