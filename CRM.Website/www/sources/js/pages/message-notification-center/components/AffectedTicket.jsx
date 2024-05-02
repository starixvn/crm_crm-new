import React, { Component } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell, Tabs, Tab } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import { Button, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export default class AffectedTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCredit: this.props.isCredit,
            siteOptions: this.getSiteOptions(this.props.isCredit, this.props.siteTickets)
        };
    };

    getSiteOptions = (isCredit, siteTickets) => {
        const siteType = isCredit ? 'Credit' : 'Licensee';
        const siteByFilter = siteTickets.filter(item => item.siteType === siteType);
        return siteByFilter.map((item, index) => ({
            id: index + 1,
            name: item.siteName,
            checked: true
        }));
    };

    handleChangeTab = () => {
        this.setState(prevState => ({
            isCredit: !prevState.isCredit,
            siteOptions: this.getSiteOptions(!prevState.isCredit, this.props.siteTickets)
        }));
    };

    handleChangeSite = () => {

    };

    handleExport = () => {

    };

    getData = isCredit => {
        const { siteTickets } = this.props;
        const siteType = isCredit ? 'Credit' : 'Licensee';
        return siteTickets.filter(item => item.siteType === siteType);
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
                <HeaderCell colWidth={30}>{LangHelper.getResource('BetID')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource(usernameColumn)}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource(headlineColumn)}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const data = this.getData(this.state.isCredit);
        if (data.length > 0) {
            return data.map((item, index) => this.renderRow(item, index));
        }
    };

    renderRow = (item, index) => {
        const { isCredit } = this.state;
        const firstElement = isCredit ? item.username : item.extInfo;
        const secondElement = isCredit ? item.extInfo : item.username;

        return (
            <Row key={index}>
                <Cell className='text-center'><div>{index + 1}</div></Cell>
                <Cell className='text-left'><div>{item.siteName}</div></Cell>
                <Cell className='text-center'><div>{item.transID}</div></Cell>
                <Cell className='text-left'><div>{firstElement}</div></Cell>
                <Cell className='text-left'><div>{secondElement}</div></Cell>
            </Row>
        );
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
                    this.props.siteTickets.length > 0 &&
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
                        width={700}
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
        const { siteTickets } = this.props;
        if (!siteTickets) {
            return null;
        }
        console.log('siteTickets', this.props.siteTickets);

        return (
            <Modal show className="affected-ticket-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={() => this.hide()}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('AffectedTickets')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='affected'>
                        { this.renderTab() }
                        { this.renderSite() }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
};