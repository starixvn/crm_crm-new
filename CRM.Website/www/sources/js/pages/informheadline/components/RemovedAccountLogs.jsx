import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Modal } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class RemovedAccountLogs extends Component {

    handleRemovedAccountLogDetails = logId => {
        const params = {
            logId: logId,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setGridParamRemovedLogDetails(params);
        this.props.getRemovedAccountLogDetails(params);
        this.props.setShowRemovedLogDetails({show: true});
    };

    buildHeader = () => {
        return(
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Date')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('EditedBy')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('NumberOfRemovedEditedAccounts')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { removedAccountLogs } = this.props;

        if (removedAccountLogs.item.length > 0) {
            return removedAccountLogs.item.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={3}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className='text-center'>{item.clientLogDate}</Cell>
                <Cell className='text-center'>{item.username}</Cell>
                <Cell className='text-center'>
                    <span className="number-remove" onClick={() => this.handleRemovedAccountLogDetails(item.logId)}>{item.totals}</span>
                </Cell>
            </Row>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamRemovedLogs };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;

        this.props.setGridParamRemovedLogs(params);
        this.props.getRemovedAccountLogs(params);
    };

    render() {
        const { removedAccountLogs } = this.props;
        if(!removedAccountLogs || !removedAccountLogs.item){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParamRemovedLogs;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: removedAccountLogs.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <>
                <Modal show
                    backdrop="static" keyboard={false} size="lg"
                    onHide={this.props.onClose}
                    className="modal-remove"
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{`${LangHelper.getResource('InformHeadlines')} - ${LangHelper.getResource('RemovedEditedAccountsLogs')}`}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table
                            width={570}
                            autoWidth={false}
                            header={this.buildHeader()}
                            body={this.buildBody()}
                            isPaging
                            pageOption={pagingOption}
                            onPaging={this.onPaging}
                            containerPadding={0}
                            adjustedHeight={10}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" size="sm" style={{width: '65px'}} onClick={this.props.onClose}>
                            {LangHelper.getResource('Close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { removedAccountLogs, gridParamRemovedLogs } = state;
    return { removedAccountLogs, gridParamRemovedLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovedAccountLogs);
