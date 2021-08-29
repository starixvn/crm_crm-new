import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import RenderExportExcel from '@jsroot/components/RenderExportExcel';

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
        );
    };

    buildBody = () => {
        const { informs } = this.props;
        if (informs.length > 0) {
            return informs.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={13}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEditContact = async titleId => {
        this.props.setEditContactInformDialog({show: true, titleId: titleId});
    };

    getPositionEdit = (event, titleId, status) => {
        const position = event.target.getClientRects()[0];
        this.props.setOptionDialog({
            show: true,
            showOption: 'block',
            status: status,
            top: position.top,
            left: position.left,
            titleIdSearch: titleId
        });
    };

    handleNewInforms = () => {
        this.props.getAllSettings();
        this.props.setNewInformDialog({show: true});
    };

    renderRow = (item, index) => {
        const cssClass = item.status ? item.status.toLowerCase() : '';
        return (
            <Row key={index} className={cssClass}>
                <Cell className='text-center'>
                    <span className="cursor-pointer fa fa-list" onClick={event => this.getPositionEdit(event, item.titleId, item.status)}></span>
                </Cell>
                {
                    window.contactPolicy !== 'None' ?
                    (
                        <Cell>
                            <span className='link-click' onClick={() => this.handleEditContact(item.titleId)}>{item.title}</span>
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

    render() {
        const { informs } = this.props;
        if(!informs || window.searchPolicy === 'None' || window.contactPolicy === 'None'){
            return null;
        }

        return (
            <>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>Inform Headlines Cases</span>
                    {
                        informs.length > 0 &&
                        <RenderExportExcel
                            gridParams={null}
                            exportExcel={this.props.exportInforms}
                        />
                    }
                </div>

                <Table
                    width={1336}
                    maxWidth={1336}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />

                {
                    window.searchPolicy === 'Host' &&
                    <Button variant="primary" size="sm" style={{width: '80px','marginTop': '10px'}} onClick={this.handleNewInforms}>
                        {LangHelper.getResource('NewCase')}
                    </Button>
                }
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { informs } = state;
    return { informs };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
