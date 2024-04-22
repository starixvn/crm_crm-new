import React, { Component } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell, Tabs, Tab } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { Button, Form } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export default class AffectedTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCredit: this.props.isCredit,
            siteOptions: [
                {id: 1, name: '77777', checked: true},
                {id: 2, name: '434', checked: true}
            ]
        };

        this.data = [
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
            { siteName: '77777', betId: 1000, username: 'user', headline: 'headline777' },
        ];
    };

    handleChangeTab = () => {
        this.setState(prevState => ({
            isCredit: !prevState.isCredit
        }));
    };

    handleChangeSite = () => {

    };

    handleExport = () => {

    };

    renderInfoBySystem = isCredit => {
        const usernameColumn = isCredit ? 'Username' : 'ExternalID';
        const headlineColumn = isCredit ? 'Headline' : 'SystemID';

        return { usernameColumn, headlineColumn };
    };

    buildHeader = isCredit => {
        const { usernameColumn, headlineColumn } = this.renderInfoBySystem(isCredit);

        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('#')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('BetID')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource(usernameColumn)}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource(headlineColumn)}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        if (this.data.length > 0) {
            return this.data.map((item, index) => this.renderRow(item, index));
        }
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell className='text-center'><div>{index + 1}</div></Cell>
                <Cell className='text-left'><div>{item.siteName}</div></Cell>
                <Cell className='text-center'><div>{item.betId}</div></Cell>
                <Cell className='text-left'><div>{item.username}</div></Cell>
                <Cell className='text-left'><div>{item.headline}</div></Cell>
            </Row>
        )
    };

    renderTab = () => {
        const { isCredit } = this.state;
        return (
            <div className='affected-filter'>
                <div className='affected-user'>
                    <div
                        className={`${isCredit ? 'locked-user': ''}`}
                        onClick={this.handleChangeTab}
                    >
                        {LangHelper.getResource('Credit')}
                    </div>
                    <div
                        className={`${!isCredit ? 'locked-user': ''}`}
                        style={{'borderLeftWidth': '0px'}}
                        onClick={this.handleChangeTab}
                    >
                        {LangHelper.getResource('Licensee')}
                    </div>
                </div>
                {
                    this.data.length > 0 &&
                    <ExcelIcon
                        handleExportExcel={this.handleExport}
                    />
                }
            </div>
        );
    };

    renderSite = () => {
        return (
            <div className='affected-table'>
                <div className='site-filter'>
                    <span>{LangHelper.getResource('Site')}</span>
                    <div className='site-option'>
                        <MultipleSelect
                            dataSource={this.state.siteOptions}
                            keyField='id'
                            valueField='name'
                            maxDisplayItemCount={2}
                            isAllTextShown
                            onChange={() => this.handleChangeSite()}
                        />
                    </div>
                </div>
                <div className='site-table'>
                    <Table
                        width={660}
                        autoWidth={false}
                        header={this.buildHeader(this.state.isCredit)}
                        body={this.buildBody()}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className='affected'>
                <div className='d-flex table-title justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('AffectedTickets')}</div>
                </div>
                { this.renderTab() }
                { this.renderSite() }
            </div>
        )
    }
};