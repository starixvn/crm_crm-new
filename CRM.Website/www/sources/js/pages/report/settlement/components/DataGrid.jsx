import LangHelper from '@jsroot/common/langHelper';
import { Cell, HeaderCell, HeaderRow, Row, Table } from '@jsroot/components/react-grid/index';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleShowChart = () => {
        this.props.setChartPopup({ show: true });
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Month')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Country')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Total')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { childReports } = this.props.gridData;
        if (childReports.length > 0) {
            return [
                <Fragment key={'body'}>
                    {childReports.map(item => this.renderRow(item))}
                </Fragment>
            ];
        }
        return [<Row key={'body'} className="no-data"><Cell colSpan="4">{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = report => {
        return report.childReports.map((item, index) => {
            if (index === 0) {
                return (
                    <Row key={item.id}>
                        <Cell className="text-center" rowSpan={report.childReports.length}>{report.name}</Cell>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.numberOfIssues}</Cell>
                        <Cell className="text-center" rowSpan={report.childReports.length}>{report.numberOfIssues}</Cell>
                    </Row>
                );
            } else {
                return (
                    <Row key={item.name}>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.numberOfIssues}</Cell>
                    </Row>
                );
            }
        });
    };

    renderFooter = total => {
        return total.childReports.map((item, index) => {
            if (index === 0) {
                return (
                    <Row className="last-row" key={item.id}>
                        <Cell className="text-center" rowSpan={total.totalChildReports}>{total.name}</Cell>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.numberOfIssues}</Cell>
                        <Cell className="text-center" rowSpan={total.totalChildReports}>{total.numberOfIssues}</Cell>
                    </Row>
                );
            } else {
                return (
                    <Row className="last-row" key={item.id}>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.numberOfIssues}</Cell>
                    </Row>
                );
            }
        });
    };

    render() {
        const { gridData } = this.props;
        if (!gridData || !gridData.childReports) {
            return null;
        }

        const { totalChildReports } = gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalChildReports,
            PageList: [3, 6, 9, 12]
        };

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{gridData.name}</span>
                    {
                        gridData.childReports.length > 0 &&
                        <div className="tool-box">
                            <span className="fa fa-bar-chart mr-3 btn-chart" onClick={this.handleShowChart} />
                            <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel} />
                        </div>
                    }
                </div>
                <Table
                    width={700}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    footer={this.renderFooter(this.props.gridData.total)}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);