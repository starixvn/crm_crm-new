import React, { Component, Fragment } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    onPagingCommunication = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamsCommunication };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.setGridParamsCommunication(params);
        this.props.getGridCommunicationSetting(params);
    };

    decodeCatagory = category => {
        const parseCatagory = document.createElement('textarea');
        parseCatagory.innerHTML = category;
        return parseCatagory.value;
    };

    renderCategoryColumn = (index, category) => {
        const categoryParse = this.decodeCatagory(category);
        const maxItems = 15;
        const categories = categoryParse ? categoryParse.split(',') : [];
        if (categories.length > maxItems) {
            return (
                <OverlayTrigger
                    placement="auto"
                    overlay={this.renderTooltipCategory(index, categoryParse)}
                >
                    <span>
                        {categories.splice(0, maxItems).join(', ') + '...'}
                    </span>
                </OverlayTrigger>
            );
        }
        return <div>{categories.join(', ')}</div>;
    };

    buildHeaderCommunication = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Position')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Sub-Category')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={10}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBodyCommunication = isHost => {
        const { pageIndex, pageSize } = this.props.gridParamsCommunication;
        this.startIndex = (pageIndex - 1) * pageSize + 1;
        if (this.props.gridDataCommunication.data.length > 0) {
            return this.props.gridDataCommunication.data.map((item, index) => this.renderRowCommunication(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan='7'>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    handleEdit = id => {
        this.props.getCommunicationById(id, () => this.props.setEditCommunicationPopup({ show: true }));
    };

    handleDelete = (id, index) => {
        this.props.setDeleteCommunicationPopup({ show: true, id: id, index: index });
    };

    renderTooltipCategory = (index, fullCategory) => (
        <Tooltip className="tooltipCatagory" id={`tooltip${index}`}>
            {fullCategory}
        </Tooltip>
    );

    renderRowCommunication = (item, index, isHost) => (
        <Row key={index} >
            <Cell className='text-center'>{index + this.startIndex}</Cell>
            <Cell className='text-left'><div>{item.username}</div></Cell>
            <Cell className='text-left'><div>{item.role}</div></Cell>
            <Cell className='text-left'><div>{this.renderCategoryColumn(index, item.category)}</div></Cell>
            <Cell className='text-left'><div>{this.renderCategoryColumn(index, item.subCategory)}</div></Cell>
            <Cell className='text-left'><div>{item.commTool}</div></Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item.defaultCommId)}
                    />
                    <span className="rounded-circle fa fa-trash icon-delete"
                        onClick={() => this.handleDelete(item.defaultCommId, index + this.startIndex)}
                    />
                </Cell>
            }

        </Row>
    );

    render() {
        if (!this.props.gridDataCommunication || !this.props.gridDataCommunication.data) {
            return null;
        }

        const { totalItems } = this.props.gridDataCommunication;
        const { pageIndex, pageSize } = this.props.gridParamsCommunication;
        const { isHost } = this.props;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: [50, 100, 200, 500]
        };
        return (
            <Fragment>
                <div className='table-title'>{LangHelper.getResource('DefaultCommunicationSetting')}</div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('app-container').clientWidth}
                    autoWidth
                    header={this.buildHeaderCommunication(isHost)}
                    body={this.buildBodyCommunication(isHost)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPagingCommunication}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParamsCommunication,
        gridDataCommunication
    } = state;

    return {
        gridParamsCommunication,
        gridDataCommunication
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);