import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { renderButtonClose } from '../common.functions';

export class RemovedAccountLogDetails extends Component {

    buildHeader = () => {
        return(
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('UpdatedTime')}</HeaderCell>
                <HeaderCell colWidth={35}>{LangHelper.getResource('Remark')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Extension')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('ProductStatus')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { removedAccountLogDetails } = this.props;

        if (removedAccountLogDetails.item.length > 0) {
            return removedAccountLogDetails.item.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className='text-center'>{item.directAccount}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.clientUpdatedTime}</Cell>
                <Cell>{item.remark}</Cell>
                <Cell className='text-center'>{item.handler}</Cell>
                <Cell className='text-center'>{item.extension}</Cell>
                <Cell className='text-center'>{item.productStatus}</Cell>
            </Row>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamRemovedLogDetails };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;

        this.props.setGridParamRemovedLogDetails(params);
        this.props.getRemovedAccountLogDetails(params);
    };

    render() {
        const { removedAccountLogDetails } = this.props;
        if(!removedAccountLogDetails || !removedAccountLogDetails.item){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParamRemovedLogDetails;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: removedAccountLogDetails.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <>
                <Modal show
                    backdrop="static" keyboard={false} size="xl"
                    onHide={this.props.onClose}
                    className="modal-removeDetail"
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{`${LangHelper.getResource('InformHeadlines')} - ${LangHelper.getResource('RemovedEditedAccountsLogs')}`}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table
                            width={1050}
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
                        {renderButtonClose(this.props.onClose)}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { removedAccountLogDetails, gridParamRemovedLogDetails } = state;
    return { removedAccountLogDetails, gridParamRemovedLogDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovedAccountLogDetails);
