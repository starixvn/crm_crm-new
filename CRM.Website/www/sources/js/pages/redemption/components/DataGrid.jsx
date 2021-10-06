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

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('ClaimedTime')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('DoneBy')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData } = this.props;

        if (gridData.length > 0) {
            return gridData.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={6}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    handleEditRedemptionLog = id => {
        this.props.setEditRedemptionDialog({ show: true, logId: id });
    };

    handleInsertRedemptionLog = () => {
        this.props.setInsertRedemptionDialog({ show: true });
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className="text-center">
                    <span className='link-click' onClick={() => this.handleEditRedemptionLog(item.id)}>{item.subject}</span>
                </Cell>
                <Cell className="text-center">{DateTimeService.toShortDateFormat(item.claimTime)}</Cell>
                <Cell className='text-center'>{item.currency}</Cell>
                <Cell className='text-center'>{`${item.amount}.00`}</Cell>
                <Cell className='text-center'>{item.doneBy}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
            </Row>
        );
    };

    render() {
        const { gridData } = this.props;
        if (!gridData) {
            return null;
        }

        return (
            <div>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('CustomerRedemptionLogs')}</span>
                </div>
                <Table
                    width={1083}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    window.customerInfoPolicy === Policy.Host && (
                        <Button variant="primary" size="sm" className="mt-3" onClick={() => this.handleInsertRedemptionLog()}>
                            {LangHelper.getResource('Insert')}
                        </Button>
                    )
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
