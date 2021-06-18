import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={7}>{LangHelper.getResource('Running No.')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Related Customer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 6 : 5}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => (
        <Row key={index} >
            <Cell className='text-center'>{item.feedbackId}</Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item.feedbackId, item.subject)}
                    />
                </Cell>
            }
            {
                isHost &&
                <Cell onClick={() => this.openContentPopup(item)}>
                    <Tooltip className="tooltipCatagory" id={`tooltip${index}`}>
                        {item.Description}
                    </Tooltip>
                    <span className="rounded-circle fa fa-pencil-square-o"
                        onClick={() => this.handleEdit(item.feedbackId, item.subject)}
                    />
                    <strong className='link-click'> {item.subject} </strong>
                    <div>Feedback date <strong> {item.feedbackDateString} </strong></div>
                    <div>By <strong>  {item.creatorName} </strong> on {item.createDateString} </div>
                    <div>Solving Duration: {item.durationTime} </div>
                </Cell>
            }
            <Cell>{item.subject}</Cell>
            <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
            <Cell>{item.relatedCustomer}</Cell>

        </Row>
    );

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipExport">
                        <span>
                            Export to Excel
                </span>
                    </Tooltip>
                }
            >
                {
                    <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcelMapping} />
                }
            </OverlayTrigger>
        );
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        const { isHost } = this.props;

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>Top {this.props.gridParams.Top} Feedback</span>
                    {
                        this.props.gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>
                <Table
                    width={1000}
                    autoWidth={false}
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
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