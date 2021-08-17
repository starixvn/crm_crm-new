import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ActionCreators } from '../actions';
import { Button } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import OptionsEdit from '@jsroot/components/OptionsEdit';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOption: 'none',
            status: '',
            position:{
                top: 0,
                left: 0
            },
            titleIdSearch: null
        };
    };

    componentDidMount() {
        document.addEventListener('click', () => {
            this.setState({
                showOption: 'none'
            });
        });
    };

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

    handleEditContact = async titleId => {
        await this.props.getTitleDetail({
            titleId: titleId
        });

        await this.props.getContactInformSettings();
        const selectedStatuses = this.props.contactInformSettings.filterStatuses.map(item => {
            return item.settingId;
        }).join();


        this.props.getContactInforms({
            titleId: titleId,
            username: '',
            statusId: selectedStatuses,
            pageIndex: 1,
            pageSize: 2200
        });

        this.props.setGridParams({
            pageIndex: 1,
            pageSize: 100
        });
        this.props.setShowEditContactInform({show: true, titleId: titleId, selectedStatuses: selectedStatuses});
    };

    getIncludeInSetting = (detail, setting) => {
        const includes = [];
        setting.map(item => {
            if(detail.split(",").includes(item.id.toString()))
                includes.push(item.id);
        });
        return includes.join(",");
    };

    handleEditSearch = async titleId => {
        await this.props.getTitleDetail({
            titleId: titleId
        });
        await this.props.getAllSettings();

        const { titleDetail, allSettings } = this.props;
        const includeCurrencies = this.getIncludeInSetting(titleDetail.currencies, allSettings.currencies);
        const includeSites = this.getIncludeInSetting(titleDetail.sites, allSettings.sites[0].childSites);
        
        this.props.getSearchInforms({
            titleId: titleId,
            typeAccount: titleDetail.typeAccount,
            currencies: includeCurrencies,
            levels: titleDetail.positions,
            sites: includeSites,
            isVip: titleDetail.isVip,
            excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
        });

        this.props.setShowEditSearchInform({show: true, titleId: titleId, includeCurrencies: includeCurrencies, includeSites: includeSites});
    };

    handleRemovedAccountLogs = titleId => {
        const params = {
            titleId: titleId,
            pageIndex: 1,
            pageSize: 100
        };
        
        this.props.setGridParamRemovedLogs(params);
        this.props.getRemovedAccountLogs(params);
        this.props.setShowRemovedLogs({show: true});
    };

    handleCloseCase = titleId => {
        const params = {
            titleId: titleId,
            statusType: true
        }
        this.props.updateInformStatus(params);
        this.props.getInforms();
    };

    handleOpenCase = titleId => {
        const params = {
            titleId: titleId,
            statusType: false
        }
        this.props.updateInformStatus(params);
        this.props.getInforms();
    };

    getPositionEdit = (event, titleId, status) => {
        var position = event.target.getClientRects()[0];

        this.setState({
            showOption: 'block',
            status: status,
            position:{
                top: position.top,
                left: position.left
            },
            titleIdSearch: titleId
        });
    };

    handleNewInforms = () => {
        this.props.getAllSettings();
        this.props.setShowNewInforms({show: true});
    };

    renderRow = (item, index, contactPolicy) => {
        const cssClass = item.status ? item.status.toLowerCase() : '';
        return (
            <Row key={index} className={cssClass}>
                <Cell className='text-center'>
                    <span className="fa fa-pencil-square-o" onClick={(event) => this.getPositionEdit(event, item.titleId, item.status)}></span>                   
                </Cell>
                {
                    !contactPolicy.hasAttribute('none') ?
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

    handleExportExcel = () => {
        this.props.exportInforms();
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
        };

        return (
            <>
                {
                    <OptionsEdit
                        showOption={this.state.showOption}
                        status={this.state.status}
                        top={this.state.position.top}
                        left={this.state.position.left}
                        titleIdSearch={this.state.titleIdSearch}
                        handleEditSearch={this.handleEditSearch}
                        handleRemovedAccountLogs={this.handleRemovedAccountLogs}
                        handleCloseCase={this.handleCloseCase}
                        handleOpenCase={this.handleOpenCase}
                    />
                }
                <div className='table-title d-flex justify-content-between align-items-center'>
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
                    <Button variant="primary" size="sm" style={{width: '75px'}} onClick={this.handleNewInforms}>
                        {LangHelper.getResource('NewCase')}
                    </Button>
                }
            </>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, titleDetail, contactInformSettings, contactInforms, allSettings } = state;
    return { gridData, titleDetail, contactInformSettings, contactInforms, allSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
