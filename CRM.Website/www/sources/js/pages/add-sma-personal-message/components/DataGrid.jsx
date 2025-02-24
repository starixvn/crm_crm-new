import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';
import DateTimeService from '@jsroot/common/dateTimeService';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';

export default class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandPanels: false
        };
        this.panels = [];
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleDelete = id => {
        this.props.setDeletePopup(id);
    };

    toggleExpandPanels = () => {
        this.setState(prevState => ({ expandPanels: !prevState.expandPanels }), () => {
            if (this.props.gridData.data.length) {
                this.panels.filter(x => x && (x.state.isOpen !== this.state.expandPanels)).forEach(panel => {
                    panel.set(this.state.expandPanels);
                });
            }
        });
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={8}>{LangHelper.getResource('MessageID')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('CreatedDateGM8')}</HeaderCell>
                <HeaderCell colWidth={7}>{LangHelper.getResource('Creator')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Title')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('SMAUsernames')}</HeaderCell>
                <HeaderCell colWidth={40}>
                    <div className="has-icons">
                        {LangHelper.getResource('Content')}
                        <span className={this.state.expandPanels ? 'fa fa-expand' : 'fa fa-compress'} onClick={this.toggleExpandPanels} />
                    </div>
                </HeaderCell>
                {
                    isHost && <HeaderCell colWidth={5}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }

        return [<Row key='body-table' className="no-data"><Cell colSpan={isHost ? 8 : 7}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => (
        <Row key={index} >
            <Cell className='text-center'>{item.messageId}</Cell>
            <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createTime)}</Cell>
            <Cell>{item.creatorName}</Cell>
            <Cell>{item.title}</Cell>
            <Cell>{item.targetNames}</Cell>
            <Cell className="col-content">
                {
                    item.content_en.length > 100 ?
                    <Panel ref={panel => this.panels[index] = panel}>
                        <PanelHeader>
                            <div className='split-content'>{item.content_en.slice(0, 100)}</div>
                        </PanelHeader>
                        <div className='content'>{item.content_en}</div>
                    </Panel> :
                    item.content_en
                }
                
            </Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-trash icon-delete"
                        onClick={() => this.handleDelete(item.messageId)}
                    />
                </Cell>
            }
        </Row>
    );

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }

        const { totalItems } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title-v2'>{LangHelper.getResource('SMAPersonalMessage')}</div>
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
            </Fragment>
        );
    }
}