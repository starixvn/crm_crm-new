import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Row, Tabs, Tab, Button } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';
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
            isSubmitting: false
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

    handleCreateNotification = async params => {
        await this.props.editAdmNotification(params).then(() => {
            if (this.props.editAdmNotificationResult.isSuccessful) {
                setTimeout(() => {
                    this.props.setEditAdmNotification(null);
                    this.props.navigate(Site.resolveClientUrl('MessageNotificationCenter'), { state: this.getStateData() });
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
        await this.handleCreateNotification(params);
    };

    handleSubmit = async event => {
        this.setState({ isSubmitting: true });
        event.preventDefault();

        const status = this.props.actionParam.isOstUser ? 'Sending' : 'Active';
        const params = this.getParams(status);
        await this.handleCreateNotification(params);
    };


    getStateData = () => {
        const stateData = {
            isLoadGrid: true,
            filterParams: this.props.actionParam?.redirectParams
        };
        return stateData;
    };

    handleClose = () => {
        this.props.navigate(Site.resolveClientUrl('MessageNotificationCenter'), { state: this.getStateData() });
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
                    <span className='text-bold'>{title}</span>: <span onClick={() => this.handleOpenPopup(sites[0].siteType)} className='link-ticket'>{ticketCnt}</span>
                </div>
                {sites.map(item => (
                    <div key={item.siteGroup} className='text-line content-child'>
                        {item.siteGroup}: {item.siteNames}
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
        this.setState({affectedTicketPopup: { show: false, isCredit: true, siteTickets: null }});
    }

    render() {
        const { data, content, affectedTicketPopup } = this.state;
        if(!data) {
            return null;
        }

        return (
            <>
                <Form noValidate onSubmit={this.handleSubmit}>
                    {
                        this.props.editAdmNotificationResult &&
                        <ResponseMessage isSuccessful={this.props.editAdmNotificationResult.isSuccessful}
                            messages={this.renderMessage(this.props.editAdmNotificationResult)}
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
                                    <div className='status-button status-New'>{data.status}</div>
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
                                <Button className="btn-save" variant="primary" size="md" disabled={this.state.isSubmitting} onClick={event => this.handleSaveDraft(event)}>{LangHelper.getResource('Save as Draft')}</Button>
                                <Button className="btn-send" type="submit" variant="primary" size="sm" disabled={this.state.isSubmitting}>{LangHelper.getResource('Push')}</Button>
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
            </>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams } = state;
    return { gridParams };
};

const ActionNotificationNavigation = WithNavigation(ActionNotification);

export default connect(mapStateToProps, mapDispatchToProps)(ActionNotificationNavigation);