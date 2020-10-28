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

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getFeedBackSubject(params);
    }

    handleEdit = (id, subject) => {
        this.props.setSelectFeedbackSubjectId({ templateId: id, subject: subject });
        this.props.setEditFeedbackSubjectPopup({ show: true, templateId: id, subject: subject });
    }

    handleEditStatus = (id, isActive) => {
        this.props.setEditStatusFeedbackSubjectPopup({ show: true, id: id, isActive: isActive });
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('TemplateId')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('FeedbackSubjectTemplateContent')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={5}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
                <HeaderCell colWidth={5}>{LangHelper.getResource('Active')}</HeaderCell>
            </HeaderRow>
        );
    }

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 4 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    }

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
    )

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
            <Table
                width={920}
                autoWidth={false}
                header={this.buildHeader(isHost)}
                body={this.buildBody(isHost)}
                isPaging
                pageOption={pagingOption}
                onPaging={this.onPaging}
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