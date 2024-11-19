import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;

        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    handleEdit = item => {
        this.props.setSelectedPic(item);
        this.props.setEditPicPopup({ show: true });
    };

    handleActiveStatus = (username, picId, checked) => {
        if (!this.props.isHost) {
            return;
        }
        this.props.setConfirmPopup({
            show: true,
            username,
            picId,
            checked
        });
    };

    buildHeader = isHost => {
        const { communicationTools } = this.props.setting;
        return [
            <HeaderRow key={'header1'}>
                <HeaderCell colWidth={10} rowSpan={2}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={20} rowSpan={2}>{LangHelper.getResource('PicType')}</HeaderCell>
                <HeaderCell colWidth={20} rowSpan={2}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={15} rowSpan={2}>{LangHelper.getResource('Role')}</HeaderCell>
                <HeaderCell colWidth={20} rowSpan={2}>{LangHelper.getResource('Language')}</HeaderCell>
                <HeaderCell colWidth={20} rowSpan={2}>{LangHelper.getResource('Country')}</HeaderCell>
                <HeaderCell colWidth={25} rowSpan={2}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
                <HeaderCell colWidth={50} colSpan={communicationTools.length}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell colWidth={25} rowSpan={2}>{LangHelper.getResource('Remark')}</HeaderCell>
                {
                    isHost &&
                    <HeaderCell colWidth={10} rowSpan={2}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
                <HeaderCell colWidth={10} rowSpan={2}>{LangHelper.getResource('Active')}</HeaderCell>
            </HeaderRow>,
            <HeaderRow key={'header2'}>
                {this.renderHeaderCommunicationTools(communicationTools)}
            </HeaderRow>
        ];
    };

    buildBody = isHost => {
        const { pageIndex, pageSize } = this.props.gridParams;

        const startIndex = (pageIndex - 1) * pageSize + 1;

        if (this.props.gridData.dataList.length > 0) {
            return this.props.gridData.dataList.map((item, index) => this.renderRow(item, index + startIndex, isHost));
        }
        const { communicationTools } = this.props.setting;
        const countColumn = (isHost ? 9 : 8) + communicationTools.length;
        return [<Row key={`body${1}`} className="no-data"><Cell className='text-center' colSpan={countColumn}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => (
        <Row key={item.picId}>
            <Cell className="text-center">{index}</Cell>
            <Cell>{item.picTypeName}</Cell>
            <Cell>{item.username}</Cell>
            <Cell className="text-center">{item.roleName}</Cell>
            <Cell>{item.languages.map(language => language.settingValue).join(', ')}</Cell>
            <Cell>{item.countryName}</Cell>
            <Cell>{item.groupHeadline}</Cell>
            {this.renderBodyCommunicationTools(item.communicationTools)}
            <Cell className="td-remark">{item.remark}</Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item)}
                    />
                </Cell>
            }
            <Cell className='text-center'>
                <Form.Control className='checkbox-cell-style'
                    id={`active-pic-${item.picId}`}
                    type='checkbox'
                    checked={item.isActive}
                    disabled={!isHost}
                    onChange={e => this.handleActiveStatus(item.username, item.picId, e.target.checked)}
                />
            </Cell>
        </Row>
    );

    renderHeaderCommunicationTools = communicationTools => {
        const header = [];
        communicationTools.forEach(item => {
            header.push(<HeaderCell colWidth={20} key={item.settingId}>{item.settingValue}</HeaderCell>);
        });
        return header;
    };

    renderBodyCommunicationTools = communicationTools => {
        const communicationToolsProps = this.props.setting.communicationTools;
        const data = [];
        communicationToolsProps.forEach(item => {
            const tool = communicationTools.find(c => c.settingId === item.settingId);
            const value = tool ? tool.value : '';
            data.push(<Cell key={item.settingId}>{value}</Cell>);
        });
        return data;
    };

    renderTitle = () =>{
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('PICManagement')}</span>
                    {
                        this.props.gridData.dataList.length > 0 &&
                        <div className="tool-box">
                            <span className="fa fa-file-excel-o btn-export-excel icon-excel" onClick={this.handleExportExcel} />
                        </div>
                    }
            </div>
        );
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.dataList) {
            return null;
        }

        const { isHost } = this.props;
        const { total } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: total,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <Table
                    maxWidth={2300}
                    shouldUseMaxWidth
                    width={document.getElementById('right-row-container').clientWidth}
                    autoWidth={false}
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    title={this.renderTitle()}
                    isFixColumn
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { setting, gridParams, gridData } = state;
    return {
        setting,
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
