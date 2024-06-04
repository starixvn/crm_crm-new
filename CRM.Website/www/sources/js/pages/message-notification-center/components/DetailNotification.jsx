import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Row, Tabs, Tab, Button, Modal } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import { filterAndSortSites } from '../common.functions';
import AffectedTicket from './AffectedTicket';

export class DetailNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'English',
            data: null,
            sites: null,
            content: {
                content_en: null,
                content_cs: null,
                content_ch: null
            },
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null }
        }

        this.languages = [
            {
                name: "English",
                mapLabel: "content_en"
            },
            {
                name: "Simplified Chinese",
                mapLabel: "content_cs"
            },
            {
                name: "Traditional Chinese",
                mapLabel: "content_ch"
            }
        ]
    }

    componentDidMount() {
        this.getAdmNotificationDetail();
    };

    getAdmNotificationDetail = async () =>{
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getAdmNotificationById(notificationId).then(response => {
            const { notificationDetails, sites } = response.data;
            const notificationDetail = notificationDetails[0];
            this.getContentByLanguage(notificationDetail);
            this.setState({data: notificationDetail, sites});
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    getContentByLanguage = notification => {
        const content = {...this.state.content};
        content.content_en = notification.content_en;
        content.content_cs = notification.content_cs;
        content.content_ch = notification.content_ch;
        this.setState({content});
    };

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    handleClosePopup = () => {
        this.setState({
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null }
        });
    };

    renderSiteSection = (sites, title, ticketCnt) => {
        if (sites.length === 0) {
            return null;
        }
        return (
            <div>
                <div className='content-parent'>
                    <span className='text-bold'>{title}</span><span onClick={() => this.handleOpenPopup(sites[0].siteType)} className='link-ticket'>{ticketCnt}</span>
                </div>
                {sites.map((item, index) => (
                    <div key={`${item.siteGroup}-${index}`} className='text-line content-child'>
                        {item.siteGroup}: <span className={this.state.data.status === 'Failed' ? 'failed-siteName' : ''}>{item.siteNames}</span>
                    </div>
                ))}
            </div>
        );
    };

    getTicketCount = sites => sites.reduce((count, item) => count + item.ticketCnt, 0);

    renderMapSite = () => {
        const creditSites = filterAndSortSites(this.state.sites, 'Credit');
        const licenseeSites = filterAndSortSites(this.state.sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, LangHelper.getResource('CreditTotalTickets'), this.getTicketCount(creditSites))}
                {this.renderSiteSection(licenseeSites, LangHelper.getResource('LicenseeTotalTickets'), this.getTicketCount(licenseeSites))}
            </div>
        );
    };

    renderSite = () => {
        const { data, content, affectedTicketPopup } = this.state;
        if(!data) {
            return null;
        }
        return (
            <>
                <div className="action-notification">
                    <div className='action-content'>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('NotificationID_MsgID')}</Form.Label>
                                <div>{data.notificationID}</div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('Status')}</Form.Label>
                                <div className={`status-button status-${data.status}`}>{data.status}</div>
                            </Form.Group>
                        </Form.Row>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('EventInfo')}</div>
                            <div className="group-content">
                                <div className="content-item">
                                    <Form.Group as={Row}>
                                        <Form.Label className='text-bold' htmlFor="eventDate">
                                            {LangHelper.getResource('EventDateGMT4')}
                                        </Form.Label>
                                        <div>{data.eventDate ? DateTimeService.toShortDateFormat(data.eventDate) : null}</div>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label className='text-bold' htmlFor="eventName">
                                            {LangHelper.getResource('EventName')}
                                        </Form.Label>
                                        <div>{data.eventName}</div>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Sites')}</div>
                            <div className="group-content">
                                <div className="content">
                                    {
                                        this.renderMapSite()
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Content')}</div>
                            <div className="group-language">
                                <Col sm={12} md={12}>
                                    <Tabs
                                        className='languages-text'
                                        id="controlled-tab"
                                        activeKey={this.state.tab}
                                        onSelect={selected => this.handleChangeTab(selected)}
                                    >
                                        {
                                            this.languages.map((language, key) =>
                                                (<Tab key={key} eventKey={language.name} title={language.name}>
                                                    <CkEditor
                                                        name={language.name}
                                                        data={content[language.mapLabel]}
                                                        username={window.currentUsername}       
                                                        isRemoveToolbarForChatbot
                                                        isRemoveAllToolbar={true}
                                                    />
                                                </Tab>)
                                            )
                                        }
                                    </Tabs>
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    affectedTicketPopup.show &&
                    <AffectedTicket
                        notificationId={data.notificationID}
                        eventDate={data.eventDate}
                        eventName={data.eventName}
                        exportExcel={this.props.exportExcel}
                        isCredit={affectedTicketPopup.isCredit}
                        siteTickets={affectedTicketPopup.siteTickets}
                        onClose={this.handleClosePopup}
                    />
                }
            </>
        )
    };

    render() {
        return (
            <Modal show className="message-notification-center-action" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('NotificationDetail')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.renderSite() }
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(DetailNotification);