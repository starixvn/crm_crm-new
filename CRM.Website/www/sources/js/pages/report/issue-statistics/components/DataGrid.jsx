import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { SMALL_PAGING_SIZES } from '@jsroot/common/constants';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    buildHeader = countryArr => {
        const header = [];
        header.push(<HeaderCell colWidth={12}>{LangHelper.getResource('Date')}</HeaderCell>);
        header.push(<HeaderCell colWidth={12}>{LangHelper.getResource('Time')}</HeaderCell>);
        countryArr.map(item =>{
            header.push(<HeaderCell colWidth={10}>{item.name}</HeaderCell>);
        });
        header.push(<HeaderCell colWidth={10}>{LangHelper.getResource('Total')}</HeaderCell>);
        return (
            <HeaderRow>
                {header}
            </HeaderRow>
        );
    };

    buildBody = (gridData, countryArr) => {
        if (gridData.childReports.length > 0) {
            return gridData.childReports.map((item, index) => this.renderRow(item, index, countryArr));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    getCountriesArray = data =>{
        const countries = [];
        data.total.childReports.forEach(item =>{
            countries.push(item.countryInfo);
        });
        return countries;
    };

    renderRow = (item, index, countryArr) => {
        const timeReport = item.childReports;
        const countries = timeReport[0].childReports;
        const total = item.total;
        const cells = [];
        const cellsTotal = [];
        cells.push(<Cell className='text-center fix-first-column' rowSpan={item.childReports.length}>{item.shortName}</Cell>);
        cells.push(<Cell className='text-center fix-second-column'>{timeReport[0].shortName}</Cell>);

        cellsTotal.push(<Cell className='fix-first-column'>{total.shortName}</Cell>);
        cellsTotal.push(<Cell className='fix-second-column'/>);
        countryArr.forEach((item, index) =>{
            cells.push(
                <Cell key={`${item.name}-${index}`} className='text-center'>
                    {countries[index].numberOfIssues > 0 ? countries[index].numberOfIssues : ''}
                </Cell>
            );

            cellsTotal.push(
                <Cell className='text-center'>
                    {total.childReports[index].numberOfIssues}
                </Cell>
            );
        });
        cells.push(<Cell className='text-center'>{timeReport[0].numberOfIssues}</Cell>);
        cellsTotal.push(<Cell className='text-center'>{total.numberOfIssues}</Cell>);

        return (
            <Fragment>
                <Row key={index}  className='height-row'>
                   {cells}
                </Row>
                {
                    item.childReports.length > 1 &&
                    item.childReports.slice(1).map((ele, key) => (
                        <Row key={`country-${key}`} className='height-row'>
                            <Cell className='text-center fix-second-column'>{ele.shortName}</Cell>
                            {
                                ele.childReports.map((child, index) =>(
                                    <Cell key={`${child.name}-${index}`}className='text-center'>{child.numberOfIssues > 0 ? child.numberOfIssues : ''}</Cell>
                                ))
                            }
                            <Cell className='text-center'>{ele.numberOfIssues}</Cell>
                        </Row>
                    ))
                }
                <Row className='total-row height-row' key={`total-${index}`}>
                    {cellsTotal}
                </Row>
            </Fragment>
        );
    };

    renderFooter = gridData => {
        if(gridData.total.numberOfIssues > 0){
            const cells = [];
            cells.push(<Cell className='fix-first-column'>Grand Total</Cell>);
            cells.push(<Cell className='fix-second-column'/>);
            gridData.total.childReports.forEach(item =>{
                cells.push(<Cell className='text-center'>{item.numberOfIssues}</Cell>);
            });
            cells.push(<Cell className='text-center'>{gridData.total.numberOfIssues}</Cell>);
            return (
                [<Row key='footer' className='footer-container font-weight-bold'>
                   {cells}
                </Row>]
            );
        }
        return null;
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    renderTitle = gridData =>{
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                <span>{gridData.name}</span>
                {
                    gridData.childReports.length > 0 &&
                    <div className="tool-box">
                        <span className="fa fa-bar-chart mr-3 btn-chart" onClick={
                            () => this.props.setChartData({show: true, chartInfo: this.props.gridData})}
                        />
                        <span className="fa fa-file-excel-o btn-export-excel icon-excel" onClick={this.handleExportExcel} />
                    </div>
                }
            </div>
        );
    };

    isPagingCheck = () => this.props.gridParams.reportType === 1 ? true : false;

    render() {
        const { gridData } = this.props;
        if(!gridData){
            return null;
        }
        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridData.totalChildReports,
            PageList: SMALL_PAGING_SIZES
        };

        const defaultWidth = 510;
        const countryArr = this.getCountriesArray(gridData);
        const countriesWidth = countryArr.length * 90;
        const totalWidth = defaultWidth + countriesWidth;
        const clientWidth = document.getElementById('right-row-container').clientWidth;
        const width =  clientWidth < totalWidth ? clientWidth : totalWidth;
        return (
            <Fragment>
                <Table
                    maxWidth={totalWidth}
                    shouldUseMaxWidth
                    width={width}
                    autoWidth={false}
                    title={this.renderTitle(gridData)}
                    header={this.buildHeader(countryArr)}
                    body={this.buildBody(gridData, countryArr)}
                    footer={this.renderFooter(gridData)}
                    isFixColumn
                    isPaging = {this.isPagingCheck()}
                    fixColumns={[0]}
                    widthFixColumns = {[147]}
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
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
