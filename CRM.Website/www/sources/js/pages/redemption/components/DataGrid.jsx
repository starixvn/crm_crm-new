import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { Policy } from '@jsroot/common/constants';

export class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.sortDesc = true;
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Subject')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('subject')}/>
                </HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('ClaimedTime')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('claimTime')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Currency')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('currency')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Amount')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('amount')}/>
                </HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('DoneBy')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('doneBy')}/>
                </HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}
                    <i className="fa fa-sort sort-header" aria-hidden="true" onClick={() => this.handleSort('status')}/>
                </HeaderCell>
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

    isSortEqual = (itemX, itemY) => {
        if ( itemX === itemY ) {
            return 0;
        } else {
            return -1;
        }
    };

    handleSort = item => {
        const { redemptionLogs } = this.props;
        let sortData = [];
        if (this.sortDesc) {
            sortData = [...redemptionLogs].sort((a, b) => a[item] > b[item] ? 1 : this.isSortEqual(a[item], b[item]));
        } else {
            sortData = [...redemptionLogs].sort((a, b) => a[item] < b[item] ? 1 : this.isSortEqual(a[item], b[item]));
        }
        this.sortDesc = !this.sortDesc;
        this.props.setLogsByCustomerId(sortData);
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
                    width={1400}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    window.customerInfoPolicy === Policy.Host && (
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
