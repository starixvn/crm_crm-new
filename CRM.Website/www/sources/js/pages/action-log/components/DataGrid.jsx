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
                <HeaderCell colWidth={8}>{LangHelper.getResource('LogTime')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('EditedBy')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('FieldName')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('OldValue')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('NewValue')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { activityLogs } = this.props;

        if (activityLogs.data.length > 0) {
            return activityLogs.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={6}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const color = index % 2 === 0 ? 'grid-blue' : 'grid-white';
        const rowSpan = item.fieldNames.length > 0 ? item.fieldNames.length : null;
        return (
            <Fragment>
                <Row key={index}>
                    <Cell className={`text-center ${color}`} rowSpan={rowSpan}>{DateTimeService.toLongDateTimeFormat(item.logDate)}</Cell>
                    <Cell className={color} rowSpan={rowSpan}>{item.username}</Cell>
                    <Cell className={color} rowSpan={rowSpan}>{item.actionName}</Cell>
                    <Cell className={color}>{item.fieldNames[0]}</Cell>
                    <Cell className={color} dangerouslySetInnerHTML={{ __html: this.renderValue(item.fieldNames[0], item.oldValuesList[0]) }}></Cell>
                    <Cell className={color} dangerouslySetInnerHTML={{ __html: this.renderValue(item.fieldNames[0], item.newValuesList[0]) }}></Cell>
                </Row>
                {
                    item.fieldNames.length > 1 &&
                    item.fieldNames.slice(1).map((element, key) => (
                        <Row key={key}>
                            <Cell className={color}>{item.fieldNames[key + 1]}</Cell>
                            <Cell className={color} dangerouslySetInnerHTML={{ __html: this.renderValue(item.fieldNames[key + 1], item.oldValuesList[key + 1]) }}></Cell>
                            <Cell className={color} dangerouslySetInnerHTML={{ __html: this.renderValue(item.fieldNames[key + 1], item.newValuesList[key + 1]) }}></Cell>
                        </Row>
                    ))
                }
            </Fragment>
        );
    };

    isEncode = fieldName => {
        return fieldName !== 'Remark' &&
            fieldName !== 'Solution' &&
            fieldName !== 'Review' &&
            fieldName !== 'SpecialRemark' &&
            fieldName !== 'ReviewNote';
    };

    replaceText = text => text ? text.replace('\\n', '<br />').replace('\\r', '<br />') : '';

    encodeHtml = value => {
        const item = value.replaceAll("&amp;", "&")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"')
            .replaceAll("&#39;", "'");
        return item;
    };

    renderValue = (fieldName, value) => {
        value = this.replaceText(value);
        if (!this.isEncode(fieldName)) {
            value = this.encodeHtml(value);
        }
        return value;
    };


    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getActivityLog(params);
    };

    render() {
        const { activityLogs } = this.props;
        if (!activityLogs || !activityLogs.data) {
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: activityLogs.totalItems,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='justify-content-between table-title-v2 d-flex align-items-center'>
                    <span>{LangHelper.getResource('CustomerActivityLogs')}</span>
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    containerPadding={0}
                    adjustedHeight={10}
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { activityLogs, gridParams } = state;
    return { activityLogs, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
