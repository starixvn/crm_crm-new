import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { Policy } from '@jsroot/common/constants';
import { handleSort } from '@jsroot/common/shareScripts';

export class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.sortDesc = true;
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50} sortOrder='desc' sortBy='Subject'>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={25} sortOrder='desc' sortBy='Time'>{LangHelper.getResource('ClaimedTime')}</HeaderCell>
                <HeaderCell colWidth={20} sortOrder='desc' sortBy='Currency'>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={20} sortOrder='desc' sortBy='Amount'>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={25} sortOrder='desc' sortBy='DoneBy'>{LangHelper.getResource('DoneBy')}</HeaderCell>
                <HeaderCell colWidth={20} sortOrder='desc' sortBy='Status'>{LangHelper.getResource('Status')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { redemptionLogs } = this.props;

        if (redemptionLogs.length > 0) {
            return redemptionLogs.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={6}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    onSort = (sortBy, sortOrder) => {
        const { redemptionLogs } = this.props;
        const cloneGridData = [...redemptionLogs];

        const gridDataSortAsc = handleSort(cloneGridData, sortBy, sortOrder);
        this.props.setLogsByCustomerId(gridDataSortAsc);
    };

    handleEditRedemptionLog = id => {
        this.props.setEditRedemptionDialog({ show: true, logId: id });
    };

    handleCreateRedemptionLog = () => {
        this.props.setCreateRedemptionDialog({ show: true });
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className="text-left">
                    <span className='link-click' onClick={() => this.handleEditRedemptionLog(item.id)}>{item.subject}</span>
                </Cell>
                <Cell className="text-center">{DateTimeService.toShortDateFormat(item.claimTime)}</Cell>
                <Cell className='text-center'>{item.currency}</Cell>
                <Cell className='text-right'>{`${item.amount}.00`}</Cell>
                <Cell className='text-left'>{item.doneBy}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
            </Row>
        );
    };

    render() {
        const { redemptionLogs } = this.props;
        if (!redemptionLogs) {
            return null;
        }

        return (
            <div>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('CustomerRedemptionLogs')}</span>
                </div>
                <Table
                    width={1200}
                    autoWidth={false}
                    onSort={this.onSort}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    this.props.createUpdateFeedbackPermission === Policy.Host && (
                        <Button variant="primary" size="sm" className="mt-3" onClick={() => this.handleCreateRedemptionLog()}>
                            {LangHelper.getResource('InsertCase')}
                        </Button>
                    )
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { redemptionLogs } = state;
    return { redemptionLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
