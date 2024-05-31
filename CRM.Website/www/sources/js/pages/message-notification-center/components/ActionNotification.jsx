import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Row, Tabs, Tab, Button } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import WithNavigation from '@jsroot/components/WithNavigation';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Site from '@jsroot/common/site';
import { filterAndSortSites } from '../common.functions';
import AffectedTicket from './AffectedTicket';

export class ActionNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'English',
            data: null,
            sites: null,
            confirmActionDialog: { show: false, params: null, content: null },
            content: {
                content_en: null,
                content_cs: null,
                content_ch: null
            },
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            isSubmitting: false,
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false },
            messageSuccessful: null
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
        this.props.setEditAdmNotification(null);
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

    getParams = status => {
        const { content_en, content_cs, content_ch } = this.state.content;
        const params = {
            notificationId: this.props.actionParam.notificationId,
            newStatus: status,
            newContentEN: content_en,
            newContentCS: content_cs,
            newContentCH: content_ch
        };
        return params;
    };

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    };

    handleCreateNotification = async (params, message) => {
        await this.props.editAdmNotification(params).then(() => {
            this.handleClosePopup();
            if (this.props.editAdmNotificationResult.isSuccessful) {
                this.setState({ messageSuccessful: message });
                setTimeout(() => {
                    this.props.setEditAdmNotification(null);
                    this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        });
    };

    handleSaveDraft = async event => {
        this.setState({ isSubmitting: true });
        event.preventDefault();

        const params = this.getParams('Draft');
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    handleSubmitConfirm = async () => {
        const status = this.props.actionParam.isOstUser ? 'Sending' : 'Active';
        const params = this.getParams(status);
        const message = status === 'Sending' ? 'SendNotificationSuccessfully' : 'ActiveNotificationSuccessfully';
        await this.handleCreateNotification(params, LangHelper.getResource(message));
    };

    handleSaveConfirm = async () => {
        const params = this.getParams(this.state.data.status);
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    getStateData = () => {
        const stateData = {
            isLoadGrid: true,
            filterParams: this.props.actionParam?.redirectParams
        };
        return stateData;
    };

    handleClose = () => {
        this.props.setEditAdmNotification(null);
        this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
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

    renderMapSite = () => {
        const creditSites = filterAndSortSites(this.state.sites, 'Credit');
        const licenseeSites = filterAndSortSites(this.state.sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, LangHelper.getResource('CreditTotalTickets'), creditSites[0]?.ticketCnt)}
                {this.renderSiteSection(licenseeSites, LangHelper.getResource('LicenseeTotalTickets'), licenseeSites[0]?.ticketCnt)}
            </div>
        );
    };

    handleChangeContent = (mapLabel, value) => {
        this.setState(prevState => ({
            content: {
                ...prevState.content,
                [mapLabel]: value
            }
        }));
    };

    handleClosePopup = () => {
        this.setState({
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false }
        });
    };

    handleActive = popup => {
        this.setState({ [popup]: { show: true }});
    };

    renderConfirmPopup = () => {
        const popups = [
            { data: this.state.pushPopup, status: 'push', handler: 'handleSubmitConfirm' },
            { data: this.state.savePopup, status: 'update', handler: 'handleSaveConfirm' },
            { data: this.state.activatePopup, status: 'activate', handler: 'handleSubmitConfirm' }
        ];
        const activePopup = popups.find(popup => popup.data.show);
        const { status, handler } = activePopup;

        if (!activePopup) {
            return null;
        }

        return (
            <ConfirmPopup
                size='lg'
                className='confirmNotification'
                title={LangHelper.getResource('Confirmation')}
                content={
                    <div>
                        Are you sure you want to {status} this notification?
                    </div>
                }
                onSubmit={() => this[handler]()}
                onClose={this.handleClosePopup}
            />
        );
    };

    renderButton = () => {
        const isOstUser = this.props.actionParam.isOstUser;

        if (isOstUser) {
            return(
                <>
                    <Button className="btn-save" variant="primary" size="md" disabled={this.state.isSubmitting} onClick={event => this.handleSaveDraft(event)}>{LangHelper.getResource('Save as Draft')}</Button>
                    <Button className="btn-send" variant="primary" size="sm" disabled={this.state.isSubmitting} onClick={() => this.handleActive('pushPopup')}>{LangHelper.getResource('Push')}</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button className="btn-save" variant="primary" size="md" disabled={this.state.isSubmitting} onClick={() => this.handleActive('savePopup')}>{LangHelper.getResource('Save')}</Button>
                    <Button className="btn-send" variant="primary" size="sm" disabled={this.state.isSubmitting} onClick={() => this.handleActive('activatePopup')}>{LangHelper.getResource('Activate')}</Button>
                </>
            )
        }
    }

    renderMessage = (result, message) =>{
        if(!result.isSuccessful){
            return result.message.split(';');
        }else{
            return [result.message || message];
        }
    };

    render() {
        const { data, content, affectedTicketPopup, pushPopup, savePopup, activatePopup, messageSuccessful } = this.state;
        if(!data) {
            return null;
        }

        return (
            <>
                <Form noValidate>
                    {
                        this.props.editAdmNotificationResult &&
                        <ResponseMessage isSuccessful={this.props.editAdmNotificationResult.isSuccessful}
                            messages={this.renderMessage(this.props.editAdmNotificationResult, messageSuccessful)}
                        />
                    }
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
                                                            onChange={value => this.handleChangeContent(language.mapLabel, value)}
                                                            isRemoveToolbarForChatbot
                                                            isRemoveAllToolbar={this.props.actionParam.isOstUser}
                                                        />
                                                    </Tab>)
                                                )
                                            }
                                        </Tabs>
                                    </Col>
                                </div>
                            </div>

                            <div className="group-btn">
                                <Button className="btn-cancel" variant="primary" size="sm" onClick={this.handleClose}>{LangHelper.getResource('Cancel')}</Button>
                                {
                                    this.renderButton()
                                }
                            </div>
                        </div>
                    </div>
                </Form>
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
                {
                    (pushPopup.show || savePopup.show || activatePopup.show) &&
                    this.renderConfirmPopup()
                }
            </>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editAdmNotificationResult } = state;
    return { gridParams, editAdmNotificationResult };
};

const ActionNotificationNavigation = WithNavigation(ActionNotification);

export default connect(mapStateToProps, mapDispatchToProps)(ActionNotificationNavigation);