import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGridRedemption extends Component {
    componentDidMount() {
        this.props.getRedemptionLogs({ customerId: this.props.id });
    }

    componentDidUpdate(prevProps) {
        if ( this.props.id !== prevProps.id ) {
            this.props.getRedemptionLogs({ customerId: this.props.id });
        }
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('ClaimedTime')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Amount')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('DoneBy')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { redemptions } = this.props;

        if (redemptions.length > 0) {
            return redemptions.map((item, index) => this.renderRow(item, index));
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
        this.props.setEditRedemptionDialog({ show: true, redemptionId: id });
    };

    renderRow = (item, index) => {
        const dollarUSLocale = Intl.NumberFormat('en-US');
        return (
            <Row key={index}>
                <Cell className="text-left">
                    <span className='link-detail' onClick={() => this.handleEditRedemptionLog(item.id)}>{item.subject}</span>
                </Cell>
                <Cell className="text-center">
                    {DateTimeService.toShortDateFormat(item.claimTime)}
                </Cell>
                <Cell className='text-center'>{item.currency}</Cell>
                <Cell className='text-right'>
                    {`${dollarUSLocale.format(item.amount)}.00`}
                </Cell>
                <Cell className='text-left'>{item.doneBy}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
            </Row>
        );
    };

    render() {
        const { redemptions } = this.props;
        if (!redemptions) {
            return null;
        }

        return (
            <div className='redemption-grid'>
                <div className='table-title d-flex align-items-center justify-content-between'>
                    <span>{LangHelper.getResource('LastFiveRedemptionLog')}</span>
                </div>

                <Table
                    width={980}
                    autoWidth={false}
                    containerPadding={0}
                    adjustedHeight={10}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { redemptions } = state;
    return { redemptions };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridRedemption);
