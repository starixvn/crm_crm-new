import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy, PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('LogTime')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('EditedBy')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('FieldName')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('OldValue')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('NewValue')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { activityLogs } = this.props;

        if ( activityLogs && activityLogs.length > 0) {
            return activityLogs.map((item, index) => this.renderRow(item, index));
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
        const color = index%2 === 0 ? 'grid-blue' : 'grid-white'
        return (
            <Fragment>
                <Row key={index}>
                    <Cell className={`text-center ${color}`} rowSpan={item.fieldNames.length}>{item.logDate}</Cell>
                    <Cell className={color} rowSpan={item.fieldNames.length}>{item.username}</Cell>
                    <Cell className={color} rowSpan={item.fieldNames.length}>{item.actionName}</Cell>
                    <Cell className={color}>{item.fieldNames[0]}</Cell>
                    <Cell className={color}>{item.oldValuesList[0]}</Cell>
                    <Cell className={color}>{item.newValuesList[0]}</Cell>
                </Row>
                {
                    item.fieldNames.length > 1 &&
                    item.fieldNames.slice(1).map((element, key) => (
                        <Row key={key}>
                            <Cell className={color}>{item.fieldNames[key+1]}</Cell>
                            <Cell className={color}>{item.oldValuesList[key+1]}</Cell>
                            <Cell className={color}>{item.newValuesList[key+1]}</Cell>
                        </Row>
                    ))
                }
            </Fragment>
        );
    };

    render() {
        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('CustomerActivityLogs')}</span>
                </div>
                <Table
                    width={1400}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { activityLogs } = state;
    return { activityLogs }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
