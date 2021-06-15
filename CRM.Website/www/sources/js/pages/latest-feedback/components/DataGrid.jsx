import React, { Component } from 'react';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';


export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit = (id, subject) => {
        this.props.setSelectLatestFeedbackId({ templateId: id, subject: subject });
        this.props.setEditLatestFeedbackPopup({ show: true, templateId: id, subject: subject });
    };

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Running No.')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Related Customer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 4 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => (
        <Row key={index} >
            <Cell className='text-center'>{item.templateID}</Cell>
            <Cell><div>{item.subject}</div></Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item.templateID, item.subject)}
                    />
                </Cell>
            }
            <Cell className='text-center'>
                <input type="checkbox" checked={item.isActive} disabled={!isHost}
                    onChange={() => this.handleEditStatus(item.templateID, item.isActive)}
                />
            </Cell>
        </Row>
    );

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        const { isHost } = this.props;

        return (
            <Table
                width={920}
                autoWidth={false}
                header={this.buildHeader(isHost)}
                body={this.buildBody(isHost)}
                containerPadding={0}
                adjustedHeight={10}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);