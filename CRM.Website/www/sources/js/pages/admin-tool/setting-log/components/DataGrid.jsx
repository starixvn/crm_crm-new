import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import DateTimeService from '@jsroot/common/dateTimeService';

export class DataGrid extends Component {
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={20}>{LangHelper.getResource('LogTime')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('EditedBy')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Entity')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('ID')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('FieldName')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('OldValue')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('NewValue')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridDataSettingLogs } = this.props;

        if ( gridDataSettingLogs.data.length > 0) {
            return gridDataSettingLogs.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const backgroundColor = index % 2 === 0 ? 'grid-blue' : 'grid-white';
        const rowSpan = item.fieldNames.length > 0 ? item.fieldNames.length : null;
        return (
            <Fragment>
                <Row key={index}>
                    <Cell className={`text-center ${backgroundColor}`} rowSpan={rowSpan}>{DateTimeService.toLongDateTimeFormat(item.logDate)}</Cell>
                    <Cell className={`word-wrap ${backgroundColor}`} rowSpan={rowSpan}>{item.username}</Cell>
                    <Cell className={backgroundColor} rowSpan={rowSpan}>{item.actionName}</Cell>
                    <Cell className={`text-center ${backgroundColor}`} rowSpan={rowSpan}>{item.entity}</Cell>
                    <Cell className={`text-center ${backgroundColor}`} rowSpan={rowSpan}>{item.id}</Cell>
                    <Cell className={backgroundColor}>{item.fieldNames[0]}</Cell>
                    <Cell className={`word-wrap ${backgroundColor}`} dangerouslySetInnerHTML={{ __html: this.renderEncodeData(item.oldValuesList[0]) }} />
                    <Cell className={`word-wrap ${backgroundColor}`} dangerouslySetInnerHTML={{ __html: this.renderEncodeData(item.newValuesList[0]) }} />
                </Row>
                {
                    item.fieldNames.length > 1 &&
                    item.fieldNames.slice(1).map( (ele ,key) => (
                        <Row key={key}>
                            <Cell className={backgroundColor}>{item.fieldNames[key+1]}</Cell>
                            <Cell className={`word-wrap ${backgroundColor}`} dangerouslySetInnerHTML={{ __html: this.renderEncodeData(item.oldValuesList[key+1]) }} />
                            <Cell className={`word-wrap ${backgroundColor}`} dangerouslySetInnerHTML={{ __html: this.renderEncodeData(item.newValuesList[key+1]) }} />
                        </Row>
                    ))
                }
            </Fragment>
        );
    };

    replaceText = text => text ? text.replace('\\n', '<br />').replace('\\r', '<br />') : '';

    encodeDataHtml = text => {
        const value = text.replaceAll("&amp;", "&")
            .replaceAll("&lt;", "<").replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"').replaceAll("&#39;", "'");
        return value;
    };

    renderEncodeData = text => {
        text = this.replaceText(text);
        return this.encodeDataHtml(text);
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getGridSettingLogs(params);
    };

    render() {
        const { gridDataSettingLogs } = this.props;
        if(!gridDataSettingLogs || !gridDataSettingLogs.data){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: gridDataSettingLogs.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('SettingLogs')}</span>
                </div>
                <Table
                    width={1500}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
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
    const { gridDataSettingLogs, gridParams } = state;
    return { gridDataSettingLogs, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);