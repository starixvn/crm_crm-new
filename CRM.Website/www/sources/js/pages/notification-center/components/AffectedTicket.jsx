import React, { Component } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export default class AffectedTicket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCredit: this.props.isCredit,
            siteOptions: this.getSiteOptions(this.props.isCredit, this.props.siteTickets),
            siteTickets: this.props.siteTickets
        };
    };

    getSiteOptions = (isCredit, siteTickets) => {
        const siteType = isCredit ? 'Credit' : 'Licensee';
        const uniqueSiteNames = {};

        return siteTickets.reduce((acc, item) => {
            if (item.siteType === siteType && !uniqueSiteNames[item.siteName]) {
                uniqueSiteNames[item.siteName] = true;
                acc.push({
                    id: item.siteName,
                    name: item.siteName,
                    checked: true
                });
            }
            return acc;
        }, []);
    };

    handleChangeTab = () => {
        this.setState(prevState => ({
            isCredit: !prevState.isCredit,
            siteOptions: this.getSiteOptions(!prevState.isCredit, this.props.siteTickets),
            siteTickets: this.props.siteTickets
        }));
    };

    handleChangeSite = (currentItem, selectedItemsKey) => {
        const siteNames = selectedItemsKey.split(',');
        const siteType = this.state.isCredit ? 'Credit' : 'Licensee';
        const siteByFilter = this.props.siteTickets.filter(item => item.siteType === siteType && siteNames.includes(item.siteName));
        this.setState({ siteTickets: siteByFilter });
    };

    handleExport = () => {
        const params = {
            notificationId: this.props.notificationId,
            eventTime: this.props.eventTime,
            eventName: this.props.eventName
        }
        this.props.exportExcel(params);
    };

    getData = isCredit => {
        const { siteTickets } = this.state;
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
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={5}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index) => {
        const { isCredit } = this.state;
        const firstElement = isCredit ? item.username : item.extInfo;
        const secondElement = isCredit ? item.extInfo : item.username;

        return (
            <Row key={index}>
                <Cell className='text-center'><div>{index + 1}</div></Cell>
                <Cell className='text-center'><div>{item.siteName}</div></Cell>
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
                        className={`credit-user ${isCredit && 'locked-user'}`}
                        onClick={this.handleChangeTab}
                    >
                        {LangHelper.getResource('Credit')}
                    </div>
                    <div
                        className={`licensee-user ${!isCredit && 'locked-user'}`}
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
                    <span className='site-label'>{LangHelper.getResource('Site')}</span>
                    <div className='site-option'>
                        <MultipleSelect
                            dataSource={this.state.siteOptions}
                            keyField='id'
                            valueField='name'
                            maxDisplayItemCount={2}
                            isAllTextShown
                            onChange={this.handleChangeSite}
                        />
                    </div>
                </div>
                <div className='site-table'>
                    <Table
                        width={732}
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
        const { siteTickets } = this.state;
        if (!siteTickets) {
            return null;
        }

        return (
            <Modal show className="affected-ticket-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
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
                    <Button type="submit" className='btn-close' variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
};