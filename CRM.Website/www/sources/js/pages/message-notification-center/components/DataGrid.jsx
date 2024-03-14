import React, { Component } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.data = [
            { notificationId: 1000, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'Created on Dec 12, 2023', status: 0, sender: '' },
            { notificationId: 1000, eventInfo: 'Dec 12, 2023', sites: 'Credit', content: 'Created on Dec 12, 2023', status: 0, sender: '' }
        ]
    }

    buildHeader = isHost => (
        <HeaderRow>
            <HeaderCell colWidth={15}>{LangHelper.getResource('NotificationID')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Event Info')}</HeaderCell>
            <HeaderCell colWidth={35}>{LangHelper.getResource('Sites')}</HeaderCell>
            <HeaderCell colWidth={50}>{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={15}>{LangHelper.getResource('status')}</HeaderCell>
            <HeaderCell colWidth={20}>{LangHelper.getResource('Sender/SendDate')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={20}>{LangHelper.getResource('Action')}</HeaderCell>
            }
        </HeaderRow>
    );

    buildBody = isHost => {
        if (this.data.length > 0) {
            return this.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        //return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 4 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => (
        <Row key={item.notificationId+'-'+index}>
            <Cell className='text-center'><div>{item.notificationId}</div></Cell>
            <Cell className='text-left'><div>{item.eventInfo}</div></Cell>
            <Cell className='text-left'><div>{item.sites}</div></Cell>
            <Cell className='text-left'><div>{item.content}</div></Cell>
            <Cell className='text-left'><div>{item.status}</div></Cell>
            <Cell className='text-left'><div>{item.sender}</div></Cell>
            <Cell className='text-left'><div>{'review'}</div></Cell>
        </Row>
    );

    render() {
        // if (!this.props.gridData || !this.props.gridData.data) {
        //     return null;
        // }

        // const { totalItems } = this.props.gridData;
        // const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;

        const pagingOption = {
            PageIndex: 1,
            PageSize: 100,
            TotalItem: 2,
            PageList: PAGING_SIZES
        };
        return (
            <>
                <div className='d-flex table-title justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('NotificationList')}</div>
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    adjustedHeight={10}
                />
            </>
        );
    }
};