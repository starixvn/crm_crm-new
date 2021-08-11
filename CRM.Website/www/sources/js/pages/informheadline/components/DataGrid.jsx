import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ActionCreators } from '../actions';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';

export class DataGrid extends Component {

    buildHeader = () => {
        return(
            <HeaderRow>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Edit')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Title')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('CreatedDate')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('NoDirectAccounts')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Done')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('RequestToCallBack')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('NoNeedToCall')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('NoReply')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('UnContactable')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('InternalAccount')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('NeverTouch')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('KeptForReference')}</HeaderCell>
            </HeaderRow>
        )
    };

    buildBody = () => {
        const { contactPolicy, gridData } = this.props;
        if (gridData.length > 0) {
            return gridData.map((item, index) => this.renderRow(item, index, contactPolicy));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={13}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEditDetail = async titleId => {
        await this.props.getContactInformSettings();
        const selectedStatuses = this.props.contactInformSettings.filterStatuses.map(item => {
            return item.settingId;
        }).join();

        this.props.getTitleDetail({
            titleId: titleId
        });
        this.props.getContactInforms({
            titleId: titleId,
            username: '',
            statusId: selectedStatuses,
            pageIndex: 1,
            pageSize: 300
        });

        this.props.setGridParams({
            pageIndex: 1,
            pageSize: 100
        });
        this.props.setEditInformHeadline({show: true, titleId: titleId, selectedStatuses: selectedStatuses});
    }

    renderRow = (item, index, contactPolicy) => {
        const cssClass = item.status ? item.status.toLowerCase() : '';
        return (
            <Row key={index} className={cssClass}>
                <Cell className='text-center'>
                    <span className="fa fa-pencil-square-o"></span>
                </Cell>
                {
                    !contactPolicy.hasAttribute('none') ?
                    (
                        <Cell>
                            <span className='link-click' onClick={() => this.handleEditDetail(item.titleId)}>{item.title}</span>
                        </Cell>
                    ) :
                    (
                        <Cell>{item.title}</Cell>
                    )
                }
                <Cell>{item.clientCreatedDate}</Cell>
                <Cell className='text-center'>{item.total}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.done}</Cell>
                <Cell className='text-center'>{item.requestToCallBack}</Cell>
                <Cell className='text-center'>{item.noNeedToCall}</Cell>
                <Cell className='text-center'>{item.noReply}</Cell>
                <Cell className='text-center'>{item.uncontactable}</Cell>
                <Cell className='text-center'>{item.internalAccount}</Cell>
                <Cell className='text-center'>{item.neverTouch}</Cell>
                <Cell className='text-center'>{item.keptForReference}</Cell>
            </Row>
        );
    };

    handleExportExcel = () => {
        this.props.ExportInformExcel();
    };

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel}/>
            </OverlayTrigger>
        );
    };

    render() {
        const { gridData } = this.props;
        if(!gridData){
            return null;
        }

        return (
            <>
                <div className='table-title d-flex justify-content-between align-items-center ha'>
                    <span>Inform Headlines Cases</span>
                    {
                        gridData.length > 0 && this.renderExportExcelText()
                    }
                </div>

                <Table
                    maxWidth={1600}
                    autoWidth={true}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />

                {
                    this.props.searchPolicy.hasAttribute('host') &&
                    <Button variant="primary" size="sm" style={{width: '75px'}}>
                        {LangHelper.getResource('NewCase')}
                    </Button>
                }
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, titleDetail, contactInformSettings, contactInforms } = state;
    return { gridData, titleDetail, contactInformSettings, contactInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
