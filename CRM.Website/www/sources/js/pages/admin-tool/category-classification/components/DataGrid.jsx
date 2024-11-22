import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit = async (mainCategoryId, subCategoryId) => {
        await this.props.getCategoryClassById(mainCategoryId, subCategoryId);
        this.props.setEditCategoryClassPopup({ show: true });
    };

    handleDelete = async (mainCategoryId, subCategoryId) => {
        await this.props.getCategoryClassById(mainCategoryId, subCategoryId);
        this.props.setDeleteCategoryClassPopup({ show: true });
    };

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('SubSCategory')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Remark')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={7}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 4 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderTooltipComponent = (title, component) => {
        return(
            <OverlayTrigger
                placement="bottom"
                overlay={
                    <Tooltip>
                        <span>{title}</span>
                    </Tooltip>
                }
            >
                { component }
            </OverlayTrigger>
        )
    }

    renderRow = (item, index, isHost) => (
        item.length > 0 && item.map((data, key) => (
            <Row key={key+data.subCategory}>
                {
                    key === 0 && <Cell className='text-left' rowSpan={item.length}><div>{data.mainCategory}</div></Cell>
                }
                <Cell className='text-left'><div>{data.subCategory}</div></Cell>
                <Cell className='text-left' dangerouslySetInnerHTML={{__html: data.remark}}></Cell>                
                {
                    isHost &&
                    <Cell className="text-center">
                        { 
                            this.renderTooltipComponent('Edit Remark', 
                            <span className="rounded-circle fa fa-pencil icon-edit"
                                onClick={() => this.handleEdit(data.mainCategoryID, data.subCategoryID)}
                            />)
                        }
                        {
                            this.renderTooltipComponent('Remove Remark', 
                            <span className="rounded-circle fa fa-trash icon-delete"
                                onClick={() => this.handleDelete(data.mainCategoryID, data.subCategoryID)}
                            />)
                        }
                    </Cell>
                }
            </Row>
        ))
    );

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };    
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    renderExportExcel = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel} />
            </OverlayTrigger>
        );
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

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
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    {LangHelper.getResource('CategoryClassification')}
                    {
                        this.props.gridData.data.length > 0 && this.renderExportExcel()
                    }
                </div>
                <Table
                    width={1200}
                    autoWidth={false}
                    containerPadding={0}
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
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData
    } = state;

    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);