import React, {Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    handleExportExcel = () => {
        const params = { ...this.props.gridParams };
        this.props.exportExcel(params);
    };

    renderCustomButtonReport = () => {
        return (
            <div>
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

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={18}>{LangHelper.getResource('Month')}</HeaderCell>
                <HeaderCell colWidth={18}>{LangHelper.getResource('Country')}</HeaderCell>
                <HeaderCell colWidth={18}>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={18}>{LangHelper.getResource('Total')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { wagerByMonths } = this.props.gridData;
        if (wagerByMonths.length > 0) {
            return [
                <Fragment key={'body'}>
                    {wagerByMonths.map(item => this.renderRow(item))}
                </Fragment>
            ];
        }
        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={4}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = report => {
        return report.wagers.map((item, index) => {
            if (index === 0) {
                return (
                    <Row key={item.id + report.month}>
                        <Cell className="text-center text-bold" rowSpan={report.wagers.length}>{report.month}</Cell>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.amount}</Cell>
                        <Cell className="text-right text-bold" rowSpan={report.wagers.length}>{report.total}</Cell>
                    </Row>
                );
            } else {
                return (
                    <Row key={item.name +report.month}>
                        <Cell>{item.name}</Cell>
                        <Cell className="text-right">{item.amount}</Cell>
                    </Row>
                );
            }
        });
    };

    renderFooter = total => {
        if(total.total>0){
            return total.wagers.map((item, index) => {
                if (index === 0) {
                    return (
                        <Row className="last-row" key={item.id + item.name}>
                            <Cell className="text-center" rowSpan={total.wagers.length}>{total.month}</Cell>
                            <Cell>{item.name}</Cell>
                            <Cell className="text-right">{item.amount}</Cell>
                            <Cell className="text-right" rowSpan={total.wagers.length}>{total.total}</Cell>
                        </Row>
                    );
                } else {
                    return (
                        <Row className="last-row" key={item.id + item.name}>
                            <Cell>{item.name}</Cell>
                            <Cell className="text-right">{item.amount}</Cell>
                        </Row>
                    );
                }
            });
        }        
    };

    render() {
        const { grandTotal, reportTitle, wagerByMonths} = this.props.gridData;
        if(grandTotal === null || reportTitle === null || wagerByMonths === null ){
            return null;
        }

        return (
            <div className='table'>
                <div style={{ width:800 }} className='table-title d-flex justify-content-between align-items-center'>
                    <span>{reportTitle}</span>
                    {
                        wagerByMonths.length > 0 && this.renderCustomButtonReport()
                    }
                </div>
                <Table
                    width={800}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    footer={this.renderFooter(grandTotal)}
                    isPaging={false}
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