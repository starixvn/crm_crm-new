import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Dropdown } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { Policy } from '@jsroot/common/constants';
import ExcelIcon from '@jsroot/components/ExcelIcon';

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

    handleEditContact = (titleId, status) => {
        this.props.setEditContactInformDialog({show: true, titleId, status});
    };

    handleEdit = titleId => {
        this.props.setEditInformDialog({show: true, titleId});
    };

    handleRemovedAccountLogs = titleId => {
        const params = {
            titleId,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setGridParamRemovedLogs(params);
        this.props.getRemovedAccountLogs(params);
        this.props.setRemovedLogDialog({show: true});
    };

    handleCloseCase = titleId => {
        this.props.editInformStatus({titleId, statusType: true}).then(response =>{
            if(response && response.data.isSuccessful) {
                this.props.getInforms();
            }
        });
    };

    handleOpenCase = titleId => {
        this.props.editInformStatus({titleId, statusType: false}).then(response =>{
            if(response && response.data.isSuccessful) {
                this.props.getInforms();
            }
        });
    };

    handleOption = (titleId, status) => {
        const customOption = React.forwardRef(({ onClick }, ref) => (
            <span ref={ref} onClick={event => onClick(event)} className="cursor-pointer fa fa-list"></span>
        ));
        return (
            <Dropdown drop='down'>
                <Dropdown.Toggle as={customOption} id="dropdown-basic"/>
                {
                    status === 'Open' &&
                    (
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.handleEdit(titleId)}>
                                <i className="fa fa-pencil-square-o icon icon-default" />
                                {LangHelper.getResource('EditNumberOfAccounts')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleRemovedAccountLogs(titleId)}>
                                <i className="fa fa-list-alt icon icon-default" />
                                {LangHelper.getResource('RemovedEditedAccountsLogs')}
                            </Dropdown.Item>
                            {
                                this.props.permissions.searchPolicy === Policy.Host &&
                                <Dropdown.Item onClick={() => this.handleCloseCase(titleId)}>
                                <i className="fa fa-times icon icon-closed" />
                                    {LangHelper.getResource('CloseCase')}
                                </Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    )
                }
                {
                    status === 'Closed' &&
                    (
                        <Dropdown.Menu>
                            {
                                this.props.permissions.searchPolicy === Policy.Host &&
                                <Dropdown.Item onClick={() => this.handleOpenCase(titleId)}>
                                    <i className="fa fa-folder-open icon icon-open" />
                                    {LangHelper.getResource('OpenCase')}
                                </Dropdown.Item>
                            }
                            <Dropdown.Item onClick={() => this.handleRemovedAccountLogs(titleId)}>
                                <i className="fa fa-list-alt icon icon-default" />
                                {LangHelper.getResource('RemovedEditedAccountsLogs')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    )
                }
            </Dropdown>
        );
    };

    handleNewInforms = () => {
        this.props.setNewInformDialog({show: true});
    };

    renderRow = (item, index) => {
        const cssClass = item.status ? item.status.toLowerCase() : '';
        return (
            <Row key={index} className={cssClass}>
                <Cell className='text-center option'>
                    {this.handleOption(item.titleId, item.status)}
                </Cell>
                <Cell>
                    {
                        this.props.permissions.contactPolicy !== Policy.None ?
                        <span className='link-click' onClick={() => this.handleEditContact(item.titleId, item.status)}>{item.title}</span>
                        : item.title
                    }
                </Cell>
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

    renderTitle = informs => {
        return (
            <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                <span>Inform Headlines Cases</span>
                {
                    informs.length > 0 &&
                    <ExcelIcon
                        handleExportExcel={this.props.exportInforms}
                    />
                }
            </div>
        );
    };

    render() {
        const { informs, permissions } = this.props;
        if (!informs) {
            return null;
        }

        if (permissions.searchPolicy !== Policy.None || permissions.contactPolicy !== Policy.None) {
            return (
                <Fragment>
                    <Table
                        maxWidth={1600}
                        shouldUseMaxWidth
                        width={1600}
                        autoWidth={false}
                        isFixColumn
                        title={this.renderTitle(informs)}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        containerPadding={0}
                        adjustedHeight={10}
                    />

                    {
                        permissions.searchPolicy === Policy.Host &&
                        <Button variant="primary" size="sm" className="mt-3" onClick={this.handleNewInforms}>
                            {LangHelper.getResource('NewCase')}
                        </Button>
                    }
                </Fragment>
            );
        } else {
            return <div className="text-center text-danger">{LangHelper.getResource('NoPermission')}</div>;
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { informs, permissions } = state;
    return { informs, permissions };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
